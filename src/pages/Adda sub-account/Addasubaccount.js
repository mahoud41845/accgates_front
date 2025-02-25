import React, { useState } from "react";
import Title from "../../components/title";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserPlus } from "@fortawesome/free-solid-svg-icons";
import "./Addasubaccount.css";
import CustomButton from "../../components/CustomButton";
import SelectComponent from "components/SelectComponent";

function Addasubaccount() {
  // Data structure mapping each selection to its corresponding options
  const data = {
    accountTypes: [
      { value: "مدير", label: "مدير" },
      { value: "عامل", label: "عامل" },
      { value: "مصمم", label: "مصمم" },
    ],
    mainAccounts: {
      مدير: [
        { value: "حساب1", label: "حساب1" },
        { value: "حساب2", label: "حساب2" },
      ],
      عامل: [
        { value: "حساب3", label: "حساب3" },
        { value: "حساب4", label: "حساب4" },
      ],
      مصمم: [
        { value: "حساب5", label: "حساب5" },
        { value: "حساب6", label: "حساب6" },
      ],
    },
    subAccounts: {
      حساب1: [
        { value: "فرعي1", label: "فرعي1" },
        { value: "فرعي2", label: "فرعي2" },
      ],
      حساب2: [
        { value: "فرعي3", label: "فرعي3" },
        { value: "فرعي4", label: "فرعي4" },
      ],
      حساب3: [
        { value: "فرعي5", label: "فرعي5" },
        { value: "فرعي6", label: "فرعي6" },
      ],
      // Add mappings for other main accounts as needed
    },
  };

  // State hooks
  const [name, setName] = useState("");
  const [accountType, setAccountType] = useState("");
  const [mainAccount, setMainAccount] = useState("");
  const [subAccount, setSubAccount] = useState("");
  const [openingBalance, setOpeningBalance] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");

  // Handle form submission
  const handleSave = () => {
    if (!name || !accountType || !mainAccount || !subAccount || !openingBalance) {
      setError("يجب ملء جميع الحقول الإلزامية");
    } else {
      setError("");
      // Handle form submission logic here
      console.log("Form submitted successfully!");
    }
  };

  // Handle changes in account type
  const handleAccountTypeChange = (e) => {
    const selectedAccountType = e.target.value;
    setAccountType(selectedAccountType);
    setMainAccount("");
    setSubAccount("");
    setOpeningBalance("");
  };

  // Handle changes in main account
  const handleMainAccountChange = (e) => {
    const selectedMainAccount = e.target.value;
    setMainAccount(selectedMainAccount);
    setSubAccount("");
    setOpeningBalance("");
  };

  // Handle changes in sub account
  const handleSubAccountChange = (e) => {
    const selectedSubAccount = e.target.value;
    setSubAccount(selectedSubAccount);
    setOpeningBalance("");
  };

  return (
    <div className="Addasubaccount">
      <Title
        title="إضافة حساب فرعي"
        icon={<FontAwesomeIcon icon={faUserPlus} />}
      />
      <div className="form-Addasubaccount">
   
         <input
          className="input-Addasubaccount"
          type="number"
          placeholder="رقم الحساب"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <select
          className="select-Addasubaccount"
          value={accountType}
          onChange={handleAccountTypeChange}
          disabled={!name}
        >
          <option className="option-Addasubaccount" value="">
            نوع الحساب
          </option>
          {data.accountTypes.map((option) => (
            <option
              className="option-Addasubaccount"
              key={option.value}
              value={option.value}
            >
              {option.label}
            </option>
          ))}
        </select>

        <select
          className="select-Addasubaccount"
          value={mainAccount}
          onChange={handleMainAccountChange}
          disabled={!accountType}
        >
          <option value="">اسم الحساب الأساسي</option>
          {accountType &&
            data.mainAccounts[accountType]?.map((option) => (
              <option
                className="option-Addasubaccount"
                key={option.value}
                value={option.value}
              >
                {option.label}
              </option>
            ))}
        </select>

        <select
          className="select-Addasubaccount"
          value={subAccount}
          onChange={handleSubAccountChange}
          disabled={!mainAccount}
        >
          <option value="">اسم الحساب الفرعي</option>
          {mainAccount &&
            data.subAccounts[mainAccount]?.map((option) => (
              <option
                className="option-Addasubaccount"
                key={option.value}
                value={option.value}
              >
                {option.label}
              </option>
            ))}
        </select>

         <input
          className="input-Addasubaccount"
          type="number"
          placeholder="الرصيد الافتتاحي"
          value={openingBalance}
          onChange={(e) => setOpeningBalance(e.target.value)}
          disabled={!subAccount}
        />
        <input
          className="input-Addasubaccount"
          type="number"
          placeholder="      قائمه  "
          value={openingBalance}
          onChange={(e) => setOpeningBalance(e.target.value)}
          disabled={!subAccount}
        />
 
        <input
          className="input-Addasubaccount"
          type="text"
          placeholder="الوصف"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        {error && <p style={{ color: "red" }}>{error}</p>}
        <CustomButton text="حفظ" onClick={handleSave} />
      </div>
    </div>
  );
}

export default Addasubaccount;
