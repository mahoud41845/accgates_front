import Title from "../../components/title";
import RegisterTextbox from "../../components/RegisterTextBox";
import CustomButton from "../../components/CustomButton";
import { Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { useState } from "react"; // Import useState for managing form inputs and errors
import "./VerifyEmail.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function VerifyEmail(props) {
    const navigate = useNavigate();
    const [email, setEmail] = useState(''); 
    const [verificationToken, setVerificationToken] = useState(''); 
    const [errorMessage, setErrorMessage] = useState(''); 

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage(''); 

        if (!email || !verificationToken) {
            setErrorMessage('يرجى ملء جميع الحقول'); 
            return;
        }

        try {
            const response = await fetch(`http://127.0.0.1:8000/api/verify?email=${email}&verification_token=${verificationToken}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            const data = await response.json(); 

            if (data.status === 200 && data.message === "Email successfully verified") {
                navigate("/home");
            } else {
                setErrorMessage('فشل التحقق: ' + data.message); 
            }
        } catch (error) {
            console.error("Verification error:", error);
            setErrorMessage("حدث خطأ أثناء التحقق");
        }
    };

    return (
        <>
            <div className="VerifyEmail-container">
                <Title
                    title="تأكيد تسجيل الدخول"
                    classname="VerifyEmailTitle"
                />
                <Form className="VerifyEmail-form" onSubmit={handleSubmit}>
                    <div className="VerifyEmail-inputs">
                        <RegisterTextbox
                            parentStyle={{
                                width: "45%",
                            }}
                            id="email"
                            label="البريد الالكتروني"
                            type="email"
                            value={email}
                            name="email"
                            onChange={(e) => setEmail(e.target.value)} // Bind email state to input
                            stylee={{
                                width: "30%",
                            }}
                        />
                        <RegisterTextbox
                            parentStyle={{
                                width: "45%",
                            }}
                            id="verificationToken"
                            label="رمز التحقق"
                            type="text"
                            name="verification_token"
                            value={verificationToken}
                            onChange={(e) => setVerificationToken(e.target.value)} // Bind verificationToken state
                            stylee={{
                                width: "30%",
                            }}
                        />
                        {errorMessage && (
                            <div style={{ color: 'red', fontSize: '14px', marginTop: '10px' }}>
                                {errorMessage}
                            </div>
                        )}
                        <CustomButton text="حفظ" />
                    </div>
                </Form>
            </div>
        </>
    );
}

export default VerifyEmail;
