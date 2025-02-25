import { useState, useEffect } from "react";
import axios from "axios";
import { faBoxes, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Title from "../../components/title";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import "./Items.css";
import { useNavigate } from "react-router-dom"; 




function Items() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [data, setData] = useState([]);

  useEffect(() => {
    const authToken = localStorage.getItem("authToken");

    axios
      .get("http://127.0.0.1:8000/api/items", {
        headers: { Authorization: `Bearer ${authToken}` },
      })
      .then((response) => {
        console.log("API Response:", response.data);

        if (response.data.status === 200) {
          const formattedData = response.data.data.map((item, index) => ({
            serialNumber: index + 1,
            item_name: item.item_name,
            purchase_price: item.unit_items?.[0]?.purchase_price || "N/A",
            retail_selling_price:
              item.unit_items?.[0]?.retail_selling_price || "N/A",
            wholesale_selling_price:
              item.unit_items?.[0]?.wholesale_selling_price || "N/A",
            quantity: item.warehouse_items?.[0]?.quantity || 0,
            description: item.description || "-",
          }));
          setData(formattedData);
          console.log("Formatted Data:", formattedData);
        }
      })
      .catch((error) => {
        console.error(
          "Error fetching items:",
          error.response?.data || error.message
        );
        if (error.response?.status === 401) {
          localStorage.removeItem("authToken");
          navigate("/login");
        }
      });
  }, [navigate]);

  return (
    <>
      <Title title={t("items")} icon={<FontAwesomeIcon icon={faBoxes} />} />
      <div className="Items">
        <div className="Items-for">
          <Link to="/additem" className="add-row-ta">
            <FontAwesomeIcon icon={faPlus} /> {t("add-item")}
          </Link>
        </div>
        <table
          // style={{ borderCollapse: "collapse", textAlign: "center" }}
          className="table-tree"
        >
          <thead>
            <tr className="head-Chartofaccounts">
              <th>{t("item-name")}</th>
              <th>{t("item-name")}</th>
              <th>{t("purchase-price")}</th>
              <th>{t("retail-price")}</th>
              <th>{t("wholesale-price")}</th>
              <th>{t("quantity")}</th>
              <th>{t("notes")}</th>
            </tr>
          </thead>
          <tbody>
            {data.length > 0 ? (
              data.map((item) => (
                <tr key={item.serialNumber}>
                  <td>{item.serialNumber}</td>
                  <td>{item.item_name}</td>
                  <td>{item.purchase_price}</td>
                  <td>{item.retail_selling_price}</td>
                  <td>{item.wholesale_selling_price}</td>
                  <td>{item.quantity}</td>
                  <td>{item.description}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7">No Data Available</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default Items;
