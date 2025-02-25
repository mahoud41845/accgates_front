
 
import {
    faFileInvoice,
    faPlus,
    faReceipt,
    faWarehouse,
    faXmark,
  } from "@fortawesome/free-solid-svg-icons";
  import Title from "../../components/title";
  import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
  import "./sectionsreport.css";
  import { useEffect, useState } from "react";
  import { t } from "i18next";
  import { Modal, Button } from "react-bootstrap";
  import RegisterTextbox from "../../components/RegisterTextBox";
  import axios from "axios";
import { faSignalMessenger } from "@fortawesome/free-brands-svg-icons";
import AccountingTable from "../../components/AccountingTable";
import SelectComponent from "../../components/SelectComponent";
  
  function SectionsReport() {
     const [showModal, setShowModal] = useState(false);


  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);
    
 
  
  
 
  
    return (
      <>
        <Title
          title={t("sections-report")}
          icon={<FontAwesomeIcon icon={faReceipt} />}
        />
        <div className="SectionsReport">
          <div className="btn-SectionsReport-form">
            <span className="add-row-ta" onClick={handleShowModal}>
              <FontAwesomeIcon icon={faPlus} /> {t("add-section")}
            </span>
          </div>
          <AccountingTable
            data={[]}
            columns={[
              { key: "id", name: t("serial-number") },
              { key: "user", name: t("section-name") },
              { key: "invoisnum", name: t("director's-name") },
              { key: "numtranzaction", name: t("Description") },
            ]}
            tableContainerClass="table-SectionsReport"
          />
        </div>

        {/* مودال إضافة مخزن جديد */}
        <Modal
          show={showModal}
          onHide={() => setShowModal(false)}
          className="modal-table small-modall"
        >
          <Modal.Header>
            <Modal.Title>
              {t("add-section")}
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
            <RegisterTextbox
              label={t("section-name")}
              type="text"
             />
            <SelectComponent
              label={t("Manager's-name")}
              type="text"
              placeholder={t("Manager's-name")}
            />
            <RegisterTextbox
              label={t("section-description")}
              type="text"
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
  
  export default SectionsReport;
  