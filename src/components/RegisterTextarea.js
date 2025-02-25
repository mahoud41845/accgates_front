import { Form } from "react-bootstrap";

function RegisterTextarea(props) {
  return (
    <Form.Group
      className="mb-3"
      controlId={props.id}
      style={{ ...props.parentStyle, position: "relative" }}
    >
      <Form.Label className="register-label">{props.label}</Form.Label>
      <div style={{ display: "flex", alignItems: "center", position: "relative" }}>
        {props.prefix && (
          <span
            style={{
              color: "#ffff",
              border: "3px solid rgba(70, 72, 79, 1)",
              borderRadius: "20px",
              padding: "8px",
              fontSize: "16px",
              marginRight: "10px",
            }}
          >
            {props.prefix}
          </span>
        )}
        <Form.Control
          as="textarea"
          rows={props.rows || 3}
          className="register-textbox"
          style={{
            ...props.stylee,
            flex: "1",
            textAlign: props.align,
            border: "none",
            boxShadow: "none", 
          }}
          value={props.value}
          onChange={props.onChange}
          disabled={props.disabled}
          placeholder={props.placeholder}
        />
        {props.id === "maincompletedescription" && (
          <span
            className="highlight-placeholder"
            style={{
              position: "absolute",
              top: "40%",
              left: "85px",
              transform: "translateY(-50%)",
              pointerEvents: "none",
              color: "#aaa",
              fontFamily: "Cairo",
            }}
          >
            البيانات التي  <span style={{ fontWeight: "bold", fontSize: "18px" }}>لا</span> تظهر في كارت الحالة
          </span>
        )}
      </div>
    </Form.Group>
  );
}

export default RegisterTextarea;
