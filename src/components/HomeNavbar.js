import React, { useState, useContext, useRef, useEffect } from "react";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell, faCircleXmark, faGlobe, faHome, faList } from "@fortawesome/free-solid-svg-icons";
import { ThemeContext } from "../context/theme-context";
import { useTranslation } from "react-i18next";

function HomeNavbar({ size, toggleSidebar, isSidebarVisible, onLanguageToggle, isEnglish }) {
  const { t } = useTranslation();
  const { theme } = useContext(ThemeContext);
  const Logo =
    theme === "light"
      ? require("../v2.svg").default
      : require("../v1.svg").default;

  const [isFlagDropdownVisible, setFlagDropdownVisible] = useState(false);
  const dropdownRef = useRef(null); 

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setFlagDropdownVisible(false); 
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const handleFlagClick = (event) => {
    event.stopPropagation();
    setFlagDropdownVisible((prevState) => !prevState); 
  };

  const handleLanguageChange = (language) => {
    onLanguageToggle(language); 
    setFlagDropdownVisible(false); 
  };

  return (
    <Navbar
      expand="lg"
      className={`navbar-custom navbar ${size} ${isSidebarVisible ? "sidebar-open" : "sidebar-closed"}`}
    >
      <Navbar.Brand href="#home" className="brand-custom">
        <img width="50px" className="register-logo" src={Logo} alt="logo" />
      </Navbar.Brand>

      <div className="show">
        <Nav>
          <NavDropdown
            title={<FontAwesomeIcon icon={faBell} />}
            id="notification-dropdown"
          >
            <NavDropdown.Item href="#home">{t("notifications")}</NavDropdown.Item>
            <NavDropdown.Divider />
            {[...Array(4)].map((_, index) => (
              <NavDropdown.Item className="notifications" href="#home" key={index}>
                <p className="notificationstext">{t("notifications")}</p>
                <FontAwesomeIcon icon={faCircleXmark} className="notificationsicon" />
              </NavDropdown.Item>
            ))}
            <NavDropdown.Item href="/home">{t("clear_all")}</NavDropdown.Item>
          </NavDropdown>

          <Nav.Link href="#Home" className="hs-Container">
            <FontAwesomeIcon icon={faHome} />
          </Nav.Link>

          <Nav.Link href="#Home" className="hs-Container">
            <button className="hideshow-side" onClick={toggleSidebar}>
              <FontAwesomeIcon icon={faList} />
            </button>
          </Nav.Link>

          <Nav.Link className="language-toggle" onClick={handleFlagClick}>
            <FontAwesomeIcon icon={faGlobe} className="globe-icon" />
            {isFlagDropdownVisible && (
              <div ref={dropdownRef} className="flag-dropdown">
                <div
                  className="flag-option"
                  onClick={(event) => {
                    event.stopPropagation(); 
                    handleLanguageChange("en");
                  }}
                >
                  <img src="https://flagcdn.com/w40/us.png" alt="English" width="30" />
                  <span>English</span>
                </div>

                <div
                  className="flag-option"
                  onClick={(event) => {
                    event.stopPropagation(); 
                    handleLanguageChange("ar"); 
                  }}
                >
                  <img src="https://flagcdn.com/w40/sa.png" alt="Arabic" width="30" />
                  <span>العربية</span>
                </div>
              </div>
            )}
          </Nav.Link>
        </Nav>
      </div>
    </Navbar>
  );
}

export default HomeNavbar;