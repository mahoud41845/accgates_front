import { Nav, Navbar, Dropdown } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons";
import { useContext } from "react";
import { ThemeContext } from "../context/theme-context";
import { Link } from "react-router";

function LandingNav() {
  const { theme, setTheme } = useContext(ThemeContext);

  const Logo =
    theme === "light"
      ? require("../logo-light.svg").default
      : require("../logo-dark.svg").default;

  const handleToggle = (value) => {
    setTheme(value);
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
            <Link to='/MainLanding' className="mainNavLink">الرئيسية</Link>
            <Link to='/createMangelanding' className="mainNavLink">إنشاء وإدارة</Link >
            <Link to = "/designmarketinglanding" className="mainNavLink">التسويق وتصميم المشاريع</Link>
            <Link to = "/hrlanding" className="mainNavLink">الموارد البشرية</Link>
            <Link to = "/#" className="mainNavLink">المحاسبة القانونية والمالية</Link>
            <Link to = "/#" className="mainNavLink">الحوكمة</Link>
            <Link to = "/#" className="mainNavLink">إدارة البيانات</Link>
            <Link to = "/#" className="mainNavLink">أنشيء موقعك الإلكتروني</Link>

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

export default LandingNav;
