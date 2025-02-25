import { Form, Tabs, Tab } from "react-bootstrap";
import "./CompletingData.css";
import RegisterTextbox from "../../components/RegisterTextBox";
import RegisterSelect from "../../components/RegisterSelect";
import UploadInput from "../../components/UploadInput";
import { useState } from "react";
import FlagSu from "../../saudi-arabia.png";
import CustomButton from "../../components/CustomButton";
import { useNavigate } from "react-router";

function CompletingData() {
  const [phonenumber, setPhonenumber] = useState("");
  const [name, setName] = useState("");
  const [city, setCity] = useState("");
  const [location, setLocation] = useState("");
  const [document, setDocument] = useState(null);
  const [phoneError, setPhoneError] = useState("");
  const [activeTab, setActiveTab] = useState("form1");
  const [representativeName, setRepresentativeName] = useState("");
  const [representativeEmail, setRepresentativeEmail] = useState("");
  const [representativePhone, setRepresentativePhone] = useState("");
  const [representativeAddress, setRepresentativeAddress] = useState("");
  const [emailError, setEmailError] = useState("");
  const [formError, setFormError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [address, setAddress] = useState("");
  const [addressError, setAddressError] = useState("");
  const navigate = useNavigate()


  const handleNext = () => {
    if (activeTab === "form1") {
      setActiveTab("form2");
    }
  };
  const handleAddressChange = (e) => {
    setAddress(e.target.value);
  };
  const handleBack = () => {
    if (activeTab === "form2") {
      setActiveTab("form1");
    }
  };

  const handleSubmit = (e) => {

    e.preventDefault();

    if (/[A-Z]/.test(representativeEmail)) {
      setEmailError("البريد الإلكتروني يجب أن يكون بدون أحرف كبيرة");
      setFormError("يرجى تصحيح الأخطاء قبل إرسال النموذج");
      return;
    } else {
      setEmailError("");
    }

    const phoneNumberLength = representativePhone.replace(/[^0-9]/g, "").length;
    if (phoneNumberLength !== 10) {
      setPhoneError("رقم الهاتف يجب أن يتكون من 10 أرقام فقط");
      setFormError("يرجى تصحيح الأخطاء قبل إرسال النموذج");
      return;
    }

    if (address.length === 0) {
      setAddressError("مطلوب ادخال العنوان");
      setFormError("يرجى تصحيح الأخطاء قبل إرسال النموذج");
      return;
    }

    setPhoneError("");
    setEmailError("");
    setFormError("");
    setAddressError("");
    setSuccessMessage("تم ارسال رسالة الي بريدك الالكتروني");

    setRepresentativeName("");
    setRepresentativeEmail("");
    setRepresentativePhone("");
    setRepresentativeAddress("");

    navigate('/datareview')

  };
  const handlePhoneChange = (e) => {
    const value = e.target.value;
    setRepresentativePhone(value);

    if (value.replace(/[^0-9]/g, "").length > 10) {
      setPhoneError("رقم الهاتف يجب أن يتكون من 10 أرقام فقط");
    } else {
      setPhoneError("");
    }
  };

  const handleEmailChange = (e) => {
    setRepresentativeEmail(e.target.value);
  };

  return (
    <div className="complete-form-conatiner">
      <h1 className="complete-title">استكمال بيانات الجمعية</h1>
      <Tabs
        id="completing-data-tabs"
        activeKey={activeTab}
        onSelect={(tab) => setActiveTab(tab)}
        className="mb-3 completeDatatabs"
      >
        <Tab eventKey="form1" title="1">
          <div className="complete-form">
            <div className="register-form-conatiner">
              <Form>
                <RegisterTextbox
                  id="representativeName"
                  label="اسم ممثل الجمعية"
                  value={representativeName}
                  onChange={(e) => setRepresentativeName(e.target.value)}
                  type="text"
                />
                <RegisterTextbox
                  id="representativeEmail"
                  label="البريد الالكتروني لممثل الجمعية"
                  value={representativeEmail}
                  onChange={handleEmailChange}
                  type="email"
                />
                {emailError && (
                  <div style={{ color: "red", fontSize: "12px" }}>
                    {emailError}
                  </div>
                )}
                <div style={{ direction: "ltr" }}>
                  <RegisterTextbox
                    id="representativePhone"
                    label="رقم جوال ممثل الجمعية"
                    value={representativePhone}
                    onChange={handlePhoneChange}
                    type="number"
                    prefix="+966"
                    flag={FlagSu}
                    align="left"
                  />
                </div>

                {phoneError && (
                  <div style={{ color: "red", fontSize: "12px" }}>
                    {phoneError}
                  </div>
                )}

                <RegisterTextbox
                  id="representativeAddress"
                  label="عنوان ممثل الجمعية"
                  value={representativeAddress}
                  onChange={(e) => setRepresentativeAddress(e.target.value)}
                  type="text"
                />
              </Form>
            </div>
          </div>
        </Tab>

        <Tab eventKey="form2" title="2">
          <div className="complete-form">
            {successMessage && (
              <div
                style={{
                  color: "#010101",
                  fontSize: "16px",
                  textAlign: "center",
                  background: "#83f2ff",
                  width: "45%",
                  margin: "auto",
                  padding: "2px",
                  borderRadius: "10px",
                  fontWeight: "600",
                }}
              >
                {successMessage}
              </div>
            )}
            <Form>
              <div className="complete-inputs">
                <RegisterTextbox
                  parentStyle={{ width: "45%" }}
                  id="name"
                  label="اسم الجمعية"
                  type="text"
                  stylee={{ width: "45%" }}
                  onChange={(e) => setName(e.target.value)}
                />
                <div style={{ direction: "ltr", width: "45%" }}>
                  <RegisterTextbox
                    parentStyle={{ width: "100%" }}
                    id="phonenumber"
                    label="رقم هاتف الجمعية"
                    type="text"
                    stylee={{ width: "45%" }}
                    prefix="+966"
                    flag={FlagSu}
                    onChange={(e) => setPhonenumber(e.target.value)}
                  />
                </div>
              </div>

              <div className="complete-inputs">
                <RegisterTextbox
                  parentStyle={{ width: "45%" }}
                  id="city"
                  label="المدينة"
                  type="text"
                  stylee={{ width: "45%" }}
                  onChange={(e) => setCity(e.target.value)}
                />
                <RegisterSelect
                  id="location"
                  label="المنطقة"
                  stylee={{ width: "45%" }}
                  parentStyle={{ width: "45%", marginBottom: "20px" }}
                  options={[
                    { value: "جدة", label: "جدة" },
                    { value: "الرياض", label: "الرياض" },
                    { value: "مكة", label: "مكة" },
                  ]}
                  onChange={(e) => setLocation(e.target.value)}
                />
              </div>
              <div className="complete-inputs">
                <RegisterTextbox
                  parentStyle={{ width: "45%" }}
                  id="enrollment"
                  label="رقم التسجيل"
                  type="num"
                  stylee={{ width: "45%" }}
                  onChange={(e) => setName(e.target.value)}
                />

                <RegisterSelect
                  id="specialization"
                  label="التخصص"
                  stylee={{ width: "45%" }}
                  parentStyle={{ width: "45%", marginBottom: "20px" }}
                  options={[
                    { value: "تخصص 1", label: "تخصص 1" },
                    { value: "تخصص 2", label: "تخصص 2" },
                  ]}
                  onChange={(e) => setLocation(e.target.value)}
                />
              </div>
              <div className="complete-inputs">
                <RegisterTextbox
                  parentStyle={{ width: "45%" }}
                  id="email"
                  label="البريد الإلكتروني"
                  type="email"
                  stylee={{ width: "45%" }}
                />
                <div style={{ direction: "ltr", width: "45%" }}>
                  <RegisterTextbox
                    parentStyle={{ width: "100%" }}
                    id="website"
                    label="الموقع الإلكتروني"
                    type="text"
                    stylee={{ width: "45%" }}
                  />
                </div>
              </div>

              <div className="complete-inputs">
                <RegisterTextbox
                  parentStyle={{ width: "45%" }}
                  id="address"
                  label="العنوان"
                  value={address}
                  onChange={handleAddressChange}
                  type="text"
                  stylee={{ width: "45%" }}
                />
              </div>

              <div
                className="complete-inputs complete-inputs2"
                style={{ direction: "rtl", marginTop: "2%" }}
              >
                <h4 className="complete-papers">الأوراق والمستندات المطلوبة</h4>
                <h6 className="complete-papers">1- شهادة تفويض الجمعية</h6>
                <h6 className="complete-papers">2- تفويض ممثل الجمعية</h6>
                <div style={{ display: "flex", gap: "20px" }}>
                  <UploadInput
                    id="documentUpload"
                    parentStyle={{ marginBottom: "20px" }}
                    onChange={(e) => setDocument(e.target.files[0])}
                    label="الاوراق"
                  />
                  <UploadInput
                    id="documentUpload"
                    parentStyle={{ marginBottom: "20px" }}
                    onChange={(e) => setDocument(e.target.files[0])}
                    label="Logo"
                  />
                </div>
                {phoneError && (
                  <div
                    className="phone-error"
                    style={{ color: "red", fontSize: "12px" }}
                  >
                    {phoneError}
                  </div>
                )}
                {addressError && (
                  <div style={{ color: "red", fontSize: "12px" }}>
                    {addressError}
                  </div>
                )}
              </div>

              <div style={{ direction: "ltr", width: "45%" }}></div>
            </Form>
          </div>
        </Tab>
      </Tabs>
      <div className="navigation-buttons">
        {activeTab === "form2" && (
          <CustomButton text="رجوع" onClick={handleBack} />
        )}
        {activeTab === "form1" && (
          <CustomButton text="التالي" onClick={handleNext} />
        )}
        {activeTab === "form2" && (
          <CustomButton text="إرسال" onClick={handleSubmit} />
        )}
      </div>
    </div>
  );
}

export default CompletingData;
