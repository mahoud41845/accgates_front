import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Title from "../../components/title";
import { faFileInvoice } from "@fortawesome/free-solid-svg-icons";
import RegisterTextbox from "../../components/RegisterTextBox";
import "./ReceiptVoucher.css";
import { Form } from "react-bootstrap";
import CustomButton from "../../components/CustomButton";
import RegisterSelect from "../../components/RegisterSelect";

function ReceiptVoucher(props) {
  
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <>
      <div className="ReceiptVoucher">
        <Title
          title="سند قبض"
          icon={<FontAwesomeIcon icon={faFileInvoice} />}
        />

        <Form onSubmit={handleSubmit}>
          <div className="ReceiptContainer">
            <RegisterTextbox
              parentStyle={{
                width: "45%",
              }}
              id="name"
              label="اسم الحساب"
              type="text"
              stylee={{
                width: "30%",
              }}
            />
            <RegisterTextbox
              parentStyle={{
                width: "45%",
              }}
              id="accnum"
              label="رقم الحساب"
              type="number"
              stylee={{
                width: "30%",
              }}
            />
            <RegisterTextbox
              parentStyle={{
                width: "45%",
              }}
              id="invoicenum"
              label="رقم الفاتوره"
              type="number"
              stylee={{
                width: "30%",
              }}
            />
            <RegisterTextbox
              parentStyle={{
                width: "45%",
              }}
              id="totalCost"
              label="التاريخ"
              type="date"
              stylee={{
                width: "30%",
              }}
            />
          </div>

          <div className="ReceiptTabelCon">
            <table className="receiptTabel">
              <thead className="receiptTabel-thead">
                <tr>
                  <th>إسم الحساب</th>
                  <th>رقم الحساب</th>
                  <th>مدين</th>
                  <th>دائن</th>
                  <th>الوصف</th>
                </tr>
              </thead>
              <tbody className="receiptTabel-tbody">
                <tr>
                  <td>حالة ألف</td>
                  <td>10000</td>
                  <td></td>
                  <td>2000</td>
                  <td>150</td>
                </tr>
                <tr>
                  <td>حالة ألف</td>
                  <td>10000</td>
                  <td>2000</td>
                  <td></td>
                  <td>150</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="signatureCon">
            <div className="signatureCon1">
              <RegisterTextbox
                parentStyle={{
                  width: "100%",
                }}
                id="chname"
                label="إستلمنا نحن جمعية"
                type="text"
                stylee={{
                  width: "30%",
                  padding: "1%",
                }}
              />

              <RegisterTextbox
                parentStyle={{
                  width: "100%",
                }}
                id="badget"
                label="المبلغ مكتوبا"
                type="text"
                stylee={{
                  width: "30%",
                  padding: "1%",
                }}
                onChange={(e) => {
                  const textOnly = e.target.value.replace(/[0-9]/g, "");
                  e.target.value = textOnly;
                }}
              />
              <RegisterSelect
                id="location"
                label="نوع الحالة"
                stylee={{
                  width: "45% !important",
                }}
                parentStyle={{
                  width: "100%",
                  marginBottom: "20px",
                }}
                options={[
                  { value: "", label: "كاش/تحويل بنكي" },
                  { value: "", label: "كاش" },
                  { value: "", label: "تحويل بنكي" },
                ]}
              />

            </div>
            <div className="signatureCon1">
              <RegisterTextbox
                parentStyle={{
                  width: "100%",
                }}
                id="badget"
                label="مبلغ وقدره"
                type="number"
                stylee={{
                  width: "30%",
                  padding: "1%",
                }}
              />
              <RegisterTextbox
                parentStyle={{
                  width: "100%",
                }}
                id="badget"
                label="وذلك مقابل"
                type="text"
                stylee={{
                  width: "30%",
                  padding: "1%",
                }}
              />

              <RegisterTextbox
                parentStyle={{
                  width: "100%",
                }}
                id="badget"
                label="علي بنك"
                type="text"
                stylee={{
                  width: "30%",
                  padding: "1%",
                }}
              />
            </div>

            <div className="signatureCon1">
              <img
                className="barCode"
                src="https://i.pinimg.com/564x/5a/b4/fe/5ab4fec6fe13a25fb4649c2385245485.jpg"
                alt="bar"
              />
            </div>
          </div>
          <div className="signaturebuttonCon">
            <CustomButton text="إستلام الآن" />
          </div>
        </Form>
      </div>
    </>
  );
}

export default ReceiptVoucher;
