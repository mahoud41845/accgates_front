import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Title from "../../components/title";
import { t } from "i18next";
import RegisterTextbox from "../../components/RegisterTextBox";
import {
  faFileExcel,
  faFileInvoiceDollar,
  faPrint,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
import { Form } from "react-bootstrap";
import "./accountstatement.css";
import AccountingTable from "../../components/AccountingTable";

function Accountstatement() {
  return (
    <>
      <Title
        title={t("account_statement")}
        icon={<FontAwesomeIcon icon={faFileInvoiceDollar} />}
      />
      <div className="Accountstatement">
        <div className="type-user">
          <div>
            <Form.Check
              inline
              label={t("clients")}
              type="radio"
              className="createManage-redio"
              value="cash"
              name="postpaid"
            />
          </div>
          <div>
            <Form.Check
              inline
              label={t("suppliers")}
              type="radio"
              className="createManage-redio"
              value="postpaid"
              name="postpaid"
            />
          </div>
          <div>
            <Form.Check
              inline
              label={t("accounts")}
              type="radio"
              className="createManage-redio"
              value="postpaid"
              name="postpaid"
            />
          </div>
        </div>
        <div className="Accountstatement-form">
          <div className="search-box">
            <FontAwesomeIcon icon={faSearch} className="search-icon" />
            <RegisterTextbox
              parentStyle={{ width: "100%" }}
              id="searchBox"
               type="text"
            />
          </div>
          <RegisterTextbox
            parentStyle={{ width: "13%" }}
            id="fromDate"
            label={t("from")}
            type="date"
          />
          <RegisterTextbox
            parentStyle={{ width: "13%" }}
            id="toDate"
            label={t("to")}
            type="date"
          />
          <span className="export-icon">
            <FontAwesomeIcon icon={faFileExcel} title={t("export_to_excel")} />
          </span>
          <span className="print-icon">
            <FontAwesomeIcon icon={faPrint} title={t("print_report")} />
          </span>
        </div>
        <div className="Accountstatement-table">
          <AccountingTable
            data={[
              {
                id: 1,
                user: t("example_client"),
                invoisnum: 15515,
                numtranzaction: 1556515,
                date: "2024-02-15",
                value: 1000,
              },
            ]}
            columns={[
              { key: "id", name: t("no") },
              { key: "user", name: t("client_name") },
              { key: "invoisnum", name: t("invoice_number") },
              { key: "numtranzaction", name: t("transaction_number") },
              { key: "date", name: t("date") },
              { key: "value", name: t("amount") },
            ]}
            tableContainerClass="table-Accountstatement"
          />
        </div>
      </div>
    </>
  );
}
export default Accountstatement;
