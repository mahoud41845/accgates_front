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
import "./Attendanceanddeparturereport.css";
import { useEffect, useState } from "react";
import { t } from "i18next";
import { Modal, Button, Form } from "react-bootstrap";
import RegisterTextbox from "../../components/RegisterTextBox";
import axios from "axios";
import { faSignalMessenger } from "@fortawesome/free-brands-svg-icons";
import AccountingTable from "../../components/AccountingTable";
import UploadInput from "../../components/UploadInput";
import SelectComponent from "../../components/SelectComponent";

function Attendanceanddeparturereport() {
  const [showModal, setShowModal] = useState(false);
  const [Requesttype, setRequesttype] = useState("Manual");

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  return (
    <>
      <Title
        title={t("attendance-and-departure-report")}
        icon={<FontAwesomeIcon icon={faReceipt} />}
      />
      <div className="attendance-and-departure-report">
        <div className="attendance-and-departure-report-form">
          <div className="btn-attendance-and-departure-report-form">
            <span className="add-row-ta" onClick={handleShowModal}>
              <FontAwesomeIcon icon={faPlus} /> {t("add-time")}
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
            { key: "type", name: t("attendance-time") },
            { key: "Description", name: t("aeparture-time") },
            { key: "date", name: t("date") },
          ]}
          tableContainerClass="table-attendance-and-departure-report"
        />
      </div>

      <Modal
        show={showModal}
        onHide={() => setShowModal(false)}
        className="modael-deductions"
      >
        <Modal.Header>
          <Modal.Title>
            {t("attendance-and-departure")}
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
            <span>{t("registration-type")} </span>
            <div className="Requesttype">
              <div className="">
                <Form.Check
                  inline
                  label={t("Manual")}
                  type="radio"
                  className="createManage-redio"
                  onChange={(e) => setRequesttype(e.target.value)}
                  value="Manual"
                  checked={Requesttype === "Manual"}
                />
              </div>
              <div className="">
                <Form.Check
                  inline
                  label={t("QR")}
                  type="radio"
                  className="createManage-redio"
                  value="QR"
                  checked={Requesttype === "QR"}
                  onChange={(e) => setRequesttype(e.target.value)}
                />
              </div>
            </div>
          </div>

          {Requesttype === "Manual" && (
            <>
              <SelectComponent
                label={t("employee-name")}
                type="text"
                placeholder={t("employee-name")}
              />
              <RegisterTextbox label={t("requesttype")} type="text" />
              <RegisterTextbox
                label={t("time")}
                type="text"
               />
            </>
          )}
          {Requesttype === "QR" && (
            <>
              <RegisterTextbox label={t("qr-number")} type="text" />
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

export default Attendanceanddeparturereport;
