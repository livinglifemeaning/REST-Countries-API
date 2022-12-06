import Head from "next/head";
import Country from "../../components/Country";
import countryAbbreviations from "../../components/countryAbbreviations.json";
const CountryPage = (props) => {
  console.log(props)
  return (
    <>
      <Head>
        <title>{props.countryData.name ? props.countryData.name : "Country"}</title>
        <meta
          name="description"
          content={`Facts about the country of ${props.countryData.name ? props.countryData.name : null}`}
        />
        <link rel="icon" href="/favicon-32x32.png" />
      </Head>
      <Country countryData={props.countryData ? props.countryData : null} />
    </>
  );
};

export async function getStaticPaths() {
  let response = await fetch("https://restcountries.com/v3.1/all");
  let data = await response.json();

  let loadedNames = [];
  for (let i = 0; i < data.length; i++) {
    loadedNames.push(data[i].name.common);
  }

  return {
    fallback: true,
    paths: loadedNames.map((name) => ({ params: { country: name } })),
  };
}

export async function getStaticProps(context) {
  const countryName = context.params.country;
  let response = await fetch(
    `https://restcountries.com/v3.1/name/${countryName}`
  );
  let data = await response.json();

  let borderingCountriesFullNames = [];
  if (data[0].borders) {
    data[0].borders.forEach((abbreviation) => {
      let object = countryAbbreviations.find(
        (item) => item.abbreviation === abbreviation
      );
      borderingCountriesFullNames.push(object.country);
    });
  }

  let currencies = [];

  if (data[0].currencies) {
    if (Object.keys(data[0].currencies).length > 0) {
      for (let i = 0; i < Object.keys(data[0].currencies).length; i++) {
        currencies.push(
          data[0].currencies[Object.keys(data[0].currencies)[i]].name
        );
      }
    } else {
      currencies.push(data[0].currencies[Object.keys(data[0].currencies)].name);
    }
  } else {
    currencies.push("None");
  }

  let countryData = {
    name: data[0].name.common,
    nativeName: data[0].name.nativeName
      ? data[0].name.nativeName[
          Object.keys(data[0].name.nativeName)[
            Object.keys(data[0].name.nativeName).length - 1
          ]
        ].common
      : "None",
    population: data[0].population,
    region: data[0].region,
    subregion: data[0].subregion ? data[0].subregion : "None",
    capital: data[0].capital ? data[0].capital[0] : "None",
    domain: data[0].tld ? data[0].tld : ["None"],
    currencies: currencies,
    languages: data[0].languages ? Object.values(data[0].languages) : ["None"],
    borderingCountries: data[0].borders ? borderingCountriesFullNames : "None",
    flag: data[0].flags.svg,
  };
  return {
    props: {
      countryData: countryData,
    },
  };
}

export default CountryPage;
