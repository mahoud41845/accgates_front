import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Title from "../../components/title";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import UploadInput from "../../components/UploadInput";
import { Form } from "react-bootstrap";
import RegisterTextbox from "../../components/RegisterTextBox";
import RegisterSelect from "../../components/RegisterSelect";
import RegisterRadio from "../../components/Radio";
import { useState } from "react";
import "./createAndManage.css";
import RegisterTextarea from "../../components/RegisterTextarea";
import { useNavigate } from "react-router";
import CustomButton from "../../components/CustomButton";
function Editcasedetails() {
  const [isAssetsSelected, setIsAssetsSelected] = useState(false);
  const [totalCost, setTotalCost] = useState(0);
  const [numberOfAssets, setNumberOfAssets] = useState(0);
  const navigate = useNavigate();

  const handleRadioChange = (label) => {
    setIsAssetsSelected(label === "أسهم");
  };

  const handleTotalCostChange = (e) => {
    setTotalCost(Number(e.target.value));
  };

  const handleNumberOfAssetsChange = (e) => {
    setNumberOfAssets(Number(e.target.value));
  };

  const calculatePricePerAsset = () => {
    return numberOfAssets > 0 ? (totalCost / numberOfAssets).toFixed(2) : 0;
  };

  const handelSubmit = (e) => {
    e.preventDefault();
    navigate("/casedata");
  };

  const [mainCategory, setMainCategory] = useState("");
  const [subOptions, setSubOptions] = useState([]);
  const [showOtherTextbox, setShowOtherTextbox] = useState(false);

  const handleMainCategoryChange = (e) => {
    const selectedValue = e.target.value;
    setMainCategory(selectedValue);

    if (selectedValue === "حالة اغاثة") {
      setSubOptions([
        { value: "صحية", label: "صحية" },
        { value: "طارئة ", label: "طارئة " },
        { value: "إجتماعية", label: "إجتماعية" },
      ]);
      setShowOtherTextbox(false);
    } else if (selectedValue === "حالة تنموية") {
      setSubOptions([
        { value: "دورات تدريبية", label: "دورات تدريبية" },
        { value: "دراسة", label: "دراسة" },
        { value: "إقامة مشاريع استراتيجية", label: "إقامة مشاريع استراتيجية" },
      ]);
      setShowOtherTextbox(false);
    } else if (selectedValue === "أخري") {
      setSubOptions([]);
      setShowOtherTextbox(true);
    } else {
      setSubOptions([]);
      setShowOtherTextbox(false);
    }
  };
  return (
    <>
      <Title
        title="تعديل"
        icon={<FontAwesomeIcon icon={faPenToSquare} />}
      />
      <div className="createManageCon">
        <Form onSubmit={handelSubmit}>
          <div className="createManege-inputs">
            <div className="case-name">
              <RegisterTextbox
                parentStyle={{
                  width: "90%",
                }}
                id="name"
                label="مسمي الحالة"
                type="text"
                stylee={{
                  width: "45%",
                }}
              />
              <RegisterSelect
                id="location"
                label="نوع الحالة"
                stylee={{
                  width: "45% !important",
                }}
                parentStyle={{
                  width: "90%",
                  marginBottom: "20px",
                }}
                options={[
                  { value: "", label: "إختر الحالة" },
                  { value: "حالة اغاثة", label: "حالة اغاثة" },
                  { value: "حالة تنموية", label: "حالة تنموية" },
                  { value: "أخري", label: "أخري" },
                ]}
                value={mainCategory}
                onChange={handleMainCategoryChange}
              />

              {subOptions.length > 0 && (
                <RegisterSelect
                  id="subCategory"
                  label="نوع الحالة الفرعية"
                  stylee={{
                    width: "45% !important",
                  }}
                  parentStyle={{
                    width: "90%",
                    marginBottom: "20px",
                  }}
                  options={[
                    { value: "", label: "اختر الحالة الفرعية" },
                    ...subOptions,
                  ]}
                />
              )}

              {showOtherTextbox && (
                <RegisterTextbox
                  id="otherCategory"
                  label="أدخل نوع الحالة"
                  type="text"
                  parentStyle={{
                    width: "90%",
                    marginBottom: "20px",
                  }}
                />
              )}
              <UploadInput
                id="documentUpload"
                parentStyle={{
                  marginBottom: "20px",
                  display: "unset",
                }}
                label="إرفاق صورة للحالة ان وجد"
              />
            </div>
            <div className="case-name">
              <RegisterTextbox
                parentStyle={{
                  width: "90%",
                }}
                id="totalCost"
                label="مبلغ الدعم الكلي"
                type="number"
                onChange={handleTotalCostChange}
                stylee={{
                  width: "30%",
                }}
              />
              <div className="radiodatecon">
                <div
                  onChange={(e) => handleRadioChange(e.target.value)}
                  className="radioCon"
                >
                  <h5>تقسيم المبلغ إلى</h5>
                  <RegisterRadio label="أسهم" value="أسهم" />
                  <RegisterRadio label="قيمة" value="قيمة" />
                </div>
                {isAssetsSelected && (
                  <div className="assetsCon">
                    <RegisterTextbox
                      id="numberOfAssets"
                      label="عدد الأسهم"
                      type="number"
                      onChange={handleNumberOfAssetsChange}
                      parentStyle={{
                        width: "60%",
                        marginTop: "10px",
                      }}
                    />
                    <small style={{ display: "block", marginTop: "5px" }}>
                      سعر السهم الواحد: {calculatePricePerAsset()} ريال
                    </small>
                  </div>
                )}
              </div>
              <RegisterTextbox
                parentStyle={{
                  width: "90%",
                }}
                id="postDate"
                label="تاريخ النشر"
                type="date"
                stylee={{
                  width: "45%",
                }}
              />
            </div>
          </div>

          <div className="createManege-inputs createManege-desc">
            <RegisterTextarea
              id="description"
              label="وصف الحالة"
              parentStyle={{
                width: "35%",
                marginBottom: "20px",
              }}
              stylee={{
                height: "100px",
              }}
              rows={5}
              placeholder="البيانات التي تظهر في كارت الحالة"
            />

            <RegisterTextarea
              id="description2"
              label="تكملة الوصف (لا تظهر في كارت الحالة)"
              parentStyle={{
                width: "35%",
                marginBottom: "20px",
              }}
              stylee={{
                height: "100px",
              }}
              rows={5}
              placeholder="البيانات التي لا تظهر في كارت الحالة"
            />
          </div>
          <div className="createManege-inputs createManege-buttonCon ">
            <CustomButton text="إنشاء حالة" />
          </div>
        </Form>
      </div>
    </>
  );
}

export default Editcasedetails;
