import React, { useEffect, useState } from "react";
import "./addNewEmployee.css";
import { Form } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClipboardUser, faUserPlus } from "@fortawesome/free-solid-svg-icons";
import Title from "../../components/title";
import RegisterTextbox from "../../components/RegisterTextBox";
import UploadInput from "../../components/UploadInput";
import RegisterTextarea from "../../components/RegisterTextarea";
import RegisterSelect from "../../components/RegisterSelect";
import { useParams } from "react-router";
import CustomButton from "../../components/CustomButton";
import FlagSu from "../../saudi-arabia.png";

function AddNewEmployee() {
  const [activeTab, setActiveTab] = useState(0);
  const [test, settest] = useState("");
  const [errors, setErrors] = useState({});
  const [incomeTaxType, setIncomeTaxType] = useState("value");
  const { startingTab } = useParams();

  const shouldShowAllTabs = ["general", "job", "salary"].includes(startingTab);

  const [workDate, setWorkDate] = useState(null);
  const [dob, setDob] = useState(null);

  const handleWorkDateChange = (newValue) => {
    setWorkDate(newValue);
  };

  const handleDobChange = (newValue) => {
    setDob(newValue);
  };
  useEffect(() => {
    if (startingTab) {
      switch (startingTab) {
        case "general":
          setActiveTab(0);
          break;
        case "job":
          setActiveTab(1);
          break;
        case "salary":
          setActiveTab(2);
          break;
        default:
          setActiveTab(0);
      }
    }
  }, [startingTab]);

  const handleTabClick = (tabIndex) => {
    if (shouldShowAllTabs || tabIndex <= activeTab) {
      setActiveTab(tabIndex);
    }
  };

  const handleIncomeTaxTypeChange = (e) => {
    setIncomeTaxType(e.target.value);
  };

  const [salaryDetails, setSalaryDetails] = useState({
    mainBudget: "",
    incentives: "",
    extraSalary: "",
    healthInsurance: "",
    socialWelfare: "",
    incomeTax: "",
    transportationallowance: "",
    withdrawals: "",
    otherallowances: "",
    housingallowance: "",
  });

  const handleCardNumChange = (e) => {
    const { value } = e.target;
    if (value.length <= 10) {
      setSalaryDetails((prevState) => ({
        ...prevState,
        cardnum: value,
      }));
      setErrors((prevState) => ({ ...prevState, cardnum: "" }));
    } else {
      setErrors((prevState) => ({
        ...prevState,
        cardnum: "الرقم التعريفي لا يمكن أن يزيد عن 10 أرقام",
      }));
    }
  };

  const handleMobileNumChange = (e) => {
    const { value } = e.target;
    if (value.length <= 10) {
      setSalaryDetails((prevState) => ({
        ...prevState,
        mobnum: value,
      }));
      setErrors((prevState) => ({ ...prevState, mobnum: "" }));
    } else {
      setErrors((prevState) => ({
        ...prevState,
        mobnum: "رقم الجوال لا يمكن أن يزيد عن 10 أرقام",
      }));
    }
  };

  const calculateTotal = () => {
    const {
      mainBudget,
      incentives,
      extraSalary,
      healthInsurance,
      socialWelfare,
      incomeTax,
      withdrawals,
      transportationallowance,
      housingallowance,
      otherallowances,
    } = salaryDetails;

    let totalIncomeTax = 0;

    if (incomeTaxType === "percentage") {
      totalIncomeTax =
        (parseFloat(mainBudget) * (parseFloat(incomeTax) || 0)) / 100;
    } else {
      totalIncomeTax = parseFloat(incomeTax) || 0;
    }

    return (
      (parseFloat(mainBudget) || 0) +
      (parseFloat(incentives) || 0) +
      (parseFloat(transportationallowance) || 0) +
      (parseFloat(housingallowance) || 0) +
      (parseFloat(otherallowances) || 0) +
      (parseFloat(extraSalary) || 0) -
      (parseFloat(healthInsurance) || 0) -
      (parseFloat(socialWelfare) || 0) -
      (parseFloat(withdrawals) || 0) -
      totalIncomeTax
    ).toFixed(2);
  };

  const handleSalaryChange = (e) => {
    const { id, value } = e.target;
    setSalaryDetails((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  const handleNextTab = (e) => {
    e.preventDefault();

    const cardNum = salaryDetails.cardnum;
    const mobileNum = salaryDetails.mobnum;

    if (cardNum && cardNum.length !== 10) {
      setErrors((prevState) => ({
        ...prevState,
        cardnum: "رقم الهوية يجب ان يكون 10 أرقام",
      }));
      return;
    } else {
      setErrors((prevState) => ({ ...prevState, cardnum: "" }));
    }

    if (mobileNum && mobileNum.length !== 10) {
      setErrors((prevState) => ({
        ...prevState,
        mobnum: "رقم الجوال يجب ان يكون 10 أرقام",
      }));
      return;
    } else {
      setErrors((prevState) => ({ ...prevState, mobnum: "" }));
    }

    if (activeTab < 2) {
      setActiveTab(activeTab + 1);
    }
  };

  return (
    <div className="addnewemployee">
      <div className="addnewemployee-tabs">
        <div
          className={`addemp-tab ${activeTab === 0 ? "active" : ""}`}
          onClick={() => handleTabClick(0)}
        >
          1
        </div>
        <div
          className={`addemp-tab ${activeTab === 1 ? "active" : ""}`}
          onClick={() => handleTabClick(1)}
        >
          2
        </div>
        <div
          className={`addemp-tab ${activeTab === 2 ? "active" : ""}`}
          onClick={() => handleTabClick(2)}
        >
          3
        </div>
        <hr className="addHr" />
      </div>

      <div className="addnewemployee-content">
        {activeTab === 0 && (
          <Form onSubmit={handleNextTab}>
            <div className="addempTitle">
              Addasubaccount{" "}
              <div className="addnewemployee-form1">
                <div className="addnewemployee-sec1">
                  <RegisterTextbox
                    parentStyle={{
                      width: "80%",
                    }}
                    id="empname"
                    label="إسم الموظف"
                    type="text"
                    stylee={{
                      width: "55%",
                    }}
                  />{" "}
                  <RegisterTextbox
                    parentStyle={{
                      width: "80%",
                    }}
                    id="dob"
                    label="تاريخ الميلاد"
                    type="date"
                    value={dob}
                    onChange={handleDobChange}
                    stylee={{
                      width: "55%",
                    }}
                  />
                  <RegisterTextbox
                    parentStyle={{
                      width: "80%",
                      direction: "ltr",
                    }}
                    id="mobnum"
                    label="رقم الجوال"
                    type="number"
                    stylee={{
                      width: "55%",
                    }}
                    value={salaryDetails.mobnum}
                    onChange={handleMobileNumChange}
                    onBlur={(e) => {
                      if (e.target.value.length !== 10) {
                        setErrors((prevState) => ({
                          ...prevState,
                          mobnum: "رقم الجوال يجب ان يكون 10 أرقام",
                        }));
                      } else {
                        setErrors((prevState) => ({
                          ...prevState,
                          mobnum: "",
                        }));
                      }
                    }}
                    prefix="+966"
                    flag={FlagSu}
                  />
                  {errors.mobnum && (
                    <div style={{ color: "red", fontSize: "0.8em" }}>
                      {errors.mobnum}
                    </div>
                  )}
                  <RegisterTextbox
                    parentStyle={{
                      width: "80%",
                    }}
                    id="mobnum"
                    label="رقم IBAN"
                    type="number"
                    stylee={{
                      width: "55%",
                    }}
                  />
                </div>
                <div className="addnewemployee-sec1">
                  <RegisterTextbox
                    parentStyle={{
                      width: "80%",
                    }}
                    id="cardnum"
                    isDropdown={true}
                    labelOptions={[
                      { label: `اختر الرقم التعريفي`, value: "" },
                      { label: "رقم الهوية", value: "رقم الهوية" },
                      { label: "رقم الإقامة", value: "رقم الإقامة" },
                    ]}
                    type="number"
                    stylee={{
                      width: "55%",
                    }}
                    value={salaryDetails.cardnum}
                    onChange={handleCardNumChange}
                    onBlur={(e) => {
                      if (e.target.value.length !== 10) {
                        setErrors((prevState) => ({
                          ...prevState,
                          cardnum: "رقم الهوية يجب ان يكون 10 أرقام",
                        }));
                      } else {
                        setErrors((prevState) => ({
                          ...prevState,
                          cardnum: "",
                        }));
                      }
                    }}
                  />
                  {errors.cardnum && (
                    <div style={{ color: "red", fontSize: "0.8em" }}>
                      {errors.cardnum}
                    </div>
                  )}
                  <RegisterTextbox
                    parentStyle={{
                      width: "80%",
                    }}
                    id="address"
                    label="العنوان"
                    type="text"
                    stylee={{
                      width: "55%",
                    }}
                  />{" "}
                  <RegisterTextbox
                    parentStyle={{
                      width: "80%",
                    }}
                    id="empemail"
                    label="البريد الإلكتروني"
                    type="email"
                    stylee={{
                      width: "55%",
                    }}
                  />{" "}
                  <RegisterTextbox
                    parentStyle={{
                      width: "80%",
                    }}
                    id="empname"
                    label="الجنسية"
                    type="text"
                    stylee={{
                      width: "55%",
                    }}
                  />{" "}
                </div>
              </div>
              <div className="addnewemployee-sec2">
                <UploadInput
                  id="empdocumentUpload"
                  parentStyle={{
                    marginBottom: "20px",
                    display: "flex",
                    alignItems: "center",
                  }}
                  label="رفع صورة"
                />
                <UploadInput
                  id="carddocumentUpload"
                  parentStyle={{
                    marginBottom: "20px",
                    display: "flex",
                    alignItems: "center",
                  }}
                  label="رفع صورة الهوية"
                />
                <UploadInput
                  id="cvdocumentUpload"
                  parentStyle={{
                    marginBottom: "20px",
                    display: "flex",
                    alignItems: "center",
                  }}
                  label="رفع السيرة الذاتية"
                />
                <UploadInput
                  id="otherdocumentUpload"
                  parentStyle={{
                    marginBottom: "20px",
                    display: "flex",
                    alignItems: "center",
                  }}
                  label="رفع بيانات اخري"
                />
              </div>
            </div>
            <div className="addnewemployee-btnCon">
              <CustomButton text="حفظ" />
            </div>
          </Form>
        )}
        {activeTab === 1 && (
          <Form onSubmit={handleNextTab}>
            <div className="addempTitle">
              <Title
                title="بيانات الوظيفة"
                className="marketingtitle"
                icon={<FontAwesomeIcon icon={faUserPlus} />}
              />{" "}
              <div className="addnewemployee-form1">
                <div className="addnewemployee-sec1">
                  <RegisterTextbox
                    parentStyle={{
                      width: "80%",
                    }}
                    id="workdays"
                    label="عدد ايام العمل"
                    type="number"
                    stylee={{
                      width: "55%",
                    }}
                    value={salaryDetails.workdays}
                    onChange={(e) => {
                      const value = e.target.value;
                      setSalaryDetails((prevState) => ({
                        ...prevState,
                        workdays: value,
                      }));

                      if (value <= 7) {
                        setErrors((prevState) => ({
                          ...prevState,
                          workdays: "",
                        }));
                      }
                    }}
                    onBlur={(e) => {
                      if (parseInt(e.target.value) > 7) {
                        setErrors((prevState) => ({
                          ...prevState,
                          workdays: "عدد ايام العمل لا يمكن ان يزيد عن 7 أيام",
                        }));
                      } else {
                        setErrors((prevState) => ({
                          ...prevState,
                          workdays: "",
                        }));
                      }
                    }}
                  />
                  {errors.workdays && (
                    <div style={{ color: "red", fontSize: "0.8em" }}>
                      {errors.workdays}
                    </div>
                  )}
                  <RegisterTextbox
                    parentStyle={{
                      width: "80%",
                    }}
                    id="workhours"
                    label="ساعات العمل"
                    type="number"
                    stylee={{
                      width: "55%",
                    }}
                  />{" "}
                </div>
                <div className="addnewemployee-sec1">
                  <RegisterTextbox
                    parentStyle={{
                      width: "80%",
                    }}
                    id="workdate"
                    label="تاريخ الإلتحاق بالعمل"
                    type="date"
                    value={workDate}
                    onChange={handleWorkDateChange}
                    stylee={{
                      width: "55%",
                    }}
                  />
                  <RegisterSelect
                    id="jobtitle"
                    label="المسمي الوظيفي"
                    stylee={{ width: "55%" }}
                    parentStyle={{ width: "80%" }}
                    options={[
                      { value: "مدير", label: "مدير" },
                      { value: "عامل", label: "عامل" },
                      { value: "مصمم", label: "مصمم" },
                    ]}
                  />
                </div>
              </div>
              <div className="addnewemployee-sec3">
                <RegisterTextarea
                  id="Investigations"
                  label="التحقيقات والملاحظات"
                  parentStyle={{
                    width: "90%",
                    marginBottom: "20px",
                    direction: "rtl",
                  }}
                  stylee={{
                    height: "100px",
                  }}
                  rows={5}
                />
              </div>
            </div>
            <div className="addnewemployee-btnCon">
              <CustomButton text="حفظ" />
            </div>
          </Form>
        )}
        {activeTab === 2 && (
          <Form onSubmit={handleNextTab}>
            <div className="addempTitle">
              <Title
                title="راتب الموظف"
                className="marketingtitle"
                icon={<FontAwesomeIcon icon={faClipboardUser} />}
              />{" "}
              <div className="addnewemployee-form1">
                <div className="addnewemployee-sec1">
                  <RegisterTextbox
                    parentStyle={{ width: "80%" }}
                    id="mainBudget"
                    label="الراتب الأساسي"
                    type="number"
                    value={salaryDetails.mainBudget}
                    onChange={handleSalaryChange}
                    stylee={{ width: "55%" }}
                  />{" "}
                  <RegisterTextbox
                    parentStyle={{ width: "80%" }}
                    id="incentives"
                    label="الحوافز"
                    type="number"
                    value={salaryDetails.incentives}
                    onChange={handleSalaryChange}
                    stylee={{ width: "55%" }}
                  />{" "}
                  <RegisterTextbox
                    parentStyle={{ width: "80%" }}
                    id="healthInsurance"
                    label="التأمين الصحي"
                    type="number"
                    value={salaryDetails.healthInsurance}
                    onChange={handleSalaryChange}
                    stylee={{ width: "55%" }}
                  />{" "}
                  <RegisterTextbox
                    parentStyle={{ width: "80%" }}
                    id="housingallowance"
                    label="بدل سكن"
                    type="number"
                    value={salaryDetails.housingallowance}
                    onChange={handleSalaryChange}
                    stylee={{ width: "55%" }}
                  />{" "}
                  <RegisterTextbox
                    parentStyle={{ width: "80%" }}
                    id="otherallowances"
                    label="بدلات اخري"
                    type="number"
                    value={salaryDetails.otherallowances}
                    onChange={handleSalaryChange}
                    stylee={{ width: "55%" }}
                  />{" "}
                </div>
                <div className="addnewemployee-sec1">
                  <RegisterTextbox
                    parentStyle={{ width: "80%" }}
                    id="extraSalary"
                    label="الراتب الإضافي"
                    type="number"
                    value={salaryDetails.extraSalary}
                    onChange={handleSalaryChange}
                    stylee={{ width: "55%" }}
                  />{" "}
                  <RegisterTextbox
                    parentStyle={{ width: "80%" }}
                    id="socialWelfare"
                    label="التأمين الاجتماعي"
                    type="number"
                    value={salaryDetails.socialWelfare}
                    onChange={handleSalaryChange}
                    stylee={{ width: "55%" }}
                  />{" "}
                  <div className="taxContainer">
                    <RegisterSelect
                      id="incomeTaxType"
                      label="نوع ضريبة الدخل"
                      stylee={{ width: "55%" }}
                      parentStyle={{ width: "35%" }}
                      options={[
                        { value: "value", label: "قيمة ثابتة" },
                        { value: "percentage", label: "نسبة مئوية" },
                      ]}
                      value={incomeTaxType}
                      onChange={handleIncomeTaxTypeChange}
                    />
                    {incomeTaxType === "percentage" ? (
                      <RegisterTextbox
                        parentStyle={{ width: "35%" }}
                        id="incomeTax"
                        label="نسبة ضريبة الدخل"
                        type="number"
                        value={salaryDetails.incomeTax}
                        onChange={handleSalaryChange}
                        stylee={{ width: "55%" }}
                      />
                    ) : (
                      <RegisterTextbox
                        parentStyle={{ width: "35%" }}
                        id="incomeTax"
                        label="قيمة ضريبة الدخل"
                        type="number"
                        value={salaryDetails.incomeTax}
                        onChange={handleSalaryChange}
                        stylee={{ width: "55%" }}
                      />
                    )}
                  </div>
                  <RegisterTextbox
                    parentStyle={{ width: "80%" }}
                    id="transportationallowance"
                    label="بدل مواصلات"
                    type="number"
                    value={salaryDetails.transportationallowance}
                    onChange={handleSalaryChange}
                    stylee={{ width: "55%" }}
                  />{" "}
                  <RegisterTextbox
                    parentStyle={{ width: "80%" }}
                    id="withdrawals"
                    label="مسحوبات"
                    type="number"
                    value={salaryDetails.withdrawals}
                    onChange={handleSalaryChange}
                    disabled={true}
                    stylee={{ width: "55%" }}
                  />{" "}
                </div>
              </div>
              <div className="addnewemployee-sec3">
                <RegisterTextbox
                  parentStyle={{ width: "15%" }}
                  id="totalBudget"
                  label="الإجمالي"
                  type="number"
                  value={calculateTotal()}
                  disabled={true}
                  stylee={{ width: "55%" }}
                />{" "}
              </div>
            </div>
            <div className="addnewemployee-btnCon">
              <CustomButton text="حفظ" />
            </div>
          </Form>
        )}
      </div>
    </div>
  );
}

export default AddNewEmployee;
