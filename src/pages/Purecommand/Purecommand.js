import {
  faFileInvoice,
  faMoneyBillWave,
  faPlus,
  faTrash,
  faXmark,
} from "@fortawesome/free-solid-svg-icons"; // Import faTrash for delete icon
import Title from "../../components/title";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import RegisterTextbox from "../../components/RegisterTextBox";
import "./Purecommand.css";
import { t } from "i18next";
import SelectComponent from "../../components/SelectComponent";
import { useState } from "react";
import CustomButton from "../../components/CustomButton";
import { Modal, Button } from "react-bootstrap";



function Purecommand() {
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
        title={t("purecommand")}
        icon={<FontAwesomeIcon icon={faMoneyBillWave} />}
      />
      <div className="Purecommand">
        <div className="form-Purecommand">
          <div className="btn-settlementreport-form">
            <span className="add-row-ta  " onClick={handleShowModal}>
              <FontAwesomeIcon icon={faPlus} /> {t("new-invoice")}
            </span>
          </div>
          {/* <RegisterTextbox
            parentStyle={{
              width: "30%",
            }}
            id="leaveTimer"
            label={t("date")}
            type="date"
            stylee={{
              width: "55%",
            }}
          />
          <SelectComponent
            className="select-report"
            id="payAcc"
            label={t("selectWarehouse")}
            placeholder={t("selectWarehouse")}
            selectStyle={{ width: "100%" }}
            containerStyle={{ width: "30%" }}
          /> */}
        </div>
      </div>
      <Modal
        show={showModal}
        onHide={handleCloseModal}
        className="Purecommand-modal"
      >
        <Modal.Header>
          <Modal.Title>
             {t("purecommand")}
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
          <div className="Purecommand">
            <div className="form-Purecommand">
              <RegisterTextbox
                parentStyle={{
                  width: "30%",
                }}
                id="leaveTimer"
                label={t("date")}
                type="date"
                stylee={{
                  width: "55%",
                }}
              />
              <SelectComponent
                className="select-report"
                id="payAcc"
                label={t("selectWarehouse")}
                placeholder={t("selectWarehouse")}
                selectStyle={{ width: "100%" }}
                containerStyle={{ width: "30%" }}
              />
            </div>
            <div className="form-Purecommand2">
              <span
                onClick={handleAddIllness}
                className="addrowInvoice"
                href="/#"
              >
                <FontAwesomeIcon icon={faPlus} /> {t("Additem")}
              </span>
              <table className="accounting-table fbffbf">
                <thead>
                  <tr>
                    <th>{t("item-code")}</th>
                    <th>{t("Itemname")}</th>
                    <th>{t("Quantity")}</th>
                    <th>{t("unit")}</th>
                    <th>{t("notes")}</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {illnesses.length > 0 ? (
                    illnesses.map((illness) => (
                      <tr key={illness.id} className="selected-row">
                        <td>
                          <RegisterTextbox
                            id={`name-${illness.id}`}
                            type="number"
                            stylee={{ width: "100%" }}
                          />
                        </td>
                        <td>
                          <SelectComponent
                            placeholder={t("category")}
                            selectStyle={{ width: "100%" }}
                            containerStyle={{
                              width: "100%",
                            }}
                          />
                        </td>
                        <td>
                          <RegisterTextbox
                            id={`danger-${illness.id}`}
                            type="text"
                            stylee={{ width: "100%" }}
                          />
                        </td>
                        <td>
                          <SelectComponent
                            placeholder={t("type")}
                            selectStyle={{ width: "100%" }}
                            containerStyle={{
                              width: "100%",
                            }}
                          />
                        </td>
                        <td>
                          <RegisterTextbox
                            id={`cost-${illness.id}`}
                            type="number"
                            stylee={{ width: "100%" }}
                          />
                        </td>
                        <td className="dlete-row">
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
                      <td colSpan="6" style={{ textAlign: "center" }}>
                        {t("no-items")}
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            <div className="btn-additem">
              <CustomButton text={t("save")} />
            </div>
          </div>
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
export default Purecommand;
