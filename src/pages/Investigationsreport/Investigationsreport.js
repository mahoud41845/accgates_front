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
import "./investigationsreport.css";
import { useEffect, useState } from "react";
import { t } from "i18next";
import { Modal, Button, Form } from "react-bootstrap";
import RegisterTextbox from "../../components/RegisterTextBox";
import axios from "axios";
import { faSignalMessenger } from "@fortawesome/free-brands-svg-icons";
import AccountingTable from "../../components/AccountingTable";
import UploadInput from "../../components/UploadInput";
import SelectComponent from "../../components/SelectComponent";

function Investigationsreport() {
  const [showModal, setShowModal] = useState(false);

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  return (
    <>
      <Title
        title={t("investigations-report")}
        icon={<FontAwesomeIcon icon={faReceipt} />}
      />
      <div className="attendance-and-departure-report">
        <div className="attendance-and-departure-report-form">
          <div className="btn-attendance-and-departure-report-form">
            <span className="add-row-ta" onClick={handleShowModal}>
              <FontAwesomeIcon icon={faPlus} /> {t("add-investigation")}
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
            { key: "Investigatorname", name: t("Investigatorname") },
            { key: "investigatedperson", name: t("investigatedperson") },
            { key: "description", name: t("Description") },
            { key: "result", name: t("result") },
            { key: "date", name: t("date") },
          ]}
          tableContainerClass="table-attendance-and-departure-report"
        />
      </div>

      <Modal
        show={showModal}
        onHide={() => setShowModal(false)}
        className="modael-investigation"
      >
        <Modal.Header>
          <Modal.Title>
            {t("add-investigation")}
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
          <div className="investigation-modalbody">
            <SelectComponent
              label={t("investigator's-name")}
              type="text"
              placeholder={t("investigator's-name")}
              containerStyle={{
                width: "100%",
              }}
            />
            <SelectComponent
              label={t("investigated-person")}
              type="text"
              placeholder={t("investigated-person")}
              containerStyle={{
                width: "100%",
              }}
            />
          </div>
          <div className="investigation-modalbody">
            <RegisterTextbox
              label={t("reason")}
              type="text"
               parentStyle={{ width: "100%" }}
            />
            <RegisterTextbox
              label={t("date")}
              type="date"
               parentStyle={{ width: "100%" }}
            />
          </div>
          <div className="investigation-modalbody">
            <RegisterTextbox
              label={t("Description")}
              type="text"
               parentStyle={{ width: "100%" }}
            />
            <RegisterTextbox
              label={t("result")}
              type="text"
               parentStyle={{ width: "100%" }}
            />
          </div>
          <UploadInput
            id="documentUpload"
            name="image"
            parentStyle={{ marginBottom: "20px" }}
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

export default Investigationsreport;
