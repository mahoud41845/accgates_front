import {
  faFileInvoice,
  faPlus,
  faWeightHanging,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import CustomTable from "../../components/CustomTable";
import Title from "../../components/title";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
 import { useEffect, useState } from "react";
import { t } from "i18next";
import { Modal, Button } from "react-bootstrap";
import RegisterTextbox from "../../components/RegisterTextBox";
import axios from "axios";

function Itemsreport() {
  const [items, setItems] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [itemName, setItemName] = useState("");
  const [itemDescription, setItemDescription] = useState("");

  const handleAddItem = async () => {
    const addItemUrl = "http://127.0.0.1:8000/api/addCategory";

    if (!itemName) {
      alert(t("please-fill-all-fields"));
      return;
    }

    try {
      const authToken = localStorage.getItem("authToken");
      console.log("التوكن المستخدم:", authToken);

      if (!authToken) {
        console.error("لم يتم العثور على التوكن!");
        return;
      }

      const response = await axios.post(
        addItemUrl,
        { name: itemName, description: itemDescription },
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
        setItemName("");
        setItemDescription("");
        fetchItems();
      }
    } catch (error) {
      console.error("حدث خطأ أثناء الإضافة:", error);
      if (error.response) {
        console.error("تفاصيل الخطأ:", error.response.data);
      }
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    const authToken = localStorage.getItem("authToken");

    try {
      const response = await axios.get("http://127.0.0.1:8000/api/categories", {
        headers: { Authorization: `Bearer ${authToken}` },
      });
      if (response.data.status === 200) {
        setItems(response.data.data);
        console.log(response);
      }
    } catch (error) {
      console.error("Error fetching items:", error);
    }
  };

  return (
    <>
      <Title
        title={t("item-report")}
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
              <th>{t("item-name")}</th>
              <th>{t("item-description")}</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, index) => (
              <tr key={item.id}>
                <td>{index + 1}</td>
                <td>{item.name}</td>
                <td>{item.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* مودال إضافة عنصر جديد */}
      <Modal
        show={showModal}
        onHide={() => setShowModal(false)}
        className="modal-table small-modall"
      >
        <Modal.Header>
          <Modal.Title>
            {t("add-item")}
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
            label={t("item-name")}
            type="text"
            placeholder={t("item-name")}
            value={itemName}
            onChange={(e) => setItemName(e.target.value)}
          />
          <RegisterTextbox
            label={t("item-description")}
            type="text"
            placeholder={t("item-description")}
            value={itemDescription}
            onChange={(e) => setItemDescription(e.target.value)}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            {t("close")}
          </Button>
          <Button variant="primary" onClick={handleAddItem}>
            {t("save")}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Itemsreport;
