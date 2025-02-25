import React, { useState } from "react";
import { Navbar } from "react-bootstrap";
import Dropdown from "./Dropdown";
import {
  faCogs,
  faChartSimple,
  faLayerGroup,
  faRightFromBracket,
  faUser,
  faCaretRight,
  faCalculator,
  faCoins,
  faCartShopping,
  faCartArrowDown,
  faWarehouse,
  faMoneyBill,
} from "@fortawesome/free-solid-svg-icons";
import DarkLightbutton from "./DarkLightbutton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useTranslation } from "react-i18next";

const RightSidebar = ({ isVisible, toggleSidebar }) => {
  const [isUserMenuVisible, setUserMenuVisible] = useState(false);
  const { t } = useTranslation(); 

  const toggleUserMenu = () => {
    setUserMenuVisible((prev) => !prev);
  };

  const dropdownChoices1 = [
    { label: "إنشاء عمليات جديدة", route: "/createandmanege" },
    { label: "التقارير", route: "/casedetails" },
  ];

  const dropdownChoices2 = [
    { label: "إنشاء مشروع جديد", route: "/marketingdesignprojectmanagement" },
    { label: "إنشاء طلب تصميم", route: "/senddesignrequest" },
    { label: "إنشاء طلب تسويق", route: "/sendmarketingrequest" },
    { label: "تفاصيل التصاميم", route: "/designsdetails" },
    { label: "التقارير", route: "/projectStatus" },
  ];

  const dropdownChoices3 = [
    { label: "المسمي الوظيفي", route: "/jobtitle" },
    { label: "إضافة موظف جديد", route: "/addnewemployee" },
    { label: "الاجازات", route: "/vacationrequest" },
    { label: "الرواتب والخصومات", route: "/monthlysalary" },
    { label: "تقييم الاداء الوظيفي", route: "/JobPerformanceEvaluation" },
    { label: "التقارير", route: "/hrreports" },
  ];

  const dropdownChoices4 = [
    { label: "إضافة عميل جديد", route: "/addnewclient" },
    { label: "إضافة مورد جديد", route: "/addnewsupplier" },
    { label: "كشف الحساب", route: "/statementofaccount" },
    { label: "تقرير الحسابات", route: "/accountsReport" },
    { label: "فاتورة المبيعات", route: "/salesinvoice" },
    { label: "فاتورة المشتريات", route: "/purchaseInvoice" },
    { label: "فاتورة إسترداد المشتريات", route: "/purchaserefundinvoice" },
    { label: "فاتورة إسترداد المبيعات", route: "/salesrefundinvoice" },
  ];

  const dropdownChoices5 = [
    { label: t("Chartofaccounts"), route: "/chartofaccounts" },
    { label: t("accountingentry"), route: "/accountingentry" },
   ];

  const dropdownChoices6 = [
    { label: t("Purchases-invoice"), route: "/purchaseInvoice" },
    { label: t("Purchase-Return-Invoice") , route: "/purchaserefundinvoice" },
    { label: t("purchasesReport"), route: "/purchasesreport" },
    { label: t("Supplier-reports"), route: "/supplieRreports" },
  ];
    const dropdownChoices7 = [
      { label:t("Sales-invoice"), route: "/salesinvoice" },
      { label: t("Sales-return-invoice"), route: "/salesrefundinvoice" },
      { label: t("salesReport"), route: "/salesreport" },
      { label: t("Customer-reports"), route: "/customerreport" },
    ];
const dropdownChoices8 = [
  { label: t("warehouse-report"), route: "/warehousereport" },
  { label: t("unit-report"), route: "/unitsreport" },
  { label: t("item-report"), route: "/itemsreport" },
  { label: t("items"), route: "/items" },
   {
    label: t("transfer-invoice-between-stores"),
    route: "/transferinvoicebetweenstores",
  },
  { label: t("store-inventory"), route: "/storeinventory" },
  { label: t("purecommand"), route: "/purecommand" },
  { label: t("settlementreport"), route: "/settlementreport" },
];
const dropdownChoices9 = [
  { label: t("money_receipt_report"), route: "/moneyreceiptreports" },
  { label: t("money_transfer_report"), route: "/moneytransferreports" },
  { label: t("account_statement"), route: "/Accountstatement" },
];
const dropdownChoices10 = [
  { label: t("jobtitlesreport"), route: "/jobtitlesreport" },
  { label: t("SectionsReport"), route: "/SectionsReport" },
  { label: t("Leavereport"), route: "/leavereport" },
  { label: t("Leavepermissionreport"), route: "/leavepermissionreport" },
  { label: t("attendanceanddeparturereport"), route: "/attendanceanddeparturereport" },
  { label: t("deductionsandbonusesreport"), route: "/deductionsandbonusesreport" },
  { label: t("investigationsreport"), route: "/investigationsreport" },
  { label: t("payrollstatement"), route: "/payrollstatement" },
  { label: t("salarydetails"), route: "/salarydetails" },
  { label: t("employeereport"), route: "/employeereport" },
 
];


  return (
    <Navbar className={`right-sidebar ${isVisible ? "visible" : "hidden"}`}>
      <div className="side-head">
        <div className="closeSide">
          <button className="sidebar-close-btn" onClick={toggleSidebar}>
            <FontAwesomeIcon icon={faCaretRight} />{" "}
          </button>
        </div>
        <div className="infoSide">
          <div className="text">
            <h4>الاسم</h4>
            <p>user@ex.com</p>
          </div>
          <div className="side-imageCon" onClick={toggleUserMenu}>
            <img
              className="side-image"
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSlEM0sf-TBEuRvxsiX_pTDbNsZ0kxXKy93tf5w1fMQFwgYiMfFS4jTZVjNgmYj0lF6GCQ&usqp=CAU"
              alt="pic"
            />
            {isUserMenuVisible && (
              <div className="user-dropdown">
                <ul>
                  <li>
                    {" "}
                    <FontAwesomeIcon icon={faUser} />{" "}
                    <a href="/profile">الملف الشخصي</a>{" "}
                  </li>
                  <li>
                    {" "}
                    <FontAwesomeIcon icon={faRightFromBracket} />{" "}
                    <a href="/logout">تسجيل الخروج</a>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="side-lists" id="scrollableDivNav">
      
        <Dropdown
          name={t("accounts")}
          choices={dropdownChoices5}
          icon={faCoins}
        />
        <Dropdown
          name={t("purchases")}
          choices={dropdownChoices6}
          icon={faCartArrowDown}
        />
        <Dropdown
          name={t("sales")}
          choices={dropdownChoices7}
          icon={faCartShopping}
        />
        <Dropdown
          name={t("warehouses")}
          choices={dropdownChoices8}
          icon={faWarehouse}
        />
        <Dropdown name={t("money")} 
        choices={dropdownChoices9}
         icon={faMoneyBill} />
        <Dropdown name={t("hr")} 
        choices={dropdownChoices10}
         icon={faMoneyBill} />
      </div>
      <div className="dl-change">
        <DarkLightbutton />
      </div>
    </Navbar>
  );
};

export default RightSidebar;
