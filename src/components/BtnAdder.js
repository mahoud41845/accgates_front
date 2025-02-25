import React from "react";
import "./BtnAdder.css";

const BtnAdder = () => {
  return (
    <button type="button" className="btn-adder">
      <span className="btn-adder__text">Add Item</span>
      <span className="btn-adder__icon">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          viewBox="0 0 24 24"
          stroke-width="2"
          stroke-linejoin="round"
          stroke-linecap="round"
          stroke="currentColor"
          height="24"
          fill="none"
          className="btn-svg"
        >
          <line y2="19" y1="5" x2="12" x1="12"></line>
          <line y2="12" y1="12" x2="19" x1="5"></line>
        </svg>
      </span>
    </button>
  );
};

export default BtnAdder;
