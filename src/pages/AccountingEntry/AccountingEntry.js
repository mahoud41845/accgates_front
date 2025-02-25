import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Title from "../../components/title";
import {
  faMoneyBillTransfer,
  faTable,
  faTimes,
  faTrash,
  faPlus,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import Select from "react-select";
import "./AccountingEntry.css";
import RegisterTextbox from "../../components/RegisterTextBox";
import { useTranslation } from "react-i18next";
import { Button, Modal } from "react-bootstrap";
import "../Chart of accounts/Chartofaccounts.css";
import SelectComponent from "../../components/SelectComponent";

function AccountingEntry() {
  const [accounts, setAccounts] = useState([]);
  const [rows, setRows] = useState([
    {
      account_id: "",
      credit: "",
      debit: "",
      account_number: "",
      account_name: "",
    },
    {
      account_id: "",
      credit: "",
      debit: "",
      account_number: "",
      account_name: "",
    },
  ]);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [accountSelectionError, setAccountSelectionError] = useState("");
  const [emptyMoneyError, setEmptyMoneyError] = useState("");
  const cancelTokenSource = useRef(axios.CancelToken.source());
  const { t } = useTranslation();
  const [modalOpen, setModalOpen] = useState(false);
  const [description, setDescription] = useState("");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [number, setNumber] = useState("");
  const [latestNumber, setLatestNumber] = useState(null);

  const [restrictions, setRestrictions] = useState([]); // New State
  const [searchNumber, setSearchNumber] = useState("");
  const [searchFrom, setSearchFrom] = useState("");
  const [searchTo, setSearchTo] = useState("");
  const [filteredRestrictions, setFilteredRestrictions] =
    useState(restrictions);

  const getLeafAccounts = (nodes) => {
    let leafAccounts = [];
    nodes.forEach((node) => {
      if (!node.children || node.children.length === 0) {
        leafAccounts.push(node);
      } else {
        leafAccounts = leafAccounts.concat(getLeafAccounts(node.children));
      }
    });
    return leafAccounts;
  };

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/user/tree", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      })
      .then((response) => {
        const leafAccounts = getLeafAccounts(
          Object.values(response.data.data || {})
        );
        setAccounts(leafAccounts);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });

    return () => {
      if (cancelTokenSource.current) {
        cancelTokenSource.current.cancel("Component unmounted");
      }
    };
  }, []);

  const addRow = () => {
    setSuccessMessage("");
    setRows((prevRows) => [
      ...prevRows,
      {
        account_id: "",
        credit: "",
        debit: "",
        account_number: "",
        account_name: "",
      },
    ]);
  };

  const removeRow = (index) => {
    const updatedRows = rows.filter((_, i) => i !== index);
    setRows(updatedRows);
  };

  const handleInputChange = (index, field, value) => {
    const updatedRows = [...rows];
    const sanitizedValue = value.replace(/[^0-9.]/g, "");
    updatedRows[index][field] = sanitizedValue;

    if (field === "debit") {
      updatedRows[index].credit = "";
    } else if (field === "credit") {
      updatedRows[index].debit = "";
    }

    setRows(updatedRows);

    if (updatedRows[index].debit || updatedRows[index].credit) {
      setEmptyMoneyError("");
    }
  };

  const handleAccountNumberChange = (index, selectedOption) => {
    const selectedAccount = accounts.find(
      (acc) => acc.number === selectedOption?.value
    );

    if (selectedAccount) {
      const updatedRows = [...rows];
      updatedRows[index].account_id = selectedAccount.id;
      updatedRows[index].account_number = selectedAccount.number;
      updatedRows[index].account_name = selectedAccount.name; // Populate account name
      setRows(updatedRows);
      setAccountSelectionError("");
    } else {
      const updatedRows = [...rows];
      updatedRows[index].account_id = "";
      updatedRows[index].account_number = "";
      updatedRows[index].account_name = ""; // Clear account name
      setRows(updatedRows);
    }
  };

  const handleAccountNameChange = (index, selectedOption) => {
    const selectedAccount = accounts.find(
      (acc) => acc.name === selectedOption?.value
    );

    if (selectedAccount) {
      const updatedRows = [...rows];
      updatedRows[index].account_id = selectedAccount.id;
      updatedRows[index].account_number = selectedAccount.number; // Populate account number
      updatedRows[index].account_name = selectedAccount.name;
      setRows(updatedRows);
      setAccountSelectionError("");
    } else {
      const updatedRows = [...rows];
      updatedRows[index].account_id = "";
      updatedRows[index].account_number = ""; // Clear account number
      updatedRows[index].account_name = "";
      setRows(updatedRows);
    }
  };

  const validateTotals = () => {
    const totalDebit = rows.reduce(
      (sum, row) => sum + parseFloat(row.debit || 0),
      0
    );
    const totalCredit = rows.reduce(
      (sum, row) => sum + parseFloat(row.credit || 0),
      0
    );

    if (totalDebit !== totalCredit) {
      setError(t("debit-credit-equal"));
      return false;
    } else {
      setError("");
      return true;
    }
  };

  const validateRowsForMoney = () => {
    for (const row of rows) {
      if (!row.debit && !row.credit) {
        setEmptyMoneyError(t("empty-money-error"));
        return false;
      }
    }
    setEmptyMoneyError("");
    return true;
  };

  const prepareTransferData = () => {
    const transfers = [];
    const receivers = [];

    rows.forEach((row) => {
      if (row.debit) {
        transfers.push({
          from_account_number: row.account_number,
          amount: parseFloat(row.debit),
        });
      }
      if (row.credit) {
        receivers.push({
          to_account_number: row.account_number,
          amount: parseFloat(row.credit),
        });
      }
    });

    return {
      description,
      date: new Date().toISOString().split("T")[0],
      number: latestNumber, // استخدم الرقم المستخرج تلقائيًا
      transfers,
      receivers,
    };
  };

   const fetchRestrictions = async () => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      console.error("No auth token found");
      return;
    }

    try {
      const response = await axios.get(
        "http://127.0.0.1:8000/api/showRestriction",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const restrictionsData = response.data?.data || [];
      setRestrictions(restrictionsData);

      const lastNumber = restrictionsData.length
        ? Math.max(
            ...restrictionsData.map((res) => parseInt(res.number, 10) || 0),
            0
          )
        : 0;

      setLatestNumber(lastNumber + 1);
    } catch (error) {
      console.error("Error fetching last restriction number:", error);
    }
  };

   useEffect(() => {
    fetchRestrictions();
  }, []);

   const handleTransfer = () => {
    if (cancelTokenSource.current) {
      cancelTokenSource.current.cancel("New request initiated");
    }
    cancelTokenSource.current = axios.CancelToken.source();

    setError("");
    setSuccessMessage("");
    setAccountSelectionError("");
    setEmptyMoneyError("");

    const allAccountsSelected = rows.every(
      (row) => row.account_id !== "" && row.account_number !== ""
    );

    if (!allAccountsSelected) {
      setAccountSelectionError(t("account-selection-error"));
      return;
    }

    if (!validateRowsForMoney()) {
      return;
    }

    if (!validateTotals()) {
      return;
    }

    const data = prepareTransferData();

    axios
      .post("http://127.0.0.1:8000/api/user/accounts/transfer", data, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
        cancelToken: cancelTokenSource.current.token,
      })
      .then((response) => {
        setSuccessMessage(t("success-message"));

        setLatestNumber((prevNumber) => prevNumber + 1);

        // إعادة تعيين الصفوف
        setRows([
          {
            account_id: "",
            credit: "",
            debit: "",
            account_number: "",
            account_name: "",
          },
          {
            account_id: "",
            credit: "",
            debit: "",
            account_number: "",
            account_name: "",
          },
        ]);

        setShowModal(false);

         fetchRestrictions();
      })
      .catch((error) => {
        if (!axios.isCancel(error)) {
          setError(t("money-transfer-failed"));
        }
      });
  };

  const [showModal, setShowModal] = useState(false);

  const handleSave = async () => {};

  useEffect(() => {
    setFilteredRestrictions(restrictions);
  }, [restrictions]);

  useEffect(() => {
    let filtered = restrictions;

    if (searchNumber) {
      filtered = filtered.filter((item) =>
        item.number.toString().includes(searchNumber)
      );
    }

    if (searchFrom) {
      filtered = filtered.filter(
        (item) => new Date(item.date) >= new Date(searchFrom)
      );
    }

    if (searchTo) {
      filtered = filtered.filter(
        (item) => new Date(item.date) <= new Date(searchTo)
      );
    }

    setFilteredRestrictions(filtered);
  }, [searchNumber, searchFrom, searchTo]);

  return (
    <>
      <Modal
        className="custom-modal-alt"
        show={showModal}
        onHide={() => setShowModal(false)}
        centered
      >
        <Modal.Header className="haead-big">
          <Button
            className="custom-close-button"
            variant="link"
            onClick={() => setShowModal(false)}
          >
            <FontAwesomeIcon icon={faXmark} className="closeModal" />
          </Button>
          <Modal.Title className="title-sub">
            {t("accountingentry")}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="model-subaccaount test">
          <div className="AccountingEntry AccountingEntrymod ">
            <div className="form-AccountingEntry form-AccountingEntry2">
              <RegisterTextbox
                parentStyle={{ width: "23%" }}
                label={t("Registration-number")}
                type="text"
                value={latestNumber || ""}
                readOnly // يمنع التعديل يدويًا
                stylee={{
                  width: "30%",
                  backgroundColor: "#f3f3f3",
                  cursor: "not-allowed",
                }}
              />

              <RegisterTextbox
                parentStyle={{ width: "23%" }}
                label={t("Description")}
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                stylee={{ width: "30%" }}
              />

              <RegisterTextbox
                parentStyle={{ width: "20%" }}
                label={t("date")}
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                stylee={{ width: "55%" }}
              />
            </div>
            <div className="table-header">
              <button onClick={addRow} className="addrowInvoice">
                <FontAwesomeIcon icon={faPlus} />
                {t("Add-Row")}
              </button>
            </div>

            <table className="accounting-table tableEntry">
              <thead>
                <tr>
                  <th> {t("Accountnumber")} </th>
                  <th> {t("AccountName")} </th>
                  <th>{t("Debtor")}</th>
                  <th>{t("creditor")}</th>
                  <th> </th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row, index) => (
                  <tr key={index}>
                    <td>
                      <SelectComponent
                        options={accounts.map((acc) => ({
                          value: acc.number,
                          label: acc.number,
                        }))}
                        value={
                          row.account_number
                            ? {
                                value: row.account_number,
                                label: row.account_number,
                              }
                            : null
                        }
                        onChange={(selectedOption) =>
                          handleAccountNumberChange(index, selectedOption)
                        }
                        placeholder={t("Accountnumber")}
                      />
                    </td>
                    <td>
                      <SelectComponent
                        options={accounts.map((acc) => ({
                          value: acc.name,
                          label: acc.name,
                        }))}
                        value={
                          row.account_name
                            ? {
                                value: row.account_name,
                                label: row.account_name,
                              }
                            : null
                        }
                        onChange={(selectedOption) =>
                          handleAccountNameChange(index, selectedOption)
                        }
                        placeholder={t("AccountName")}
                      />
                    </td>
                    <td>
                      {row.credit ? (
                        <div className="closed-field">
                          <FontAwesomeIcon
                            icon={faTimes}
                            className="close-icon"
                          />
                        </div>
                      ) : (
                        <input
                          className="input21"
                          type="text"
                          value={row.debit}
                          onChange={(e) =>
                            handleInputChange(index, "debit", e.target.value)
                          }
                          inputMode="numeric"
                        />
                      )}
                    </td>
                    <td>
                      {row.debit ? (
                        <div className="closed-field">
                          <FontAwesomeIcon
                            icon={faTimes}
                            className="close-icon"
                          />
                        </div>
                      ) : (
                        <input
                          className="input21"
                          type="text"
                          value={row.credit}
                          onChange={(e) =>
                            handleInputChange(index, "credit", e.target.value)
                          }
                          inputMode="numeric"
                        />
                      )}
                    </td>
                    <td>
                      <button
                        className="btn-trash"
                        type="button"
                        onClick={() => removeRow(index)}
                      >
                        <FontAwesomeIcon icon={faTrash} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {error && <p className="error-message">{error}</p>}
            {accountSelectionError && (
              <p className="error-message">{accountSelectionError}</p>
            )}
            {emptyMoneyError && (
              <p className="error-message">{emptyMoneyError}</p>
            )}
            {successMessage && (
              <p className="success-message">{successMessage}</p>
            )}

            <button
              className="addrowInvoice transferbtn"
              onClick={handleTransfer}
            >
              <FontAwesomeIcon icon={faMoneyBillTransfer} /> {t("save")}
            </button>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            {t("close")}
          </Button>
        </Modal.Footer>
      </Modal>
      <div className="AccountingEntry-container">
        <div className="form-acc">
          <Title
            className="title-acc"
            title={t("accountingentry")}
            icon={<FontAwesomeIcon icon={faTable} />}
          />

          <div className="AccountingEntry">
            <div className="date-accounting-num">
              <RegisterTextbox
                parentStyle={{ width: "20%" }}
                label={t("Registration-number")}
                type="text"
                stylee={{ width: "100%" }}
                value={searchNumber}
                onChange={(e) => setSearchNumber(e.target.value)}
              />

              <RegisterTextbox
                parentStyle={{ width: "20%" }}
                id="leaveTimer"
                label={t("from")}
                type="date"
                stylee={{ width: "55%" }}
                value={searchFrom}
                onChange={(e) => setSearchFrom(e.target.value)}
              />

              <RegisterTextbox
                parentStyle={{ width: "20%" }}
                id="arrivalTimer"
                label={t("to")}
                type="date"
                stylee={{ width: "55%" }}
                value={searchTo}
                onChange={(e) => setSearchTo(e.target.value)}
              />
            </div>
            <div className="table-header">
              <button
                onClick={() => setShowModal(true)}
                className="addrowInvoice mange newwid"
              >
                <FontAwesomeIcon icon={faPlus} /> {t("addrestriction")}
              </button>
            </div>

            <table className="accounting-table tow">
              <thead>
                <tr>
                  <th>رقم القيد </th>
                  <th>رقم الفاتورة</th>
                  <th>تاريخ</th>
                  <th>نوع</th>
                  <th>القيمه</th>
                </tr>
              </thead>

              <tbody>
                {filteredRestrictions.length > 0 ? (
                  filteredRestrictions.map((item) => (
                    <tr key={item.id}>
                      <td>{item.number}</td>
                      <td>{item.description}</td>
                      <td>{item.date}</td>
                      <td>{item.amount}</td>
                      <td>{item.amount}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5">لا توجد بيانات متاحة</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}

export default AccountingEntry;
 