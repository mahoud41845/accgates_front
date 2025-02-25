import React from "react";
import Title from "../../components/title";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import "./CaseDate.css";
import RegisterTextarea from "../../components/RegisterTextarea";
import RegisterTextbox from "../../components/RegisterTextBox";
import UploadInput from "../../components/UploadInput";
import { Form } from "react-bootstrap";
import CustomButton from "../../components/CustomButton";

const CaseData = (props) => {
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <>
      <Title
        title="بيانات الحالة"
        icon={<FontAwesomeIcon icon={faPenToSquare} />}
      />

      <div className="caseDataImageCon"></div>

      <Form onSubmit={handleSubmit}>
        <div className="case-info">
          <RegisterTextarea
            id="completedescription"
            label="مسمي الحالة"
            parentStyle={{
              width: "20%",
              marginBottom: "20px",
            }}
            stylee={{
              height: "100px",
            }}
            rows={5}
            placeholder=""
            disabled={true}
          />
          <RegisterTextarea
            id="casetype"
            label="نوع الحالة"
            parentStyle={{
              width: "20%",
              marginBottom: "20px",
            }}
            stylee={{
              height: "100px",
            }}
            rows={5}
            placeholder=""
            disabled={true}
          />
          <RegisterTextarea
            id="casedesc"
            label="وصف الحالة"
            parentStyle={{
              width: "20%",
              marginBottom: "20px",
            }}
            stylee={{
              height: "100px",
            }}
            rows={5}
            placeholder=""
            disabled={true}
          />
          <RegisterTextarea
            id="totalbudget"
            label="مبلغ الدعم الكلي"
            parentStyle={{
              width: "20%",
              marginBottom: "20px",
            }}
            stylee={{
              height: "100px",
            }}
            rows={5}
            placeholder=""
            disabled={true}
          />
        </div>
        <div className="case-info">
          <RegisterTextbox
            parentStyle={{
              width: "20%",
            }}
            id="chname"
            label="اسم الجمعية"
            type="number"
            stylee={{
              width: "30%",
            }}
            disabled={true}
          />
          <RegisterTextbox
            parentStyle={{
              width: "20%",
            }}
            id="bankname"
            label="اسم البنك"
            type="number"
            stylee={{
              width: "30%",
            }}
          />
          <RegisterTextbox
            parentStyle={{
              width: "20%",
            }}
            id="iban"
            label="رقم IBAN"
            type="number"
            stylee={{
              width: "30%",
            }}
          />
        </div>

        <div className="uploadlogo">
          <UploadInput
            id="logoUpload"
            parentStyle={{
              marginBottom: "20px",
              display: "unset",
            }}
          />
          <p className="uoloadLogo-label">لوجو + اسم الجمعية</p>
          <CustomButton text="نسخ رابط الحالة" />
        </div>
      </Form>
    </>
  );
};

export default CaseData;
