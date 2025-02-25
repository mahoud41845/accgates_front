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
import "./deductionsandbonusesreport.css";
import { useEffect, useState } from "react";
import { t } from "i18next";
import { Modal, Button, Form } from "react-bootstrap";
import RegisterTextbox from "../../components/RegisterTextBox";
import axios from "axios";
import { faSignalMessenger } from "@fortawesome/free-brands-svg-icons";
import AccountingTable from "../../components/AccountingTable";
import UploadInput from "../../components/UploadInput";
import SelectComponent from "../../components/SelectComponent";


function Deductionsandbonusesreport() {
  const [showModal, setShowModal] = useState(false);

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  return (
    <>
      <Title
        title={t("deductions-and-bonuses-report")}
        icon={<FontAwesomeIcon icon={faReceipt} />}
      />
      <div className="attendance-and-departure-report">
        <div className="attendance-and-departure-report-form">
          <div className="btn-attendance-and-departure-report-form">
            <span className="add-row-ta" onClick={handleShowModal}>
              <FontAwesomeIcon icon={faPlus} /> {t("add-deduction/bonus")}
            </span>
          </div>
          <div className="search-box">
            <FontAwesomeIcon icon={faSearch} className="search-icon" />
            <RegisterTextbox
              parentStyle={{ width: "100%" }}
              id="searchBox"
              type="text"
            />
          </div>
          <RegisterTextbox
            parentStyle={{ width: "13%" }}
            id="fromDate"
            label={t("from")}
            type="date"
          />
          <RegisterTextbox
            parentStyle={{ width: "13%" }}
            id="toDate"
            label={t("to")}
            type="date"
          />

          <span className="print-icon">
            <FontAwesomeIcon icon={faPrint} title={t("print_report")} />
          </span>
        </div>
        <AccountingTable
          data={[]}
          columns={[
            { key: "id", name: t("serial-number") },
            { key: "employename", name: t("employee-name") },
            { key: "type", name: t("type") },
            { key: "reason", name: t("reason") },
            { key: "days", name: t("days") },
            { key: "value", name: t("value") },
            { key: "date", name: t("date") },
          ]}
          tableContainerClass="table-attendance-and-departure-report"
        />
      </div>

      <Modal
        show={showModal}
        onHide={() => setShowModal(false)}
        className="modael-deductions-and-bonuses"
      >
        <Modal.Header>
          <Modal.Title>
            {t("add-deduction/bonus")}
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
          <div className="Requesttype-form">
            <span>{t("type")} </span>
            <div className="Requesttype">
              <div className="">
                <Form.Check
                  inline
                  label={t("bonus")}
                  type="radio"
                  name="bonus"
                  className="createManage-redio"
                  value="bonus"
                />
              </div>
              <div className="">
                <Form.Check
                  inline
                  label={t("deduction")}
                  type="radio"
                  className="createManage-redio"
                  value="deduction"
                  name="bonus"
                />
              </div>
            </div>
          </div>
          <SelectComponent
            label={t("employee-name")}
            type="text"
            placeholder={t("employee-name")}
          />
          <RegisterTextbox
            label={t("reason")}
            type="text"
           />
          <div className="daysandval">
            {" "}
            <RegisterTextbox label={t("days")} type="text" />
            <RegisterTextbox label={t("value")} type="text" />
          </div>

          <RegisterTextbox
            label={t("date")}
            type="date"
            placeholder={t("date")}
          />
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

export default Deductionsandbonusesreport;
