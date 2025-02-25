import React, { useContext } from "react";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import ToggleButton from "react-bootstrap/ToggleButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons";
import { ThemeContext } from "../context/theme-context";

function DarkLightbutton() {
  const { theme, setTheme } = useContext(ThemeContext);

  const handleToggle = (value) => {
    setTheme(value === "1" ? "dark" : "light");
  };

  return (
    <ButtonGroup className="dlgroup">
      <ToggleButton
        id="dark-mode-toggle"
        type="radio"
        name="radio"
        value="1"
        checked={theme === "dark"}
        onChange={() => handleToggle("1")}
        className={`themebutton ${theme === "dark" ? "active" : ""}`}
      >
        <FontAwesomeIcon icon={faMoon} />
         
      </ToggleButton>
      <ToggleButton
        id="light-mode-toggle"
        type="radio"
        name="radio"
        value="2"
        checked={theme === "light"}
        onChange={() => handleToggle("2")}
        className={`themebutton ${theme === "light" ? "active" : ""}`}
      >
        <FontAwesomeIcon icon={faSun} />
         
      </ToggleButton>
    </ButtonGroup>
  );
}

export default DarkLightbutton;
