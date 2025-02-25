import { useState, useEffect } from "react";
import Select from "react-select";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./salesInvoice.css";

import {
  faFileInvoice,
  faPercent,
  faPlus,
  faTrash,
  faCheck,
  faPercentage,
  faTrashCan,
} from "@fortawesome/free-solid-svg-icons";
import KpiTextbox from "../../components/KpiTextbox";
import CustomButton from "../../components/CustomButton";
import { Form } from "react-bootstrap";
import axios from "axios";
import { ClipLoader } from "react-spinners";
import { Modal, Button } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import SelectComponent from "../../components/SelectComponent";
import Title from "../../components/title";
import RegisterTextbox from "../../components/RegisterTextBox";
import RegisterSelect from "../../components/RegisterSelect";
import { Barcode } from "lucide-react";
import React, { useRef } from "react";
import JsBarcode from "jsbarcode";
import { v4 as uuidv4 } from "uuid";

function PurchaseInvoice() {
  const [discount, setDiscount] = useState({ value: "", percentage: "" });
  const [tax, setTax] = useState({ value: "", percentage: "" });
  const [finalTotal, setFinalTotal] = useState(0);
  const [paidAmount, setPaidAmount] = useState(0);
  const [remainingBalance, setRemainingBalance] = useState(0);
  const [isPaidValid, setIsPaidValid] = useState(true);
  const [supplierError, setSupplierError] = useState(false);
  const [phoneError, setPhoneError] = useState(false);
  const [tableData, setTableData] = useState([
    {
      item_id: null,
      unit_id: null,
      price: 0,
      quantity: "",
      total: 0,
      tax: 0,
      description: "",
      production_date: "",
      expiry_date: "",
    },
  ]);

  const [selectedSupplier, setSelectedSupplier] = useState(null);
  const [selectedPhone, setSelectedPhone] = useState(""); // Initialize as an empty string
  const [suppliers, setSuppliers] = useState([]);
  const [accounts, setAccounts] = useState([]);
  const [phoneselected, setPhoneselected] = useState("");
  const [nameselected, setNameselected] = useState("");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState("cash");
  const [accountsData, setAccountsData] = useState([]);
  const [mainAccounts, setMainAccounts] = useState([]);
  const [accountTypes, setAccountTypes] = useState([]);
  const [filteredData, setFilteredData] = useState(null);
  const [selectedAcc, setSelectedAcc] = useState("");
  const [invoiceNumber, setInvoiceNumber] = useState("");
  const [accountError, setAccountError] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const { t } = useTranslation();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [rowToDelete, setRowToDelete] = useState(null);
  const barcodeRef = useRef(null);
  const [barcodeValue, setBarcodeValue] = useState("");
  const [selectedTax, setSelectedTax] = useState("");
  const [invoiceData, setInvoiceData] = useState({});

  const customStyles = {
    control: (base) => ({
      ...base,
      border: "1px solid #ccc",
      borderRadius: "4px",
      boxShadow: "none",
      "&:hover": {
        borderColor: "#888",
      },
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected ? "#f0f0f0" : "white",
      color: "#333",
      "&:hover": {
        backgroundColor: "#e6e6e6",
      },
    }),
  };
  useEffect(() => {
    const fetchSuppliers = async () => {
      const authToken = localStorage.getItem("authToken");
      try {
        const response = await fetch("http://127.0.0.1:8000/api/suppliers", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setSuppliers(data.data ?? []); // إذا كانت `data.data` فارغة، استخدم مصفوفة فارغة
        } else {
          console.error("Failed to fetch suppliers");
          setSuppliers([]); // تعيين مصفوفة فارغة عند الفشل
        }
      } catch (error) {
        console.error("Error:", error);
        setSuppliers([]); // تعيين مصفوفة فارغة عند حدوث خطأ
      }
    };

    fetchSuppliers();
  }, []);

  const token = localStorage.getItem("authToken");

  const [level4Accounts, setLevel4Accounts] = useState([]);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/user/tree", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        const fetchedData = response.data.data || {};
        const dataArray = Object.values(fetchedData);
        setAccountsData(dataArray);

        const level4 = extractLevel4Accounts(dataArray);
        setLevel4Accounts(level4);

        const fatherAccounts = dataArray.filter(
          (account) => !account.parent_id
        );
        setMainAccounts(fatherAccounts);

        const types = dataArray
          .map((account) => account.accountType)
          .filter(Boolean);
        setAccountTypes([...new Set(types)]);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [token]);

  const extractLevel4Accounts = (data) => {
    let level4Accounts = [];

    const traverse = (node) => {
      if (node.level === 4) {
        level4Accounts.push({
          value: node.number,
          label: `${node.number} - ${node.name}`,
        });
      }
      if (node.children && node.children.length > 0) {
        node.children.forEach((child) => traverse(child));
      }
    };

    data.forEach((rootNode) => traverse(rootNode));
    return level4Accounts;
  };

  useEffect(() => {
    const total = calculateTotal();
    const discountedTotal = total - (parseFloat(discount.value) || 0);
    const final = discountedTotal + (parseFloat(tax.value) || 0);

    setFinalTotal(final.toFixed(2));

    const remaining = final - paidAmount;
    setRemainingBalance(remaining);

    setIsPaidValid(paidAmount <= final);
  }, [tableData, tax, paidAmount, discount]);

  const updateFinalTotal = (total, discountValue, taxValue) => {
    const discountedTotal = total - (discountValue || 0);
    const final = discountedTotal + (taxValue || 0);
    setFinalTotal(final.toFixed(2));
  };
  const [fanaildiscount, setfanaildiscount] = useState();

  const handleDiscountChange = (field, value) => {
    const total = calculateTotal();
    let discountValue = 0;
    let discountPercentage = 0;

    if (value !== "") {
      if (field === "value") {
        discountValue = parseFloat(value);
        discountPercentage = ((discountValue / total) * 100).toFixed(2);
      } else {
        discountPercentage = parseFloat(value);
        discountValue = ((discountPercentage / 100) * total).toFixed(2);
      }
      setfanaildiscount(discountValue);
    }

    setDiscount({
      value: discountValue || "",
      percentage: discountPercentage || "",
    });

    updateFinalTotal(total, discountValue, tax.value || 0);
  };

  const calculateTotal = () => {
    return tableData.reduce((sum, row) => sum + row.total, 0);
  };

  const handleProductChange = (index, field, selectedOption) => {
    const updatedData = [...tableData];
    let selectedProduct = null;

    if (field === "name") {
      selectedProduct = products.find(
        (product) => product.name === selectedOption.value
      );
    }

    if (selectedProduct) {
      updatedData[index] = {
        ...updatedData[index],
        code: { value: selectedProduct.code, label: selectedProduct.code },
        name: { value: selectedProduct.name, label: selectedProduct.name },
        price: selectedProduct.price,
        total: selectedProduct.price * (updatedData[index].quantity || 0),
      };

      setTableData(updatedData);
    }
  };

  const handleQuantityChange = (index, updatedQuantity, updatedTotal) => {
    const updatedTableData = [...tableData];
    updatedTableData[index] = {
      ...updatedTableData[index],
      quantity: updatedQuantity,
      total: updatedTotal,
    };
    setTableData(updatedTableData);
  };

  const handleAddRow = () => {
    setTableData([
      ...tableData,
      {
        item_id: null,
        unit_id: null,
        price: 0,
        quantity: "",
        total: 0,
        tax: 0,
        description: "",
        production_date: "",
        expiry_date: "",
      },
    ]);
  };

  const handleClearRow = (index) => {
    const updatedData = [...tableData];
    updatedData.splice(index, 1);
    setTableData(updatedData);
  };

  const handlePaidAmountChange = (e) => {
    const paid = parseFloat(e.target.value) || 0;
    setPaidAmount(paid);

    const total = calculateTotal();
    const discountedTotal = total - (parseFloat(discount.value) || 0);
    const final = discountedTotal + (parseFloat(tax.value) || 0);
    setRemainingBalance(final - paid);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // if (!selectedSupplier) {
    //   setSupplierError(true);
    //   return;
    // }
    // if (!selectedAcc) {
    //   setAccountError(true);
    //   return;
    // }
    // if (!selectedPhone) {
    //   setPhoneError(true);
    //   return;
    // }

    // if (!isPaidValid) {
    //   alert(t("greater-than-the-total"));
    //   return;
    // }

    // const validProducts = tableData.filter(
    //   (row) => row.code !== null && row.code !== undefined
    // );

    // if (validProducts.length === 0) {
    //   setError(true);
    //   return;
    // }

    console.log(tableData);
    const authToken = localStorage.getItem("authToken");

    // Format the invoice data as required by the API
    const invoiceData = {
      invoice_number: invoiceNumber,
      date: new Date().toISOString().split("T")[0], // تنسيق التاريخ كـ YYYY-MM-DD
      payment_method: paymentMethod,
      warehouse_id: selectedWarehouse ? selectedWarehouse.value : null, // استخدام القيمة المختارة
      supplier_customer_name: selectedSupplier,
      account_number: selectedAcc,
      paid: paidAmount,
      discount: fanaildiscount,
      items: tableData.map((row) => ({
        item_id: selectedItem.value,
        unit_id: selectedUnit.value,
        quantity: row.quantity,
        price: price, // إرسال السعر المرتبط بالوحدة
        tax: row.tax || 0, // إذا كان هناك ضريبة
        description: row.description,
        production_date: row.production_date,
        expiry_date: row.expiry_date,
      })),
    };

    console.log("Sending invoice data:", invoiceData);

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/purchase-return-invoice",
        invoiceData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`,
          },
        }
      );

      console.log("Invoice created successfully:", response.data.message);
      setShowSuccessModal(true);
    } catch (error) {
      console.error("Error:", error);
      alert(
        error.response.data.message ||
          "An error occurred while creating the invoice."
      );
    }
  };

  const handlePaymentMethodChange = (e) => {
    setPaymentMethod(e.target.value);
  };

  const handleSupplierChange = (selectedOption) => {
    if (selectedOption) {
      const selected = suppliers.find(
        (supplier) => supplier.name === selectedOption.value
      );
      if (selected) {
        setSelectedSupplier(selected.name);
        setPhoneselected(selected.phone);
        setSelectedPhone(selected.phone);
        setNameselected(selected.name);
        setSupplierError(false);
        setPhoneError(false);
      }
    } else {
      setSelectedSupplier(null);
      setPhoneselected("");
      setSelectedPhone("");
      setNameselected("");
      setSupplierError(true);
    }
  };

  const handlePhoneChange = (e) => {
    const newPhone = e.target.value;
    setSelectedPhone(newPhone);
    setPhoneselected(newPhone);

    const supplier = suppliers.find((supplier) => supplier.phone === newPhone);

    if (supplier) {
      setNameselected(supplier.name);
      setSelectedSupplier(supplier.name);
      setSupplierError(false);
      setPhoneError(false);
    } else {
      setNameselected("");
      setSelectedSupplier(null);
      setSupplierError(true);
      setPhoneError(true);
    }
  };

  const handleAccountChange = (selectedOption) => {
    const selected = suppliers.find(
      (supplier) => supplier.name === selectedOption.value
    );
    const phone = suppliers.find(
      (supplier) => supplier.name === selectedOption.value
    );
    setSelectedSupplier(selected.name);
    setPhoneselected(phone.phone);
  };
  const handleDeleteRequest = (index) => {
    const row = tableData[index];
    const isRowEmpty =
      row.code === null &&
      row.name === null &&
      row.price === 0 &&
      row.quantity === "" &&
      row.total === 0 &&
      row.description === "";

    if (isRowEmpty) {
      handleClearRow(index);
    } else {
      setRowToDelete(index);
      setShowDeleteModal(true);
    }
  };
  // barcode
  useEffect(() => {
    const today = new Date();
    const dateStr = `${today.getFullYear()}${(today.getMonth() + 1)
      .toString()
      .padStart(2, "0")}${today.getDate().toString().padStart(2, "0")}`;

    let lastNumber = localStorage.getItem("lastBarcodeNumber");
    let newNumber = lastNumber ? parseInt(lastNumber) + 1 : 1;

    const newBarcode = `${dateStr}-${newNumber.toString().padStart(3, "0")}`;
    setBarcodeValue(newBarcode);

    localStorage.setItem("lastBarcodeNumber", newNumber);

    if (barcodeRef.current) {
      JsBarcode(barcodeRef.current, newBarcode, {
        format: "CODE128",
        displayValue: true,
      });
    }
  }, []);
  // barcode

  // ===================
  const [items, setItems] = useState([]); // قائمة الأصناف
  const [selectedItem, setSelectedItem] = useState(null); // الصنف المحدد
  const [units, setUnits] = useState([]); // قائمة الوحدات للصنف المحدد
  const [selectedUnit, setSelectedUnit] = useState(null); // الوحدة المحددة
  const [price, setPrice] = useState(""); // السعر

  useEffect(() => {
    const token = localStorage.getItem("authToken"); // جلب التوكين من localStorage

    axios
      .get("http://127.0.0.1:8000/api/items", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setItems(response.data.data); // حفظ الأصناف في state
      })
      .catch((error) => console.error("Error fetching items:", error));
  }, []);

  const handleItemChange = (selectedOption) => {
    setSelectedItem(selectedOption);
    const item = items.find((item) => item.id === selectedOption.value);

    if (item) {
      setUnits(
        item.unit_items.map((unitItem) => ({
          value: unitItem.unit.id,
          label: unitItem.unit.name,
          price: unitItem.purchase_price,
        }))
      );

      if (item.unit_items.length > 0) {
        const defaultUnit = item.unit_items[0];
        setSelectedUnit({
          value: defaultUnit.unit.id,
          label: defaultUnit.unit.name,
        });
        setPrice(defaultUnit.purchase_price);
      }
    }
  };

  const handleUnitChange = (selectedOption) => {
    setSelectedUnit(selectedOption); // تحديث الوحدة المختارة
    const selectedUnitData = units.find(
      (unit) => unit.value === selectedOption.value
    );
    if (selectedUnitData) {
      setPrice(selectedUnitData.price); // تحديث السعر بناءً على الوحدة المختارة
    }
  };
  // ======================
  const taxOptions = [
    { value: "5", label: "5%" },
    { value: "10", label: "10%" },
    { value: "15", label: "15%" },
    { value: "0", label: "No Tax" },
  ];

  const handleTaxChange = (selectedTaxValue) => {
    setSelectedTax(selectedTaxValue);

    setInvoiceData((prevData) => ({
      ...prevData,
      tax: selectedTaxValue,
    }));
  };
  const handleProductionDateChange = (index, date) => {
    const updatedItems = [...items];
    updatedItems[index].production_date = date;
    setItems(updatedItems);
  };

  const handleExpiryDateChange = (index, date) => {
    const updatedItems = [...items];
    updatedItems[index].expiry_date = date;
    setItems(updatedItems);
  };
  // =======================
  const [warehouses, setWarehouses] = useState([]);
  const [selectedWarehouse, setSelectedWarehouse] = useState(null);

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

  useEffect(() => {
    fetchWarehouses();
  }, []);

  return (
    <>
      <div className="salesinvoice">
        <Title
          className="title-buy"
          title={t("Purchase-Return-Invoice")}
          icon={<FontAwesomeIcon icon={faFileInvoice} />}
        />
        <div className="paymentMethod">
          <span>{t("paymentMethod")} </span>
          <div className="paymentMethod1">
            <div className="">
              <Form.Check
                inline
                label={t("cash")}
                type="radio"
                className="createManage-redio"
                value="cash"
                onChange={handlePaymentMethodChange}
                checked={paymentMethod === "cash"}
              />
            </div>
            <div className="">
              <Form.Check
                inline
                label={t("Incredit")}
                type="radio"
                className="createManage-redio"
                value="postpaid"
                onChange={handlePaymentMethodChange}
                checked={paymentMethod === "postpaid"}
              />
            </div>
          </div>
        </div>
        <Form className="salesinvoiceForm" onSubmit={handleSubmit}>
          <div className="salesinvoiceInfo">
            <div className="Invoicesinput">
              <div className="eerr-sap">
                <SelectComponent
                  label={t("supplierName")}
                  placeholder={t("supplierName")}
                  options={(suppliers ?? []).map((supplier) => ({
                    value: supplier.name,
                    label: supplier.name,
                  }))}
                  onChange={handleSupplierChange}
                  containerStyle={{
                    width: "100%",
                  }}
                  value={
                    nameselected
                      ? { value: nameselected, label: nameselected }
                      : null
                  }
                />
                {supplierError && (
                  <div
                    style={{
                      color: "red",
                      fontSize: "14px",
                    }}
                  >
                    {t("supplier-name-required")}
                  </div>
                )}
              </div>
              <RegisterTextbox
                parentStyle={{ width: "20%" }}
                id="address"
                label={t("InvoiceNO")}
                type="text"
                onChange={(e) => setInvoiceNumber(e.target.value)}
              />
              <RegisterTextbox
                id="phone"
                label={t("phoneNumber")}
                type="text"
                onChange={handlePhoneChange}
                parentStyle={{ width: "20%" }}
                value={selectedPhone}
              />
            </div>
          </div>
          <div className="salesinvoiceInfo">
            <div className="Invoicesinput">
              <div className="eerr-sap">
                <SelectComponent
                  label={t("Choose-Account-Receivable")}
                  placeholder={t("Choose-Account-Receivable")}
                  options={level4Accounts}
                  onChange={(selectedOption) => {
                    const accdata = selectedOption.value;
                    setSelectedAcc(accdata);
                    setAccountError(false);
                  }}
                  containerStyle={{
                    width: "100%",
                  }}
                />
                {accountError && (
                  <div
                    style={{
                      color: "red",
                      fontSize: "14px",
                      marginTop: 4,
                      textAlign: "lift",
                    }}
                  >
                    {t("You-must-enter-the-payment-account")}{" "}
                  </div>
                )}
              </div>
              <RegisterTextbox
                parentStyle={{ width: "20%" }}
                id="name"
                label={t("date")}
                type="date"
              />

              <SelectComponent
                label={t("warehouse")}
                options={warehouses.map((warehouse) => ({
                  value: warehouse.id,
                  label: warehouse.name,
                }))}
                placeholder={t("warehouse")}
                value={selectedWarehouse}
                onChange={(selectedOption) =>
                  setSelectedWarehouse(selectedOption)
                }
                menuPortalTarget={document.body}
                containerStyle={{
                  width: "20%",
                }}
              />
            </div>
          </div>

          <div className="salesinvoiceTable">
            <span onClick={handleAddRow} className="addrowInvoice" href="/#">
              <FontAwesomeIcon icon={faPlus} /> {t("Additem")}
            </span>
            <div className="invoiceTableContainer">
              <table className="invoicetable">
                <thead className="invoicetable-thead">
                  <tr>
                    <th>{t("Itemname")}</th>
                    <th>{t("unit")}</th>
                    <th>{t("price")}</th>
                    <th>{t("Quantity")}</th>
                    <th>{t("Total")}</th>
                    <th>{t("Tax")}</th>
                    <th>{t("production-date")}</th>
                    <th>{t("expiration-date")}</th>

                    <th></th>
                  </tr>
                </thead>
                <tbody className="invoicetable-tbody">
                  {tableData.map((row, index) => (
                    <tr key={index}>
                      <td>
                        <SelectComponent
                          className="Slect-hh"
                          options={items.map((item) => ({
                            value: item.id,
                            label: item.item_name,
                          }))}
                          value={selectedItem}
                          onChange={handleItemChange}
                          placeholder={t("Itemname")}
                        />
                      </td>
                      <td>
                        <SelectComponent
                          className="Slect-hh"
                          options={units}
                          onChange={handleUnitChange}
                          value={selectedUnit}
                          placeholder={t("unit")}
                        />
                      </td>
                      <td>
                        <input
                          type="number"
                          className="amountinvoice"
                          value={price}
                          readOnly
                        />
                      </td>
                      <td>
                        <input
                          type="number"
                          value={row.quantity}
                          className="amountinvoice"
                          onChange={(e) => {
                            const updatedQuantity = e.target.value;
                            const updatedTotal = updatedQuantity * price;
                            handleQuantityChange(
                              index,
                              updatedQuantity,
                              updatedTotal
                            );
                          }}
                        />
                        {/* مش فاهمها */}
                      </td>
                      <td>{row.total}</td>
                      <td>
                        <SelectComponent
                          className="Slect-hh"
                          options={taxOptions} // تمرير الخيارات
                          onChange={handleTaxChange} // تمرير دالة التغيير
                          placeholder="Select Tax"
                        />
                      </td>

                      <td>
                        <RegisterTextbox
                          type="date"
                          value={row.production_date}
                          onChange={(e) =>
                            handleProductionDateChange(index, e.target.value)
                          }
                          stylee={{ width: "10%" }}
                        />
                      </td>

                      <td>
                        <RegisterTextbox
                          type="date"
                          value={row.expiry_date} // القيمة المستلمة من الحالة
                          onChange={(e) =>
                            handleExpiryDateChange(index, e.target.value)
                          }
                          stylee={{ width: "10%" }}
                        />
                      </td>

                      <td>
                        <span
                          className="clearRowBtn"
                          onClick={() => handleDeleteRequest(index)}
                        >
                          <FontAwesomeIcon icon={faTrash} />
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="chooseacount">
            <div className="chooseaccountrow">
              <RegisterTextbox
                className="input-nsba"
                label={t("discount")}
                type="number"
                value={discount.value}
                onChange={(e) => handleDiscountChange("value", e.target.value)}
                parentStyle={{ width: "10%" }}
              />
              <RegisterTextbox
                className="input-nsba"
                label={t("Discount-rate")}
                type="number"
                value={discount.percentage}
                onChange={(e) =>
                  handleDiscountChange("percentage", e.target.value)
                }
                parentStyle={{ width: "10%" }}
                prefix={<FontAwesomeIcon icon={faPercentage} />}
              />
              {paymentMethod === "cash" && (
                <RegisterTextbox
                  label={t("Total")}
                  type="text"
                  value={finalTotal || calculateTotal()}
                  disabled={true}
                  parentStyle={{ width: "10%" }}
                />
              )}

              {paymentMethod === "postpaid" && (
                <>
                  <RegisterTextbox
                    label={t("Total")}
                    type="text"
                    value={finalTotal || calculateTotal()}
                    disabled={true}
                    parentStyle={{ width: "10%" }}
                  />

                  <RegisterTextbox
                    label={t("Paid")}
                    type="text"
                    value={paidAmount}
                    onChange={handlePaidAmountChange}
                    parentStyle={{ width: "10%" }}
                  />

                  <RegisterTextbox
                    label={t("residual")}
                    type="number"
                    value={remainingBalance || 0}
                    disabled={true}
                    parentStyle={{ width: "10%" }}
                  />
                </>
              )}
              {!isPaidValid && (
                <div className="error">{t("greater-than-the-total")}</div>
              )}
              <div className=" dddd">
                <svg ref={barcodeRef} className=" ss"></svg>
              </div>
            </div>

            <div className="InvoiceButton">
              <CustomButton text={t("save")} />
            </div>
          </div>
        </Form>
      </div>
      <Modal
        show={showSuccessModal}
        onHide={() => setShowSuccessModal(false)}
        className="invoice-modal"
        centered
      >
        <Modal.Body className="text-center  ">
          {/* Check mark with circle */}
          <div className="status-icon  ">
            <div className="circle-border">
              <FontAwesomeIcon icon={faCheck} className="check-icon" />
            </div>
          </div>

          <h3 className="text-dark  ">{t("invoic-successfully")}</h3>

          {/* Buttons */}
          <div className="d-flex gap-3 justify-content-center mt-4">
            <button
              className="btn btn-primary px-4 py-2"
              onClick={() => {
                setShowSuccessModal(false);
              }}
            >
              {t("view-entries")}
            </button>

            <button
              className="btn btn-outline-secondary px-4 py-2"
              onClick={() => setShowSuccessModal(false)}
            >
              {t("close")}
            </button>
          </div>
        </Modal.Body>
      </Modal>
      {/*    delete modal */}
      <Modal
        show={showDeleteModal}
        onHide={() => setShowDeleteModal(false)}
        className="custom-delete-modal"
        backdrop="static"
        keyboard={false}
        centered
      >
        <Modal.Body className="modl-delete">
          <div className="circl-trash">
            <FontAwesomeIcon icon={faTrashCan} className="trash-ic" />
          </div>
          {t("confirm-delete-row")}
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setShowDeleteModal(false)}
            className="cancel-btn"
          >
            {t("cancel")}
          </Button>
          <Button
            variant="danger"
            onClick={() => {
              handleClearRow(rowToDelete);
              setShowDeleteModal(false);
            }}
            className="confirm-delete-btn"
          >
            {t("delete")}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default PurchaseInvoice;

{
  /* <td>
                          <SelectComponent
                            className="Slect-hh"
                            options={products.map((product) => ({
                              value: product.name, // Use product name as the value
                              label: product.name, // Use product name as the label
                            }))}
                            value={row.name} // Bind the value to the row's name
                            onChange={(selectedOption) =>
                              handleProductChange(index, "name", selectedOption)
                            }
                            placeholder={t("Itemname")}
                            styles={customStyles}
                            menuPortalTarget={document.body}
                          />
                        </td>
                        <td>
                          <SelectComponent
                            className="Slect-hh"
                            placeholder={t("unit")}
                            options={Units}
                          />
                        </td>
                        <td>
                          <input
                            type="number"
                            value={row.price}
                            className="amountinvoice"
                            onChange={(e) =>
                              handleInputChange(index, "price", e.target.value)
                            }
                          />
                        </td> */
}

// title={t("Purchase-Return-Invoice")}
