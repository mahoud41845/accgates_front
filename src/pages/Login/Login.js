import { Container, Form, Button } from "react-bootstrap";
import Logo from "../../logo-dark.svg";
import { Link, useNavigate } from "react-router-dom";
import "./login.css";
import { useState } from "react";

function Login(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [emailError, setEmailError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    // Reset errors
    setPasswordError("");
    setEmailError("");

    if (!email) {
      setEmailError("البريد الإلكتروني مطلوب");
      return;
    }

    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailRegex.test(email)) {
      setEmailError("البريد الإلكتروني غير صالح");
      return;
    }

    if (password.length <= 8) {
      setPasswordError("كلمة المرور يجب أن تكون أكثر من 8 أحرف");
      return;
    }

    try {
      console.log("Logging in...");

      const response = await fetch("http://127.0.0.1:8000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });

      const data = await response.json();

       if (data.status === 200 && data.message === "تم تسجيل الدخول بنجاح") {
         localStorage.setItem("authToken", data.data.token);
         console.log(data.data.token);

         navigate("/home");
       } else {
         alert("فشل تسجيل الدخول: " + data.message);
       }
    } catch (error) {
      console.error("Login error:", error);
      alert("حدث خطأ أثناء تسجيل الدخول");
    }
  };

  return (
    <Container>
      <div className="login-container">
        <div className="login-section1">
          <div className="login-title">
            <h2>تسجيل الدخول</h2>
          </div>
        </div>
        <div>
          <img
            src="https://gratisography.com/wp-content/uploads/2024/10/gratisography-cool-cat-800x525.jpg"
            alt="Placeholder"
            width="150px"
          />
        </div>
        <div className="login-section2">
          <Form className="login-form" onSubmit={handleLogin}>
            <Form.Group className="mb-3 loginres" controlId="formBasicEmail">
              <Form.Control
                className="login-input"
                type="email"
                placeholder="البريد الإلكتروني"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                name="email"
              />
              {emailError && (
                <div
                  style={{ color: "red", fontSize: "12px", marginTop: "5px" }}
                >
                  {emailError}
                </div>
              )}
            </Form.Group>

            <Form.Group className="mb-3 loginres" controlId="formBasicPassword">
              <Form.Control
                className="login-input"
                type="password"
                placeholder="كلمة المرور"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                name="password"
              />
              {passwordError && (
                <div
                  style={{ color: "red", fontSize: "12px", marginTop: "5px" }}
                >
                  {passwordError}
                </div>
              )}
              <Link to="/verifiyemail" className="forget-pass">
                نسيت كلمة المرور ؟
              </Link>
            </Form.Group>

            <Button type="submit" className="login-sub">
              تسجيل الدخول
            </Button>
          </Form>
          <div className="login-sub">
            <Link to="/AppRegister" className="new-acc">
              إنشاء حساب جديد
            </Link>
          </div>
        </div>
      </div>
    </Container>
  );
}

export default Login;
