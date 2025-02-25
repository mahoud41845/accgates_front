import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChartBar,
  faGear,
  faUser,
  faDiagramProject,
  faGraduationCap,
  faCircleUser,
  faFile,
  faCreditCard,
} from "@fortawesome/free-solid-svg-icons";

const Sdebardashboard = () => {
  const menuItems = [
    { name: "Dashboard", icon: faChartBar, link: "index.html" },
    { name: "Settings", icon: faGear, link: "settings.html" },
    { name: "Profile", icon: faUser, link: "profile.html" },
    { name: "Projects", icon: faDiagramProject, link: "projects.html" },
    { name: "Courses", icon: faGraduationCap, link: "courses.html" },
    { name: "Friends", icon: faCircleUser, link: "friends.html" },
    { name: "Files", icon: faCircleUser, link: "files.html" },
    { name: "Plans", icon: faCreditCard, link: "plans.html" },
  ];

  return (
    <div className="sidebar bg-white p-5 p-relative">
      <h3 className="p-relative txt-c mt-0">mahmoud</h3>
      <ul>
        {menuItems.map((item, index) => (
          <li key={index}>
            <a
              className="d-flex align-center fs-14 c-black rad-6 p-10"
              href={item.link}
            >
              <FontAwesomeIcon icon={item.icon} className="fa-fw" />

              <span className="ml-2">{item.name}</span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sdebardashboard;

 
