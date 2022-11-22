import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeftLong } from "@fortawesome/free-solid-svg-icons";
import classes from "./Country.module.css";

const Country = ({ countryData }) => {
  const name = countryData.name;
  const nativeName = countryData.nativeName;
  const population = countryData.population
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  const region = countryData.region;
  const subregion = countryData.subregion;
  const capital = countryData.capital;
  const domain = countryData.domain.join(", ").toString();
  const currencies = countryData.currencies.join(", ").toString();
  const languages = countryData.languages.join(", ").toString();
  const borderingCountries = countryData.borderingCountries;
  const flag = countryData.flag;
  return (
    <>
    
      <Link href="/countries/">
        <button className={classes.btn}>
          <span>
            <FontAwesomeIcon icon={faArrowLeftLong} />
          </span>
          Back
        </button>
      </Link>

      <div className={classes.box}>
        <div className={classes.flagBox}>
          <img src={flag} alt="" />
        </div>
        <div className={classes.infoBox}>
          <p className={classes.name}>{name}</p>
          <div className={classes.infoLists}>
            <ul>
              <li className={classes.info}>
                Native Name: <span>{nativeName}</span>
              </li>
              <li className={classes.info}>
                Population: <span>{population}</span>
              </li>
              <li className={classes.info}>
                Region: <span>{region}</span>
              </li>
              <li className={classes.info}>
                Sub Region: <span>{subregion}</span>
              </li>
              <li className={classes.info}>
                Capital: <span>{capital}</span>
              </li>
            </ul>

            <ul>
              <li className={classes.info}>
                Top Level Domain: <span>{domain}</span>
              </li>
              <li className={classes.info}>
                Currencies: <span>{currencies}</span>
              </li>
              <li className={classes.info}>
                Languages: <span>{languages}</span>
              </li>
            </ul>
          </div>

          <div className={classes.border}>
            <p>Border Countries:</p>
            <ul className={classes.borderCountries}>
              {Array.isArray(borderingCountries) ? (
                borderingCountries.map((country) => <li>{country}</li>)
              ) : (
                <li>None</li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default Country;
