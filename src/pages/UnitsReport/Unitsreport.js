import {
  faWeightHanging,
  faPlus,
  faFileInvoice,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import Title from "../../components/title";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { t } from "i18next";
import { Modal, Button } from "react-bootstrap";
import RegisterTextbox from "../../components/RegisterTextBox";
import axios from "axios";
import "../WarehouseReport/Warehousereport.css";

function UnitsReport() {
  const [units, setUnits] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [unitName, setUnitName] = useState("");
  const [unitDescription, setUnitDescription] = useState("");

  const handleAddUnit = async () => {
    const addUnitUrl = "http://127.0.0.1:8000/api/addUnit";

    if (!unitName) {
      alert(t("please-fill-all-fields"));
      return;
    }

    try {
      const authToken = localStorage.getItem("authToken");

      if (!authToken) {
        console.error("لم يتم العثور على التوكن!");
        return;
      }

      const response = await axios.post(
        addUnitUrl,
        { name: unitName, description: unitDescription },
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        setShowModal(false);
        setUnitName("");
        setUnitDescription("");
        fetchUnits();
      }
    } catch (error) {
      console.error("حدث خطأ أثناء الإضافة:", error);
      if (error.response) {
        console.error("تفاصيل الخطأ:", error.response.data);
      }
    }
  };

  useEffect(() => {
    fetchUnits();
  }, []);

  const fetchUnits = async () => {
    const authToken = localStorage.getItem("authToken");

    try {
      const response = await axios.get("http://127.0.0.1:8000/api/units", {
        headers: { Authorization: `Bearer ${authToken}` },
      });
      if (response.data.status === 200) {
        setUnits(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching units:", error);
    }
  };

  return (
    <>
      <Title
        title={t("unit-report")}
        icon={<FontAwesomeIcon icon={faWeightHanging} />}
      />
      <div className="Warehousereport">
        <div className="warehouse-report">
          <span className="add-row-ta" onClick={() => setShowModal(true)}>
            <FontAwesomeIcon icon={faPlus} /> {t("add")}
          </span>
        </div>
        <table className="table-rport">
          <thead>
            <tr className="vac-table-header selected-row mm">
              <th>{t("serial-number")}</th>
              <th>{t("unit-name")}</th>
              <th>{t("unit-description")}</th>
            </tr>
          </thead>
          <tbody>
            {units.map((unit, index) => (
              <tr key={unit.id}>
                <td>{index + 1}</td>
                <td>{unit.name}</td>
                <td>{unit.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Modal
        show={showModal}
        onHide={() => setShowModal(false)}
        className="modal-table small-modall"
      >
        <Modal.Header>
          <Modal.Title>
            {t("add-unit")}
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
            label={t("unit-name")}
            type="text"
            placeholder={t("unit-name")}
            value={unitName}
            onChange={(e) => setUnitName(e.target.value)}
          />
          <RegisterTextbox
            label={t("unit-description")}
            type="text"
            placeholder={t("unit-description")}
            value={unitDescription}
            onChange={(e) => setUnitDescription(e.target.value)}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            {t("close")}
          </Button>
          <Button variant="primary" onClick={handleAddUnit}>
            {t("save")}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default UnitsReport;
