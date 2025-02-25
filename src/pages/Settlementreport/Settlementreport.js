import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Title from "../../components/title";
import {
  faFileInvoice,
  faFileInvoiceDollar,
  faPlus,
  faPlusSquare,
  faTrash,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import RegisterTextbox from "../../components/RegisterTextBox";
import SelectComponent from "../../components/SelectComponent";
import { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { t } from "i18next";
import "./Settlementreport.css";
function Settlementreport() {
  const [illnesses, setIllnesses] = useState([{ id: 1 }]);
  const [showModal, setShowModal] = useState(false);

  const handleAddIllness = () => {
    setIllnesses([...illnesses, { id: illnesses.length + 1 }]);
  };
  const handleDeleteIllness = (id) => {
    setIllnesses(illnesses.filter((illness) => illness.id !== id));
  };

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);
  return (
    <>
      <Title
        title="فواتير التسوية"
        icon={<FontAwesomeIcon icon={faFileInvoiceDollar} />}
        style={{ width: "unset" }}
      />
      <div className="settlementreport">
        <div className="settlementreport-form">
          <div className="btn-settlementreport-form">
            <span className="add-row-ta  " onClick={handleShowModal}>
              <FontAwesomeIcon icon={faPlus} /> {t("new-invoice")}
            </span>
          </div>

          <SelectComponent
            placeholder={t("warehouse")}
            label={t("warehouse")}
             containerStyle={{
              width: "30%",
            }}
          />
        </div>

        <div className="transfer-table">
          <table className="table-rport">
            <thead>
              <tr className="vac-table-header selected-row mm">
                <th>رقم الفاتورة</th>
                <th>رقم القيد</th>
                <th>قيمة التسويه</th>
                <th>{t("warehouse")}</th>
              </tr>
            </thead>
          </table>
        </div>
      </div>

      <Modal
        show={showModal}
        onHide={handleCloseModal}
        className="transform-modal"
      >
        <Modal.Header>
          <Modal.Title>
            {/* {t("transfer-invoice-between-stores")} */}
            فاتورة تسوية
            <FontAwesomeIcon icon={faFileInvoice} className="transfer-ic" />
          </Modal.Title>
          <Button
            className="custom-close-button"
            variant="link"
            onClick={handleCloseModal}
          >
            <FontAwesomeIcon icon={faXmark} className="closeModal" />
          </Button>
        </Modal.Header>
        <Modal.Body>
          <div className="form-settlementreport1">
            <RegisterTextbox
              parentStyle={{ width: "20%" }}
              label={t("invoice-number")}
              type="number"
              placeholder={t("invoice-number")}
            />
            <SelectComponent
              placeholder={t("warehouse")}
              label={t("warehouse")}
              // selectStyle={{ width: "50%" }}
              containerStyle={{
                width: "25%",
              }}
            />
            <div className="adda">
              <span className="add-row-ta" onClick={handleAddIllness}>
                <FontAwesomeIcon icon={faPlus} /> {t("add-row")}
              </span>
            </div>
          </div>
          <table className="vac-custom-table tranfer-table">
            <thead>
              <tr className="vac-table-header selected-row mm">
                <th>{t("serial-number")}</th>
                <th>{t("item-name")}</th>
                <th> الكمية المسجلة</th>
                <th>الكمية الفعلية</th>
                <th>العجز</th>
                <th>الزيادة</th>
                <th> </th>
              </tr>
            </thead>
            <tbody>
              {illnesses.length > 0 ? (
                illnesses.map((illness, index) => (
                  <tr key={illness.id} className="selected-row">
                    <td className="seral-trans">{index + 1}</td>
                    <td>
                      <SelectComponent
                        placeholder={t("item-name")}
                        selectStyle={{ width: "100%" }}
                        containerStyle={{
                          width: "100%",
                        }}
                      />
                    </td>
                    <td>
                      {/* <RegisterTextbox
                        id={`danger-${illness.id}`}
                        type="text"
                        stylee={{ width: "100%" }}
                      /> */}
                      50
                    </td>
                    <td>
                      <RegisterTextbox
                        id={`danger-${illness.id}`}
                        type="text"
                        stylee={{ width: "100%" }}
                      />
                    </td>
                    <td>50</td>
                    <td>30</td>
                    <td className="dlete-trans">
                      <FontAwesomeIcon
                        className="clearRowBtn"
                        icon={faTrash}
                        style={{ cursor: "pointer" }}
                        onClick={() => handleDeleteIllness(illness.id)}
                      />
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" style={{ textAlign: "center" }}>
                    {t("no-items")}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            {t("close")}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
export default Settlementreport;
