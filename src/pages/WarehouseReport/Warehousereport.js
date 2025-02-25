import {
  faFileInvoice,
  faPlus,
  faWarehouse,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import Title from "../../components/title";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./Warehousereport.css";
import { useEffect, useState } from "react";
import { t } from "i18next";
import { Modal, Button } from "react-bootstrap";
import RegisterTextbox from "../../components/RegisterTextBox";
import axios from "axios";

function Warehousereport() {
  const [warehouses, setWarehouses] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [storeName, setStoreName] = useState("");
  const [storeDescription, setStoreDescription] = useState("");

  
const handleAddWarehouse = async () => {
  const addWarehouseUrl = "http://127.0.0.1:8000/api/addWarehouse";

  if (!storeName.trim()) {
    alert(t("please-fill-all-fields"));
    return;
  }

  try {
    const authToken = localStorage.getItem("authToken");

    if (!authToken) {
      console.error("لم يتم العثور على التوكن!");
      return;
    }

        const warehouseData = { name: storeName };
        if (storeDescription.trim()) {
          warehouseData.description = storeDescription;
        }

    const response = await axios.post(
      addWarehouseUrl,
      { name: storeName, description: storeDescription ? storeDescription : null },  
      {
        headers: {
          Authorization: `Bearer ${authToken}`,
          "Content-Type": "application/json",
        },
      }
    );

    console.log("استجابة API عند الإضافة:", response.data);

    if (response.status === 200) {
      console.log("تمت الإضافة بنجاح");
      setShowModal(false);
      setStoreName("");
      setStoreDescription("");
      fetchWarehouses();
    }
  } catch (error) {
    console.error("حدث خطأ أثناء الإضافة:", error);
    if (error.response) {
      console.error("تفاصيل الخطأ:", error.response.data);
    }
  }
};


  useEffect(() => {
    fetchWarehouses();
  }, []);

  const fetchWarehouses = async () => {
    const authToken = localStorage.getItem("authToken");

    try {
      const response = await axios.get("http://127.0.0.1:8000/api/warehouses", {
        headers: { Authorization: `Bearer ${authToken}` },
      });
      if (response.data.status === 200) {
        setWarehouses(response.data.data);
        console.log(response);
      }
    } catch (error) {
 
      console.error("Error fetching warehouses:", error);
    }
  };

  return (
    <>
      <Title
        title={t("warehouse-report")}
        icon={<FontAwesomeIcon icon={faWarehouse} />}
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
              <th>{t("store-name")}</th>
              <th>{t("store-description")}</th>
            </tr>
          </thead>
          <tbody>
            {warehouses.map((warehouse, index) => (
              <tr key={warehouse.id}>
                <td>{index + 1}</td>
                <td>{warehouse.name}</td>
                <td>{warehouse.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* مودال إضافة مخزن جديد */}
      <Modal
        show={showModal}
        onHide={() => setShowModal(false)}
        className="modal-table small-modall"
      >
        <Modal.Header>
          <Modal.Title>
            {t("add-warehouse")}
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
            label={t("store-name")}
            type="text"
            placeholder={t("store-name")}
            value={storeName}
            onChange={(e) => setStoreName(e.target.value)}
          />
          <RegisterTextbox
            label={t("store-description")}
            type="text"
            placeholder={t("store-description")}
            value={storeDescription}
            onChange={(e) => setStoreDescription(e.target.value)}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            {t("close")}
          </Button>
          <Button variant="primary" onClick={handleAddWarehouse}>
            {t("save")}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Warehousereport;
