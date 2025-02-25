import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Title from "../../components/title";
import { faHand } from "@fortawesome/free-solid-svg-icons";
import RegisterSelect from "../../components/RegisterSelect";
import RegisterTextbox from "../../components/RegisterTextBox";
import { Form } from "react-bootstrap";
import "./VacationRequest.css";
import CustomButton from "../../components/CustomButton";

function VacationRequest() {
  const handleSibmit = (e) => {
    e.preventDefault()
  }
  return (
    <>
      <div className="vacationRequest-container">
        <Title
          title="طلب اجازة"
          className="marketingtitle"
          icon={<FontAwesomeIcon icon={faHand} />}
        />
        <Form onSubmit={handleSibmit}>
          <div className="vacationInputs">
            <RegisterSelect
              id="empName"
              label="إسم الموظف"
              stylee={{ width: "45%" }}
              parentStyle={{ width: "45%", marginBottom: "20px" }}
              options={[
                { value: "موظف1", label: "موظف 1" },
                { value: "موظف2", label: "موظف 2" },
                { value: "موظف3", label: "موظف 3" },
              ]}
            />
            
            <RegisterSelect
              id="vacType"
              label="نوع الإجازة"
              stylee={{ width: "45%" }}
              parentStyle={{ width: "45%", marginBottom: "20px" }}
              options={[
                { value: "اجازة1", label: "اجازة 1" },
                { value: "اجازة2", label: "اجازة 2" },
                { value: "اجازة3", label: "اجازة 3" },
              ]}
            />


            

            <RegisterTextbox
              parentStyle={{ width: "45%" }}
              id="vacDescription"
              label="وصف الإجازة"
              type="text"
              stylee={{ width: "45%" }}
            />
            <div className="vaca-times">
              <RegisterTextbox
                parentStyle={{
                  width: "20%",
                }}
                id="leaveTimer"
                label="من"
                type="date"
                stylee={{
                  width: "55%",
                }}
              />
              <RegisterTextbox
                parentStyle={{
                  width: "20%",
                }}
                id="arrivalTimer"
                label="الي"
                type="date"
                stylee={{
                  width: "55%",
                }}
              />
            </div>
            <CustomButton text="حفظ" />
          </div>
        </Form>
      </div>
    </>
  );
}

export default VacationRequest;
