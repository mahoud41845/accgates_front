import { useState, useEffect } from "react";
import Select from "react-select";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Title from "../../components/title";
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
import RegisterTextbox from "../../components/RegisterTextBox";
import KpiTextbox from "../../components/KpiTextbox";
import RegisterSelect from "../../components/RegisterSelect";
import CustomButton from "../../components/CustomButton";
import { Form } from "react-bootstrap";
import SelectComponent from "../../components/SelectComponent";
import axios from "axios";
import { ClipLoader } from "react-spinners";
import { Modal, Button } from "react-bootstrap";
import { useTranslation } from "react-i18next";

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
      code: null,
      name: null,
      price: 0,
      quantity: "",
      total: 0,
      description: "",
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
  const [accountError, setAccountError] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const { t } = useTranslation();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [rowToDelete, setRowToDelete] = useState(null);
  const [invoiceNumber, setInvoiceNumber] = useState("");



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
     const response = await fetch("http://127.0.0.1:8000/api/customers", {
       method: "GET",
       headers: {
         "Content-Type": "application/json",
         Authorization: `Bearer ${authToken}`,
       },
     });

     if (response.ok) {
       const data = await response.json();

       if (Array.isArray(data)) {
         setSuppliers(data);
       } else if (data.data && Array.isArray(data.data)) {
         setSuppliers(data.data);
       } else {
         console.error("Unexpected data format:", data);
       }
     } else {
       console.error("Failed to fetch suppliers");
     }
   } catch (error) {
     console.error("Error fetching suppliers:", error);
   }
 };

    const fetchProducts = async () => {
      const authToken = localStorage.getItem("authToken");
      try {
        const response = await fetch("http://127.0.0.1:8000/api/products", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          console.log("API Response:", data);

          if (data.data && Array.isArray(data.data)) {
            setProducts(data.data);
          } else if (Array.isArray(data)) {
            setProducts(data);
            console.log(products);
          } else {
            setError("Products data is not in the expected format");
          }
        } else {
          setError("Failed to fetch products");
        }
      } catch (error) {
        setError("Error fetching products");
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSuppliers();
    fetchProducts();
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
  }, [tableData, tax, paidAmount]);

  const updateFinalTotal = (total, discountValue, taxValue) => {
    const discountedTotal = total - (discountValue || 0);
    const final = discountedTotal + (taxValue || 0);
    setFinalTotal(final.toFixed(2));
  };

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
    }

    setDiscount({
      value: discountValue || "",
      percentage: discountPercentage || "",
    });

    updateFinalTotal(total, discountValue, tax.value || 0);
  };

  const handleTaxChange = (field, value) => {
    const total = calculateTotal();
    let taxValue = 0;
    let taxPercentage = 0;

    if (value !== "") {
      if (field === "value") {
        taxValue = parseFloat(value);
        taxPercentage = ((taxValue / total) * 100).toFixed(2);
      } else {
        taxPercentage = parseFloat(value);
        taxValue = ((taxPercentage / 100) * total).toFixed(2);
      }
    }

    setTax({ value: taxValue || "", percentage: taxPercentage || "" });
    updateFinalTotal(total, discount.value || 0, taxValue);
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

  const handleInputChange = (index, field, value) => {
    const updatedData = [...tableData];
    updatedData[index][field] = value;

    if (field === "quantity" || field === "price") {
      updatedData[index].total =
        updatedData[index].quantity * updatedData[index].price;
    }

    setTableData(updatedData);
  };

  const handleAddRow = () => {
    setTableData([
      ...tableData,
      {
        code: null,
        name: null,
        price: 0,
        quantity: "",
        total: 0,
        description: "",
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

    if (!selectedSupplier) {
      setSupplierError(true);
      return;
    }
    if (!selectedAcc) {
      setAccountError(true);
      return;
    }
    if (!selectedPhone) {
      setPhoneError(true);
      return;
    }

    if (!isPaidValid) {
      alert(t("greater-than-the-total"));      return;
    }

    const validProducts = tableData.filter(
      (row) => row.code !== null && row.code !== undefined
    );

    if (validProducts.length === 0) {
      setError(true);
      return;
    }

    const authToken = localStorage.getItem("authToken");

    const invoiceData = {
      date: new Date().toISOString().split("T")[0],
      payment_method: paymentMethod,
      supplier_customer_name: selectedSupplier,
      invoiceNumber: invoiceNumber,
      account_number: selectedAcc,
      discount: 0,
      paid: paidAmount,
      products: validProducts.map((row) => ({
        product_name: products.find(
          (product) => product.name === row.name.value
        )?.name,
        quantity: row.quantity,
        description: "hfcghgghf",
        tax: 0,
      })),
    };

    console.log("Sending invoice data:", invoiceData);

    try {
      const response = await fetch(
        "http://127.0.0.1:8000/api/sales-return-invoice",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`,
          },
          body: JSON.stringify(invoiceData),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Failed to create invoice. Server response:", errorData);

        const errorMessage =
          errorData.message || "An error occurred while creating the invoice.";
        throw new Error(errorMessage);
      }

      const data = await response.json();
      console.log("Invoice created successfully:", data);
      // alert("Invoice created successfully!");
      setShowSuccessModal(true);
    } catch (error) {
      console.error("Error:", error);
      alert(error.message || "An error occurred while creating the invoice.");
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

  return (
    <>
      <div className="salesinvoice">
        <Title
          className="title-buy"
          title={t("Sales-return-invoice")}
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
                  label={t("Customer-name")}
                  placeholder={t("Customer-name")}
                  options={suppliers.map((supplier) => ({
                    value: supplier.name,
                    label: supplier.name,
                  }))}
                  onChange={handleSupplierChange}
                  selectStyle={{
                    width: "100%",
                  }}
                  containerStyle={
                    {
                      // width: "45%",
                    }
                  }
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
                    {t("customer-name-required")}
                  </div>
                )}
              </div>
              <RegisterTextbox
                parentStyle={{ width: "45%" }}
                id="address"
                label={t("InvoiceNO")}
                type="text"
                stylee={{ width: "100%" }}
                onChange={(e) => setInvoiceNumber(e.target.value)}
              />
              <div className="eerr-sap">
                <RegisterTextbox
                  id="phone"
                  label={t("phoneNumber")}
                  type="text"
                  onChange={handlePhoneChange}
                  stylee={{ width: "100%" }}
                  value={selectedPhone}
                />
              </div>
              <RegisterTextbox
                parentStyle={{ width: "45%" }}
                id="name"
                label={t("date")}
                type="date"
                stylee={{ width: "100%" }}
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
                    <th> {t("Item code")} </th>
                    <th>{t("Itemname")}</th>
                    <th>{t("price")}</th>
                    <th>{t("Quantity")}</th>
                    <th>{t("Total")}</th>
                    <th>{t("Tax")}</th>
                    <th>{t("warehouse")}</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody className="invoicetable-tbody">
                  {tableData.map((row, index) => (
                    <tr key={index}>
                      <td>
                        <SelectComponent
                          className="Slect-hh"
                          options={products.map((product) => ({
                            value: product.code,
                            label: product.code,
                          }))}
                          value={row.code}
                          onChange={(selectedOption) =>
                            handleProductChange(index, "code", selectedOption)
                          }
                          placeholder={t("Item code")}
                          styles={customStyles}
                          menuPortalTarget={document.body}
                        />
                      </td>
                      <td>
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
                        <input
                          type="number"
                          value={row.price}
                          className="amountinvoice"
                          onChange={(e) =>
                            handleInputChange(index, "price", e.target.value)
                          }
                        />
                      </td>
                      <td>
                        <input
                          type="number"
                          value={row.quantity}
                          className="amountinvoice"
                          onChange={(e) =>
                            handleInputChange(index, "quantity", e.target.value)
                          }
                        />
                      </td>
                      <td>{row.total}</td>
                      <td>
                        <SelectComponent
                          className="Slect-hh"
                          options={products.map((product) => ({
                            value: product.code,
                            label: product.code,
                          }))}
                          placeholder={t("Tax")}
                          styles={customStyles}
                          menuPortalTarget={document.body}
                        />
                      </td>
                      <td>
                        <SelectComponent
                          className="Slect-hh"
                          options={products.map((product) => ({
                            value: product.code,
                            label: product.code,
                          }))}
                          placeholder={t("warehouse")}
                          styles={customStyles}
                          menuPortalTarget={document.body}
                        />
                      </td>
                      {/* <td>
                        <KpiTextbox
                          parentStyle={{ marginBottom: "20px", margin: "auto" }}
                          stylee={{ height: "100px" }}
                          rows={5}
                          placeholder=""
                          disabled={false}
                          value={row.description}
                          onChange={(e) =>
                            handleInputChange(
                              index,
                              "description",
                              e.target.value
                            )
                          }
                          styleeParent={{ width: "150px" }}
                        />
                      </td> */}
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
              <div className="eerr-acc">
                <SelectComponent
                  label={t("Choosepaymentaccount")}
                  placeholder={t("Choosepaymentaccount")}
                  options={level4Accounts}
                  onChange={(selectedOption) => {
                    const accdata = selectedOption.value;
                    setSelectedAcc(accdata);
                    setAccountError(false);
                  }}
                  selectStyle={{
                    width: "100%",
                  }}
                  containerStyle={
                    {
                      // width: "25%",
                    }
                  }
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
                className="input-nsba"
                label={t("discount")}
                type="number"
                value={discount.value}
                onChange={(e) => handleDiscountChange("value", e.target.value)}
                parentStyle={{ width: "25%" }}
                stylee={{ width: "100%" }}
              />
              <RegisterTextbox
                className="input-nsba"
                label={t("Discount-rate")}
                type="number"
                value={discount.percentage}
                onChange={(e) =>
                  handleDiscountChange("percentage", e.target.value)
                }
                parentStyle={{ width: "25%" }}
                stylee={{ width: "100%" }}
                prefix={<FontAwesomeIcon icon={faPercentage} />}
              />
            </div>

            <div className="chooseaccountrow">
              {paymentMethod === "cash" && (
                <RegisterTextbox
                  label={t("Total")}
                  type="text"
                  value={finalTotal || calculateTotal()}
                  disabled={true}
                  parentStyle={{ width: "22%" }}
                  stylee={{ width: "100%" }}
                />
              )}

              {paymentMethod === "postpaid" && (
                <>
                  <RegisterTextbox
                    label={t("Total")}
                    type="text"
                    value={finalTotal || calculateTotal()}
                    disabled={true}
                    parentStyle={{ width: "25%" }}
                    stylee={{ width: "100%" }}
                  />

                  <RegisterTextbox
                    label={t("Paid")}
                    type="text"
                    value={paidAmount}
                    onChange={handlePaidAmountChange}
                    parentStyle={{ width: "25%" }}
                    stylee={{ width: "100%" }}
                  />

                  <RegisterTextbox
                    label={t("residual")}
                    type="number"
                    value={remainingBalance || 0}
                    disabled={true}
                    parentStyle={{ width: "25%" }}
                    stylee={{ width: "100%" }}
                  />
                </>
              )}
              {!isPaidValid && (
                <div className="error">{t("greater-than-the-total")}</div>
              )}
            </div>

            <div className="InvoiceButton">
              <CustomButton
                text={t("save")}
                onClick={handleSubmit}
                // {setError == true ? supplierAccount : ''}
              />
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
                // Handle show entry
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
          {" "}
          <div className="circl-trash ">
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
