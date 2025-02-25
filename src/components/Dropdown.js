import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

const Dropdown = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleChoices = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="text-with-choices">
      <p className="clickable-text bold-nav" onClick={toggleChoices}>
        {props.name} 
        {props.icon && <FontAwesomeIcon className="sideIcon" icon={props.icon} />}
      </p>
      {isOpen && (
        <div className="choices">
          {props.choices.map((choice, index) => (
            <Link key={index} className="sidebar-subelement" to={choice.route}>
              {choice.label}
            </Link>
          ))}
        </div>
      )}
    </div> 
  );
};

export default Dropdown;
