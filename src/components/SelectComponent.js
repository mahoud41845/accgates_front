import React, { useState } from "react";
import Select from "react-select";

function SelectComponent({
  className,
  placeholder,
  label,
  containerStyle,
  labelStyle,
  selectStyle,
  options,
  value,
  onChange,
}) {
  const [selectedOption, setSelectedOption] = useState(value);

  const handleChange = (selected) => {
    setSelectedOption(selected);
    if (onChange) {
      onChange(selected);
    }
  };

  const customStyles = {
    option: (provided, state) => {
      const customStyleOption = options.find(
        (option) => option.value === state.data.value
      );
      return customStyleOption && customStyleOption.customStyle
        ? { ...provided, ...customStyleOption.customStyle }
        : provided;
    },
    control: (provided) => ({
      ...provided,
      ...selectStyle,
    }),
  };

  return (
    <div className="select-component-container mb-3" style={containerStyle}>
      {label && <label style={labelStyle}>{label}</label>}
      <Select
        options={options}
        className={`${className} select-component`}
        classNamePrefix="select-component-prefix"
        placeholder={placeholder}
        styles={customStyles}
        value={selectedOption ? selectedOption : value}
        onChange={handleChange}
      />
    </div>
  );
}

export default SelectComponent;
