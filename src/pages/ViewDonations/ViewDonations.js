import React, { useState } from "react";
import CustomTable from "../../components/CustomTable";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faPrint } from "@fortawesome/free-solid-svg-icons";
import Title from "../../components/title";
import { useNavigate } from "react-router";

function ViewDonations(props) {
  const columns = [
    { name: "#", key: "id" },
    { name: "إسم الحساب", key: "name" },
    { name: "التاريخ", key: "totalDonations" },
    { name: "رقم الفاتورة", key: "operationType" },
    { name: "نوع التحصيل", key: "dateStart" },
    { name: "إسم البنك", key: "dateEnd" },
    { name: "قيمة التبرع", key: "totalCost" },
  ];

  const [rows, setRows] = useState([
    {
      id: 1,
      name: "حالة ألف",
      totalDonations: "2024-12-01",
      operationType: "INV12345",
      dateStart: "كاش",
      dateEnd: "بنك مصر",
      totalCost: "1000",
    },
    {
      id: 2,
      name: "حالة باء",
      totalDonations: "2024-12-02",
      operationType: "INV12346",
      dateStart: "تحويل بنكي",
      dateEnd: "البنك الأهلي",
      totalCost: "2000",
    },
    {
      id: 3,
      name: "حالة جيم",
      totalDonations: "2024-12-03",
      operationType: "INV12347",
      dateStart: "كاش",
      dateEnd: "بنك القاهرة",
      totalCost: "3000",
    },
    {
      id: 4,
      name: "حالة دال",
      totalDonations: "2024-12-04",
      operationType: "INV12348",
      dateStart: "تحويل بنكي",
      dateEnd: "بنك الإسكندرية",
      totalCost: "1500",
    },
    {
      id: 5,
      name: "حالة هاء",
      totalDonations: "2024-12-05",
      operationType: "INV12349",
      dateStart: "كاش",
      dateEnd: "بنك الاستثمار العربي",
      totalCost: "1000",
    },
  ]);

  const handleDownload = (selectedRows) => {
    const selectedData = rows.filter((row) => selectedRows.includes(row.id));
    if (selectedData.length === 0) {
      alert("Please select at least one row.");
      return;
    }

    const csvHeader = columns
      .filter((col) => col.key !== "actions")
      .map((col) => col.name)
      .join(",");

    const csvRows = selectedData.map((row) =>
      columns
        .filter((col) => col.key !== "actions")
        .map((col) => `"${row[col.key] || ""}"`)
        .join(",")
    );

    const csvContent = `${csvHeader}\n${csvRows.join("\n")}`;

    const bom = "\uFEFF";
    const finalContent = bom + csvContent;

    const blob = new Blob([finalContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", "selected_rows_report.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  const navigate = useNavigate();
  const handleBack = () => {
    navigate("/casedetails");
  };
  return (
    <>
      <div className="printcasedata-container">
        <Title
          title="عرض التبرعات"
          icon={<FontAwesomeIcon icon={faPrint} />}
          style={{ width: "unset" }}
        />
        <div className="backCon">
          <div className="backBtn">
            <button
              className="styled-download-button"
              onClick={() => handleBack()}
            >
              <FontAwesomeIcon
                icon={faArrowLeft}
                style={{ padding: " 0 5px" }}
              />
              Back{" "}
            </button>
          </div>
        </div>
        <CustomTable
          columns={columns}
          data={rows}
          onDownload={handleDownload}
          total={true}
        />
      </div>
    </>
  );
}

export default ViewDonations;
