import { faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Title from "../../components/title";
import SelectComponent from "../../components/SelectComponent";
import RegisterTextbox from "../../components/RegisterTextBox";
import "./additem.css";
import { Form } from "react-bootstrap";
import { useEffect, useState } from "react";
import CustomButton from "../../components/CustomButton";
import { t } from "i18next";
import axios from "axios";

function Additem() {
  // State variables
  const [illnesses, setIllnesses] = useState([{ id: 1 }]);
  const [hasExpiryDate, setHasExpiryDate] = useState(false);
  const [secondTableRows, setSecondTableRows] = useState([{ id: 1 }]);
  const [categories, setCategories] = useState([]);
  const [warehouses, setWarehouses] = useState([]);
  const [units, setUnits] = useState([]);
  const [selectedUnits, setSelectedUnits] = useState([]);

  const [selectedCategory, setSelectedCategory] = useState("");
  const [itemCode, setItemCode] = useState("");
  const [itemName, setItemName] = useState("");
  const [minimumQuantity, setMinimumQuantity] = useState("");
  const [description, setDescription] = useState("");

  //   APIs
  useEffect(() => {
    const fetchData = async () => {
      try {
        const authToken = localStorage.getItem("authToken");
        const headers = { Authorization: `Bearer ${authToken}` };

        const [categoriesRes, warehousesRes, unitsRes] = await Promise.all([
          axios.get("http://127.0.0.1:8000/api/categories", { headers }),
          axios.get("http://127.0.0.1:8000/api/warehouses", { headers }),
          axios.get("http://127.0.0.1:8000/api/units", { headers }),
        ]);

        setCategories(
          categoriesRes.data.data.map(({ id, name }) => ({
            value: id,
            label: name,
          }))
        );
        setWarehouses(
          warehousesRes.data.data.map(({ id, name }) => ({
            value: id,
            label: name,
          }))
        );
        setUnits(
          unitsRes.data.data.map(({ id, name }) => ({ value: id, label: name }))
        );
      } catch (error) {
        console.error("Error fetching data:", error);
        alert("حدث خطأ أثناء جلب البيانات");
      }
    };

    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const authToken = localStorage.getItem("authToken");
      const headers = { Authorization: `Bearer ${authToken}` };

      const requestData = {
        category_id: selectedCategory.value,
        item_code: itemCode,
        item_name: itemName,
        minimum: minimumQuantity,
        description: description,
        unit_items: illnesses.map((unit) => ({
          unit_id: unit.unit.value,
          barcode: unit.barcode,
          total_quantity: unit.quantity,
          sub_unit_id: unit.subunit.value,
          purchase_price: unit.purchasePrice,
          retail_selling_price: unit.retailPrice,
          wholesale_selling_price: unit.wholesalePrice,
        })),
        warehouse_items: secondTableRows.map((warehouse) => ({
          warehouse_id: warehouse.warehouse_id.value,
          quantity: warehouse.quantity,
          unit_id: warehouse.unit_id.value,
          production_date: warehouse.production_date,
          expiry_date: warehouse.expiry_date,
        })),
      };
      console.log(secondTableRows);

      const response = await axios.post(
        "http://127.0.0.1:8000/api/addItem",
        requestData,
        { headers }
      );

      alert("تمت إضافة العنصر بنجاح!");
      console.log("تم إرسال البيانات:", response.data);
    } catch (error) {
      console.error("Error posting item data:", error);
      alert(error);
    }
  };

  const handleAddIllness = () => {
    setIllnesses((prevIllnesses) => [
      ...prevIllnesses,
      {
        id: prevIllnesses.length + 1,
        unit_id: null,
        barcode: "",
        total_quantity: 0,
        sub_unit_id: null,
        purchase_price: 0,
        retail_selling_price: 0,
        wholesale_selling_price: 0,
      },
    ]);
  };

  const handleDeleteIllness = (id) => {
    setIllnesses((prevIllnesses) =>
      prevIllnesses.filter((illness) => illness.id !== id)
    );
  };

  const handleAddRowToSecondTable = () => {
    setSecondTableRows((prevRows) => [
      ...prevRows,
      {
        id: prevRows.length + 1,
        warehouse_id: null,
        quantity: 0,
        unit_id: null,
        purchase_price: 0,
        production_date: "",
        expiry_date: "",
      },
    ]);
  };

  const handleDeleteRowFromSecondTable = (id) => {
    setSecondTableRows((prevRows) => prevRows.filter((row) => row.id !== id));
  };

  const handleRowChange = (id, field, value) => {
    setSecondTableRows((prevRows) =>
      prevRows.map((row) => (row.id === id ? { ...row, [field]: value } : row))
    );
  };

  const handleIllnessChange = (id, field, value) => {
    setIllnesses((prevIllnesses) =>
      prevIllnesses.map((illness) =>
        illness.id === id ? { ...illness, [field]: value } : illness
      )
    );

    if (field === "unit"||field === "subunit") {
      setSelectedUnits((prevUnits) => {
        const newUnits = [...prevUnits];
        if (!newUnits.some((unit) => unit.value === value.value)) {
          newUnits.push(value);
        }
        return newUnits;
      });
    }
  };

 

  return (
    <>
      <Title
        title={t("add-new-item")}
        icon={<FontAwesomeIcon icon={faPlus} />}
      />
      <Form className="Additem" onSubmit={handleSubmit}>
        <div className="form-additem">
          <SelectComponent
            label={t("category")}
            placeholder={t("category")}
            containerStyle={{ width: "20%" }}
            options={categories}
            onChange={(selectedOption) => setSelectedCategory(selectedOption)}
          />
          <RegisterTextbox
            parentStyle={{ width: "20%" }}
            label={t("item-name")}
            type="text"
            value={itemName}
            onChange={(e) => setItemName(e.target.value)}
          />
          <RegisterTextbox
            parentStyle={{ width: "20%" }}
            label={t("item-code")}
            type="text"
            value={itemCode}
            onChange={(e) => setItemCode(e.target.value)}
          />
        </div>
        <div className="form-additem">
          <RegisterTextbox
            parentStyle={{ width: "20%" }}
            label={t("minimum-quantity")}
            type="text"
            value={minimumQuantity}
            onChange={(e) => setMinimumQuantity(e.target.value)}
          />
          <RegisterTextbox
            parentStyle={{ width: "20%" }}
            label={t("description")}
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <div className="date-addatem">
            <span className="check-expiry">{t("expiry-date")}</span>
            <Form.Check
              inline
              label={t("yes")}
              type="radio"
              name="expiryDate"
              className="createManage-redio"
              onChange={() => setHasExpiryDate(true)}
            />
            <Form.Check
              inline
              label={t("no")}
              type="radio"
              name="expiryDate"
              className="createManage-redio"
              onChange={() => setHasExpiryDate(false)}
            />
          </div>
        </div>
        <div className="form-additem"></div>
        <div className="form-additem"></div>

        <>
          <div className="AddBeneficiary">
            <div className="AddBeneficiaryContainer">
              <div className="add-row">
                <span
                  onClick={handleAddIllness}
                  className="addrowInvoice"
                  href="/#"
                >
                  <FontAwesomeIcon icon={faPlus} /> {t("add-row")}
                </span>
              </div>
              <div className="duplicatedContent">
                <table className="vac-custom-table additem-table">
                  <thead>
                    <tr className="vac-table-header selected-row">
                      <th>{t("unit-type")}</th>
                      <th>{t("contains")}</th>
                      <th>{t("subunit")}</th>
                      <th>{t("purchase-price")}</th>
                      <th>{t("wholesale-price")}</th>
                      <th>{t("retail-price")}</th>
                      <th>{t("barcode")}</th>

                      <th> </th>
                    </tr>
                  </thead>
                  <tbody>
                    {illnesses.length > 0 ? (
                      illnesses.map((illness) => (
                        <tr key={illness.id} className="selected-row">
                          <td>
                            <SelectComponent
                              placeholder={t("unit")}
                              // selectStyle={{ width: "100%" }}
                              containerStyle={{
                                width: "80%",
                                margin: "auto",
                                padding: "1px",
                              }}
                              options={units}
                              value={illness.unit}
                              onChange={(value) =>
                                handleIllnessChange(illness.id, "unit", value)
                              }
                            />
                          </td>
                          <td>
                            <RegisterTextbox
                              id={`danger-${illness.id}`}
                              type="text"
                              // stylee={{ width: "80%" }}
                              parentStyle={{ width: "80%", margin: "auto" }}
                              value={illness.quantity}
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
                              placeholder={t("type")}
                              // selectStyle={{ width: "100%" }}
                              containerStyle={{
                                width: "80%",
                                margin: "auto",
                                padding: "1px",
                              }}
                              options={units}
                              value={illness.subunit}
                              onChange={(value) =>
                                handleIllnessChange(
                                  illness.id,
                                  "subunit",
                                  value
                                )
                              }
                            />
                          </td>
                          <td>
                            <RegisterTextbox
                              id={`cost-${illness.id}`}
                              type="number"
                              // stylee={{ width: "100%" }}
                              parentStyle={{ width: "80%", margin: "auto" }}
                              value={illness.purchasePrice}
                              onChange={(e) =>
                                handleIllnessChange(
                                  illness.id,
                                  "purchasePrice",
                                  e.target.value
                                )
                              }
                            />
                          </td>
                          <td>
                            <RegisterTextbox
                              id={`wholesale-${illness.id}`}
                              type="text"
                              // stylee={{ width: "100%" }}
                              parentStyle={{ width: "80%", margin: "auto" }}
                              value={illness.wholesalePrice}
                              onChange={(e) =>
                                handleIllnessChange(
                                  illness.id,
                                  "wholesalePrice",
                                  e.target.value
                                )
                              }
                            />
                          </td>
                          <td>
                            <RegisterTextbox
                              id={`retail-${illness.id}`}
                              type="text"
                              stylee={{ width: "100%" }}
                              parentStyle={{ width: "80%", margin: "auto" }}
                              value={illness.retailPrice}
                              onChange={(e) =>
                                handleIllnessChange(
                                  illness.id,
                                  "retailPrice",
                                  e.target.value
                                )
                              }
                            />
                          </td>
                          <td>
                            <RegisterTextbox
                              id={`barcode-${illness.id}`}
                              type="text"
                              // stylee={{ width: "100%" }}
                              parentStyle={{ width: "80%", margin: "auto" }}
                              value={illness.barcode}
                              onChange={(e) =>
                                handleIllnessChange(
                                  illness.id,
                                  "barcode",
                                  e.target.value
                                )
                              }
                            />
                          </td>
                          <td className="dlete-itmm">
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
                        <td colSpan="8" style={{ textAlign: "center" }}>
                          {t("no-items")}
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="form-additem-s">
              <div className="add-row">
                <span
                  onClick={handleAddRowToSecondTable}
                  className="addrowInvoice"
                >
                  <FontAwesomeIcon icon={faPlus} /> {t("add-row")}
                </span>
              </div>
              <table className="vac-custom-table table-quantity">
                <thead>
                  <tr className="vac-table-header selected-row">
                    <th className="quantity">{t("Quantity")}</th>
                    <th>{t("unit")}</th>
                    <th>{t("warehouse")}</th>
                    {hasExpiryDate && (
                      <>
                        <th>{t("production-date")}</th>
                        <th> </th>
                      </>
                    )}
                    <th> </th>
                  </tr>
                </thead>
                <tbody>
                  {secondTableRows.length > 0 ? (
                    secondTableRows.map((row, index) => (
                      <tr key={row.id} className="selected-row">
                        <td className="quantity">
                          <RegisterTextbox
                            id={`quantity-${row.id}`}
                            type="text"
                            stylee={{ width: "100%" }}
                            value={row.quantity}
                            onChange={(e) =>
                              handleRowChange(
                                row.id,
                                "quantity",
                                e.target.value
                              )
                            }
                          />
                        </td>
                        <td>
                          <SelectComponent
                            placeholder={t("unit")}
                            // selectStyle={{ width: "100%" }}
                            containerStyle={{ width: "80%", margin: "auto" }}
                            options={selectedUnits} // الآن يتم تحديثها تلقائيًا
                            value={row.unit_id}
                            onChange={(value) =>
                              handleRowChange(row.id, "unit_id", value)
                            }
                          />
                        </td>
                        <td>
                          <SelectComponent
                            options={warehouses}
                            placeholder={t("warehouse")}
                            // selectStyle={{ width: "100%" }}
                            containerStyle={{ width: "80%", margin: "auto" }}
                            value={row.warehouse_id}
                            onChange={(value) =>
                              handleRowChange(row.id, "warehouse_id", value)
                            }
                          />
                        </td>
                        {hasExpiryDate && (
                          <>
                            <td>
                              <RegisterTextbox
                                type="date"
                                stylee={{ width: "10%" }}
                                value={row.production_date}
                                onChange={(e) =>
                                  handleRowChange(
                                    row.id,
                                    "production_date",
                                    e.target.value
                                  )
                                }
                              />
                            </td>
                            <td>
                              <RegisterTextbox
                                type="date"
                                stylee={{ width: "10%" }}
                                value={row.expiry_date}
                                onChange={(e) =>
                                  handleRowChange(
                                    row.id,
                                    "expiry_date",
                                    e.target.value
                                  )
                                }
                              />
                            </td>
                          </>
                        )}
                        <td className="delet-quantity">
                          <FontAwesomeIcon
                            className="clearRowBtn"
                            icon={faTrash}
                            style={{ cursor: "pointer" }}
                            onClick={() =>
                              handleDeleteRowFromSecondTable(row.id)
                            }
                          />
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="4" style={{ textAlign: "center" }}>
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
        </>
      </Form>
    </>
  );
}

export default Additem;
