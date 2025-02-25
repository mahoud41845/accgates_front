import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Title from "../../components/title";
import "./jobTitle.css";
import { faUsers } from "@fortawesome/free-solid-svg-icons";
import RegisterTextbox from "../../components/RegisterTextBox";
import { Form } from "react-bootstrap";
import CustomButton from "../../components/CustomButton";


function Jobtitle() {
    const handleSubmit = (e) => {
        e.preventDefault()        
    }
  return (
    <>
      <div className="jobtitle-container">
        <Title
          title="المسمي الوظيفي"
          icon={<FontAwesomeIcon icon={faUsers} />}
          style={{ width: "unset" }}
        />
        <Form className="jobTitle-form" onSubmit={handleSubmit}>
          <div className="jobTitle-inputs">
            <RegisterTextbox
              parentStyle={{
                width: "45%",
              }}
              id="name"
              label="اسم المسمي الوظيفي"
              type="text"
              stylee={{
                width: "30%",
              }}
            />{" "}
            <RegisterTextbox
              parentStyle={{
                width: "45%",
              }}
              id="jobDesc"
              label="وصف المسمي الوظيفي"
              type="text"
              stylee={{
                width: "30%",
              }}
            />{" "}
            <RegisterTextbox
              parentStyle={{
                width: "45%",
              }}
              id="vocadays"
              label="ملاحظات اخري"
              type="text"
              stylee={{
                width: "30%",
              }}
            />
            <CustomButton text="حفظ" />

          </div>
        </Form>
      </div>
    </>
  );
}

export default Jobtitle;
