 import React, { useState } from "react";
 import "./FilterSwitch.css";

 function FilterSwitch({ options, name, selected, onChange }) {
   const [currentValue, setCurrentValue] = useState(
     selected || options[0].value
   );

   const handleOptionChange = (value) => {
     setCurrentValue(value);
     if (onChange) {
       onChange(value);
     }
   };

   return (
     <div className="filter-switch">
       {options.map((option, index) => (
         <React.Fragment key={index}>
           <input
             id={`${name}-${index}`}
             name={name}
             type="radio"
             checked={currentValue === option.value}
             onChange={() => handleOptionChange(option.value)}
           />
           <label htmlFor={`${name}-${index}`} className="option">
             {option.label}
           </label>
         </React.Fragment>
       ))}
       <span
         className="background"
         style={{
           left: `${options.findIndex((o) => o.value === currentValue) * 50}%`,
         }}
       ></span>
     </div>
   );
 }

 export default FilterSwitch;
