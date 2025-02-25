import React from "react";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

const BasicDatePicker = ({
  label = "Select a date",
  onChange,
  value,
  parentStyle,
}) => {
  return (
    <div style={parentStyle}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DemoContainer components={["DatePicker"]}>
          <DatePicker label={label} value={value} onChange={onChange} />
        </DemoContainer>
      </LocalizationProvider>
    </div>
  );
};

export default BasicDatePicker;
