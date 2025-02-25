import React, { useState } from "react";
import CustomTable from "../../components/CustomTable";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faReceipt } from "@fortawesome/free-solid-svg-icons";
import Title from "../../components/title";
import "./CaseDetails.css";

function CaseDetails(props) {
  const columns = [
    { name: "إسم الحالة", key: "name" },
    { name: "نوع العملية", key: "operationType" },
    { name: "تاريخ البدء", key: "dateStart" },
    { name: "تاريخ الانتهاء", key: "dateEnd" },
    { name: "إجمالي التبرعات", key: "totalDonations" },
    { name: "#", key: "actions" },
  ];

  const [rows, setRows] = useState([
    {
      id: 1,
      name: "مشروع ألف",
      operationType: "نوع أ",
      dateStart: "2024-01-01",
      dateEnd: "2024-01-30",
      totalDonations: "5000",
    },
    {
      id: 2,
      name: "مشروع باء",
      operationType: "نوع ب",
      dateStart: "2024-02-01",
      dateEnd: "2024-02-28",
      totalDonations: "12000",
    },
    {
      id: 3,
      name: "مشروع جيم",
      operationType: "نوع أ",
      dateStart: "2024-03-05",
      dateEnd: "2024-03-25",
      totalDonations: "8000",
    },
    {
      id: 4,
      name: "مشروع دال",
      operationType: "نوع ب",
      dateStart: "2024-04-01",
      dateEnd: "2024-04-30",
      totalDonations: "15000",
    },
    {
      id: 5,
      name: "مشروع هاء",
      operationType: "نوع ج",
      dateStart: "2024-05-10",
      dateEnd: "2024-05-20",
      totalDonations: "10000",
    },
    {
      id: 6,
      name: "مشروع هاء",
      operationType: "نوع ج",
      dateStart: "2024-05-10",
      dateEnd: "2024-05-20",
      totalDonations: "10000",
    },
    {
      id: 7,
      name: "مشروع ىيني",
      operationType: "نوع ج",
      dateStart: "2024-05-10",
      dateEnd: "2024-05-20",
      totalDonations: "10000",
    },
    {
      id: 8,
      name: "مشروع شريف الزنجي",
      operationType: "نوع ج",
      dateStart: "2024-05-10",
      dateEnd: "2024-05-20",
      totalDonations: "10000",
    },
    {
      id: 9,
      name: "مشروع كريم",
      operationType: "نوع ج",
      dateStart: "2024-05-10",
      dateEnd: "2024-05-20",
      totalDonations: "10000",
    },
    {
      id: 10,
      name: "مشروع lpl,]",
      operationType: "نوع ج",
      dateStart: "2024-05-10",
      dateEnd: "2024-05-20",
      totalDonations: "10000",
    },
    {
      id: 11,
      name: "مشروهاء",
      operationType: "نوع ج",
      dateStart: "2024-05-10",
      dateEnd: "2024-05-20",
      totalDonations: "10000",
    },
  ]);

  const dropdownOptions = [
    { label: "عرض التبرعات", route: "/viewdonations/:id" },
    { label: "عرض الحالة", route: "/casedetailschart/:id" },
    { label: "سند دفع", route: "/paymentvoucher/:id" },
    { label: "سند قبض", route: "/receiptvoucher/:id" },
    { label: "تعديل", route: "/editcasedetails/:id" }, 
  ];

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
          title="تفاصيل الحالة"
          icon={<FontAwesomeIcon icon={faReceipt} />}
          style={{ width: "unset" }}
        />

        <CustomTable
          columns={columns}
          data={rows}
          onDownload={handleDownload}
          dropdownOptions={dropdownOptions}
          rowsPerPage={5}
          search={true}
        />
      </div>
    </>
  );
}

export default CaseDetails;
