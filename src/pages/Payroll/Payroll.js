import "./payroll.css";
import Title from "../../components/title";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWallet } from "@fortawesome/free-solid-svg-icons";
import CustomTable from "../../components/CustomTable";
import { useState } from "react";

function Payroll() {
  const columns = [
    { name: "#", key: "id" },
    { name: "إسم الموظف", key: "name" },
    { name: "المسمي الوظيفي", key: "jobtitle" },
    { name: "القسم", key: "department" },
    { name: "المبلغ الكلي", key: "totalsalary" },
    { name: "المخصومات", key: "discounts" },
    { name: "المبلغ المدفوع", key: "amountpaid" },
    { name: "عدد ايام الغياب", key: "daysofabsence" },
    { name: "تاريخ صرف الراتب", key: "salarydate" },
  ];

  const [rows, setRows] = useState([
    {
      name: "Ahmed Ali",
      jobtitle: "مدير",
      department: "التسويق",
      totalsalary: "5000",
      discounts: "500",
      amountpaid: "4500",
      daysofabsence: "2",
      salarydate: "2024-12-01",
    },
    {
      name: "Sara Mohamed",
      jobtitle: "محاسب",
      department: "المالية",
      totalsalary: "4500",
      discounts: "300",
      amountpaid: "4200",
      daysofabsence: "1",
      salarydate: "2024-12-02",
    },
    {
      name: "Mona Ahmed",
      jobtitle: "مصمم",
      department: "التصميم",
      totalsalary: "4000",
      discounts: "400",
      amountpaid: "3600",
      daysofabsence: "0",
      salarydate: "2024-12-03",
    },
    {
      name: "Omar Hassan",
      jobtitle: "عامل",
      department: "المستودع",
      totalsalary: "3000",
      discounts: "200",
      amountpaid: "2800",
      daysofabsence: "3",
      salarydate: "2024-12-04",
    },
    {
      name: "Tariq Youssef",
      jobtitle: "مساعد",
      department: "الإدارة",
      totalsalary: "3500",
      discounts: "250",
      amountpaid: "3250",
      daysofabsence: "1",
      salarydate: "2024-12-05",
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

  const dropdownOptions = [
    { label: "تقرير", route: "/" },
    { label: "سند صرف", route: "/paymentvoucher" },
  ];
  return (
    <>
      <div className="payroll-container">
        <Title
          title="كشف المرتبات"
          className="marketingtitle"
          icon={<FontAwesomeIcon icon={faWallet} />}
        />

        <div>
          <CustomTable
            columns={columns}
            data={rows}
            onDownload={handleDownload}
            dropdownOptions={dropdownOptions}
          />
        </div>
      </div>
    </>
  );
}

export default Payroll;
