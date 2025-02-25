import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Title from "../../components/title";
import "./DesignsDetails.css";
import { faList12 } from "@fortawesome/free-solid-svg-icons";
import CustomTable from "../../components/CustomTable";
function DesignsDetails() {
  const columns = [
    { name: "#", key: "id" },
    { name: "إسم الطلب", key: "name" },
    { name: "التاريخ", key: "date" },
    { name: "المتطلبات", key: "requestes" },
    { name: "حالة الطلب", key: "status" },
    { name: "المرفقات", key: "files" },
    { name: "الملاحظات", key: "notes" },
  ];

  const rows = [
    {
      id: 1,
      name: "طلب تصميم شعار",
      date: "2024-12-10",
      requestes: "تصميم شعار احترافي لشركة تقنية",
      status: "مكتمل",
      files: "completed",
      notes: "تم تسليم التصميم بنجاح",
    },
    {
      id: 2,
      name: "طلب حملة تسويقية",
      date: "2024-12-08",
      requestes: "إطلاق حملة تسويقية على منصات التواصل",
      status: "قيد التنفيذ",
      files: "inprogress",
      notes: "بانتظار موافقة العميل",
    },
    {
      id: 3,
      name: "طلب كتيب تعريفي",
      date: "2024-12-06",
      requestes: "تصميم كتيب تعريفي للشركة",
      status: "تم جزئيا",
      files: "partial",
      notes: "المزيد من التفاصيل مطلوبة",
    },
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
        .map((col) => `${row[col.key] || ""}`)
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
    <div className="designsdetails">
      <Title
        title="تفاصيل التصاميم"
        icon={<FontAwesomeIcon icon={faList12} />}
      />
      <div className="designsdetails-table">
        <CustomTable
          onDownload={handleDownload}
          columns={columns}
          data={rows}
          search={true}
        />
      </div>
    </div>
  );
}

export default DesignsDetails;
