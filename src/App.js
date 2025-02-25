import React, { useEffect, useState } from "react";
import "./App.css";
import "./english.css";
import RightSidebar from "./components/RightSidebar";
import HomeNavbar from "./components/HomeNavbar";
import { Route, Routes, useLocation } from "react-router-dom";
import CharityRegistration from "./pages/CharityRegistration/CharityRegistration";
import Login from "./pages/Login/Login";
import Home from "./pages/Home/Home";
import "./modal.css";
import ThemeContextProvider from "./context/theme-context";
import SalesInvoice from "./pages/SalesInvoice/SalesInvoice";
import PurchaseInvoice from "./pages/SalesInvoice/PurchaseInvoice";
import PurchaseRefundInvoice from "./pages/SalesInvoice/PurchaseRefundInvoice";
import SalesRefundInvoice from "./pages/SalesInvoice/SalesRefundInvoice";
import AppRegister from "./pages/AppRegister/AppRegister";
import VerifyEmail from "./pages/Verivy/VerifyEmail";
import AccountingEntry from "./pages/AccountingEntry/AccountingEntry";
import Chartofaccounts from "./pages/Chart of accounts/Chartofaccounts";
import PurchasesReport from "./pages/PurchasesReport/PurchasesReport";
import SalesReport from "./pages/SalesReport/SalesReport.js";
import AddSupplier from "./pages/AddSupplier/AddSupplier.js";
import AddClient from "./pages/AddClint/AddClient.js";
import CustomerReport from "./pages/CustomerReport/CustomerReport.js";
import SupplieRreports from "./pages/Supplier reports/SupplieRreports.js";
import { useTranslation } from "react-i18next";
import i18n from "i18next"; // Assuming you're using i18next
import CaseDetails from "./pages/CaseDetails/CaseDetails.js";
import Warehousereport from "./pages/WarehouseReport/Warehousereport.js";
import HRreports from "./pages/HRreports/HRreports.js";
import Unitsreport from "./pages/UnitsReport/Unitsreport.js";
import Itemsreport from "./pages/ItemsReport/Itemsreport.js";
import Items from "./pages/Items/Items.js";
import Additem from "./pages/Additem/Additem.js";
import TransferInvoiceBetweenStores from "./pages/TransferInvoiceBetweenStores/TransferInvoiceBetweenStores.js";
import Storeinventory from "./pages/Store inventory/Storeinventory.js";
import Purecommand from "./pages/Purecommand/Purecommand.js";
import Sidebardash from "./pages/Sidebardash/Sidebardash.js";
import Settlementreport from "./pages/Settlementreport/Settlementreport.js";
import Moneyreceiptreports from "./pages/MoneyReceiptReports/Moneyreceiptreports.js";
import Moneytransferreports from "./pages/Moneytransferreports/Moneytransferreports.js";
import Accountstatement from "./pages/Accountstatement/Accountstatement.js";
import Jobtitlesreport from "./pages/Jobtitlesreport/Jobtitlesreport.js";
import SectionsReport from "./pages/SectionsReport/SectionsReport.js";
import Leavereport from "./pages/Leavereport/Leavereport.js";
import Leavepermissionreport from "./pages/Leavepermissionreport/Leavepermissionreport.js";
import Attendanceanddeparturereport from "./pages/Attendanceanddeparturereport/Attendanceanddeparturereport.js";
import Deductionsandbonusesreport from "./pages/Deductionsandbonusesreport/Deductionsandbonusesreport.js";
import Investigationsreport from "./pages/Investigationsreport/Investigationsreport.js";
import Payrollstatement from "./pages/Payrollstatement/Payrollstatement.js";
import Salarydetails from "./pages/SalaryDetails/Salarydetails.js";
import Employeereport from "./pages/EmployeeReport/Employeereport.js";
  function App() {
  const location = useLocation();
  const [isSidebarVisible, setSidebarVisible] = useState(false);
  // const [isEnglish, setIsEnglish] = useState(
  //   localStorage.getItem("language") === "en"
  // );
  const savedLanguage = localStorage.getItem("language") || "ar";
  const [isLoading, setIsLoading] = useState(true);
  const [isEnglish, setIsEnglish] = useState(localStorage.getItem("language") === "en");

  const { t, i18n } = useTranslation();

  const showNavbar =
    location.pathname !== "/login" &&
    location.pathname !== "/AppRegister" &&
    location.pathname !== "/verifiyemail" &&
    location.pathname !== "/sidebardash" &&
    location.pathname !== "/datareview";

  const showSidebar =
    location.pathname !== "/login" &&
    location.pathname !== "/AppRegister" &&
    location.pathname !== "/verifiyemail" &&
    location.pathname !== "/sidebardash" &&
    location.pathname !== "/datareview";

  const toggleSidebar = () => {
    setSidebarVisible((prevState) => !prevState);
  };

  useEffect(() => {
    i18n.changeLanguage(savedLanguage);
  }, [savedLanguage]);

  // const onLanguageToggle = () => {
  //   const newLanguage = isEnglish ? "ar" : "en";
  //   i18n.changeLanguage(newLanguage);
  //   localStorage.setItem("language", newLanguage);
  //   setIsEnglish(!isEnglish);
  // };
  const onLanguageToggle = (language) => {
    // If the current language is not the same as the selected language, change it
    if (i18n.language !== language) {
      i18n.changeLanguage(language);
      localStorage.setItem("language", language);
      setIsEnglish(language === "en");
    }
  };

  useEffect(() => {
    const body = document.body;

    if (isEnglish) {
      body.classList.add("english");
    } else {
      body.classList.remove("english");
    }

    if (isSidebarVisible) {
      body.classList.add("sidebar-open");
      body.classList.remove("sidebar-closed");
    } else {
      body.classList.add("sidebar-closed");
      body.classList.remove("sidebar-open");
    }

    return () => {
      body.classList.remove("english", "sidebar-open", "sidebar-closed");
    };
  }, [isEnglish, isSidebarVisible]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="loading-spinner">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <ThemeContextProvider>
      <div className="App">
        {showNavbar && (
          <HomeNavbar
            toggleSidebar={toggleSidebar}
            isSidebarVisible={isSidebarVisible}
            onLanguageToggle={onLanguageToggle}
            isEnglish={isEnglish}
            size={undefined}
          />
        )}
        {showSidebar && (
          <RightSidebar
            isVisible={isSidebarVisible}
            toggleSidebar={toggleSidebar}
          />
        )}
        <div className="page-container">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/home" element={<Home />} />
            <Route path="/salesinvoice" element={<SalesInvoice />} />
            <Route path="/purchaseInvoice" element={<PurchaseInvoice />} />
            <Route
              path="/purchaserefundinvoice"
              element={<PurchaseRefundInvoice />}
            />
            <Route
              path="/salesrefundinvoice"
              element={<SalesRefundInvoice />}
            />
            <Route path="/AppRegister" element={<AppRegister />} />
            <Route path="/verifiyemail" element={<VerifyEmail />} />
            <Route path="/accountingentry" element={<AccountingEntry />} />
            <Route path="/chartofaccounts" element={<Chartofaccounts />} />
            <Route path="/purchasesreport" element={<PurchasesReport />} />
            <Route path="/salesreport" element={<SalesReport />} />
            <Route path="/addsupplier" element={<AddSupplier />} />
            <Route path="/addclient" element={<AddClient />} />
            <Route path="/customerreport" element={<CustomerReport />} />
            <Route path="/supplieRreports" element={<SupplieRreports />} />
            <Route path="/casedetails" element={<CaseDetails />} />
            <Route path="/warehousereport" element={<Warehousereport />} />
            <Route path="/unitsreport" element={<Unitsreport />} />
            <Route path="/itemsreport" element={<Itemsreport />} />
            <Route path="/items" element={<Items />} />
            <Route path="/additem" element={<Additem />} />
            <Route path="/purecommand" element={<Purecommand />} />
            <Route
              path="/transferinvoicebetweenstores"
              element={<TransferInvoiceBetweenStores />}
            />
            <Route
              path="/moneytransferreports"
              element={<Moneytransferreports />}
            />
            <Route
              path="/moneyreceiptreports"
              element={<Moneyreceiptreports />}
            />
            <Route path="/storeinventory" element={<Storeinventory />} />
            <Route path="/settlementreport" element={<Settlementreport />} />
            <Route path="/sidebardash" element={<Sidebardash />} />
            <Route path="/accountstatement" element={<Accountstatement />} />
            <Route path="/jobtitlesreport" element={<Jobtitlesreport />} />
            <Route path="/sectionsReport" element={<SectionsReport />} />
            <Route path="/leavereport" element={<Leavereport />} />
            <Route path="/leavepermissionreport" element={<Leavepermissionreport />} />
            <Route path="/attendanceanddeparturereport" element={<Attendanceanddeparturereport />} />
            <Route path="/deductionsandbonusesreport" element={<Deductionsandbonusesreport />} />
            <Route path="/investigationsreport" element={<Investigationsreport />} />
            <Route path="/payrollstatement" element={<Payrollstatement />} />
            <Route path="/salarydetails" element={<Salarydetails />} />
            <Route path="/employeereport" element={<Employeereport />} />
           </Routes>
        </div>
      </div>
    </ThemeContextProvider>
  );
}

export default App;
