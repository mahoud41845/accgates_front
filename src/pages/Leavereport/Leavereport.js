 
import {
    faFileInvoice,
    faPlus,
    faPrint,
    faReceipt,
    faWarehouse,
    faXmark,
  } from "@fortawesome/free-solid-svg-icons";
  import Title from "../../components/title";
  import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
  import "./leavereport.css";
  import { useEffect, useState } from "react";
  import { t } from "i18next";
  import { Modal, Button } from "react-bootstrap";
  import RegisterTextbox from "../../components/RegisterTextBox";
  import axios from "axios";
import { faSignalMessenger } from "@fortawesome/free-brands-svg-icons";
import AccountingTable from "../../components/AccountingTable";
  
  function Leavereport() {
     const [showModal, setShowModal] = useState(false);


  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);
    
 
  
    return (
      <>
        <Title
          title={t("Leavereport")}
          icon={<FontAwesomeIcon icon={faReceipt} />}
        />
        <div className="leavereport">
          <div className="leavereport-form">
            <div className="btn-leavereport-form">
              <span className="add-row-ta" onClick={handleShowModal}>
                <FontAwesomeIcon icon={faPlus} /> {t("add-leave")}
              </span>
            </div>
            <span className="print-icon print2">
              <FontAwesomeIcon icon={faPrint} title={t("print_report")} />
            </span>
          </div>
          <AccountingTable
            data={[]}
            columns={[
              { key: "id", name: t("serial-number") },
              { key: "job-title-name", name: t("job-title-name") },
              { key: "Description", name: t("Description") },
            ]}
            tableContainerClass="table-Jobtitlesreport"
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
              {t("leaves")}
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
            <RegisterTextbox label={t("leave-type")} type="text" />
            <RegisterTextbox label={t("number-of-leave-days")} type="number" />
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
  
  export default Leavereport;
  