import { useEffect, useState } from "react";
import CustomTable from "../../components/CustomTable";
import "./hrreports.css";
import Title from "../../components/title";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsis, faList, faTable } from "@fortawesome/free-solid-svg-icons";
import { Dropdown } from "react-bootstrap";

function HRreports() {
  const [activeTab, setActiveTab] = useState("jobTitles");
  const [selectedEmployee, setSelectedEmployee] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [vacationData, setVacationData] = useState([]);
  const [employeeList, setEmployeeList] = useState([]);
  const [filterName, setFilterName] = useState("");
  const [filterJobTitle, setFilterJobTitle] = useState("");
  const [filterDepartment, setFilterDepartment] = useState("");
  const [filterStartDate, setFilterStartDate] = useState("");
  const [filterEndDate, setFilterEndDate] = useState("");

  const tabs = [
    { id: "jobTitles", label: "المسميات الوظيفية" },
    { id: "employees", label: " الموظفين" },
    { id: "salarySheet", label: "كشف المرتبات" },
    { id: "deductions", label: "الخصومات" },
    { id: "monthlySalary", label: "الراتب الشهري" },
    { id: "vacations", label: "الاجازات" },
    { id: "kpi", label: "التقييمات الوظيفية" },
    { id: "vacDetails", label: "تفاصيل الاجازات" },
    { id: "departDetails", label: "تفاصيل الأقسام" },
    { id: "attendancedeparturereport", label: "الحضور والانصراف" },
  ];
  const primaryTabs = tabs.slice(0, 5);
  const dropdownTabs = tabs.slice(5);

  const comeleavecols = [
    { name: "#", key: "id" },
    { name: "إسم الموظف", key: "name" },
    { name: "وقت الحضور", key: "come" },
    { name: "وقت الإنصراف", key: "leave" },
    { name: "التاريخ", key: "date" },
  ];

  const comeleaverows = [
    {
      id: 1,
      name: "محمد",
      come: "2:00 PM",
      leave: "6:00",
      date: "12-12-2024",
    },
  ];

  const columns1 = [
    { name: "#", key: "id" },
    { name: "إسم الوظيفة", key: "name" },
    { name: "وصف الوظيفة", key: "jobdesc" },
    { name: "مهام الوظيفة", key: "jobrules" },
  ];
  const rows1 = [
    {
      id: 1,
      name: "محاسب",
      jobdesc: "ماليات",
      jobrules: "إعداد التقارير المالية",
    },
    {
      id: 2,
      name: "جرافيك مصممة",
      jobdesc: " تصاميم",
      jobrules: "تصميم الشعارات والمواد الدعائية",
    },
    {
      id: 3,
      name: "مهندس برمجيات",
      jobdesc: "الانظمة",
      jobrules: "تطوير التطبيقات وصيانة الأنظمة",
    },
  ];

  const columns2 = [
    { name: "#", key: "id" },
    { name: "رقم الموظف", key: "empnum" },
    { name: "إسم الموظف", key: "name" },
    { name: "المسمى الوظيفي", key: "jobtitle" },
    { name: "القسم", key: "department" },
    { name: "المبلغ الكلي", key: "totalsalary" },
    { name: "المخصومات", key: "discounts" },
    { name: "المبلغ المدفوع", key: "amountpaid" },
    { name: "عدد أيام الغياب", key: "daysofabsence" },
    { name: "تاريخ صرف الراتب", key: "salarydate" },
  ];
  const rows2 = [
    {
      id: 1,
      empnum: "101",
      name: "أحمد محمد",
      jobtitle: "محاسب",
      department: "المالية",
      totalsalary: "5000",
      discounts: "500",
      amountpaid: "4500",
      daysofabsence: "2",
      salarydate: "2024-12-01",
    },
    {
      id: 2,
      empnum: "102",
      name: "سارة علي",
      jobtitle: "مصممة جرافيك",
      department: "التصميم",
      totalsalary: "4500",
      discounts: "300",
      amountpaid: "4200",
      daysofabsence: "1",
      salarydate: "2024-12-02",
    },
    {
      id: 3,
      empnum: "103",
      name: "خالد السيد",
      jobtitle: "مهندس برمجيات",
      department: "تطوير البرمجيات",
      totalsalary: "6000",
      discounts: "600",
      amountpaid: "5400",
      daysofabsence: "0",
      salarydate: "2024-12-03",
    },
  ];
  const [salaryData, setSalaryData] = useState(rows2);

  const dropdownOptions2 = [
    { label: "تقرير", route: "/" },
    { label: "سند دفع", route: "/paymentvoucher" },
  ];

  const columns3 = [
    { name: "#", key: "id" },
    { name: "رقم الموظف", key: "empnum" },
    { name: "إسم الموظف", key: "name" },
    { name: "التأمين الإجتماعي", key: "socialwelfare" },
    { name: "التأمين الصحي", key: "healthinsurance" },
    { name: "ضريبة الدخل", key: "incometax" },
    { name: "إجمالي الخصم", key: "totaldiscount" },
  ];
  const rows3 = [
    {
      id: 1,
      empnum: "101",
      name: "أحمد محمد",
      socialwelfare: 500,
      healthinsurance: 300,
      incometax: 200,
      totaldiscount: 1000,
    },
    {
      id: 2,
      empnum: "102",
      name: "سارة علي",
      socialwelfare: 600,
      healthinsurance: 400,
      incometax: 250,
      totaldiscount: 1250,
    },
    {
      id: 3,
      empnum: "103",
      name: "خالد السيد",
      socialwelfare: 700,
      healthinsurance: 500,
      incometax: 300,
      totaldiscount: 1500,
    },
  ];

  const monthsalarycolumns = [
    { name: "", key: "actions" },
    { name: "", key: "id" },
    { name: "اسم الموظف", key: "employeeName" },
    { name: "الراتب الاساسي", key: "basicSalary" },
    { name: "الراتب الكلي", key: "totalSalary" },
  ];

  const monthsalaryrows = [
    {
      id: 1,
      employeeName: "أحمد محمد عبد الله",
      basicSalary: 5000,
      totalSalary: 6000,
    },
    {
      id: 2,
      employeeName: "سارة علي حسن",
      basicSalary: 5500,
      totalSalary: 6500,
    },
    {
      id: 3,
      employeeName: "خالد عبد الرحمن السيد",
      basicSalary: 6000,
      totalSalary: 7000,
    },
  ];

  const monthsalarydropdownOptions = [
    { label: "دفع الراتب", route: "/paymentvoucher" },
    { label: "عرض", route: "/addnewemployee/salary" },
  ];

  const kpiCoulmns = [
    { name: "#", key: "id" },
    { name: "إسم الموظف", key: "employeeName" },
    { name: "القسم", key: "department" },
    { name: "الهدف من التقييم", key: "kpigoal" },
    { name: "التقدير", key: "rating" },
  ];

  const kpiRows = [
    {
      id: 1,
      employeeName: "أحمد محمد عبد الله",
      department: "الموارد البشرية",
      kpigoal: "تحقيق أهداف التدريب والتطوير",
      rating: "ممتاز",
    },
    {
      id: 2,
      employeeName: "سارة علي حسن",
      department: "التسويق",
      kpigoal: "زيادة المبيعات بنسبة 20%",
      rating: "جيد جداً",
    },
    {
      id: 3,
      employeeName: "خالد عبد الرحمن السيد",
      department: "المبيعات",
      kpigoal: "تحقيق أهداف المبيعات الشهرية",
      rating: "جيد",
    },
  ];

  const VacationDetailscolumns = [
    { name: "", key: "id", type: "hidden" },
    { name: "نوع الاجازة", key: "type", type: "text" },
    { name: "عدد أيام الاجازة", key: "duration", type: "number" },
  ];

  const [vacationDetailsrows, setVacationDetailsRows] = useState([
    {
      id: 1,
      type: "مرضية",
      duration: "10 أيام",
    },
    {
      id: 2,
      type: "سنوية",
      duration: "15 أيام",
    },
    {
      id: 3,
      type: "أمومة",
      duration: "30 أيام",
    },
    {
      id: 4,
      type: "إدارية",
      duration: "5 أيام",
    },
  ]);

  const allVacations = [
    {
      id: 1,
      employeeName: "أحمد محمد",
      description: "إجازة سنوية",
      status: "موافق عليها",
      days: 10,
      from: "2023-12-01",
      to: "2023-12-10",
    },
    {
      id: 2,
      employeeName: "أحمد محمد",
      description: "إجازة",
      status: "موافق عليها",
      days: 5,
      from: "2023-11-10",
      to: "2023-11-15",
    },
    {
      id: 3,
      employeeName: "سارة علي",
      description: "إجازة سفر",
      status: "مرفوضة",
      days: 7,
      from: "2023-11-01",
      to: "2023-11-07",
    },
  ];
  const allEmployees = [
    { id: 1, name: "أحمد محمد" },
    { id: 2, name: "سارة علي" },
    { id: 2, name: "خالد السيد" },
  ];
  useEffect(() => {
    setEmployeeList(allEmployees);
  }, []);
  const handleFilter = () => {
    const filteredVacations = allVacations.filter((vacation) => {
      const isEmployeeMatch =
        !selectedEmployee || vacation.employeeName === selectedEmployee;
      const isWithinDateRange =
        (!startDate || vacation.from >= startDate) &&
        (!endDate || vacation.to <= endDate);
      return isEmployeeMatch && isWithinDateRange;
    });
    setVacationData(filteredVacations);
  };

  useEffect(() => {
    const filteredVacations = allVacations.filter(
      (vacation) => vacation.employeeName === selectedEmployee
    );
    setVacationData(filteredVacations);
  }, [selectedEmployee]);

  const columns6 = [
    { name: "", key: "actions" },
    { name: "#", key: "id" },
    { name: "إسم الموظف", key: "employeName" },
    { name: "رقم الهوية", key: "idnumber" },
    { name: "رقم الجوال", key: "mobnumber" },
    { name: "العنوان", key: "address" },
    { name: "المسمي الوظيفي", key: "jobtite" },
    { name: "الراتب", key: "salary" },
  ];
  const rows6 = [
    {
      id: 1,
      employeName: "أحمد محمد",
      idnumber: "1234567890",
      mobnumber: "500123456",
      address: "الرياض، المملكة العربية السعودية",
      jobtite: "مدير تطوير الأعمال",
      salary: "8000 ريال سعودي",
      actions: "عرض / تعديل",
    },
    {
      id: 2,
      employeName: "سارة علي",
      idnumber: "9876543210",
      mobnumber: "500987654",
      address: "جدة، المملكة العربية السعودية",
      jobtite: "محاسب أول",
      salary: "6000 ريال سعودي",
      actions: "عرض / تعديل",
    },
    {
      id: 3,
      employeName: "خالد السيد",
      idnumber: "1122334455",
      mobnumber: "500112233",
      address: "الدمام، المملكة العربية السعودية",
      jobtite: "مساعد إداري",
      salary: "5000 ريال سعودي",
      actions: "عرض / تعديل",
    },
  ];

  const dropdownOptions6 = [
    { label: "عرض", route: "/addnewemployee/general" },
    { label: "تقرير", route: "/generalemployeereports" },
  ];

  const DepartmentsDetailscolumns = [
    { name: "", key: "id", type: "hidden" },
    { name: "إسم القسم", key: "dapartmentname", type: "text" },
    { name: "إسم المدير", key: "mangername", type: "text" },
    { name: "وصف القسم", key: "desc", type: "text" },
  ];

  const [DepartmentsDetailsrows, setRows] = useState([
    {
      id: 1,
      dapartmentname: "Human Resources",
      mangername: "Ali Ahmed",
      desc: "Handles recruitment, employee relations, and training.",
    },
    {
      id: 2,
      dapartmentname: "Finance",
      mangername: "Fatima Khalid",
      desc: "Manages company budgets, payroll, and financial reporting.",
    },
    {
      id: 3,
      dapartmentname: "IT",
      mangername: "Mohammed Saleh",
      desc: "Responsible for technology infrastructure and support.",
    },
    {
      id: 4,
      dapartmentname: "Marketing",
      mangername: "Sara Youssef",
      desc: "Focuses on branding, advertising, and market research.",
    },
  ]);

  const handleSalaryFilter = () => {
    const filteredData = rows2.filter((row) => {
      const isNameMatch = !filterName || row.name === filterName;
      const isWithinDateRange =
        (!filterStartDate || row.salarydate >= filterStartDate) &&
        (!filterEndDate || row.salarydate <= filterEndDate);
      return isNameMatch && isWithinDateRange;
    });
    setSalaryData(filteredData);
  };

  const handleDownload = (selectedRows) => {
    let activeRows, activeColumns;

    switch (activeTab) {
      case "jobTitles":
        activeRows = rows1;
        activeColumns = columns1;
        break;
      case "salarySheet":
        activeRows = rows2;
        activeColumns = columns2;
        break;
      case "deductions":
        activeRows = rows3;
        activeColumns = columns3;
        break;
      case "monthlySalary":
        activeRows = monthsalaryrows;
        activeColumns = monthsalarycolumns;
        break;
      case "employees":
        activeRows = rows6;
        activeColumns = columns6;
        break;
      case "kpi":
        activeRows = kpiRows;
        activeColumns = kpiCoulmns;
        break;
      case "vacDetails":
        activeRows = vacationDetailsrows;
        activeColumns = VacationDetailscolumns;
        break;
      case "departDetails":
        activeRows = DepartmentsDetailsrows;
        activeColumns = DepartmentsDetailscolumns;
        break;

      default:
        alert("No data available for download");
        return;
    }

    const selectedData = activeRows.filter((row) =>
      selectedRows.includes(row.id)
    );
    if (selectedData.length === 0) {
      alert("Please select at least one row.");
      return;
    }

    const csvHeader = activeColumns
      .filter((col) => col.key !== "actions")
      .map((col) => col.name)
      .join(",");

    const csvRows = selectedData.map((row) =>
      activeColumns
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

  const handleAccept = (id) => {
    const updatedVacations = vacationData.map((vacation) => {
      if (vacation.id === id) {
        return { ...vacation, status: "موافق عليها" };
      }
      return vacation;
    });
    setVacationData(updatedVacations);
  };

  const handleReject = (id) => {
    const updatedVacations = vacationData.map((vacation) => {
      if (vacation.id === id) {
        return { ...vacation, status: "مرفوضة" };
      }
      return vacation;
    });
    setVacationData(updatedVacations);
  };
  return (
    <>
      <div className="hrreports-container">
        <div className="Hrtabs">
          {primaryTabs.map((tab) => (
            <button
              key={tab.id}
              className={`tab-button ${
                activeTab === tab.id ? "active" : ""
              } Hrtab`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
            </button>
          ))}

          <div className="dropdown">
            <button className="tab-button dropdown-buttonHR">
              تقارير إضافية
            </button>
            <div className="dropdown-content Dropdown-contentHR">
              {dropdownTabs.map((tab) => (
                <button
                  key={tab.id}
                  className={`dropdown-item dropdown-itemHR ${
                    activeTab === tab.id ? "active" : ""
                  }`}
                  onClick={() => setActiveTab(tab.id)}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="HRtab-content">
          {activeTab === "jobTitles" && (
            <div className="hrReports-tabel">
              <Title
                title="تقارير المسميات الوظيفية"
                icon={<FontAwesomeIcon icon={faTable} />}
                style={{ width: "unset" }}
              />
              <CustomTable
                onDownload={handleDownload}
                columns={columns1}
                data={rows1}
              />{" "}
            </div>
          )}

          {activeTab === "salarySheet" && (
            <div className="hrReports-table">
              <Title
                title="كشف المرتبات"
                icon={<FontAwesomeIcon icon={faTable} />}
                style={{ width: "unset" }}
              />
              <div className="selectionCon">
                <div className="nameselection-con">
                  <label htmlFor="filterName" className="filterStartDatelabel">
                    إسم الموظف
                  </label>
                  <select
                    id="filterName"
                    value={filterName}
                    onChange={(e) => setFilterName(e.target.value)}
                    className="empSelect"
                  >
                    <option value="">اختر موظفًا</option>
                    {rows2.map((row) => (
                      <option key={row.id} value={row.name}>
                        {row.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="nameselection-con">
                  <label
                    htmlFor="filterStartDate"
                    className="filterStartDatelabel"
                  >
                    اختر تاريخ
                  </label>
                  <input
                    id="filterStartDate"
                    type="date"
                    value={filterStartDate}
                    onChange={(e) => setFilterStartDate(e.target.value)}
                    className="vacdateselection"
                  />
                </div>

                <button
                  onClick={handleSalaryFilter}
                  className="vacdateselection"
                >
                  تصفية
                </button>
              </div>

              <div className="salary-table-container mytable-responsive">
                <table className="vac-custom-table">
                  <thead>
                    <tr className="vac-table-header">
                      <th>#</th>
                      <th>رقم الموظف</th>
                      <th>إسم الموظف</th>
                      <th>المسمى الوظيفي</th>
                      <th>القسم</th>
                      <th>المبلغ الكلي</th>
                      <th>المخصومات</th>
                      <th>المبلغ المدفوع</th>
                      <th>عدد أيام الغياب</th>
                      <th>تاريخ صرف الراتب</th>
                    </tr>
                  </thead>
                  <tbody>
                    {salaryData.length > 0 ? (
                      salaryData.map((row, index) => (
                        <tr key={row.id}>
                          <td>{index + 1}</td>
                          <td>{row.empnum}</td>
                          <td>{row.name}</td>
                          <td>{row.jobtitle}</td>
                          <td>{row.department}</td>
                          <td>{row.totalsalary}</td>
                          <td>{row.discounts}</td>
                          <td>{row.amountpaid}</td>
                          <td>{row.daysofabsence}</td>
                          <td>{row.salarydate}</td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="10">لا توجد بيانات</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === "employees" && (
            <div className="hrReports-tabel">
              <Title
                title="تقارير الموظفين"
                icon={<FontAwesomeIcon icon={faTable} />}
                style={{ width: "unset" }}
              />
              <CustomTable
                onDownload={handleDownload}
                columns={columns6}
                data={rows6}
                dropdownOptions={dropdownOptions6}
              />{" "}
            </div>
          )}

          {activeTab === "deductions" && (
            <div className="hrReports-tabel">
              <Title
                title="تقارير الخصومات"
                icon={<FontAwesomeIcon icon={faTable} />}
                style={{ width: "unset" }}
              />
              <CustomTable
                onDownload={handleDownload}
                columns={columns3}
                data={rows3}
              />{" "}
            </div>
          )}

          {activeTab === "monthlySalary" && (
            <div className="hrReports-tabel">
              <div className="hrReports-tabel">
                <Title
                  title="تقارير الراتب الشهري"
                  icon={<FontAwesomeIcon icon={faTable} />}
                  style={{ width: "unset" }}
                />
                <CustomTable
                  onDownload={handleDownload}
                  columns={monthsalarycolumns}
                  data={monthsalaryrows}
                  dropdownOptions={monthsalarydropdownOptions}
                />{" "}
              </div>
            </div>
          )}

          {activeTab === "kpi" && (
            <div className="hrReports-tabel">
              <div className="hrReports-tabel">
                <Title
                  title="تقارير التقييمات الوظيفية"
                  icon={<FontAwesomeIcon icon={faTable} />}
                  style={{ width: "unset" }}
                />
                <CustomTable
                  onDownload={handleDownload}
                  columns={kpiCoulmns}
                  data={kpiRows}
                />{" "}
              </div>
            </div>
          )}

          {activeTab === "vacations" && (
            <div className="hrReports-table">
              <Title
                title="تقارير الاجازات"
                icon={<FontAwesomeIcon icon={faTable} />}
                style={{ width: "unset" }}
              />
              <div className="selectionCon">
                <div className="nameselection-con">
                  <select
                    id="employeeSelect"
                    value={selectedEmployee}
                    onChange={(e) => setSelectedEmployee(e.target.value)}
                    className="empSelect"
                  >
                    <option value="">اختر موظفًا</option>
                    {employeeList.map((employee) => (
                      <option key={employee.id} value={employee.name}>
                        {employee.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="nameselection-con">
                  <label htmlFor="startDate">من:</label>
                  <input
                    id="startDate"
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="vacdateselection"
                  />
                </div>
                <div className="nameselection-con">
                  <label htmlFor="endDate">إلى:</label>
                  <input
                    id="endDate"
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="vacdateselection"
                  />
                </div>
                <button onClick={handleFilter} className="vacdateselection">
                  تصفية
                </button>
              </div>

              <div className="vacations-table-container">
                <div className="mytable-responsive">
                  <table className="vac-custom-table">
                    <thead>
                      <tr className="vac-table-header">
                        <th>#</th>
                        <th>إسم الموظف</th>
                        <th>وصف الإجازة</th>
                        <th>حالة الإجازة</th>
                        <th>عدد أيام الإجازة</th>
                        <th>من</th>
                        <th>إلى</th>
                        <th>الإجراء</th>
                      </tr>
                    </thead>
                    <tbody>
                      {vacationData.length > 0 ? (
                        vacationData.map((vacation, index) => (
                          <tr key={vacation.id}>
                            <td>{index + 1}</td>
                            <td>{vacation.employeeName}</td>
                            <td>{vacation.description}</td>
                            <td>{vacation.status}</td>
                            <td>{vacation.days}</td>
                            <td>{vacation.from}</td>
                            <td>{vacation.to}</td>
                            <td>
                              <Dropdown>
                                <Dropdown.Toggle
                                  variant="success"
                                  id="dropdown-basic"
                                  className="Hrrepotoggel"
                                >
                                  <FontAwesomeIcon icon={faEllipsis} />
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                  <Dropdown.Item>
                                    <button
                                      onClick={() => handleAccept(vacation.id)}
                                      className="accept-button"
                                    >
                                      موافقة
                                    </button>
                                  </Dropdown.Item>
                                  <Dropdown.Item>
                                    <button
                                      onClick={() => handleReject(vacation.id)}
                                      className="reject-button"
                                    >
                                      رفض
                                    </button>
                                  </Dropdown.Item>
                                </Dropdown.Menu>
                              </Dropdown>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="8">لا توجد إجازات</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {activeTab === "vacDetails" && (
            <div className="hrReports-tabel">
              <Title
                title="تفاصيل الاجازات"
                icon={<FontAwesomeIcon icon={faList} />}
              />
              <CustomTable
                columns={VacationDetailscolumns}
                data={vacationDetailsrows}
                onDownload={handleDownload}
                add={true}
                addTitle="نوع اجازة"
                filters={false}
              />
            </div>
          )}

          {activeTab === "departDetails" && (
            <div className="hrReports-tabel">
              <Title
                title="تفاصيل الاقسام"
                icon={<FontAwesomeIcon icon={faList} />}
              />
              <CustomTable
                columns={DepartmentsDetailscolumns}
                data={DepartmentsDetailsrows}
                onDownload={handleDownload}
                add={true}
                filters={false}
                addTitle="قسم"
              />
            </div>
          )}

          {activeTab === "attendancedeparturereport" && (
            <div className="hrReports-tabel">
              <Title
                title="تقرير الحضور والانصراف"
                icon={<FontAwesomeIcon icon={faList} />}
              />
              <CustomTable
                columns={comeleavecols}
                data={comeleaverows}
                search={true}
                onDownload={handleDownload}
              />
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default HRreports;
