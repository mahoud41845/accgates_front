import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Title from "../../components/title";
import { faEnvelopeOpenText } from "@fortawesome/free-solid-svg-icons";
import { Form } from "react-bootstrap";
import RegisterTextarea from "../../components/RegisterTextarea";
import RegisterTextbox from "../../components/RegisterTextBox";
import "./SendDesignRequest";
import UploadInput from "../../components/UploadInput";
import CustomButton from "../../components/CustomButton";

function SendDesignRequest() {
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <>
      <div className="senddesignrequest">
        <Title
          title="ارسال طلب تصميم"
          icon={<FontAwesomeIcon icon={faEnvelopeOpenText} />}
          style={{ width: "unset" }}
        />
        <Form onSubmit={handleSubmit} className="sendDesignForm">
          <div className="designnrequest">
            <RegisterTextbox
              parentStyle={{
                width: "55%",
              }}
              id="name"
              label="إسم التصميم"
              type="text"
              stylee={{
                width: "55%",
              }}
            />
            <div className="design-filesCon">
              <div className="design-files">
                <UploadInput
                  id="documentUpload"
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
            <CustomButton text="إرسال" />
          </div>
        </Form>
      </div>
    </>
  );
}

export default SendDesignRequest;
