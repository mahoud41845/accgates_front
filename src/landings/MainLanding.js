import "./mainLanding.css";
import Title from "../components/title";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faCalculator,
  faChartSimple,
  faDatabase,
  faGlobe,
  faHome,
  faLayerGroup,
  faShield,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router";
import { useState } from "react";
import LandingFooter from "../components/LandingFooter";
import MainLandingPageNav from "../components/MainLandingPageNav";

function MainLanding() {
  const [showCard7, setShowCard7] = useState(false);
  const toggleCard7 = () => {
    setShowCard7((prevShowCard7) => !prevShowCard7);
  };
  return (
    <div className="landingcontainer">
      <MainLandingPageNav />

      <div className="section1Container" id="mainLandingsec1">
        <img
          src="https://s3-alpha-sig.figma.com/img/6f82/c461/4f37867c39c07e9f27ee7215c6db3889?Expires=1735516800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=ASX15LqbeqfPb7BqX9JbLxyCgWCyduEK-r2Z-ZM9dgSz9ZGQMlZkPx~mLV5GUwTWUgtj6KlvQ0ChDiVkeSi0Eg393EmatNtN9iOuy8QvxncrryGcoorRX6T9rU~UlM-6NsLth-r1oAJPq1udrqUQnGHQudsZ3-NDiWHgAtxD7OkDFVEYNFRjEEbXfoghaGtyopigd3xk3wvunTYrHi3O6TKcH6ZfGpDBY~T7eTwmYRGFiXftcgFKLKCVx8~-EzjIhgfXwuJ-4LOHZ2cs-nOYtKHD5tSZ7CidQH78EExE41TCQEf-1dif7dnuqXi6R8fpB~QquqKS4H6cTwZeW-Hsxg__"
          alt="sec"
          className="mainLandingimage"
        />
      </div>

      <div className="ourSystemContainer" id="mainourSystemContainer">
        <div>
          <Title title="نظامنا" />
        </div>
        <div className="CardeContainer">
          <div className="ourSystemcard">
            <div className="cardImageContainer cardImageContainer1"></div>
            <h5 className="ourSystext">إختر نظامك الخاص</h5>
            <p className="ourNote">
              احصل على الخدمات التي تحتاجها وفقًا لاحتياجاتك
            </p>
          </div>
          <div className="ourSystemcard">
            <div className="cardImageContainer cardImageContainer2"></div>
            <h5 className="ourSystext">إشترك لمدة ثلاث سنوات</h5>
            <p className="ourNote">
              الحصول على جميع الخدمات المتاحة لمدة ثلاث سنوات
            </p>
          </div>

          <div className="ourSystemcard">
            <div className="cardImageContainer cardImageContainer3"></div>
            <h5 className="ourSystext">إشترك لمدة سنه</h5>
            <p className="ourNote">
              الحصول على كافة الخدمات المتاحة لمدة سنة واحدة
            </p>
          </div>
        </div>
      </div>

      <div className="ourServ" id="mainourServ">
        <div>
          <Title title="خدماتنا" />
        </div>
        <div className="servCards">
          <div className="setvCard">
            <FontAwesomeIcon icon={faHome} className="servIcon" />
            <h5>إنشاء وإدارة</h5>
            <p className="serveDesc">
              يُمكّن المستخدمين من تأسيس جمعيات جديدة بسهولة، مع توفير أدوات
              شاملة لإدارة الأنشطة، الأعضاء، والمشاريع.
            </p>
            <Link to="/createMangelanding" className="showserve">
              عرض الخدمة{" "}
              <FontAwesomeIcon icon={faArrowLeft} className="showSerIcon" />
            </Link>
          </div>
          <div className="setvCard">
            <FontAwesomeIcon icon={faChartSimple} className="servIcon" />
            <h5>التسويق وتصميم المشاريع</h5>
            <p className="serveDesc">
              تصميم مشاريع مبتكرة تلبي احتياجات المجتمع، مع أدوات فعّالة للترويج
              وجذب الدعم.
            </p>
            <Link to="/designmarketinglanding" className="showserve">
              عرض الخدمة{" "}
              <FontAwesomeIcon icon={faArrowLeft} className="showSerIcon" />
            </Link>
          </div>
          <div className="setvCard">
            <FontAwesomeIcon icon={faShield} className="servIcon" />
            <h5>الحوكمة</h5>
            <p className="serveDesc">
              تطبيق مبادئ الشفافية والمساءلة لضمان اتخاذ قرارات سليمة وفعّالة.
              يوفر أدوات لمراقبة الأداء، تنظيم الهيكل الإداري.
            </p>
            <Link to="/#" className="showserve">
              عرض الخدمة{" "}
              <FontAwesomeIcon icon={faArrowLeft} className="showSerIcon" />
            </Link>
          </div>
          <div className="setvCard">
            <FontAwesomeIcon icon={faLayerGroup} className="servIcon" />
            <h5>الموارد البشرية</h5>
            <p className="serveDesc">
              يوفر أدوات لتخطيط وتنظيم الموارد البشرية مما يساعد على تحسين بيئة
              العمل وزيادة الإنتاجية
            </p>
            <Link to="/hrlanding" className="showserve">
              عرض الخدمة{" "}
              <FontAwesomeIcon icon={faArrowLeft} className="showSerIcon" />
            </Link>
          </div>
          <div className="setvCard">
            <FontAwesomeIcon icon={faCalculator} className="servIcon" />
            <h5>المحاسبة القانونية والمالية</h5>
            <p className="serveDesc">
              تتضمن أدوات إعداد الميزانية نطاق الميزانية والوصول إليها والنفقات
              بما في ذلك القواعد القانونية.
            </p>
            <Link to="/#" className="showserve">
              عرض الخدمة{" "}
              <FontAwesomeIcon icon={faArrowLeft} className="showSerIcon" />
            </Link>
          </div>
          <div className="setvCard">
            <FontAwesomeIcon icon={faDatabase} className="servIcon" />
            <h5>إدارة البيانات</h5>
            <p className="serveDesc">
              يوفر أدوات متكاملة لجمع وتنظيم وتحليل البيانات المتعلقة
              بالمستفيدين والمانحين والمشاريع.
            </p>
            <Link to="/#" className="showserve">
              عرض الخدمة{" "}
              <FontAwesomeIcon icon={faArrowLeft} className="showSerIcon" />
            </Link>
          </div>

          {showCard7 && (
            <div className="setvCard">
              <FontAwesomeIcon icon={faGlobe} className="servIcon" />
              <h5>أنشئ موقعك الإلكتروني</h5>
              <p className="serveDesc">
                إنشاء مواقع إلكترونية مخصصة بسهولة، دون الحاجة إلى خبرة تقنية.
              </p>
              <Link to="/#" className="showserve">
                عرض الخدمة{" "}
                <FontAwesomeIcon icon={faArrowLeft} className="showSerIcon" />
              </Link>
            </div>
          )}
        </div>
        {!showCard7 ? (
          <p
            className="moreserv"
            onClick={toggleCard7}
            style={{ cursor: "pointer" }}
          >
            عرض المزيد
          </p>
        ) : (
          <p
            className="moreserv"
            onClick={toggleCard7}
            style={{ cursor: "pointer" }}
          >
            عرض اقل
          </p>
        )}
      </div>

      <div className="mainsubscriptionContainer" id="mainsubscriptionContainer">
        <div>
          <Title title="الأسعار" />
        </div>
        <div className="subscriptionContainer">
          <div className="subSys">
            <div className="subText">
              <div className="subTitleCon">
                <h3 className="subtitle">باقة السنة</h3>
                <p className="subSentance">وفر أكثر مع النظام المتكامل</p>
                <p className="subPrice">12,250 ر.س</p>
              </div>
              <p className="subDesc">
                الخيار الأمثل لأصحاب الأعمال الذين يسعون للحصول على تقارير
                شاملة، مميزات متقدمة، وخصائص تدعم توسيع نطاق أعمالهم، مع
                الاستفادة من خبرات فريق عملنا المحترف.
              </p>
            </div>
            <button className="subButton">اشترك الآن</button>
          </div>

          <div className="subSys">
            <div className="subText">
              <div className="subTitleCon">
                <h3 className="subtitle">حزمة الثلاث سنوات</h3>
                <p className="subSentance">
                  وفر أكثر حزمة مع الثلاث سنوات حتي 13%
                </p>
                <p className="subPrice">32,500 ر.س</p>
              </div>
              <p className="subDesc">
                الخطة المثالية لأصحاب الأعمال الذين يبحثون عن تقارير شاملة،
                مميزات متطورة، وخصائص تساهم في توسيع نطاق أعمالهم، مع دعم كامل
                من فريق عملنا المحترف.
              </p>
            </div>
            <button className="subButton">اشترك الآن</button>
          </div>
        </div>
      </div>

      <LandingFooter />
    </div>
  );
}

export default MainLanding;
