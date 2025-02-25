import LandingNav from "../components/LandingNav";
import Title from "../components/title";
import "./createMangelanding.css";
import LandingFooter from "../components/LandingFooter";
import LandingInfo from "../components/LandingInfo";
import OurSystemContainer from "../components/OurSystemContainer";
import BenefitsConatiner from "../components/BenefitsConatiner";
import Stars from "../components/Stars";

function CreateMangeLanding() {
  const textData = [
    "نمكنك من الإطلاع على التقارير حيثما شئت",
    "نمكنك من إنشاء متجرك الإلكتروني لإدارة عمليات جمع التبرعات من المانحين",
    "نمكنك من قرءاة كافة البيانات وتحليلها",
    "عرض بياني وتفصيلي حول اكتمال كل مشروع",
    "امكانية ظهور عدد المشاريع المكتملة وقيد التشغيل على صفحتك الرئيسية واظهارها للمانحيين من أجل الشفافية وتسابق المانحين على فعل الخير",
  ];

  const cardItems = [
    {
      imageClass: "cardImageContainer2",
      text: "إشترك لمدة ثلاث سنوات",
      price: " 7000 ر.س  وفر 7% على الخطة",
    },
    {
      imageClass: "cardImageContainer3",
      text: "إشترك لمدة سنه",
      price: "2500 ر.س",
    },
  ];

  return (
    <div className="createMangeLand">
      <LandingNav />
      <div className="landingTitleCon">
        <Title title="الإنشاء والإدارة" />
      </div>

      <div className="section1Container">
        <img
          src="https://s3-alpha-sig.figma.com/img/713b/16d5/e046e43142f385b653695f938e036e88?Expires=1735516800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=oAo920b24cxyQ8rcLL~xtwZmQ3MJwgl4jDrdxbDrRHuNgoMhqcURaIZyL9YElr~fbGMFIfa66loCDfak85rn43jrI0MdvgatGd1JKZFvzYoi1vO-oBeV2EPnSOOMdM4QMLY5mL7ocUjgj5WcR5uneKEaalKh~SKtQ0MYn52FD2ykHglKuGeo972qnIYZVo4eZRUG9fMY-ONFYykapuGuFYR8wwPs-GeVVkeWZFpcsjfiSRSSsN9-2O8CoxcZReCgElAFRlDKegeE0oAmOZCcpG0UPNDpAnrjefmx7aMMBzc-SAfTLmLoiaOHBkeFvu0zomBPMNwxLdfuDzT~5-6JxA__"
          alt="sec"
          className="CreateLandingimage"
        />
      </div>

      <div className="starsContainer">
        <Stars />

        <LandingInfo text={textData} title="ماذا عن الإنشاء و الإدارة؟" />

        <OurSystemContainer items={cardItems} />

        <BenefitsConatiner
          title="أساليب مبتكرة ومُلهمة لتعزيز التواصل، التفاعل، والإنتاجية"
          benTitle="مع خدمة المشاركة من Your Gates"
          benDesc="يمكنك الاستفادة من خدماتنا المتخصصة التي تشمل إدارة وإنشاء و الحلول
          المبتكرة. نحن نركز على تلبية احتياجاتك بأعلى مستوى من الكفاءة
          والاحترافية لضمان نجاح أعمالك وتحقيق أهدافك."
        />
      </div>
      <LandingFooter />
    </div>
  );
}

export default CreateMangeLanding;
