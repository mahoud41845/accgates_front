import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Title from "../../components/title";
import { faBullhorn } from "@fortawesome/free-solid-svg-icons";
import RegisterTextbox from "../../components/RegisterTextBox";
import "./MarketingDesignProjectManagement.css";
import RegisterTextarea from "../../components/RegisterTextarea";
import { Form } from "react-bootstrap";
import CustomButton from "../../components/CustomButton";

function MarketingDesignProjectManagement() {
  const [isDesign, setIsDesign] = useState(false);
  const [isMarketing, setIsMarketing] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isDesign && isMarketing) {
      navigate("/complexdesignmarketingrequest");
    } else if (isDesign) {
      navigate("/senddesignrequest");
    } else if (isMarketing) {
      navigate("/sendmarketingrequest");
    } else {
      alert("يرجى اختيار طلب تصميم أو طلب تسويق");
    }
  };

  return (
    <>
      <div className="marketingdesignprojectmanagement">
        <Title
          title="التسويق والتصميم وإدارة المشاريع"
          className="marketingtitle"
          icon={<FontAwesomeIcon icon={faBullhorn} />}
        />
        <Form onSubmit={handleSubmit} className="marketingdesignprojectmanagementForm">
          <div className="marketingdesign">
            <RegisterTextbox
              parentStyle={{
                width: "55%",
              }}
              id="name"
              label="إسم المشروع"
              type="text"
              stylee={{
                width: "55%",
              }}
            />
            <RegisterTextbox
              parentStyle={{
                width: "55%",
              }}
              id="files"
              label="إرفاق ملفات ان وجد"
              type="file"
              stylee={{
                width: "55%",
              }}
            />

            <RegisterTextarea
              label="نبذة عن المشروع"
              stylee={{ width: "100%" }}
              parentStyle={{
                width: "55%",
                marginBottom: "20px",
              }}
            />
            <div className="checksCon">
              <div className="checks">
                <input
                  type="checkbox"
                  className="minus-checkbox"
                  checked={isMarketing}
                  onChange={() => setIsMarketing(!isMarketing)}
                />
                <p style={{ margin: "unset" }}>طلب تسويق</p>
              </div>
              <div className="checks">
                <input
                  type="checkbox"
                  className="minus-checkbox"
                  checked={isDesign}
                  onChange={() => setIsDesign(!isDesign)}
                />
                <p style={{ margin: "unset" }}>طلب تصميم</p>
              </div>
            </div>
            <div className="marketingbuttonCon">
              <CustomButton text="إستلام الآن" />
            </div>
          </div>
        </Form>
      </div>
    </>
  );
}

export default MarketingDesignProjectManagement;
