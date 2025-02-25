import { faPlaneSlash, faPlusSquare } from "@fortawesome/free-solid-svg-icons";
import Title from "../../components/title";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./AddSupplier.css";
import RegisterTextbox from "../../components/RegisterTextBox";
import CustomButton from "../../components/CustomButton";
import { useState } from "react";
import { useTranslation } from "react-i18next";

function AddSupplier() {
  const { t } = useTranslation(); 

  const [supplierData, setSupplierData] = useState({
    name: "",
    phone: "",
    email: "",
    balance: "",
    description: "",
  });

   const handleInputChange = (e) => {
    const { id, value } = e.target;
    setSupplierData({
      ...supplierData,
      [id]: value,
    });
  };

   const handleSubmit = async (e) => {
    e.preventDefault();

     const authToken = localStorage.getItem("authToken");

 
    try {
      const response = await fetch("http://127.0.0.1:8000/api/supplier/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`, 
        },
        body: JSON.stringify(supplierData),
      });

      if (response.ok) {
         alert("مورد جديد تم إضافته بنجاح");
      } else {
         const data = await response.json();
        alert(`حدث خطأ أثناء إضافة المورد: ${data.message}`);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("حدث خطأ أثناء إرسال البيانات");
    }
  };

  return (
    <>
      <Title
        title="إضافة مورد جديد"
        icon={<FontAwesomeIcon icon={faPlusSquare} />}
        style={{ width: "unset" }}
      />
      <div className="AddSupplier">
        <form className="input-AddSupplier" onSubmit={handleSubmit}>
          <RegisterTextbox
            parentStyle={{
              width: "30%",
            }}
            id="name"
            label="إسم المورد"
            type="text"
            value={supplierData.name}
            onChange={handleInputChange}
            stylee={{
              width: "30%",
            }}
          />
          <RegisterTextbox
            parentStyle={{
              width: "30%",
            }}
            id="phone"
            label="رقم الهاتف"
            type="phone"
            value={supplierData.phone}
            onChange={handleInputChange}
            stylee={{
              width: "30%",
            }}
          />
          <RegisterTextbox
            parentStyle={{
              width: "30%",
            }}
            id="email"
            label="البريد الإلكتروني"
            type="email"
            value={supplierData.email}
            onChange={handleInputChange}
            stylee={{
              width: "30%",
            }}
          />
          <RegisterTextbox
            parentStyle={{
              width: "30%",
            }}
            id="balance"
            label="الرصيد الافتتاحي"
            type="number"
            value={supplierData.balance}
            onChange={handleInputChange}
            stylee={{
              width: "30%",
            }}
          />
          <RegisterTextbox
            parentStyle={{
              width: "30%",
            }}
            id="description"
            label="الوصف"
            type="text"
            value={supplierData.description}
            onChange={handleInputChange}
            stylee={{
              width: "30%",
            }}
          />
          <div className="addclint-Button-con">
            <CustomButton
              className="addclint-Button"
              text="حفظ"
              type="submit"
            />
          </div>
        </form>
      </div>
    </>
  );
}

export default AddSupplier;
