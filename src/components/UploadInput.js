import { useState } from "react";
import { Form } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFile } from "@fortawesome/free-solid-svg-icons";

function UploadInput(props) {
  const [fileInfo, setFileInfo] = useState("");

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const fileName = file.name;
      setFileInfo(`${fileName}`);
    } else {
      setFileInfo("");
    }
    if (props.onChange) {
      props.onChange(event);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        ...props.parentStyle,
      }}
    >
      <Form.Label htmlFor={props.id} style={{}} className="UploadInputLabel">
        <FontAwesomeIcon icon={faFile} />
      </Form.Label>
      <Form.Control
        type="file"
        id={props.id}
        style={{ display: "none" }}
        onChange={handleFileChange}
        name={props.name}

      />
      {!fileInfo ? (
        <span
          style={{
            marginTop: "10px",
            fontSize: "14px",
            color: "#6c757d",
          }}
        >
          {props.label}
        </span>
      ) : (
        <span
          style={{
            marginTop: "10px",
            fontSize: "14px",
            color: "var(--text-color)",
          }}
        >
          {fileInfo}
        </span>
      )}
      {/* {fileInfo && (
        <>
        <br/>
        <span
          style={{
            marginTop: "20px !important",
            fontSize: "14px",
            color: "var(--text-color)",
            background:"var(--dropdownbackground--color)",
            padding:"1px 12px",
            borderRadius:"5px"
          }}

        >
          Selected file: {fileInfo}
        </span>
        </>
      )} */}
    </div>
  );
}

export default UploadInput;
