import {
  faFileInvoice,
  faPlus,
  faPrint,
  faReceipt,
  faSearch,
  faWarehouse,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import Title from "../../components/title";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./employeereport.css";
import { useEffect, useState } from "react";
import { t } from "i18next";
import { Modal, Button, Form } from "react-bootstrap";
import RegisterTextbox from "../../components/RegisterTextBox";
import axios from "axios";
import { faSignalMessenger } from "@fortawesome/free-brands-svg-icons";
import AccountingTable from "../../components/AccountingTable";
import UploadInput from "../../components/UploadInput";
import RadioInput from "../../components/RadioInput";
import SelectComponent from "../../components/SelectComponent";

function Employeereport() {
  const [showModal, setShowModal] = useState(false);
  const [selectedOption, setSelectedOption] = useState("general-data");

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);
  const options = [
      { value: "salary-details", label: t("salary-details") },
      { value: "general-data", label: t("general-data") },
    ];
  return (
    <>
      <Title
        title={t("Employeereport")}
        icon={<FontAwesomeIcon icon={faReceipt} />}
      />
      <div className="Employeereport">
        <div className="Employeereport-form">
          <div className="btn-Employeereport-form">
            <span className="add-row-ta" onClick={handleShowModal}>
              <FontAwesomeIcon icon={faPlus} /> {t("add-employee")}
            </span>
          </div>
          <span className="print-icon">
            <FontAwesomeIcon icon={faPrint} title={t("print_report")} />
          </span>
        </div>
        <AccountingTable
          data={[]}
          columns={[
            { key: "id", name: t("serail-number") },
            { key: "employename", name: t("employee-name") },
            { key: "phonenumber", name: t("phone-number") },
            { key: "JobTitle", name: t("Job-Title") },
          ]}
          tableContainerClass="table-Employeereport"
        />
      </div>

      <Modal
        show={showModal}
        onHide={() => setShowModal(false)}
        className="modael-Employeereport"
      >
        <Modal.Header>
          <Modal.Title>
            {t("employee-data")}
            <FontAwesomeIcon icon={faFileInvoice} className="transfer-ic" />
          </Modal.Title>

          <Button
            className="custom-close-button"
            variant="link"
            onClick={() => setShowModal(false)}
          >
            <FontAwesomeIcon icon={faXmark} className="closeModal" />
          </Button>
        </Modal.Header>
        <Modal.Body>
          <div className="toggel-employee">
            <RadioInput
              options={options}
              containerWidth={200}
              value={selectedOption}
              onChange={(value) => {
                console.log("Selected Option:", value);
                setSelectedOption(value);
              }}
            />
          </div>
          <div className="Requesttype-form">
            <span>{t("account-type")} </span>
            <div className="account-type">
              <div className="account-type1">
                <Form.Check
                  inline
                  label={t("Inactive")}
                  type="radio"
                  className="createManage-redio"
                  value="Inactive"
                  name="Active"
                />
              </div>
              <div className="account-type2">
                <Form.Check
                  inline
                  label={t("Active")}
                  type="radio"
                  className="createManage-redio"
                  value="Active"
                  name="Active"
                />
              </div>
            </div>
          </div>

          {selectedOption === "general-data" && (
            <>
              <div className="form-employee1">
                <SelectComponent
                  label={t("Gender")}
                  type="text"
                  containerStyle={{
                    width: "100%",
                  }}
                  options={options}
                  placeholder={t("Gender")}
                />
                <RegisterTextbox
                  label={t("name")}
                  type="text"
                  parentStyle={{ width: "100%" }}
                />
              </div>
              <div className="form-employee1">
                <RegisterTextbox
                  label={t("address")}
                  type="text"
                  placeholder={t("address")}
                  parentStyle={{ width: "100%" }}
                />
                <RegisterTextbox
                  label={t("date-of-birth")}
                  type="date"
                  parentStyle={{ width: "100%" }}
                />
              </div>{" "}
              <div className="form-employee1">
                <RegisterTextbox
                  label={t("email")}
                  type="email"
                  parentStyle={{ width: "100%" }}
                />
                <RegisterTextbox
                  label={t("joining-date")}
                  type="date"
                  parentStyle={{ width: "100%" }}
                />
              </div>{" "}
              <div className="form-employee1">
                <RegisterTextbox
                  label={t("phone-number")}
                  type="number"
                  parentStyle={{ width: "100%" }}
                />
                <RegisterTextbox
                  label={t("nationality")}
                  type="text"
                  placeholder={t("nationality")}
                  parentStyle={{ width: "100%" }}
                />
              </div>
              <div className="form-employee1">
                <SelectComponent
                  label={t("marital-status")}
                  type="text"
                  placeholder={t("marital-status")}
                  containerStyle={{
                    width: "100%",
                  }}
                />
                <RegisterTextbox
                  label={t("bank-account-number")}
                  type="text"
                  parentStyle={{ width: "100%" }}
                />
              </div>
              <div className="form-employee1">
                <RegisterTextbox
                  label={t("qualification")}
                  type="text"
                  parentStyle={{ width: "100%" }}
                />
                <RegisterTextbox
                  label={t("direct-manager")}
                  type="text"
                  parentStyle={{ width: "100%" }}
                />
              </div>
              <UploadInput
                id="documentUpload"
                name="image"
                parentStyle={{ marginBottom: "20px" }}
                // label="الصورة الشخصيه"
              />
            </>
          )}
          {selectedOption === "salary-details" && (
            <>
              <div className="form-employee1">
                <SelectComponent
                  label={t("job-title")}
                  type="text"
                  containerStyle={{
                    width: "100%",
                  }}
                  placeholder={t("job-title")}
                />
                <RegisterTextbox
                  label={t("basic-salary")}
                  type="text"
                  parentStyle={{ width: "100%" }}
                />
              </div>{" "}
              <div className="form-employee1">
                <RegisterTextbox
                  label={t("additional-salary")}
                  type="text"
                  parentStyle={{ width: "100%" }}
                />
                <RegisterTextbox
                  label={t("incentives")}
                  type="text"
                  parentStyle={{ width: "100%" }}
                />
              </div>{" "}
              <div className="form-employee1">
                <RegisterTextbox
                  label={t("social-insurance")}
                  type="text"
                  parentStyle={{ width: "100%" }}
                />
                <RegisterTextbox
                  label={t("health-insurance")}
                  type="text"
                  parentStyle={{ width: "100%" }}
                />
              </div>{" "}
              <div className="form-employee1">
                <div className="form-employee2">
                  <SelectComponent
                    label={t("tax-type")}
                    containerStyle={{
                      width: "100%",
                    }}
                    placeholder={t("tax-type")}
                  />
                  <RegisterTextbox
                    label={t("tax-rate")}
                    type="text"
                    parentStyle={{ width: "100%" }}
                  />
                </div>

                <RegisterTextbox
                  label={t("allowances")}
                  type="text"
                  parentStyle={{ width: "100%" }}
                />
              </div>{" "}
              <div className="form-employee1">
                <RegisterTextbox
                  label={t("Description")}
                  type="text"
                  parentStyle={{ width: "100%" }}
                />
                <RegisterTextbox
                  label={t("Total")}
                  type="text"
                  parentStyle={{ width: "100%" }}
                />
              </div>
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            {t("close")}
          </Button>
          <Button variant="primary">{t("save")}</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Employeereport;
