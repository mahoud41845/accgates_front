import { faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CustomButton from "../../components/CustomButton";
import Title from "../../components/title";
import './appreg.css';
import RegisterTextbox from "../../components/RegisterTextBox";
import { Form, Alert } from "react-bootstrap";
import UploadInput from "../../components/UploadInput";
import Spinner from "react-bootstrap/Spinner"; 
import { useState } from "react";
import axios from "axios"; 
import { useNavigate } from "react-router-dom"; 
import { Link } from "react-router-dom";
function AppRegister(props) {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [image, setImage] = useState(null); 
  const [passwordError, setPasswordError] = useState("");
  const [loading, setLoading] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate(); 


  const handleSubmit = async (e) => {
      e.preventDefault();
  
      setPasswordError("");
      setConfirmPasswordError("");
      setErrorMessage("");
  
      if (!name || !email || !password || !confirmPassword || !image) {
          setErrorMessage("الرجاء تعبئة جميع الحقول المطلوبة");
          return;
      }
  
      if (password !== confirmPassword) {
          setConfirmPasswordError("كلمة المرور وتأكيد كلمة المرور لا يتطابقان");
          return;
      }
  
      if (password.length < 6) {
          setPasswordError("يجب أن تكون كلمة المرور مكونة من 6 أحرف على الأقل");
          return;
      }
  
      setLoading(true);
  
      try {
          const formData = new FormData();
          formData.append("name", name);
          formData.append("email", email);
          formData.append("password", password);
          formData.append("password_confirmation", confirmPassword);
          formData.append("image", image);
  
          const response = await axios.post("http://127.0.0.1:8000/api/register", formData, {
              headers: { "Content-Type": "multipart/form-data" },
          });
  
          if (response.status === 201) {
              navigate("/verifiyemail"); 
          }
      } catch (error) {
          if (error.response && error.response.data) {
              setErrorMessage(error.response.data.message || "حدث خطأ أثناء التسجيل");
          } else {
              setErrorMessage("حدث خطأ أثناء الاتصال بالخادم");
          }
      } finally {
          setLoading(false);
      }
  };
  

  return (
    <>
        {loading && (
            <div className="preloader">
                <Spinner animation="border" variant="primary" />
            </div>
        )}
        <div className="AppRegister-container">
            <Title
                title="انشاء حساب"
                classname="registrarTitle"
                icon={<FontAwesomeIcon icon={faUserPlus} />}
            />

            <Form className="regster-form" onSubmit={handleSubmit}>
                <div className="regstrer-inputs">
                    <RegisterTextbox
                        parentStyle={{ width: "45%" }}
                        id="name"
                        label="الاسم"
                        type="text"
                        name="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        stylee={{ width: "30%" }}
                    />
                    <RegisterTextbox
                        parentStyle={{ width: "45%" }}
                        id="jobDesc"
                        label="البريد الالكتروني"
                        type="text"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        stylee={{ width: "30%" }}
                    />
                    <RegisterTextbox
                        parentStyle={{ width: "45%" }}
                        id="vocadays"
                        label="كلمة المرور"
                        type="password"
                        name="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        stylee={{ width: "30%" }}
                    />
                    {passwordError && (
                        <div style={{ color: "red", fontSize: "12px", marginTop: "5px" }}>
                            {passwordError}
                        </div>
                    )}
                    <RegisterTextbox
                        parentStyle={{ width: "45%" }}
                        id="vocadaysConfirm"
                        label="تاكيد كلمة المرور"
                        type="password"
                        name="password_conformation"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        stylee={{ width: "30%" }}
                    />
                    {confirmPasswordError && (
                        <div style={{ color: "red", fontSize: "12px", marginTop: "5px" }}>
                            {confirmPasswordError}
                        </div>
                    )}
                    <UploadInput
                        id="documentUpload"
                        name="image"
                        parentStyle={{ marginBottom: "20px" }}
                        label="الصورة الشخصيه"
                        onChange={(e) => setImage(e.target.files[0])}
                    />
                    {errorMessage && (
                        <Alert variant="danger" style={{ marginTop: "10px" }}>
                            {errorMessage}
                        </Alert>
                    )}
                    <CustomButton className="appregBtn" text="حفظ" />
                </div>
            </Form>
            <Link 
                to="/login" 
                className="link-btn"
              >
    هل لديك حساب بالفعل
</Link>
        </div>
    </>
);

}

export default AppRegister;
