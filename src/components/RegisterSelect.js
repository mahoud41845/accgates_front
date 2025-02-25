import { Form } from "react-bootstrap";
function RegisterSelect(props) {
  return (
    <Form.Group className="mb-3 responParent transdirec" controlId={props.id} style={{ ...props.parentStyle }}>
      <Form.Label className="register-label transdirec">{props.label}</Form.Label>
      <div style={{ display: "flex", alignItems: "center" }}>
        {props.prefix && (
          <span

            className="RegisterSelectSpan"
          >
            {props.prefix}
          </span>
        )}
        <Form.Select
          className="register-textbox transdirec"
          style={{
            ...props.stylee,
            flex: "1",
            textAlign: props.align,
          }}
          value={props.value}
          onChange={props.onChange}
          disabled={props.disabled}
        >
          {props.options.map((option, index) => (
            <option key={index} value={option.value} className="completeOptions transdirec">
              {option.label}
            </option>
          ))}
        </Form.Select>
      </div>
    </Form.Group>
  );
}

export default RegisterSelect;
