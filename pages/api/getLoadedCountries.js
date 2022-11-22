async function getLoadedCountries() {
  let response = await fetch("https://restcountries.com/v3.1/all");

  let data = await response.json();
  const loadedCountries = [];

  for (let i = 0; i < data.length; i++) {
    loadedCountries.push({
      name: data[i].name.common,
      population: data[i].population,
      region: data[i].region,
      capital: data[i].capital ? data[i].capital[0] : "None",
      image: data[i].flags.png,
    });
  }
  return loadedCountries;
}

export default getLoadedCountries;
