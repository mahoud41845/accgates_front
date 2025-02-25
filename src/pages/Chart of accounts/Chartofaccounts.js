import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPercentage,
  faPlus,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { Modal, Button, Form } from "react-bootstrap";
import Title from "../../components/title";
import "./Chartofaccounts.css";
import { useTranslation } from "react-i18next";
import { Table } from "react-bootstrap";
import RegisterTextbox from "../../components/RegisterTextBox";
import SelectComponent from "../../components/SelectComponent";
import RegisterTextarea from "../../components/RegisterTextarea";

function Chartofaccounts() {
  const [showModal, setShowModal] = useState(false);
  const { t, i18n } = useTranslation();
  const [formData, setFormData] = useState({
    accountNumber: "",
    accountType: "",
    mainAccount: "",
    subAccount: "",
    subSubAccount: "",
    openingBalance: "",
    description: "",
    calculateDepreciation: "",
    hasUsefulLife: "",
    usefulLife: "",
    cashFlow: "",
  });

  const [error, setError] = useState("");
  const [accountsData, setAccountsData] = useState([]);
  const [mainAccounts, setMainAccounts] = useState([]);
  const [accountTypes, setAccountTypes] = useState([]);
  const [filteredData, setFilteredData] = useState(null);
  const [subAccounts, setSubAccounts] = useState([]);
  const [subSubAccounts, setSubSubAccounts] = useState([]);
  const [activeButton, setActiveButton] = useState("showAll");
  const [hoveredRow, setHoveredRow] = useState(null);
  const [selectedNode, setSelectedNode] = useState(null);
  const [showModalacc, setShowModalacc] = useState(false);
  const [open, setOpen] = useState(false);
  const [editableModalData, setEditableModalData] = useState(null);
  const [showEditableModal, setShowEditableModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState(""); // Added search term state

  const token = localStorage.getItem("authToken");

  useEffect(() => {
    fetchData();
  }, [token]);

  const fetchData = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/user/tree", {
        headers: { Authorization: `Bearer ${token}` },
      });

      const fetchedData = response.data.data || {};
      const dataArray = Object.values(fetchedData);
      setAccountsData(dataArray);

      const fatherAccounts = dataArray.filter((account) => !account.parent_id);
      setMainAccounts(fatherAccounts);

      const types = dataArray
        .map((account) => account.accountType)
        .filter(Boolean);
      setAccountTypes([...new Set(types)]);
    } catch (error) {
      console.error("Error fetching data:", error);
      setError("Failed to load account data.");
    }
  };

  const handleButtonClick = (buttonName, handler) => {
    setActiveButton(buttonName);
    handler();
  };

  const renderTreeTable = (nodes, level = 0) => {
    if (!Array.isArray(nodes)) return null;

    return nodes.map((node) => (
      <React.Fragment key={node.id}>
        <tr
          onDoubleClick={() => handleRowClick(node)}
          onMouseEnter={() => setHoveredRow(node.id)}
          onMouseLeave={() => setHoveredRow(null)}
          className="hoverd-account"
        >
          <td
            style={{
              paddingRight: i18n.language === "ar" ? `${level * 30}px` : "0px",
              paddingLeft: i18n.language === "en" ? `${level * 30}px` : "0px",
              direction: i18n.language === "ar" ? "rtl" : "ltr",
              textAlign: i18n.language === "ar" ? "start" : "left",
              fontWeight:
                level === 0
                  ? "bold"
                  : level === 1
                  ? "bold"
                  : level === 2
                  ? "bold"
                  : "normal",
              fontSize: level === 0 ? "22px" : level === 1 ? "20px" : "18px",
            }}
            className="accnumpad"
          >
            {node.number}
          </td>
          <td
            style={{
              fontWeight:
                level === 0
                  ? "bold"
                  : level === 1
                  ? "bold"
                  : level === 2
                  ? "bold"
                  : "normal",
              fontSize: level === 0 ? "20px" : level === 1 ? "18px" : "16px",
              textAlign: "center",
            }}
          >
            {node.name}
          </td>
          <td
            style={{
              direction: i18n.language === "ar" ? "rtl" : "ltr",
              textAlign: i18n.language === "ar" ? "start" : "left",
              fontWeight:
                level === 0
                  ? "bold"
                  : level === 1
                  ? "bold"
                  : level === 2
                  ? "bold"
                  : "normal",
              fontSize: level === 0 ? "22px" : level === 1 ? "20px" : "18px",
              textAlign: "center",
            }}
          >
            {node.is_payable === "True" ? "Yes" : "No"}
          </td>
          <td
            style={{
              direction: i18n.language === "ar" ? "rtl" : "ltr",
              textAlign: i18n.language === "ar" ? "start" : "left",
              fontWeight:
                level === 0
                  ? "bold"
                  : level === 1
                  ? "bold"
                  : level === 2
                  ? "bold"
                  : "normal",
              fontSize: level === 0 ? "22px" : level === 1 ? "20px" : "18px",
              textAlign: "center",
            }}
          >
            {node.balance}
          </td>
          <td
            style={{
              direction: i18n.language === "ar" ? "rtl" : "ltr",
              textAlign: i18n.language === "ar" ? "start" : "left",
              textAlign: "center",
              fontWeight:
                level === 0
                  ? "bold"
                  : level === 1
                  ? "bold"
                  : level === 2
                  ? "bold"
                  : "normal",
              fontSize: level === 0 ? "22px" : level === 1 ? "20px" : "18px",
            }}
          >
            {node.accountType || "N/A"}
          </td>
        </tr>
        {node.children &&
          node.children.length > 0 &&
          renderTreeTable(node.children, level + 1)}
      </React.Fragment>
    ));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleMainAccountChange = (selectedOption) => {
    const selectedValue = selectedOption ? selectedOption.value : "";
    setFormData({
      ...formData,
      mainAccount: selectedValue,
      subAccount: "",
      subSubAccount: "",
    });

    const selectedAccount = accountsData.find(
      (account) => account.number === selectedValue
    );
    if (selectedAccount && selectedAccount.children) {
      setSubAccounts(selectedAccount.children);
    } else {
      setSubAccounts([]);
      setSubSubAccounts([]);
    }
  };

  const handleSubAccountChange = (selectedOption) => {
    const selectedValue = selectedOption ? selectedOption.value : "";
    setFormData({
      ...formData,
      subAccount: selectedValue,
      subSubAccount: "",
    });

    const selectedSubAccount = subAccounts.find(
      (account) => account.number === selectedValue
    );
    if (selectedSubAccount) {
      setSubSubAccounts(selectedSubAccount.children || []);
    } else {
      setSubSubAccounts([]);
    }
  };

  const handleSubSubAccountChange = (selectedOption) => {
    const selectedValue = selectedOption ? selectedOption.value : "";
    setFormData({
      ...formData,
      subSubAccount: selectedValue,
    });
  };

  const toggleOriginsFilter = () => {
    const origins = accountsData.filter(
      (account) => account.number && account.number.startsWith("1")
    );
    setFilteredData(origins);
  };

  const toggleCommitmentsFilter = () => {
    const commitments = accountsData.filter(
      (account) => account.number && account.number.startsWith("2")
    );
    setFilteredData(commitments);
  };

  const toggleCopyrightFilter = () => {
    const copyright = accountsData.filter(
      (account) => account.number && account.number.startsWith("3")
    );
    setFilteredData(copyright);
  };

  const toggleRevenuesFilter = () => {
    const revenues = accountsData.filter(
      (account) => account.number && account.number.startsWith("4")
    );
    setFilteredData(revenues);
  };

  const toggleSalesCostsFilter = () => {
    const salesCosts = accountsData.filter(
      (account) => account.number && account.number.startsWith("5")
    );
    setFilteredData(salesCosts);
  };

  const toggleExpensesFilter = () => {
    const expenses = accountsData.filter(
      (account) => account.number && account.number.startsWith("6")
    );
    setFilteredData(expenses);
  };

  const showAllAccounts = () => {
    setFilteredData(null);
    setActiveButton("showAll");
  };

  const handleSave = async () => {
    const {
      accountNumber,
      openingBalance,
      description,
      mainAccount,
      subAccount,
      subSubAccount,
      calculateDepreciation,
      hasUsefulLife,
      usefulLife,
      cashFlow,
    } = formData;

    let parentAccountNumber = null;

    if (subSubAccount) {
      parentAccountNumber = subSubAccount;
    } else if (subAccount) {
      parentAccountNumber = subAccount;
    } else if (mainAccount) {
      parentAccountNumber = mainAccount;
    }

    const newAccountData = {
      name: accountNumber,
      description: description || "No description provided",
      balance: parseFloat(openingBalance) || 0,
      cash_flow: cashFlow,
      parent_account_number: parentAccountNumber, // Use the determined parent
      depreciation: calculateDepreciation === "yes" ? "yes" : "no",
      life_expectancy:
        calculateDepreciation === "yes" && usefulLife ? usefulLife : null,
    };

    console.log("Data to be sent:", newAccountData);

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/user/accounts/add",
        newAccountData,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      console.log("API Response:", response.data);

      setShowModal(false);
      setFormData({
        accountNumber: "",
        accountType: "",
        mainAccount: "",
        subAccount: "",
        subSubAccount: "",
        openingBalance: "",
        description: "",
        calculateDepreciation: "",
        usefulLife: "",
        cashFlow: "",
      });
      setError("");

      await fetchData();
    } catch (error) {
      console.error("Error adding account:", error);

      if (error.response) {
        console.error("Server Response:", error.response.data);
        console.error("Server Status:", error.response.status);
        console.error("Server Headers:", error.response.headers);
        setError(
          `${t("add-account-error")}: ${
            error.response.data.message || error.message
          }`
        );
      } else if (error.request) {
        setError(`${t("add-account-error")}: No response from server.`);
      } else {
        setError(`${t("add-account-error")}: ${error.message}`);
      }
    }
  };

  const isFixedAssetsSelected = formData.subAccount === "1-3000";
  const copyright = formData.mainAccount === "3-0000";

  const handleRowClick = (node) => {
    if (node.level === 3 || node.level === 2 || node.level === 1) {
      setSelectedNode(node);
      setShowModalacc(true);
      setOpen(true);
    } else {
      setSelectedNode(node);
      setEditableModalData(node);
      setShowEditableModal(true);
    }
  };
  const handleCloseModal = () => {
    setShowModalacc(false);
    setSelectedNode(null);
  };
  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setEditableModalData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleEditSave = async () => {
    try {
      await axios.put(
        `http://127.0.0.1:8000/api/user/accounts/${editableModalData.id}`,
        editableModalData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setShowEditableModal(false);
    } catch (error) {
      console.error("Error updating account:", error);
      setError("Failed to update account.");
    }
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

const filterTree = (tree, searchTerm) => {
  const lowerSearchTerm = searchTerm.toLowerCase();

  const filterNode = (node) => {
    const nameMatch =
      node.name && node.name.toLowerCase().includes(lowerSearchTerm);

    // إذا كانت العقدة تطابق البحث، نعيدها فقط
    if (nameMatch) {
      return { ...node, children: [] }; // نعيد العقدة بدون الأطفال
    }

    // إذا كانت العقدة لا تطابق البحث، نتجاهلها تمامًا
    return null;
  };

  // نبحث في الشجرة بالكامل (بما في ذلك الأطفال) ونرجع فقط العقد التي تطابق البحث
  const flatFilter = (nodes) => {
    let results = [];
    for (const node of nodes) {
      if (filterNode(node)) {
        results.push(filterNode(node)); // نضيف العقدة المطابقة
      }
      if (node.children) {
        results = results.concat(flatFilter(node.children)); // نبحث في الأطفال
      }
    }
    return results;
  };

  return flatFilter(tree); // نرجع النتائج بعد البحث
  };
  
  
  const getFilteredAccounts = () => {
    let dataToFilter = filteredData || accountsData;

    if (searchTerm) {
      dataToFilter = filterTree(dataToFilter, searchTerm);
    }

    return dataToFilter;
  };

  const filteredAccounts = getFilteredAccounts();

  return (
    <div className="Chartofaccounts-container">
      <Title
        title={t("Chartofaccounts")}
        icon={<FontAwesomeIcon icon={faPlus} />}
      />

      <div className="buttons-container">
        <button
          onClick={() => handleButtonClick("showAll", showAllAccounts)}
          className={`btntreesersh ${
            activeButton === "showAll" ? "active" : ""
          }`}
        >
          {t("Viewall")}
        </button>
        <button
          onClick={() => handleButtonClick("origins", toggleOriginsFilter)}
          className={`btntreesersh ${
            activeButton === "origins" ? "active" : ""
          }`}
        >
          {t("origins")}
        </button>
        <button
          onClick={() =>
            handleButtonClick("commitments", toggleCommitmentsFilter)
          }
          className={`btntreesersh ${
            activeButton === "commitments" ? "active" : ""
          }`}
        >
          {t("commitments")}
        </button>
        <button
          onClick={() => handleButtonClick("copyright", toggleCopyrightFilter)}
          className={`btntreesersh ${
            activeButton === "copyright" ? "active" : ""
          }`}
        >
          {t("copyright")}
        </button>
        <button
          onClick={() => handleButtonClick("revenues", toggleRevenuesFilter)}
          className={`btntreesersh ${
            activeButton === "revenues" ? "active" : ""
          }`}
        >
          {t("revenues")}
        </button>
        <button
          onClick={() =>
            handleButtonClick("salesCosts", toggleSalesCostsFilter)
          }
          className={`btntreesersh ${
            activeButton === "salesCosts" ? "active" : ""
          }`}
        >
          {t("salesCosts")}
        </button>
        <button
          onClick={() => handleButtonClick("expenses", toggleExpensesFilter)}
          className={`btntreesersh ${
            activeButton === "expenses" ? "active" : ""
          }`}
        >
          {t("expenses")}
        </button>
      </div>
      <div className="search-container"></div>

      <div className="table-tree-container">
        <div className="form-tree">
          <div className="addaccount-form">
            <button
              onClick={() => setShowModal(true)}
              className="addrowInvoice mange"
            >
              <FontAwesomeIcon icon={faPlus} /> {t("addaccount")}
            </button>
          </div>
          <RegisterTextbox
            type="text"
            label={t("search")}
            placeholder={t("search")}
            value={searchTerm}
            onChange={handleSearchChange}
            className="search-input"
            parentStyle={{ width: "20%" }}
          />
        </div>
        <table className="table-tree">
          <thead>
            <tr className="head-Chartofaccounts">
              <th> {t("Accountnumber")} </th>
              <th> {t("AccountName")} </th>
              <th>{t("canbepaid")} </th>
              <th>{t("Balance")}</th>
              <th>{t("Account-type")} </th>
            </tr>
          </thead>
          <tbody>
            {filteredAccounts.length > 0 ? (
              renderTreeTable(filteredAccounts)
            ) : (
              <tr>
                <td colSpan="5" style={{ textAlign: "center" }}>
                  {t("No-data-available")}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <Modal
        className="add-subacc-modal"
        show={showModal}
        onHide={() => setShowModal(false)}
        centered
      >
        <Modal.Header>
          <Button
            className="custom-close-button"
            variant="link"
            onClick={() => setShowModal(false)}
          >
            <FontAwesomeIcon icon={faXmark} className="closeModal" />
          </Button>
          <Modal.Title className="title-sub">
            {t("Add-sub-account")}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form className="form-subaccc">
            <div className="from1-subacc">
              <Form.Group className="sub-inputs">
                <Form.Label> {t("Account-type")}</Form.Label>
                <SelectComponent
                  className="mm-sub"
                  placeholder={t("Select-account-type")}
                  options={mainAccounts.map((account) => ({
                    value: account.number,
                    label: account.name,
                  }))}
                  value={formData.mainAccount}
                  onChange={(selectedOption) =>
                    handleMainAccountChange(selectedOption)
                  }
                />
              </Form.Group>
              <Form.Group className="sub-inputs">
                <Form.Label> {t("Account-name")}</Form.Label>
                <RegisterTextbox
                  className="mm-sub"
                  type="text"
                  name="accountNumber"
                  value={formData.accountNumber}
                  onChange={handleInputChange}
                  placeholder={t("Account-name")}
                />
              </Form.Group>
            </div>
            <div className="main-form">
              <div className="from1-subacc">
                <Form.Group className="sub-inputs">
                  <Form.Label> {t("Sub-account-name")}</Form.Label>
                  <SelectComponent
                    className="mm-sub"
                    placeholder={t("Sub-account-name")}
                    options={subSubAccounts.map((subSubAccount) => ({
                      value: subSubAccount.number,
                      label: subSubAccount.name,
                    }))}
                    value={formData.subSubAccount}
                    onChange={(selectedOption) =>
                      handleSubSubAccountChange(selectedOption)
                    }
                  />
                </Form.Group>

                <Form.Group className="sub-inputs">
                  <Form.Label> {t("Main-account-name")}</Form.Label>
                  <SelectComponent
                    className="mm-sub"
                    placeholder={t("Main-account-name")}
                    options={subAccounts.map((subAccount) => ({
                      value: subAccount.number,
                      label: subAccount.name,
                    }))}
                    value={formData.subAccount}
                    onChange={(selectedOption) =>
                      handleSubAccountChange(selectedOption)
                    }
                  />
                </Form.Group>
              </div>
              <div className="from1-subacc">
                <Form.Group className="sub-inputs">
                  <Form.Label> {t("Opening-balance")}</Form.Label>
                  <RegisterTextbox
                    className="opening-blancesub"
                    type="number"
                    name="openingBalance"
                    value={formData.openingBalance}
                    onChange={handleInputChange}
                    placeholder="  00  "
                  />
                </Form.Group>
                <Form.Group className="sub-inputs">
                  <Form.Label> {t("Cash-flow-account")}</Form.Label>
                  <RegisterTextbox
                    className="opening-blancesub"
                    type="text"
                    name="cashFlow"
                    value={formData.cashFlow}
                    onChange={handleInputChange}
                    placeholder={t("Cash-flow-account")}
                  />
                </Form.Group>
              </div>
              <div className="from1-subacc">
                <Form.Group className="sub-inputs">
                  <Form.Label> {t("Description")}</Form.Label>
                  <RegisterTextarea
                    className="mm-sub"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    placeholder={t("Description")}
                    stylee={{ width: "100%" }}
                  />
                </Form.Group>
              </div>

              {isFixedAssetsSelected && (
                <>
                  <div className="check-form">
                    <div className="addaccrow">
                      <Form.Group className="sub-inputs">
                        <Form.Label>
                          {t("Is-it-depreciation-account")}
                        </Form.Label>
                        <div>
                          <Form.Check
                            inline
                            type="radio"
                            label={t("Yes")}
                            name="calculateDepreciation"
                            value="yes"
                            checked={formData.calculateDepreciation === "yes"}
                            onChange={handleInputChange}
                          />
                          <Form.Check
                            inline
                            type="radio"
                            label={t("No")}
                            name="calculateDepreciation"
                            value="no"
                            checked={formData.calculateDepreciation === "no"}
                            onChange={handleInputChange}
                          />
                        </div>
                      </Form.Group>
                    </div>
                    {formData.calculateDepreciation === "yes" && (
                      <>
                        <div className="calculateDepreciation">
                          <Form.Group>
                            <Form.Label> {t("Enter-lifetime")}</Form.Label>
                            <RegisterTextbox
                              className="mm-sub"
                              type="number"
                              name="usefulLife"
                              value={formData.usefulLife}
                              onChange={handleInputChange}
                              parentStyle={{ width: "100%" }}
                            />
                          </Form.Group>
                          <Form.Group>
                            <Form.Label> {t("Scrap")}</Form.Label>
                            <RegisterTextbox
                              className="mm-sub"
                              type="number"
                              name="usefulLife"
                              // onChange={handleInputChange}
                              parentStyle={{ width: "100%" }}
                            />
                          </Form.Group>
                        </div>
                      </>
                    )}
                  </div>
                </>
              )}
              {copyright && (
                <>
                  {" "}
                  <Form.Group className="copyright">
                    <Form.Label> {t("profit")} </Form.Label>
                    <RegisterTextbox
                      className="mm-sub"
                      type="number"
                      parentStyle={{ width: "25%" }}
                      stylee={{ width: "100%" }}
                      prefix={<FontAwesomeIcon icon={faPercentage} />}
                    />
                  </Form.Group>
                </>
              )}
            </div>
            {error && <p style={{ color: "red" }}>{error}</p>}
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            {t("close")}
          </Button>
          <Button variant="primary" onClick={handleSave}>
            {t("save")}
          </Button>
        </Modal.Footer>
      </Modal>
      {/*  */}
      <Modal className="showacc-modal" show={showModalacc}>
        <Modal.Header>
          <Button
            className="custom-close-button"
            variant="link"
            onClick={handleCloseModal}
          >
            <FontAwesomeIcon icon={faXmark} className="closeModal" />
          </Button>
          <Modal.Title> {t("Account-Details")} </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedNode && (
            <table className="table-tree trtr">
              <thead>
                <tr className="head-Chartofaccounts">
                  <th>{t("type")}</th>
                  <th>{t("value")}</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td> {t("Accountnumber")} </td>
                  <td>{selectedNode?.number}</td>
                </tr>
                <tr>
                  <td>{t("AccountName")} </td>
                  <td>{selectedNode?.name}</td>
                </tr>
                <tr>
                  <td>{t("canbepaid")} </td>
                  <td>{selectedNode?.is_payable === "True" ? "Yes" : "No"}</td>
                </tr>
                <tr>
                  <td>{t("Balance")} </td>
                  <td>{selectedNode?.balance || "N/A"}</td>
                </tr>
                <tr>
                  <td>{t("Account-type")} </td>
                  <td>{selectedNode?.accountType || "N/A"}</td>
                </tr>
              </tbody>
            </table>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            {t("close")}
          </Button>
        </Modal.Footer>
      </Modal>
      {/* Edit Account Modal */}
      <Modal
        className="edit-acc-modal"
        show={showEditableModal}
        onHide={() => setShowEditableModal(false)}
        centered
      >
        <Modal.Header>
          <Button
            className="custom-close-button"
            variant="link"
            onClick={() => setShowEditableModal(false)}
          >
            <FontAwesomeIcon icon={faXmark} className="closeModal" />
          </Button>
          <Modal.Title className="title-sub">{t("Edit-account")}</Modal.Title>
        </Modal.Header>
        <Modal.Body className="model-subaccaount">
          <Form className="form-subaccc">
            <div className="from1-subacc">
              <Form.Group className="sub-inputs"></Form.Group>
            </div>
            <div className="main-form">
              <div className="from1-subacc">
                <div className="addaccrow">
                  <Form.Group className="sub-inputs">
                    <Form.Label>حالة الحساب</Form.Label>
                    <div>
                      <Form.Check
                        inline
                        type="radio"
                        label="غير فعال"
                        name="calculateDepreciation"
                        value="no"
                      />
                      <Form.Check
                        inline
                        type="radio"
                        label="فعال"
                        name="calculateDepreciation"
                        value="yes"
                        checked={formData.calculateDepreciation === "yes"}
                        onChange={handleInputChange}
                      />
                    </div>
                  </Form.Group>
                </div>
              </div>
              <div className="from1-subacc">
                <Form.Group className="sub-inputs">
                  <Form.Label>{t("Account-name")}</Form.Label>
                  <RegisterTextbox
                    className="mm-sub"
                    type="text"
                    name="name"
                    value={editableModalData?.name || ""}
                    onChange={handleEditInputChange}
                    placeholder={t("Account-name")}
                  />
                </Form.Group>
              </div>
              <div className="from1-subacc">
                <Form.Group className="sub-inputs">
                  <Form.Label>{t("Opening-balance")}</Form.Label>
                  <RegisterTextbox
                    className="opening-blancesub"
                    type="number"
                    name="balance"
                    value={editableModalData?.balance || ""}
                    onChange={handleEditInputChange}
                    placeholder="00"
                  />
                </Form.Group>
              </div>

              <div className="from1-subacc">
                <Form.Group className="sub-inputs">
                  <Form.Label>{t("Description")}</Form.Label>
                  <RegisterTextarea
                    className="opening-blancesub"
                    name="description"
                    value={editableModalData?.description || ""}
                    onChange={handleEditInputChange}
                    placeholder={t("Description")}
                  />
                </Form.Group>
              </div>
            </div>
            {error && <p style={{ color: "red" }}>{error}</p>}
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setShowEditableModal(false)}
          >
            {t("close")}
          </Button>
          <Button variant="primary" onClick={handleEditSave}>
            {t("save")}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Chartofaccounts;
