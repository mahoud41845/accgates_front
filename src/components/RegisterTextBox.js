import { Form } from "react-bootstrap";
import React from "react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

function RegisterTextbox(props) {
  return (
    <Form.Group
      className="mb-3 responParent"
      controlId={props.id}
      style={{ ...props.parentStyle }}
    >
      {props.isDropdown ? (
        <Form.Select
          className="register-label-dropdown"
          value={props.labelValue}
          name={props.name}
          onChange={props.onLabelChange}
          placeholder={props.placeholder}
          
          style={{ marginBottom: "10px", ...props.labelStyle }}
        >
          {props.labelOptions?.map((option, index) => (
            <option
              key={index}
              value={option.value}
              className="register-option-dropdown"
            >
              {option.label}
            </option>
          ))}
        </Form.Select>
      ) : (
        <Form.Label className="register-label" style={{ ...props.labelStyle }}>
          {props.label}
        </Form.Label>
      )}

      <div style={{ display: "flex", alignItems: "center", position:"relative" }}>
        {props.prefix && (
          <span
            style={{
              color: "var(--text-color)",
              borderRadius: "20px",
              padding: "8px",
              fontSize: "16px",
              margin: "10px",
              position:"absolute",
              left:"0"
            }}
          >
            {props.flag && (
              <img
                src={props.flag}
                alt="flag"
                width="25px"
                style={{ marginRight: "5px" }}
              />
            )}
            {props.prefix}
          </span>
        )}

        {/* {props.type === "date" ? (
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="MM/DD/YYYY"
              name={props.name}
              value={props.value}
              onChange={props.onChange}
              slotProps={{
                textField: {
                  style: { ...props.stylee, flex: "1" },
                },
              }}
            />
          </LocalizationProvider>
        ) : ( */}
          <Form.Control
            type={props.type}
            className="register-textbox"
            style={{
              ...props.stylee,
              flex: "1",
              textAlign: props.align,
            }}
            value={props.value}
            onChange={props.onChange}
            disabled={props.disabled}
            onBlur={props.onBlur}
            placeholder={props.placeholder}
            name={props.name}
          />
        {/* )} */}
      </div>
    </Form.Group>
  );
}

export default RegisterTextbox;
