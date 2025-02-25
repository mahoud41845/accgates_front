import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Title from "../../components/title";
import "./kpievaluation.css";
import {
  faChartSimple,
  faCirclePlus,
  faX,
} from "@fortawesome/free-solid-svg-icons";
import RegisterSelect from "../../components/RegisterSelect";
import { Form } from "react-bootstrap";
import { useNavigate } from "react-router";
import KpiTextbox from "../../components/KpiTextbox";

function KPIEvaluation() {
  const navigate = useNavigate();

  const selectOptions = [
    { value: "", label: "إجمالي الدرجات" },
    { value: "90-100", label: "90-100" },
    { value: "80-89", label: "80-89" },
    { value: "70-79", label: "70-79" },
    { value: "60-69", label: "60-69" },
    { value: "Below 60", label: "Below 60" },
  ];

  const rowConfigs = [
    {
      id: "kpi1",
      label: "إنجاز العمل بالمستوي المطلوب",
      noteLabel: "اضف ملاحظة للتقييم الأول",
    },
    {
      id: "kpi2",
      label: "التعاون مع ومساعدة الزملاء",
      noteLabel: "اضف ملاحظة للتقييم الثاني",
    },
    {
      id: "kpi3",
      label: "الإخلاص للشركة والمحافظة على مصالحها",
      noteLabel: "اضف ملاحظة للتقييم الثالث",
    },
    {
      id: "kpi4",
      label: "القدرة على استيعاب قواعد وأساليب العمل",
      noteLabel: "اضف ملاحظة للتقييم الرابع",
    },
    {
      id: "kpi5",
      label: "الترتيب والنظام في العمل",
      noteLabel: "اضف ملاحظة للتقييم الخامس",
    },
    {
      id: "kpi6",
      label: "الإلتزام بأنظمة وسياسات الشركة",
      noteLabel: "اضف ملاحظة للتقييم السادس",
    },
    {
      id: "kpi7",
      label: "الإهتمام بتطوير وتحسين مستوى العمل",
      noteLabel: "اضف ملاحظة للتقييم السابع",
    },
    {
      id: "kpi8",
      label: "المبادرة والإبتكار في العمل",
      noteLabel: "اضف ملاحظة للتقييم الثامن",
    },
    {
      id: "kpi9",
      label: "القدرة على اتخاذ القرارات",
      noteLabel: "اضف ملاحظة للتقييم التاسع",
    },
    {
      id: "kpi10",
      label: "الإجتهاد والتجاوب مع ضغط العمل",
      noteLabel: "اضف ملاحظة للتقييم العاشر",
    },
    {
      id: "kpi11",
      label: "إنجاز العمل في الموعد المطلوب",
      noteLabel: "اضف ملاحظة للتقييم الحادي عشر",
    },
    {
      id: "kpi12",
      label: "المحافظة على ممتلكات الشركة",
      noteLabel: "اضف ملاحظة للتقييم الثاني عشر",
    },
    {
      id: "kpi13",
      label: "القدرة على العمل دون مراقبة",
      noteLabel: "اضف ملاحظة للتقييم الثالث عشر",
    },
    {
      id: "kpi14",
      label: "القدرة على تحمل مسؤولية أكبر",
      noteLabel: "اضف ملاحظة للتقييم الرابع عشر",
    },
    {
      id: "kpi15",
      label: "احترام الغير",
      noteLabel: "اضف ملاحظة للتقييم الخامس عشر",
    },
    {
      id: "kpi16",
      label: "تقبل توجيهات وانتقادات الرؤساء",
      noteLabel: "اضف ملاحظة للتقييم السادس عشر",
    },
    {
      id: "kpi17",
      label: "التصرف الشخصي",
      noteLabel: "اضف ملاحظة للتقييم السابع عشر",
    },
    {
      id: "kpi18",
      label: "المظهر",
      noteLabel: "اضف ملاحظة للتقييم الثامن عشر",
    },
  ];

  const [noteStates, setNoteStates] = useState(
    Array(rowConfigs.length).fill(false)
  );

  const toggleNoteInput = (index) => {
    setNoteStates((prevStates) =>
      prevStates.map((state, i) => (i === index ? !state : state))
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/showperformance");
  };

  return (
    <>
      <div className="kpievaluation">
        <Title
          title="التقييم"
          icon={<FontAwesomeIcon icon={faChartSimple} />}
          style={{ width: "unset" }}
        />
        <Form className="kpievaluation-inputs" onSubmit={handleSubmit}>
          {rowConfigs.map((row, index) => (
            <div className="kpievaluation-input" key={row.id}>
              <RegisterSelect
                id={row.id}
                stylee={{
                  width: "45% !important",
                }}
                parentStyle={{
                  width: "25%",
                  marginBottom: "20px",
                }}
                label={row.label}
                options={selectOptions}
              />

              {!noteStates[index] ? (
                <>
                  <FontAwesomeIcon
                    icon={faCirclePlus}
                    className="addnotekpi"
                    onClick={() => toggleNoteInput(index)}
                  />
                  <p className="addnotekpitext">أضف ملاحظة</p>
                </>
              ) : (
                <>
                  <KpiTextbox
                    id={`note${index + 1}`}
                    label={row.noteLabel}
                    parentStyle={{
                      width: "20%",
                      marginBottom: "20px",
                    }}
                    stylee={{
                      height: "100px",
                    }}
                    rows={5}
                    placeholder=""
                    disabled={false} 
                  />
                  <FontAwesomeIcon
                    icon={faX}
                    className="closenotekpi"
                    onClick={() => toggleNoteInput(index)}
                  />
                  
                </>
              )}
            </div>
          ))}

          <button
            className="kpi-button"
            type="submit"
            style={{ marginTop: "15px" }}
          >
            إرسال
          </button>
        </Form>
      </div>
    </>
  );
}

export default KPIEvaluation;
