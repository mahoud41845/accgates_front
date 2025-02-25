import React from "react";
import Title from "../../components/title";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPenToSquare,
  faTag,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import "../CaseData/CaseDate.css";
import RegisterTextarea from "../../components/RegisterTextarea";
import { Form } from "react-bootstrap";
import CustomButton from "../../components/CustomButton";
import DonutChart from "../../components/DonutChart";
import "./CaseDetailsChart.css";
import { useNavigate } from "react-router";

const CaseDetailsChart = (props) => {
  const navigate = useNavigate()
  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/viewdonations')
  };
  return (
    <>
      <div className="CaseDetailsChart">
        <Title
          title="بيانات الحالة"
          icon={<FontAwesomeIcon icon={faPenToSquare} />}
        />

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
              id="completedescription"
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
              id="completedescription"
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
              id="completedescription"
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
          <div className="case-info chartContainer">
            <div className="uploadlogo">
              <DonutChart />
            </div>
            <div className="payDetails">
              {/* <div className="payDetailssec">
                <div className="paynums reqpayment">
                  <h3>المبلغ المطلوب</h3>
                  <h4>10000</h4>
                </div>
              </div> */}

              <div className="payDetailssec">
                <div className="paynums">
                  <h2>7000</h2>
                  <p className="paydesc">تم الدفع</p>
                </div>
                <div className="payIcon payIcon1">
                  <div className="secpayIcon1">
                    <FontAwesomeIcon icon={faUser} className="payIconchart1" />
                  </div>
                </div>
              </div>

              <div className="payDetailssec">
                <div className="paynums">
                  <h2>3000</h2>
                  <p className="paydesc">المتبقي</p>
                </div>
                <div className="payIcon payIcon2">
                  <div className="secpayIcon2">
                    <FontAwesomeIcon icon={faTag} className="payIconchart2" />
                  </div>
                </div>
              </div>

              <div className="payDetailssecSubmit">
                <CustomButton text="إغلاق الحالة" className="chartButton" />
                <CustomButton
                  text="عرض تفاصيل المدفوعات"
                  className="chartButton"
                />
              </div>
            </div>
          </div>
        </Form>
      </div>
    </>
  );
};

export default CaseDetailsChart;
