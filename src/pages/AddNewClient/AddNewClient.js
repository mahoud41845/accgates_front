import "./addnewclient.css";
import { useState } from "react";
import Title from "../../components/title";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserPlus } from "@fortawesome/free-solid-svg-icons";
import RegisterRadio from "../../components/Radio";
import RegisterTextbox from "../../components/RegisterTextBox";
import CustomButton from "../../components/CustomButton";
import { Form } from "react-bootstrap";
 
function AddNewClient() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [clientType, setClientType] = useState("عميل");

  const handlePhoneChange = (e) => {
    const value = e.target.value;
    setPhoneNumber(value);

    if (value.replace(/[^0-9]/g, "").length > 10) {
      setPhoneError("رقم الهاتف يجب أن يتكون من 10 أرقام فقط");
    } else {
      setPhoneError("");
    }
  };

  const handleClientTypeChange = (e) => {
    setClientType(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <>
      <div className="addnewclientContaner">
        <Title
          title="إضافة عميل جديد"
          icon={<FontAwesomeIcon icon={faUserPlus} />}
        />
        
        <Form className="addnewclientContanerForm">
          <div className="radioContainer">
            <h5>نوع العميل</h5>
            <div className="clientRadios">
              <RegisterRadio
                label="عميل"
                value="عميل"
                checked={clientType === "عميل"}
                onChange={handleClientTypeChange}
              />
              <RegisterRadio
                label="مورد"
                value="مورد"
                checked={clientType === "مورد"}
                onChange={handleClientTypeChange}
              />
            </div>
          </div>
          <div className="addClientsInputs">
            <RegisterTextbox
              parentStyle={{
                width: "40%",
              }}
              id="clientName"
              label={clientType === "عميل" ? "إسم العميل" : "إسم المورد"}
              type="text"
              stylee={{
                width: "30%",
              }}
            />
            <RegisterTextbox
              parentStyle={{
                width: "40%",
              }}
              id="phoneNum"
              label="رقم الجوال"
              type="number"
              value={phoneNumber}
              onChange={handlePhoneChange}
              stylee={{
                width: "30%",
              }}
            />
            {phoneError && (
              <div style={{ color: "red", fontSize: "12px" }}>{phoneError}</div>
            )}
          </div>
          <div className="addClientsInputs">
            <RegisterTextbox
              parentStyle={{
                width: "40%",
              }}
              id="clientAdd"
              label={clientType === "عميل" ? "عنوان العميل" : "عنوان المورد"}
              type="text"
              stylee={{
                width: "30%",
              }}
            />
            <RegisterTextbox
              parentStyle={{
                width: "40%",
              }}
              id="accountNum"
              label="رقم الحساب"
              type="number"
              stylee={{
                width: "30%",
              }}
            />
          </div>
          <div className="addClientsInputs">
            <RegisterTextbox
              parentStyle={{
                width: "40%",
              }}
              id="clientEmail"
              label={
                clientType === "عميل"
                  ? "البريد الإلكتروني للعميل"
                  : "البريد الإلكتروني للمورد"
              }
              type="email"
              stylee={{
                width: "30%",
              }}
            />
            <RegisterTextbox
              parentStyle={{
                width: "40%",
              }}
              id="openBud"
              label={clientType === "عميل" ? "الرصيد الإفتتاحي" : "بيانات أخرى"}
              type={clientType === "عميل" ? "number" : "text"}
              stylee={{
                width: "30%",
              }}
            />
          </div>
          <CustomButton
            text="حفظ"
            onClick={handleSubmit}
            className="addClientBtn"
          />
        </Form>
      </div>
    </>
  );
}

export default AddNewClient;
