import React from "react";

const RadioInput = ({
  options = [],
  containerWidth = 300,
  value,
  onChange,
}) => {
  return (
    <div
      className="radio-input"
      style={{ "--container_width": `${containerWidth}px` }}
    >
      {options.map((option) => (
        <label key={option.value}>
          <input
            type="radio"
            name="value-radio"
            value={option.value}
            checked={value === option.value}
            onChange={() => onChange(option.value)} // 🟢 استدعاء onChange القادم من الخارج
          />
          <span>{option.label}</span>
        </label>
      ))}
      <span
        className="selection"
        style={{
          width: `calc(${containerWidth}px / ${options.length})`,
          transform: `translateX(calc(${containerWidth}px * ${options.findIndex(
            (opt) => opt.value === value
          )} / ${options.length}))`,
        }}
      ></span>
    </div>
  );
};

export default RadioInput;
