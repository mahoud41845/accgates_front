 
import {
    faFileInvoice,
    faPlus,
    faReceipt,
    faWarehouse,
    faXmark,
  } from "@fortawesome/free-solid-svg-icons";
  import Title from "../../components/title";
  import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
  import "./jobtitlesreport.css";
  import { useEffect, useState } from "react";
  import { t } from "i18next";
  import { Modal, Button } from "react-bootstrap";
  import RegisterTextbox from "../../components/RegisterTextBox";
  import axios from "axios";
import { faSignalMessenger } from "@fortawesome/free-brands-svg-icons";
import AccountingTable from "../../components/AccountingTable";
  
  function Jobtitlesreport() {
     const [showModal, setShowModal] = useState(false);


  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);
    
 
  
  
    // useEffect(() => {
    //   fetchWarehouses();
    // }, []);
  
    // const fetchWarehouses = async () => {
    //   const authToken = localStorage.getItem("authToken");
  
    //   try {
    //     const response = await axios.get("http://127.0.0.1:8000/api/warehouses", {
    //       headers: { Authorization: `Bearer ${authToken}` },
    //     });
    //     if (response.data.status === 200) {
    //       setWarehouses(response.data.data);
    //       console.log(response);
    //     }
    //   } catch (error) {
   
    //     console.error("Error fetching warehouses:", error);
    //   }
    // };
  
    return (
      <>
        <Title
          title={t("Jobtitlesreport")}
          icon={<FontAwesomeIcon icon={faReceipt} />}
        />
        <div className="jobtitlesreport">
        <div className="btn-Jobtitlesreport-form">
            <span className="add-row-ta" onClick={handleShowModal}>
              <FontAwesomeIcon icon={faPlus} /> {t("add-jop-title")}
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
              {t("Job-Title")}
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
              label={t("job-title-name")}
              type="text"
               />
            <RegisterTextbox
              label={t("job-title-description")}
              type="text"
               />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowModal(false)}>
              {t("close")}
            </Button>
            <Button variant="primary"  >
              {t("save")}
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
  
  export default Jobtitlesreport;
  