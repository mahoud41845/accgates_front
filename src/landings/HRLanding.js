import LandingNav from "../components/LandingNav";
import Title from "../components/title";
import "./createMangelanding.css";
import LandingFooter from "../components/LandingFooter";
import LandingInfo from "../components/LandingInfo";
import OurSystemContainer from "../components/OurSystemContainer";
import BenefitsConatiner from "../components/BenefitsConatiner";
import Stars from "../components/Stars";

function HRLanding() {
  const textData = [
    "تسجيل الحضور والانصراف بتقنية QR Code",
    "الحصول على تقارير الموظفين مع التحاليل الإحصائية ",
    "وجود معايير تقييم الأداء KPI من أجل توزيع الحوافز على الموظفين",
    "امكانية ربط نظام إدارة الموارد البشرية بالنظام المحاسبي لدينا لكي يتم خصم المرتبات من الخزينة وتوزيعها على الموظفين أتوماتيكيا",
    "امكانية انشاء المهمات الفرعية واليومية وتحويلها إلي الموظفين الآخرين من أجل تنفيذها وامكانية المراجعة والحصول على التقارير ",
    "عرض بيانات شاملة عن الموظفين مثل الاسم، الوظيفة، التخصص، الراتب، والتاريخ الوظيفي.",
    " متابعة خصومات الرواتب والمكافآت التي تم تطبيقها على الموظف بناءً على الأداء أو سياسات الشركة.",
  ];

  const cardItems = [
    {
      imageClass: "cardImageContainer2",
      text: "إشترك لمدة ثلاث سنوات",
      price: " 5000 ر.س  وفر 17% على الخطة",
    },
    {
      imageClass: "cardImageContainer3",
      text: "إشترك لمدة سنه",
      price:"2000 ر.س"
    },
  ];

  return (
    <div className="createMangeLand">
      <LandingNav />
      <div className="landingTitleCon">
        <Title title="إدارة الموارد البشرية" />
      </div>

      <div className="section1Container">
        <img
          src="https://s3-alpha-sig.figma.com/img/4cfb/37d6/34f32ad701164361b69263a7be77b107?Expires=1735516800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=QiHFDrhEM3JxI57ZXmniYzEZZZ~MUXys6FL8LM6cTs5rvz0Yv76C--U~D0gz6~6fQXcJ34JvSM4mE-C7gTzGWqOiPstpCvEmqZMyqyyx-p5u1arA1cOKS7UVDiJaArtd7F75gz9tkGM-8pJYnKPOTw3Vx3xKR7~jBCJtHI6Eo0n8nQl8ZPwxcCXqRDa3oWUFJ1JX00YzotkHtmBg9rp93pBQpoNavSlzjkcYBV7n6d1EWBV5h0K5eJUqeWWJOcJf3lep6xAguKZmZ82iYHTEcFcQE2HQ4PJoBkQboozdbf6U7zrQkxMvq8EWAFyflHFjwcs6OifgzieEy7SeIdNb0w__"
          alt="sec"
          className="CreateLandingimage"
        />
      </div>

      <div className="starsContainer">
        <Stars />

        <LandingInfo
          text={textData}
          title="ابدأ الآن بتحسين وإدارة الموارد البشرية في مشروعك باستخدام أدوات مبتكرة "
        />

        <OurSystemContainer items={cardItems} />

        <BenefitsConatiner
          title="أساليب مبتكرة ومُلهمة لتعزيز التواصل، التفاعل، والإنتاجية."
          benTitle="مع خدمة المشاركة من Your Gates"
          benDesc="يمكنك الاستفادة من خدماتنا المتخصصة في إدارة الموارد البشرية وتصميم حلول مبتكرة تلبي احتياجات شركتك. نحن نساعدك على تطوير أنظمة فعّالة لإدارة الموظفين، تحسين الأداء، وتعزيز بيئة العمل لتحقيق نجاح أعمالك بسهولة وكفاءة."
        />
      </div>
      <LandingFooter />
    </div>
  );
}

export default HRLanding;
