import Title from "../../components/title";
import RegisterTextbox from "../../components/RegisterTextBox";
import "./statementOfAccount.css";
import CustomButton from "../../components/CustomButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileInvoice } from "@fortawesome/free-solid-svg-icons";

function StatementOfAccount() {
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <>
      <div className="statementofaccount">
        <Title title="كشف الحساب" className="marketingtitle" icon={<FontAwesomeIcon icon={faFileInvoice} />} />
        <div className="statementofaccountForm">
          <RegisterTextbox
            parentStyle={{ width: "45%" }}
            id="clientName"
            label="إسم العميل"
            type="date"
            stylee={{ width: "45%" }}
            
          />

          <RegisterTextbox
            parentStyle={{ width: "45%" }}
            id="clientName"
            label="كود العميل"
            type="number"
            stylee={{ width: "45%" }}
          />

          <RegisterTextbox
            parentStyle={{ width: "45%" }}
            id="clientName"
            label="الرصيد الحالي"
            type="number"
            stylee={{ width: "45%" }}
          />

          <CustomButton
            text="حفظ"
            onClick={handleSubmit}
            className="addClientBtn"
          />
        </div>
      </div>
    </>
  );
}

export default StatementOfAccount;
