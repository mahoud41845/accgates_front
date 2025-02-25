import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faReceipt } from "@fortawesome/free-solid-svg-icons";
import Title from "../../components/title";
import { Form } from "react-bootstrap";
import RegisterSelect from "../../components/RegisterSelect";
import { useTranslation } from "react-i18next";
import RegisterTextbox from "../../components/RegisterTextBox";
import SelectComponent from "../../components/SelectComponent";
import CheckboxComponent from "../../components/CheckboxComponent ";

function SalesReport() {
  const [purchasesData, setPurchasesData] = useState([]);
  const [selectedInvoiceType, setSelectedInvoiceType] = useState(null);
  const [filteredPurchases, setFilteredPurchases] = useState([]);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);
  const [selectedCustomer, setSelectedCustomer] = useState(null); // Stores the entire selected customer { value, label }
  const [customers, setCustomers] = useState([]);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [dateRangeError, setDateRangeError] = useState(null);
  const { t } = useTranslation();
  const [selectedWarehouse, setSelectedWarehouse] = useState(null);

  const [warehouseOptions, setWarehouseOptions] = useState([
    { value: "warehouse1", label: "مخزن 1" },
    { value: "warehouse2", label: "مخزن 2" },
    { value: "warehouse3", label: "مخزن 3" },
  ]);

  const handleWarehouseChange = (selectedOption) => {
    setSelectedWarehouse(selectedOption); // Use object correctly, label and values.
  };

  useEffect(() => {
    const fetchPurchases = async () => {
      const token = localStorage.getItem("authToken");
      try {
        const response = await fetch("http://127.0.0.1:8000/api/sales", {
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
          } else {
            console.error(
              "API response does not contain an invoices array",
              data
            );
          }
        } else {
          console.error("فشل في جلب بيانات الفواتير");
        }
      } catch (error) {
        console.error("خطأ:", error);
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
    selectedCustomer,
    purchasesData,
  ]);
  const isValidDateRange = (start, end) => {
    if (!start || !end) {
      return true;
    }
    const startDateObj = new Date(start);
    const endDateObj = new Date(end);
    const timeDiff = endDateObj.getTime() - startDateObj.getTime();
    const yearDiff = timeDiff / (1000 * 3600 * 24 * 365);

    return yearDiff <= 1;
  };
  const filterPurchases = () => {
    setDateRangeError(null);
    let filtered = purchasesData;

    if (selectedCustomer) {
      filtered = filtered.filter(
        (purchase) => purchase.supplier_customer_id == selectedCustomer.value
      );
    }

    if (selectedWarehouse) {
      //filtered = filtered.filter(purchase => purchase.warehouse_id === selectedWarehouse.value) // apply new wareHouse filter for specific `sales` entry id for current warehouse if any exist.
    }
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
    if (startDate && endDate) {
      if (!isValidDateRange(startDate, endDate)) {
        setDateRangeError("يجب أن يكون النطاق الزمني للبحث سنة واحدة أو أقل.");
        setFilteredPurchases([]);
        return;
      }
      filtered = filtered.filter((purchase) => {
        const purchaseDate = new Date(purchase.date.split("T")[0]).getTime();
        const filterStartDate = new Date(startDate).getTime();
        const filterEndDate = new Date(endDate).getTime();
        return purchaseDate >= filterStartDate && purchaseDate <= filterEndDate;
      });
    } else if (startDate) {
      filtered = filtered.filter((purchase) => {
        const purchaseDate = new Date(purchase.date.split("T")[0]).getTime();
        const filterStartDate = new Date(startDate).getTime();
        return purchaseDate >= filterStartDate;
      });
    } else if (endDate) {
      filtered = filtered.filter((purchase) => {
        const purchaseDate = new Date(purchase.date.split("T")[0]).getTime();
        const filterEndDate = new Date(endDate).getTime();
        return purchaseDate <= filterEndDate;
      });
    }

    setFilteredPurchases(filtered);
  };

  const handleInvoiceTypeChange = (e) => {
    const value = e.target.value;
    setSelectedInvoiceType(selectedInvoiceType === value ? null : value);
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

  useEffect(() => {
    const fetchCustomers = async () => {
      const token = localStorage.getItem("authToken");
      try {
        const response = await fetch("http://127.0.0.1:8000/api/customers", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          if (Array.isArray(data)) {
            const formattedCustomers = data.map((customer) => ({
              value: customer.id,
              label: customer.name,
            }));
            setCustomers(formattedCustomers);
          } else {
            console.error("Invalid customers data format", data);
          }
        } else {
          console.error("Failed to fetch customers");
        }
      } catch (error) {
        console.error("Error fetching customers:", error);
      }
    };
    fetchCustomers();
  }, []);
  const handleCustomerChange = (selectedOption) => {
    setSelectedCustomer(selectedOption); // Now store selected object {value:id , label:"customerName" } in state
  };

  return (
    <>
      <Title
        title={t("salesReport")}
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
                type="checkbox"
                name="reportType"
                value="sales"
                label={t("sales")}
                checked={selectedInvoiceType === "sales"}
                onChange={handleInvoiceTypeChange}
              />
              <CheckboxComponent
                className="prepolable2"
                inline
                label={t("Sales-return")}
                type="checkbox"
                name="reportType"
                value="returns_sales"
                checked={selectedInvoiceType === "returns_sales"}
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
            label={t("Customer-name")}
            placeholder={t("Customer-name")}
             containerStyle={{ width: "20%" }}
            options={customers}
            onChange={handleCustomerChange}
            value={selectedCustomer}
          />
          <SelectComponent
            className="select-report"
            id="payAcc"
            label={t("selectWarehouse")}
            placeholder={t("selectWarehouse")}
             containerStyle={{ width: "20%" }}
            options={warehouseOptions}
            onChange={handleWarehouseChange}  
            value={selectedWarehouse}
          />

 
        </div>
      </div>
      {dateRangeError && (
        <div className="error-message" style={{ color: "red" }}>
          {dateRangeError}
        </div>
      )}
      <div className="table-rportconyaner">
        <table className="table-rport">
          <thead>
            <tr>
              <th>{t("serial")}</th>
              <th>{t("date")}</th>
              <th>{t("supplierName")}</th>
              <th>{t("phoneNumber")}</th>
              <th>{t("email")}</th>
              <th>{t("currentBalance")}</th>
            </tr>
          </thead>
          <tbody>
            {filteredPurchases.length > 0 ? (
              filteredPurchases.map((purchase) => (
                <tr key={purchase.id}>
                  <td>{purchase.invoice_number}</td>
                  <td>{purchase.date.split("T")[0]}</td>
                  <td>{purchase.supplier_customer?.name}</td>
                  <td>{purchase.supplier_customer?.phone}</td>
                  <td>{purchase.supplier_customer?.email}</td>
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
export default SalesReport;
