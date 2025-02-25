import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Title from "../../components/title";
import { useTranslation } from "react-i18next";
import "./moneytransferreports.css";
import {
  faFileExcel,
  faFileInvoice,
  faFileInvoiceDollar,
  faPlus,
  faPrint,
  faSearch,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import SelectComponent from "../../components/SelectComponent";
import AccountingTable from "../../components/AccountingTable";
import RegisterTextbox from "../../components/RegisterTextBox";
import { Modal, Button } from "react-bootstrap";
import { useEffect, useState } from "react";
import axios from "axios";

function MoneyTransferReports() {
  const { t } = useTranslation();
  const [showModal, setShowModal] = useState(false);

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  // api
  const token = localStorage.getItem("authToken");

  const [level4Accounts, setLevel4Accounts] = useState([]);
  const [accountTypes, setAccountTypes] = useState([]);
  const [accounts, setAccounts] = useState([]);
  const [accountsData, setAccountsData] = useState([]);
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split("T")[0],
    invoice_number: "",
    payment_account_id: "",
    receiver_account_id: "",
    value: "",
  });
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = async () => {
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/sendMoney",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Response:", response.data);
      alert("تم إرسال الأموال بنجاح!");
      setShowModal(false);
    } catch (error) {
      console.error("Error:", error.response?.data || error.message);
      alert("حدث خطأ أثناء إرسال الأموال.");
      console.log(formData);
    }
  };

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/user/tree", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        const fetchedData = response.data.data || {};
        const dataArray = Object.values(fetchedData);
        setAccountsData(dataArray);

        const level4 = extractLevel4Accounts(dataArray);
        setLevel4Accounts(level4);

        const types = dataArray
          .map((account) => account.accountType)
          .filter(Boolean);
        setAccountTypes([...new Set(types)]);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [token]);

  const extractLevel4Accounts = (data) => {
    let level4Accounts = [];

    const traverse = (node) => {
      if (node.level === 4) {
        level4Accounts.push({
          value: node.id,
          label: `${node.number} - ${node.name}`,
        });
      }
      if (node.children && node.children.length > 0) {
        node.children.forEach((child) => traverse(child));
      }
    };

    data.forEach((rootNode) => traverse(rootNode));
    return level4Accounts;
  };
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("📡 جاري جلب البيانات...");
  
        const response = await axios.get("http://127.0.0.1:8000/api/sendMoney", {
          headers: { Authorization: `Bearer ${token}` },
        });
  
        console.log("✅ استجابة API:", response.data);
  
        if (response.data.status === 200) {
          const formattedData = response.data.data.map((item) => ({
            id: item.id,
            user: item.receiver_account?.name || "غير معروف",
            invoiceNum: item.invoice_number,
            transactionNum: item.uuid,
            date: item.date,
            value: item.value,
          }));
  
          console.log("📌 البيانات بعد المعالجة:", formattedData);
          setTableData(formattedData);
        }
      } catch (error) {
        console.error("❌ خطأ أثناء جلب البيانات:", error);
      }
    };
  
    fetchData();
  }, [token]);

  return (
    <>
      <Title
        title={t("money_transfer_report")}
        icon={<FontAwesomeIcon icon={faFileInvoiceDollar} />}
      />
      <div className="moneyreceiptreports">
        <div className="Moneyreceiptreports-form">
          <div className="search-box">
            <FontAwesomeIcon icon={faSearch} className="search-icon" />
            <RegisterTextbox
              parentStyle={{ width: "100%" }}
              id="search"
               type="text"
            />
          </div>

          <RegisterTextbox
            parentStyle={{ width: "12%" }}
            id="from"
            label={t("from")}
            type="date"
          />
          <RegisterTextbox
            parentStyle={{ width: "12%" }}
            id="to"
            label={t("to")}
            type="date"
          />
        </div>
        <div className="icons-Excel">
          <div className="btn-Moneyreceiptreports-form">
            <span className="add-row-ta" onClick={handleShowModal}>
              <FontAwesomeIcon icon={faPlus} /> {t("new_invoice")}
            </span>
          </div>
          <span className="export-icon">
            <FontAwesomeIcon icon={faFileExcel} title={t("export_to_excel")} />
          </span>

          <span className="print-icon">
            <FontAwesomeIcon icon={faPrint} title={t("print_report")} />
          </span>
        </div>
        <div className="Moneyreceiptreports-table">
          <AccountingTable
            data={tableData}
            columns={[
              { key: "id", name: t("serial") },
              { key: "user", name: t("client_name") },
              { key: "invoiceNum", name: t("invoice_number") },
              { key: "transactionNum", name: t("transaction_number") },
              { key: "date", name: t("date") },
              { key: "value", name: t("amount") },
            ]}
            tableContainerClass="table-Moneyreceiptreports"
          />
        </div>
      </div>

      <Modal
        show={showModal}
        onHide={handleCloseModal}
        className="Moneyreceiptreports-modal"
      >
        <Modal.Header>
          <Modal.Title>
            {t("money_transfer_invoice")}
            <FontAwesomeIcon icon={faFileInvoice} className="transfer-ic" />
          </Modal.Title>
          <Button
            className="custom-close-button"
            variant="link"
            onClick={handleCloseModal}
          >
            <FontAwesomeIcon icon={faXmark} className="closeModal" />
          </Button>
        </Modal.Header>
        <Modal.Body>
          <div className="Moneyreceiptreports-mainform">
            <div className="Moneyreceiptreports-formbody">
              <RegisterTextbox
                parentStyle={{ width: "30%" }}
                id="date"
                label={t("date")}
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
              />
              <SelectComponent
                placeholder={t("Choosepaymentaccount")}
                label={t("Choosepaymentaccount")}
                containerStyle={{ width: "30%" }}
                options={level4Accounts}
                name="payment_account_id"
                value={formData.payment_account_id}
                onChange={(selectedOption) => {
                  console.log(
                    "Selected Payment Account ID:",
                    selectedOption?.value
                  );
                  setFormData({
                    ...formData,
                    payment_account_id: selectedOption?.value,
                  });
                }}
              />

              <SelectComponent
                placeholder={t("account_name")}
                label={t("account_name")}
                containerStyle={{ width: "30%" }}
                options={level4Accounts}
                name="receiver_account_id"
                value={formData.receiver_account_id}
                onChange={(selectedOption) => {
                  console.log(
                    "Selected Receiver Account ID:",
                    selectedOption?.value
                  );
                  setFormData({
                    ...formData,
                    receiver_account_id: selectedOption?.value,
                  });
                }}
              />
            </div>
            <div className="Moneyreceiptreports-formbody formbody2">
              <RegisterTextbox
                parentStyle={{ width: "30%" }}
                id="invoiceNumber"
                label={t("invoice_number")}
                type="text"
                name="invoice_number"
                value={formData.invoice_number}
                onChange={handleChange}
              />
              <RegisterTextbox
                parentStyle={{ width: "30%" }}
                id="amount"
                label={t("amount")}
                type="number"
                name="value"
                value={formData.value}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="Moneyreceiptreports-formbody">
            <RegisterTextbox
              parentStyle={{ width: "30%" }}
              id="receivedAmount"
              label={t("received_amount")}
              type="number"
            />
            <RegisterTextbox
              parentStyle={{ width: "30%" }}
              id="receivedBy"
              label={t("received_by")}
              type="text"
            />
          </div>
          <div className="Moneyreceiptreports-formbody">
            <img
              className="barCode-"
              src="https://i.pinimg.com/564x/5a/b4/fe/5ab4fec6fe13a25fb4649c2385245485.jpg"
              alt="bar"
            />
            <RegisterTextbox
              parentStyle={{ width: "30%" }}
              id="against"
              label={t("against")}
              type="text"
            />
            <RegisterTextbox
              parentStyle={{ width: "30%" }}
              id="amount_in_words"
              label={t("amount_in_words")}
              type="text"
            />
          </div>
          <div className="Moneyreceiptreports-formbody">
            <RegisterTextbox
              parentStyle={{ width: "30%" }}
              id="on_account_of"
              label={t("on_account_of")}
              type="text"
            />
            <SelectComponent
              label={t("payment_method")}
              containerStyle={{
                width: "30%",
              }}
              placeholder={t("payment_method")}
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            {t("close")}
          </Button>
          <Button variant="secondary" onClick={handleSubmit}>
            {t("save")}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default MoneyTransferReports;
