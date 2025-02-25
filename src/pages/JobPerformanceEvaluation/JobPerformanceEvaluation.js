import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Title from "../../components/title";
import "./jobPerformanceEvaluation.css";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import RegisterTextbox from "../../components/RegisterTextBox";
import { Form } from "react-bootstrap";
import RegisterSelect from "../../components/RegisterSelect";
import { useState } from "react"; 
import CustomButton from "../../components/CustomButton";
import { useNavigate } from "react-router";

function JobPerformanceEvaluation() {
  const [reviewGoal, setReviewGoal] = useState("");
  const [idNumber, setIdNumber] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault();

    const idNumberPattern = /^\d{10}$/;
    if (!idNumberPattern.test(idNumber)) {
      setError("رقم الهوية يجب أن يتكون من 10 أرقام.");
      return;
    }

    setError("");

    navigate('/kpievaluation')
  };

  const handleReviewGoalChange = (e) => {
    setReviewGoal(e.target.value);
  };

  const handleIdNumberChange = (e) => {
    setIdNumber(e.target.value);
  };

  return (
    <>
      <div className="JobPerformanceEvaluation">
        <Title
          title="نموذج تقييم الاداء الوظيفي"
          icon={<FontAwesomeIcon icon={faCheck} />}
          style={{ width: "unset" }}
        />
        <Form
          className="JobPerformanceEvaluation-inputsCon"
          onSubmit={handleSubmit}
        >
          <div className="JobPerformanceEvaluation-inputs">
            <RegisterTextbox
              parentStyle={{
                width: "30%",
              }}
              id="formdata"
              label="تاريخ النموذج"
              type="date"
              stylee={{
                width: "50%",
              }}
            />
            <RegisterTextbox
              parentStyle={{
                width: "30%",
              }}
              id="kpinum"
              label="رقم المرجع"
              type="number"
              stylee={{
                width: "50%",
              }}
            />
            <RegisterTextbox
              parentStyle={{
                width: "30%",
              }}
              id="evaluationtime"
              label="فترة التقييم"
              type="text"
              stylee={{
                width: "50%",
              }}
            />
          </div>
          <div className="JobPerformanceEvaluation-inputs">
            <RegisterTextbox
              parentStyle={{
                width: "30%",
              }}
              id="empname"
              label="إسم الموظف"
              type="text"
              stylee={{
                width: "50%",
              }}
            />
            <RegisterTextbox
              parentStyle={{
                width: "30%",
              }}
              id="jobnum"
              label="الرقم الوظيفي"
              type="number"
              stylee={{
                width: "50%",
              }}
            />
            <RegisterTextbox
              parentStyle={{
                width: "30%",
              }}
              id="idnunm"
              label="رقم الهوية"
              type="number"
              stylee={{
                width: "50%",
              }}
              value={idNumber}
              onChange={handleIdNumberChange}
            />
          </div>
          <div className="JobPerformanceEvaluation-inputs">
            <RegisterTextbox
              parentStyle={{
                width: "30%",
              }}
              id="management"
              label="الإدارة"
              type="text"
              stylee={{
                width: "50%",
              }}
            />
            <RegisterTextbox
              parentStyle={{
                width: "30%",
              }}
              id="department"
              label="القسم"
              type="text"
              stylee={{
                width: "50%",
              }}
            />
            <RegisterTextbox
              parentStyle={{
                width: "30%",
              }}
              id="emprname"
              label="اسم المسؤول"
              type="text"
              stylee={{
                width: "50%",
              }}
            />
          </div>
          <div className="JobPerformanceEvaluation-inputs">
            <RegisterSelect
              id="reviewgoal"
              stylee={{
                width: "45% !important",
              }}
              parentStyle={{
                width: "20%",
                marginBottom: "20px",
              }}
              options={[
                { value: "", label: "اختر الهدف من التقييم" },
                { value: "تقييم دوري", label: "تقييم دوري" },
                { value: "فترة تجربة", label: "فترة تجربة" },
                { value: "ترقية", label: "ترقية" },
                { value: "علاوة", label: "علاوة" },
                { value: "اخري", label: "اخري" },
              ]}
              value={reviewGoal}
              onChange={handleReviewGoalChange}
            />

            <RegisterSelect
              id="reviewtype"
              stylee={{
                width: "45% !important",
              }}
              parentStyle={{
                width: "20%",
                marginBottom: "20px",
              }}
              options={[
                { value: "", label: "إختر نوع التقييم" },
                { value: "تقييم الموظف", label: "تقييم الموظف" },
                {
                  value: "تقييم الرئيس المباشر",
                  label: "تقييم الرئيس المباشر",
                },
              ]}
            />
          </div>
          <div className="JobPerformanceEvaluation-inputs">
            {reviewGoal === "اخري" && (
              <RegisterTextbox
                parentStyle={{
                  width: "20%",
                }}
                id="otherreviewgoal"
                label="الهدف من التقييم"
                type="text"
                stylee={{
                  width: "50%",
                }}
              />
            )}
          </div>
          {error && <div style={{ color: "red", marginBottom:"20px" }}>{error}</div>}{" "}
          <CustomButton text="التالي" />
        </Form>
      </div>
    </>
  );
}

export default JobPerformanceEvaluation;
