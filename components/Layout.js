import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon as LightMoon } from "@fortawesome/free-solid-svg-icons";
import { faMoon as DarkMoon } from "@fortawesome/free-regular-svg-icons";

import classes from "./Layout.module.css";
//
const Layout = (props) => {
  const [colorScheme, setColorScheme] = useState("light");

  useEffect(() => {
    const doc = document.firstElementChild;
    doc.setAttribute("data-color-scheme", colorScheme);
  }, [colorScheme]);

  const toggleColorScheme = () => {
    if (colorScheme === "light") {
      setColorScheme("dark");
    } else {
      setColorScheme("light");
    }
  };

  return (
    <main>
      <div className={classes.header}>
        <p className={classes.title}>Where in the world?</p>
        <div onClick={toggleColorScheme} className={classes.toggle}>
          <span>
            {colorScheme === "light" ? (
              <FontAwesomeIcon icon={LightMoon} />
            ) : (
              <FontAwesomeIcon icon={DarkMoon} />
            )}
          </span>
          <p>Dark Mode</p>
        </div>
      </div>
      <div className={classes.container}>{props.children}</div>
    </main>
  );
};

export default Layout;
