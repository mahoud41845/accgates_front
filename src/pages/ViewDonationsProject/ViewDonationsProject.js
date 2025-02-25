import React, { useState } from "react";
import CustomTable from "../../components/CustomTable";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPrint } from "@fortawesome/free-solid-svg-icons";
import Title from "../../components/title";

function ViewDonationsProject(props) {
  const columns = [
    { name: "#", key: "id" },
    { name: "إسم الحساب", key: "name" },
    { name: "التاريخ", key: "totalDonations" },
    { name: "رقم الفاتورة", key: "operationType" },
    { name: "نوع التحصيل", key: "dateStart" },
    { name: "إسم البنك", key: "dateEnd" },
  ];

  const [rows, setRows] = useState([
    {
      id: 1,
      name: "حالة ألف",
      totalDonations: "10000",
      operationType: "8000",
      dateStart: "2000",
      dateEnd: "150",
    },
    {
      id: 2,
      name: "حالة باء",
      totalDonations: "20000",
      operationType: "15000",
      dateStart: "5000",
      dateEnd: "300",
    },
    {
      id: 3,
      name: "حالة جيم",
      totalDonations: "15000",
      operationType: "12000",
      dateStart: "3000",
      dateEnd: "250",
    },
    {
      id: 4,
      name: "حالة دال",
      totalDonations: "5000",
      operationType: "4000",
      dateStart: "1000",
      dateEnd: "100",
    },
    {
      id: 5,
      name: "حالة هاء",
      totalDonations: "25000",
      operationType: "20000",
      dateStart: "5000",
      dateEnd: "350",
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

  return (
    <>
      <div className="printcasedata-container">
        <Title
          title="عرض التبرعات"
          icon={<FontAwesomeIcon icon={faPrint} />}
          style={{ width: "unset" }}
        />
        <CustomTable
          columns={columns}
          data={rows}
          onDownload={handleDownload}
        />
      </div>
    </>
  );
}

export default ViewDonationsProject;
