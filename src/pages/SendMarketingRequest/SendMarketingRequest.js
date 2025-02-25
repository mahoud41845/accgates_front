import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Title from "../../components/title";
import { faBullhorn } from "@fortawesome/free-solid-svg-icons";
import { Form } from "react-bootstrap";
import RegisterTextbox from "../../components/RegisterTextBox";
import "../SendDesignRequest/SendDesignRequest.css";
import UploadInput from "../../components/UploadInput";
import CustomButton from "../../components/CustomButton";
import SelectComponent from "../../components/SelectComponent";
 
function SendMarketingRequest() {
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <>
      <div className="senddesignrequest ">
        <Title
          title="ارسال طلب تسويق"
          icon={<FontAwesomeIcon icon={faBullhorn} />}
          style={{ width: "unset" }}
        />
        <Form onSubmit={handleSubmit} className="sendDesignForm">
          <div className="designnrequest">
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
            <SelectComponent />
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
            <CustomButton text="إرسال" />
          </div>
        </Form>
      </div>
    </>
  );
}

export default SendMarketingRequest;
