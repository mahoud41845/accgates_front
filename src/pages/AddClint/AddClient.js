import { faPlusSquare } from "@fortawesome/free-solid-svg-icons";
import Title from "../../components/title";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import RegisterTextbox from "../../components/RegisterTextBox";
import CustomButton from "../../components/CustomButton";
import { useState } from "react";


function AddClient() {
  const [clientData, setClientData] = useState({
    name: "",
    phone: "",
    email: "",
    balance: 0, // Default value for balance
    description: "",
  });

  const [formMessage, setFormMessage] = useState(""); // State for form messages

   const handleInputChange = (e) => {
    const { id, value } = e.target;
    setClientData({
      ...clientData,
      [id]: value,
    });

     if (formMessage) {
      setFormMessage("");
    }
  };

   const handleSubmit = async (e) => {
    e.preventDefault();

    // Clear previous messages
    setFormMessage("");

     if (!clientData.name) {
      setFormMessage("اسم العميل هو حقل إلزامي.");
      return; // Stop form submission
    }

    // Retrieve the token from localStorage
    const authToken = localStorage.getItem("authToken");

    try {
      const response = await fetch("http://127.0.0.1:8000/api/customer/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify(clientData),
      });

      if (response.ok) {
         setFormMessage("تم إضافة العميل بنجاح.");
         setClientData({
          name: "",
          phone: "",
          email: "",
          balance: 0,
          description: "",
        });
      } else {
         setFormMessage("حدث خطأ أثناء إضافة العميل.");
      }
    } catch (error) {
      console.error("Error:", error);
      setFormMessage("حدث خطأ أثناء إرسال البيانات.");
    }
  };

  return (
    <>
      <Title
        title="إضافة عميل جديد"
        icon={<FontAwesomeIcon icon={faPlusSquare} />}
        style={{ width: "unset" }}
      />
      <div className="AddSupplier">
        <form className="input-AddSupplier" onSubmit={handleSubmit}>
          {/* Name (Mandatory) */}
          <RegisterTextbox
            parentStyle={{
              width: "30%",
            }}
            id="name"
            label="إسم العميل"
            type="text"
            value={clientData.name}
            onChange={handleInputChange}
            stylee={{
              width: "30%",
            }}
          />
          {/* Phone */}
          <RegisterTextbox
            parentStyle={{
              width: "30%",
            }}
            id="phone"
            label="رقم الهاتف"
            type="phone"
            value={clientData.phone}
            onChange={handleInputChange}
            stylee={{
              width: "30%",
            }}
          />
          {/* Email */}
          <RegisterTextbox
            parentStyle={{
              width: "30%",
            }}
            id="email"
            label="البريد الإلكتروني"
            type="email"
            value={clientData.email}
            onChange={handleInputChange}
            stylee={{
              width: "30%",
            }}
          />
          {/* Balance */}
          <RegisterTextbox
            parentStyle={{
              width: "30%",
            }}
            id="balance"
            label="الرصيد الافتتاحي"
            type="number"
            value={clientData.balance}
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
            value={clientData.description}
            onChange={handleInputChange}
            stylee={{
              width: "30%",
            }}
          />

           {formMessage && (
            <div
              style={{
                color: formMessage.includes("خطأ") ? "red" : "green",
                marginTop: "10px",
              }}
            >
              {formMessage}
            </div>
          )}

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

export default AddClient;
