
 
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
  import "./leavepermissionreport.css";
  import { useEffect, useState } from "react";
  import { t } from "i18next";
  import { Modal, Button, Form } from "react-bootstrap";
  import RegisterTextbox from "../../components/RegisterTextBox";
  import axios from "axios";
import { faSignalMessenger } from "@fortawesome/free-brands-svg-icons";
import AccountingTable from "../../components/AccountingTable";
import UploadInput from "../../components/UploadInput";
import SelectComponent from "../../components/SelectComponent";
import BasicDatePicker from "../../components/BasicDatePicker";
  
  function Leavepermissionreport() {
  const [showModal, setShowModal] = useState(false);
  const [Requesttype, setRequesttype] = useState("permission");
  


  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);
    
 
  
  
 
  
    return (
      <>
        <Title
          title={t("leave-and-permission-report")}
          icon={<FontAwesomeIcon icon={faReceipt} />}
        />
        <div className="leave-and-permission-report">
          <div className="leave-and-permission-form">
            <div className="btn-leave-and-permission-form">
              <span className="add-row-ta" onClick={handleShowModal}>
                <FontAwesomeIcon icon={faPlus} /> {t("addleave/permission")}
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
            {/* <button>filter</button> */}
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
            <BasicDatePicker
              label="Pick a Date"
              parentStyle={{ width: "20%" }}
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
              { key: "Description", name: t("Description") },
              { key: "from", name: t("from") },
              { key: "to", name: t("to") },
            ]}
            tableContainerClass="table-leave-and-permission"
          />
        </div>

        {/* مودال إضافة مخزن جديد */}
        <Modal
          show={showModal}
          onHide={() => setShowModal(false)}
          className="modael-leaves"
        >
          <Modal.Header>
            <Modal.Title>
              {t("Leave-Permission-request")}
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
              <span>{t("Requesttype")} </span>
              <div className="Requesttype">
                <div className="">
                  <Form.Check
                    inline
                    label={t("Permission")}
                    type="radio"
                    className="createManage-redio"
                    value="permission"
                    checked={Requesttype === "permission"}
                    onChange={(e) => setRequesttype(e.target.value)}
                  />
                </div>
                <div className="">
                  <Form.Check
                    inline
                    label={t("leave")}
                    type="radio"
                    className="createManage-redio"
                    onChange={(e) => setRequesttype(e.target.value)}
                    value="leave"
                    checked={Requesttype === "leave"}
                  />
                </div>
              </div>
            </div>
            <SelectComponent
              label={t("employe-name")}
              type="text"
              placeholder={t("employe-name")}
            />
            {Requesttype === "permission" && (
              <>
                <RegisterTextbox
                  label={t("Type-of-permission")}
                  type="text"
                  placeholder={t("Type-of-permission")}
                />
                <UploadInput
                  id="documentUpload"
                  name="image"
                  parentStyle={{ marginBottom: "20px" }}
                  label=" الاذن  "
                />
              </>
            )}
            {Requesttype === "leave" && (
              <>
                <SelectComponent
                  placeholder={t("type-of-leave")}
                  label={t("type-of-leave")}
                  type="text"
                />

                <RegisterTextbox label={t("leave-description")} type="text" />

                <RegisterTextbox label={t("leave-period")} type="number" />
                <div className="date-Leavepermissionreport">
                  <RegisterTextbox label={t("from")} type="date" />

                  <RegisterTextbox
                    label={t("to")}
                    type="date"
                    disabled={true}
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
  
  export default Leavepermissionreport;
  