import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Title from "../../components/title";
import "./salarydetails.css";
import { t } from "i18next";
import { faMoneyCheckDollar } from "@fortawesome/free-solid-svg-icons";
import RegisterTextbox from "../../components/RegisterTextBox";
import CustomButton from "../../components/CustomButton";
import { useState } from "react";
import AccountingTable from "../../components/AccountingTable";

function Salarydetails() {
  const [showForm, setShowForm] = useState(true);
  const data = [{ id: 1, date: "2025-02-22", reason: "Purchase", value: 1500 }];

  return (
    <>
      <Title
        title={t("Salarydetails")}
        icon={<FontAwesomeIcon icon={faMoneyCheckDollar} />}
      />
      <div className="Salarydetails">
        {showForm ? (
          <>
            <div className="form-Salarydetails">
              <RegisterTextbox
                parentStyle={{ width: "20%" }}
                label={t("name")}
                type="text"
              />
              <RegisterTextbox
                parentStyle={{ width: "20%" }}
                label={t("phone-number")}
                type="text"
              />
              <RegisterTextbox
                parentStyle={{ width: "20%" }}
                label={t("Health-Insurance")}
                type="text"
              />
            </div>

            <div className="form-Salarydetails">
              <RegisterTextbox
                parentStyle={{ width: "20%" }}
                label={t("Age")}
                type="text"
              />
              <RegisterTextbox
                parentStyle={{ width: "20%" }}
                label={t("email")}
                type="text"
              />
              <RegisterTextbox
                parentStyle={{ width: "20%" }}
                label={t("Taxes")}
                type="text"
              />
            </div>
            <div className="form-Salarydetails">
              <RegisterTextbox
                parentStyle={{ width: "20%" }}
                label={t("Job")}
                type="text"
              />
              <RegisterTextbox
                parentStyle={{ width: "20%" }}
                label={t("Basic-Salary")}
                type="text"
              />
              <RegisterTextbox
                parentStyle={{ width: "20%" }}
                label={t("Benefits")}
                type="text"
              />
            </div>
            <div className="form2-Salarydetails">
              <div className="form-Salarydetails">
                <RegisterTextbox
                  parentStyle={{ width: "20%" }}
                  label={t("address")}
                  type="text"
                />
                <RegisterTextbox
                  parentStyle={{ width: "20%" }}
                  label={t("additional-salary")}
                  type="text"
                />
              </div>
              <div className="form-Salarydetails">
                <RegisterTextbox
                  parentStyle={{ width: "20%" }}
                  label={t("date-of-birth")}
                  type="text"
                />
                <RegisterTextbox
                  parentStyle={{ width: "20%" }}
                  label={t("incentives")}
                  type="text"
                />
              </div>
              <div className="form-Salarydetails">
                <RegisterTextbox
                  parentStyle={{ width: "20%" }}
                  label={t("service-start-date")}
                  type="text"
                />
                <RegisterTextbox
                  parentStyle={{ width: "20%" }}
                  label={t("social-insurance")}
                  type="text"
                />
              </div>
              <div className="btn-next">
                <CustomButton
                  text={t("next")}
                  onClick={() => setShowForm(false)}
                />
              </div>
            </div>
          </>
        ) : (
          <div className="Salary_Details">
            <span className="label_salary">{t("Deductions")}</span>
            <AccountingTable
              data={data}
              columns={[
                { key: "id", name: t("serail-number") },
                { key: "date", name: t("date") },
                { key: "reason", name: t("reason") },
                { key: "value", name: t("value") },
              ]}
              tableContainerClass="table-attendance-and-departure-report tablesal"
            />
            <span className="label_salary">{t("Bonuses")}</span>
            <AccountingTable
              data={data}
              columns={[
                { key: "id", name: t("serail-number") },
                { key: "date", name: t("date") },
                { key: "reason", name: t("reason") },
                { key: "value", name: t("value") },
              ]}
              tableContainerClass="table-attendance-and-departure-report tablesal"
            />
            <div className="form-Salary_Details">
              <RegisterTextbox label={t("total-salary")} type="text" />
              <RegisterTextbox label={t("Bonuses")} type="number" />
            </div>
            <div className="form-Salary_Details">
              <RegisterTextbox label={t("Deductions")} type="text" />
              <RegisterTextbox label={t("net-Salary")} type="text" />
            </div>

            <CustomButton text={t("back")} onClick={() => setShowForm(true)} />
          </div>
        )}
      </div>
    </>
  );
}
export default Salarydetails;
