import { Form } from "react-bootstrap";

function RegisterRadio(props) {
  return (
    <div className="mb-3">
      <Form.Check inline label={props.label} name="group1" type="radio" className="createManage-redio" value={props.label} onChange={props.onChange} />
    </div>
  );
}

export default RegisterRadio;
