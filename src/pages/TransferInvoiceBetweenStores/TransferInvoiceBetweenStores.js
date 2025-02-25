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
import { useEffect, useState } from "react";
import { Modal, Button } from "react-bootstrap";
import "./TransferInvoiceBetweenStores.css";
import { t } from "i18next";
import axios from "axios";

function TransferInvoiceBetweenStores() {
  const [illnesses, setIllnesses] = useState([{ id: 1 }]);
  const [showModal, setShowModal] = useState(false);
  const [warehouses, setwarehouses] = useState([]);
  const [items, setitems] = useState([]);
  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);
   const [units, setunits] = useState([]);
     const [invoiceDate, setInvoiceDate] = useState(
       new Date().toISOString().split("T")[0]
     );
  const [invoiceNumber, setInvoiceNumber] = useState("");





  // API 
 

      useEffect(() => {
        const fetchData = async () => {
          try {
            const authToken = localStorage.getItem("authToken");
            const headers = { Authorization: `Bearer ${authToken}` };

            const [warehousesRes, unitsRes, itemres] = await Promise.all([
              axios.get("http://127.0.0.1:8000/api/warehouses", { headers }),
              axios.get("http://127.0.0.1:8000/api/units", { headers }),
              axios.get("http://127.0.0.1:8000/api/items", { headers }),
            ]);

 
            setwarehouses(
              warehousesRes.data.data.map(({ id, name }) => ({
                value: id,
                label: name,
              }))
            );
            setunits(
              unitsRes.data.data.map(({ id, name }) => ({
                value: id,
                label: name,
              }))
            );
            setitems(
              itemres.data.data.map(({ id, item_name }) => ({
                value: id,
                label: item_name,
              }))
            );
          } catch (error) {
            console.error("Error fetching data:", error);
            alert("حدث خطأ أثناء جلب البيانات");
          }
        };

        fetchData();
      }, []);
        const handleSaveInvoice = async () => {
          try {
            const authToken = localStorage.getItem("authToken");
            const headers = {
              Authorization: `Bearer ${authToken}`,
              "Content-Type": "application/json",
            };

            const invoiceData = {
              invoice_number: invoiceNumber,
              date: invoiceDate,
              items: illnesses.map((illness) => ({
                item_id: illness.item_id,
                unit_id: illness.unit_id,
                quantity: illness.quantity,
                from_warehouse_id: illness.from_warehouse_id,
                to_warehouse_id: illness.to_warehouse_id,
              })),
            };

            await axios.post(
              "http://127.0.0.1:8000/api/warehouseInvoice",
              invoiceData,
              { headers }
            );
            alert("تم حفظ الفاتورة بنجاح!");
            setShowModal(false);
          } catch (error) {
            console.error("خطأ أثناء إرسال البيانات:", error);
            alert("حدث خطأ أثناء إرسال الفاتورة");
          }
        };

        const handleIllnessChange = (id, field, value) => {
          setIllnesses((prevIllnesses) =>
            prevIllnesses.map((illness) =>
              illness.id === id ? { ...illness, [field]: value } : illness
            )
          );
        };


 





  // خاص بالجداول
  const handleAddIllness = () => {
    setIllnesses([...illnesses, { id: illnesses.length + 1 }]);
  };
    const handleDeleteIllness = (id) => {
      setIllnesses(illnesses.filter((illness) => illness.id !== id));
    };

  return (
    <>
      <Title
        title={t("transfer-invoice-between-stores")}
        icon={<FontAwesomeIcon icon={faFileInvoiceDollar} />}
        style={{ width: "unset" }}
      />
      <div className="TransferInvoiceBetweenStores">
        <div className="warehouse-report ">
          <span className="add-row-ta" onClick={handleShowModal}>
            <FontAwesomeIcon icon={faPlus} /> {t("new-invoice")}
          </span>
        </div>
        <div className="transfer-table">
          <table className="table-rport">
            <thead>
              <tr className="vac-table-header selected-row mm">
                <th>{t("serial-number")}</th>
                <th>{t("item-name")}</th>
                <th>{t("quantity")}</th>
                <th>{t("from-warehouse")}</th>
                <th>{t("to-warehouse")}</th>
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
            {t("transfer-invoice-between-stores")}
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
          <form >
            <div className="form-trans">
              <RegisterTextbox
                parentStyle={{ width: "20%" }}
                label={t("invoice-number")}
                type="number"
                placeholder={t("invoice-number")}
                value={invoiceNumber}
                onChange={(e) => setInvoiceNumber(e.target.value)}
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
                  <th>{t("unit")}</th>
                  <th>{t("quantity")}</th>
                  <th>{t("from-warehouse")}</th>
                  <th>{t("to-warehouse")}</th>
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
                          containerStyle={{ width: "100%" }}
                          options={items}
                          value={illness.item_id}
                          onChange={(e) =>
                            handleIllnessChange(illness.id, "item_id", e.value)
                          }
                        />
                      </td>
                      <td>
                        <SelectComponent
                          placeholder={t("unit")}
                          selectStyle={{ width: "100%" }}
                          containerStyle={{ width: "100%" }}
                          options={units}
                          value={illness.unit_id}
                          onChange={(e) =>
                            handleIllnessChange(illness.id, "unit_id", e.value)
                          }
                        />
                      </td>
                      <td>
                        <RegisterTextbox
                          type="number"
                          stylee={{ width: "100%" }}
                          value={illness.quantity || ""}
                          onChange={(e) =>
                            handleIllnessChange(
                              illness.id,
                              "quantity",
                              e.target.value
                            )
                          }
                        />
                      </td>
                      <td>
                        <SelectComponent
                          placeholder={t("from-warehouse")}
                          selectStyle={{ width: "100%" }}
                          containerStyle={{ width: "100%" }}
                          options={warehouses}
                          value={illness.from_warehouse_id}
                          onChange={(e) =>
                            handleIllnessChange(
                              illness.id,
                              "from_warehouse_id",
                              e.value
                            )
                          }
                        />
                      </td>
                      <td>
                        <SelectComponent
                          placeholder={t("to-warehouse")}
                          selectStyle={{ width: "100%" }}
                          containerStyle={{ width: "100%" }}
                          options={warehouses}
                          value={illness.to_warehouse_id}
                          onChange={(e) =>
                            handleIllnessChange(
                              illness.id,
                              "to_warehouse_id",
                              e.value
                            )
                          }
                        />
                      </td>
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
                    <td colSpan="6" style={{ textAlign: "center" }}>
                      {t("no-items")}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleSaveInvoice}>
            {t("save")}
          </Button>

          <Button variant="secondary" onClick={handleCloseModal}>
            {t("close")}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default TransferInvoiceBetweenStores;
