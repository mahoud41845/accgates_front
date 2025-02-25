import { useEffect, useState } from "react";
import axios from "axios";
import { faWarehouse } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Title from "../../components/title";
import "./Storeinventory.css";
import { t } from "i18next";
import AccountingTable from "../../components/AccountingTable";
import RegisterTextbox from "../../components/RegisterTextBox";

function Storeinventory() {
  const [inventoryData, setInventoryData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState(""); 
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState([]);  
  const columns = [
    { name: t("serial-number"), dataIndex: "id", key: "id" },
    { name: t("item-name"), dataIndex: "name", key: "name" },
    { name: t("unit-type"), dataIndex: "unit", key: "unit" },
    { name: t("quantity"), dataIndex: "quantity", key: "quantity" },
    {
      name: t("purchase-price"),
      dataIndex: "purchasePrice",
      key: "purchasePrice",
    },
    { name: t("total-count"), dataIndex: "total", key: "total" },
    { name: t("warehouse"), dataIndex: "warehouse", key: "warehouse" },
  ];

  useEffect(() => {
    const authToken = localStorage.getItem("authToken");

    axios
      .get("http://127.0.0.1:8000/api/inventory-reports", {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      })
      .then((response) => {
        if (response.data.status === 200) {
          const formattedData = response.data.data.map((item) => ({
            id: item.id,
            name: item.item?.item_name || "غير معروف",
            unit: "وحدة",
            quantity: item.quantity_stocktaking,
            purchasePrice: item.stocktaking_value,
            total: item.total_stocktaking_value,
            warehouse: item.warehouse?.name || "غير محدد",
          }));
          setInventoryData(formattedData);
          setErrorMessage("");  
        }
      })
      .catch((error) => {
        console.error("خطأ في جلب البيانات:", error);

         if (error.response) {
          setErrorMessage(
            error.response.data.message || "حدث خطأ غير معروف في السيرفر"
          );
        } else if (error.request) {
          setErrorMessage(
            "لم يتمكن التطبيق من الاتصال بالسيرفر، تأكد من تشغيل الـ API."
          );
        } else {
          setErrorMessage("حدث خطأ أثناء تنفيذ الطلب.");
        }
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);
  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchTerm(value);

    const filtered = inventoryData.filter((item) =>
      item.name.toLowerCase().includes(value)
    );

    setFilteredData(filtered);
  };

  return (
    <>
      <Title
        title={t("store-inventory")}
        icon={<FontAwesomeIcon icon={faWarehouse} />}
      />

      <div className="Items">
        {errorMessage && <p className="error-message">{errorMessage}</p>}{" "}
        <div className="form-Items">
          <RegisterTextbox
            type="text"
            placeholder="🔍 ابحث عن اسم الصنف..."
            value={searchTerm}
            onChange={handleSearch}
            parentStyle={{ width: "20%" }}
          />
        </div>
        {loading ? (
          <p>جاري تحميل البيانات...</p>
        ) : (
          <AccountingTable
            columns={columns}
            data={inventoryData}
            tableContainerClass="table-Moneyreceiptreports"
          />
        )}
      </div>
    </>
  );
}

export default Storeinventory;
