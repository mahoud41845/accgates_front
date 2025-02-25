import { Nav, Navbar, Dropdown } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons";
import { useContext } from "react";
import { ThemeContext } from "../context/theme-context";

function MainLandingPageNav() {
  const { theme, setTheme } = useContext(ThemeContext);

  const Logo =
    theme === "light"
      ? require("../logo-light.svg").default
      : require("../logo-dark.svg").default;

  const handleToggle = (value) => {
    setTheme(value);
  };

  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      const yOffset = -150;
      const yPosition =
        section.getBoundingClientRect().top + window.scrollY + yOffset;
      window.scrollTo({ top: yPosition, behavior: "smooth" });
    }
  };

  return (
    <Navbar expand="lg" className="landingPageNav">
      <Navbar.Brand href="#home">
        <img width="50px" className="register-logo" src={Logo} alt="logo" />
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="navbar-nav" />
      <Navbar.Collapse id="navbar-nav" className="navlinksColla">
        <Nav className="navlinks">
          <div className="navlinksCon">
            <p
              className="mainNavLink"
              onClick={() => scrollToSection("mainLandingsec1")}
            >
              الرئيسية
            </p>
            <p
              className="mainNavLink"
              onClick={() => scrollToSection("mainourSystemContainer")}
            >
              نظامنا
            </p>
            <p
              className="mainNavLink"
              onClick={() => scrollToSection("mainourServ")}
            >
              خدماتنا
            </p>
            <p
              className="mainNavLink"
              onClick={() => scrollToSection("mainsubscriptionContainer")}
            >
              الأسعار
            </p>
            <p
              className="mainNavLink"
              onClick={() => scrollToSection("mainContactUs")}
            >
              تواصل معنا
            </p>

            <Dropdown>
              <Dropdown.Toggle
                variant="link"
                className="theme-toggle-icon"
                id="dropdown-theme-toggle"
              >
                <FontAwesomeIcon
                  icon={theme === "light" ? faSun : faMoon}
                  className="theme-icon"
                />
              </Dropdown.Toggle>
              <Dropdown.Menu className="dlDirec">
                <Dropdown.Item
                  onClick={() => handleToggle("light")}
                  active={theme === "light"}
                >
                  Light
                </Dropdown.Item>
                <Dropdown.Item
                  onClick={() => handleToggle("dark")}
                  active={theme === "dark"}
                >
                  Dark
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default MainLandingPageNav;
