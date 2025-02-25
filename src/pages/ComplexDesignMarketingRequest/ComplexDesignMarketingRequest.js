import { Form, Tabs, Tab } from "react-bootstrap";
import "../CompletingData/CompletingData.css";
import RegisterTextbox from "../../components/RegisterTextBox";
import UploadInput from "../../components/UploadInput";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBullhorn, faEnvelopeOpenText } from "@fortawesome/free-solid-svg-icons";
import CustomButton from "../../components/CustomButton";
import Title from "../../components/title";
import RegisterTextarea from "../../components/RegisterTextarea";
import './complexdesignmarketingrequest.css'

function ComplexDesignMarketingRequest() {
  const [activeTab, setActiveTab] = useState("form1");


  const handleNext = () => {
    if (activeTab === "form1") {
      setActiveTab("form2");
    }
  };

  const handleBack = () => {
    if (activeTab === "form2") {
      setActiveTab("form1");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="complete-form-conatiner complexdesignmarketingrequest">
      <Tabs
        id="completing-data-tabs"
        activeKey={activeTab}
        onSelect={(tab) => setActiveTab(tab)}
        className="mb-3 completeDatatabs"
      >
        <Tab eventKey="form1" title="1">
          <>
            <div className="senddesignrequest">
              <Title
                title="ارسال طلب تسويق"
                icon={<FontAwesomeIcon icon={faBullhorn} />}
                style={{ width: "unset" }}
              />
              <Form onSubmit={handleSubmit}  className="sendDesignForm">
                <div className="designnrequest  mergedReqClass">
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
                  <div className="design-filesCon">
                    <div className="design-files">
                      <UploadInput
                        id="documentUpload1"
                        parentStyle={{
                          marginBottom: "unset",
                        }}
                        label="مرفقات اخري"
                      />
                    </div>

                    <div className="design-files">
                      <UploadInput
                        id="documentUpload2"
                        parentStyle={{
                          marginBottom: "unset",
                        }}
                        label="إرفاق صور"
                      />
                    </div>
                  </div>
                </div>
              </Form>
            </div>
          </>
        </Tab>
        <Tab eventKey="form2" title="2">
          <>
            <div className="senddesignrequest">
              <Title
                title="ارسال طلب تصميم"
                icon={<FontAwesomeIcon icon={faEnvelopeOpenText} />}
                style={{ width: "unset" }}
              />
              <Form onSubmit={handleSubmit}  className="sendDesignForm">
                <div className="designnrequest mergedReqClass">
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
                  <div className="design-filesCon">
                    <div className="design-files">
                      <UploadInput
                        id="documentUpload3"
                        parentStyle={{
                          marginBottom: "unset",
                        }}
                        label="مرفقات اخري"
                      />
                    </div>

                    <div className="design-files">
                      <UploadInput
                        id="documentUpload4"
                        parentStyle={{
                          marginBottom: "unset",
                        }}
                        label="إرفاق صور"
                      />
                    </div>
                  </div>
                  <RegisterTextarea
                    label="متطلبات التصميم"
                    stylee={{ width: "100%" }}
                    parentStyle={{
                      width: "55%",
                      marginBottom: "20px",
                    }}
                  />
                  <RegisterTextarea
                    label="نظره عامة عن المشروع"
                    stylee={{ width: "100%" }}
                    parentStyle={{
                      width: "55%",
                      marginBottom: "20px",
                    }}
                  />
                </div>
              </Form>
            </div>
          </>
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

export default ComplexDesignMarketingRequest;
