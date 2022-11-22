import Head from "next/head";
import CountriesList from "../../components/CountriesList";
import getLoadedCountries from "../api/getLoadedCountries";

const Index = (props) => {
  return (
    <>
    <Head>
        <title>Frontend Mentor | Countries of the World</title>
        <meta name="description" content="Facts about the countries of the world"/>
        <link rel="icon" href="/favicon-32x32.png"/>
    </Head>
    <CountriesList countries={props.countries}/> 
    </>
  )
}

export async function getStaticProps(){
    const loadedCountries = await getLoadedCountries(); 
    
    return {
        props: {
            countries: loadedCountries
        }
    }
}
export default Index
