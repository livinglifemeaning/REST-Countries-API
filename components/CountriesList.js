import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import classes from "./CountriesList.module.css";

const ListItem = ({ image, name, population, region, capital }) => {
  return (
    <li>
      <Link href={`/country/${name}`}>
        <div className={classes.card}>
          <img className={classes.flag} src={image} alt="" />
          <div className={classes.infoBox}>
            <p className={classes.name}>{name}</p>
            <p className={classes.info}>
              Population:{" "}
              <span>
                {population.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
              </span>
            </p>
            <p className={classes.info}>
              Region: <span>{region}</span>
            </p>
            <p className={classes.info}>
              Capital: <span>{capital}</span>
            </p>
          </div>
        </div>
      </Link>
    </li>
  );
};

const FilterBar = ({ filterByName, setFilterByName, setFilterByRegion }) => {
  const inputRef = useRef();
  const selectRef = useRef();

  return (
    <div className={classes.filterBar}>
      <div className={classes.inputBox}>
        <span>
          <FontAwesomeIcon icon={faMagnifyingGlass} />
        </span>
        <input
          ref={inputRef}
          onChange={() => setFilterByName(inputRef.current.value)}
          type="text"
          placeholder="Search for a country..."
          value={filterByName}
        />
      </div>

      <div className={classes.selectBox}>
        <select
          ref={selectRef}
          onChange={() => setFilterByRegion(selectRef.current.value)}
          name="regions"
        >
          <option disabled selected hidden>
            Filter by Region
          </option>
          <option value="None">None</option>
          <option value="Africa">Africa</option>
          <option value="Americas">America</option>
          <option value="Asia">Asia</option>
          <option value="Europe">Europe</option>
          <option value="Oceania">Oceania</option>
        </select>
      </div>
    </div>
  );
};
const CountriesList = ({ countries }) => {
  const [displayedCountries, setDisplayedCountries] = useState(countries);
  const [filterByName, setFilterByName] = useState("");
  const [filterByRegion, setFilterByRegion] = useState("");

  useEffect(() => {
    if (
      filterByName !== "" &&
      filterByRegion !== "" &&
      filterByRegion !== "None"
    ) {
      const filteredByRegion = countries.filter(
        (country) => country.region === filterByRegion
      );
      const filteredByName = filteredByRegion.filter((country) =>
        country.name.toLowerCase().startsWith(filterByName.toLowerCase())
      );
      setDisplayedCountries(filteredByName);
    } else if (filterByName !== "") {
      const filteredCountries = countries.filter((country) =>
        country.name.toLowerCase().startsWith(filterByName.toLowerCase())
      );
      setDisplayedCountries(filteredCountries);
    } else if (filterByRegion !== "" && filterByRegion !== "None") {
      const filteredCountries = countries.filter(
        (country) => country.region === filterByRegion
      );
      setDisplayedCountries(filteredCountries);
    } else {
      setDisplayedCountries(countries);
    }
  }, [filterByName, filterByRegion]);


  return (
    <>
      <FilterBar
        filterByName={filterByName}
        setFilterByName={setFilterByName}
        setFilterByRegion={setFilterByRegion}
      />
      <ul className={classes.list}>
        {displayedCountries.map((country) => (
          <ListItem
            key={country.name}
            image={country.image}
            name={country.name}
            population={country.population}
            region={country.region}
            capital={country.capital}
          />
        ))}
      </ul>
    </>
  );
};

export default CountriesList;
