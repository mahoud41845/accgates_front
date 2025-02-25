import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faReceipt } from "@fortawesome/free-solid-svg-icons";
import { useTranslation } from "react-i18next";
import Title from "../../components/title";
import { Form } from "react-bootstrap";
import RegisterSelect from "../../components/RegisterSelect";
import "./PurchasesReport.css";
import SelectComponent from "../../components/SelectComponent";
import RegisterTextbox from "../../components/RegisterTextBox";
import CheckboxComponent from "../../components/CheckboxComponent ";
import { Button } from "react-bootstrap";

function PurchasesReport() {
  const [purchasesData, setPurchasesData] = useState([]);
  const [selectedInvoiceType, setSelectedInvoiceType] = useState(null);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);
  const [filteredPurchases, setFilteredPurchases] = useState([]);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [suppliers, setSuppliers] = useState([]);
  const [selectedSupplier, setSelectedSupplier] = useState(null);
  const [filteredSuppliers, setFilteredSuppliers] = useState([]);
  const [selectedSupplierValue, setSelectedSupplierValue] = useState(null);

  const { t } = useTranslation();

  const warehouseOptions = [
    { value: "warehouse1", label: t("warehouse1") },
    { value: "warehouse2", label: t("warehouse2") },
    { value: "warehouse3", label: t("warehouse3") },
  ];

  useEffect(() => {
    const fetchPurchases = async () => {
      const token = localStorage.getItem("authToken");

      try {
        const response = await fetch("http://127.0.0.1:8000/api/purchases", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          console.log("Fetched Data:", data);

          if (Array.isArray(data.invoices)) {
            setPurchasesData(data.invoices);
            setFilteredPurchases(data.invoices);
            // Initial supplier filtering based on the default selectedInvoiceType (if any)
            if (selectedInvoiceType) {
              updateSuppliers(data.invoices, selectedInvoiceType);
            } else {
              const initialSuppliers = [
                ...new Map(
                  data.invoices.map((item) => [
                    item.supplier_customer.id,
                    {
                      id: item.supplier_customer.id,
                      name: item.supplier_customer.name,
                    },
                  ])
                ).values(),
              ];
              setFilteredSuppliers(initialSuppliers);
            }
          } else {
            console.error(
              "API response does not contain an invoices array",
              data
            );
          }
        } else {
          console.error("Failed to fetch purchases data");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchPurchases();
  }, []);

  useEffect(() => {
    filterPurchases();
  }, [
    selectedInvoiceType,
    selectedPaymentMethod,
    startDate,
    endDate,
    purchasesData,
    selectedSupplier,
  ]);

  useEffect(() => {
    if (selectedSupplier) {
      const foundSupplier = filteredSuppliers.find(
        (supplier) => supplier.id === selectedSupplier
      );
      setSelectedSupplierValue(
        foundSupplier
          ? { value: foundSupplier.id, label: foundSupplier.name }
          : null
      );
      console.log("selectedSupplierValue updated:", foundSupplier);
    } else {
      setSelectedSupplierValue(null);
      console.log("selectedSupplierValue updated null:");
    }
  }, [selectedSupplier, filteredSuppliers]);

  const filterPurchases = () => {
    let filtered = purchasesData;

    if (selectedInvoiceType) {
      filtered = filtered.filter(
        (purchase) => purchase.invoice_type === selectedInvoiceType
      );
    }

    if (selectedPaymentMethod) {
      filtered = filtered.filter(
        (purchase) => purchase.payment_method === selectedPaymentMethod
      );
    }

    if (selectedSupplier) {
      filtered = filtered.filter(
        (purchase) => purchase.supplier_customer.id === selectedSupplier
      );
    }

    if (startDate) {
      filtered = filtered.filter((purchase) => {
        const purchaseDate = new Date(purchase.date.split("T")[0]).getTime();
        const filterStartDate = new Date(startDate).getTime();
        return purchaseDate >= filterStartDate;
      });
    }

    if (endDate) {
      filtered = filtered.filter((purchase) => {
        const purchaseDate = new Date(purchase.date.split("T")[0]).getTime();
        const filterEndDate = new Date(endDate).getTime();

        return purchaseDate <= filterEndDate;
      });
    }

    setFilteredPurchases(filtered);
  };

  const updateSuppliers = (invoices, invoiceType) => {
    let filteredSuppliers = [];
    if (invoiceType)
      filteredSuppliers = invoices.filter(
        (invoice) => invoice.invoice_type === invoiceType
      );
    const uniqueSuppliers = [
      ...new Map(
        filteredSuppliers.map((item) => [
          item.supplier_customer.id,
          { id: item.supplier_customer.id, name: item.supplier_customer.name },
        ])
      ).values(),
    ];
    setFilteredSuppliers(uniqueSuppliers);
  };

  const handleInvoiceTypeChange = (e) => {
    const value = e.target.value;
    setSelectedInvoiceType(selectedInvoiceType === value ? null : value);
    updateSuppliers(purchasesData, value);
    setSelectedSupplier(null);
  };

  const handlePaymentMethodChange = (e) => {
    const value = e.target.value;
    setSelectedPaymentMethod(selectedPaymentMethod === value ? null : value);
  };

  const handleStartDateChange = (value) => {
    setStartDate(value);
  };

  const handleEndDateChange = (value) => {
    setEndDate(value);
  };

  const handleSupplierChange = (selectedOption) => {
    console.log("handleSupplierChange selectedOption:", selectedOption);
    setSelectedSupplier(selectedOption ? selectedOption.value : null);
  };
  const clearSupplierFilter = () => {
    setSelectedSupplier(null);
  };

  return (
    <>
      <Title
        title={t("purchasesReport")}
        icon={<FontAwesomeIcon icon={faReceipt} />}
        style={{ width: "unset" }}
      />
      <div className="PurchasesReport">
        <div className="radio-form-report">
          <div className="radio-report">
            <span>{t("type")}</span>
            <div className="svws">
              <CheckboxComponent
                className="prepolable1"
                inline
                label={t("purchases")}
                type="checkbox"
                name="reportType"
                value="purchases"
                checked={selectedInvoiceType === "purchases"}
                onChange={handleInvoiceTypeChange}
              />
              <CheckboxComponent
                className="prepolable2"
                inline
                label={t("returnsPurchases")}
                type="checkbox"
                name="reportType"
                value="returns_purchases"
                checked={selectedInvoiceType === "returns_purchases"}
                onChange={handleInvoiceTypeChange}
              />
            </div>
          </div>
          <div className="paymentMethod">
            <span>{t("paymentMethod")} </span>
            <div className="paymentMethod1">
              <CheckboxComponent
                inline
                label={t("cash")}
                type="checkbox"
                className="createManage-redio"
                name="paymentMethod"
                value="cash"
                checked={selectedPaymentMethod === "cash"}
                onChange={handlePaymentMethodChange}
              />
              <CheckboxComponent
                inline
                label={t("Incredit")}
                type="checkbox"
                className="createManage-redio"
                name="paymentMethod"
                value="postpaid"
                checked={selectedPaymentMethod === "postpaid"}
                onChange={handlePaymentMethodChange}
              />
            </div>
          </div>
        </div>

        <div className="formreport-prush">
          <SelectComponent
            label={t("supplierName")}
            placeholder={t("supplierName")}
            options={filteredSuppliers.map((supplier) => ({
              value: supplier.id,
              label: supplier.name,
            }))}
            onChange={handleSupplierChange}
            value={selectedSupplierValue}
            menuPortalTarget={document.body}
            containerStyle={{ width: "20%" }}
          />

          <SelectComponent
            className="select-report"
            id="payAcc"
            label={t("selectWarehouse")}
            placeholder={t("selectWarehouse")}
            selectStyle={{ width: "100%" }}
            containerStyle={{ width: "20%" }}
            options={warehouseOptions}
          />
        </div>
      </div>

      <div className="table-rportconyaner">
        <table className="table-rport">
          <thead>
            <tr>
              <th>{t("serial")}</th>
              <th>{t("date")}</th>
              <th>{t("supplierName")}</th>
              <th>{t("phoneNumber")}</th>
              <th>{t("invoice_type")}</th>
              <th>{t("currentBalance")}</th>
            </tr>
          </thead>
          <tbody>
            {filteredPurchases.length > 0 ? (
              filteredPurchases.map((purchase) => (
                <tr key={purchase.id}>
                  <td>{purchase.invoice_number}</td>
                  <td>{purchase.date.split("T")[0]}</td>
                  <td>{purchase.supplier_customer.name}</td>
                  <td>{purchase.supplier_customer.phone}</td>
                  <td>{purchase.invoice_type}</td>
                  <td>{purchase.account ? purchase.account.balance : "N/A"}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6">{t("noDataToDisplay")}</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default PurchasesReport;
