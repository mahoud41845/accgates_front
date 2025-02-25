import LandingNav from "../components/LandingNav";
import Title from "../components/title";
import "./createMangelanding.css";
import LandingFooter from "../components/LandingFooter";
import LandingInfo from "../components/LandingInfo";
import OurSystemContainer from "../components/OurSystemContainer";
import BenefitsConatiner from "../components/BenefitsConatiner";
import Stars from "../components/Stars";
import SubscriptionContainer from "../components/SubScriptionContainer";

function DesignMarketingLanding() {
  const textData = [
    "سنحول فكرتك إلي حقيقة واقعية",
    "الاطلاع على صندوق الافكار الخيرة لتختار منها ما يتناسب مع قصص جمعيتك",
    "ستحصل على دراسة كاملة لمشروعك من الجوانب التشغيلية والتمويلية والتنفيذية بالخطوات التفصيلية",
    "عند طلب تسويق مشاريعكم الخيرية، سيتم ترتيب اجتماع مع ممثل شركتنا وممثل الجمعية أو رئيس مجلس الإدارة لتحديد آلية التسويق وشروطه.",
    "سيكون هناك عقد للتسويق للغير مسجل بين الطرفين ",
    "لدينا قاعدة بيانات كبيرة جدا، فيمكن أن نسهل عليك عملية الحصول على التبرعات وإدارتها ",
    "لدينا أكثر من باقة للتسويق مما يتناسب مع حجم أعمال جميعتك الخيرية فلا تتردد من أن تتواصل معنا",
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
      price:"1000 ر.س"

    },
  ];

  const subscriptionPlans = [
    {
      title: "باقة السنة",
      subtitle: "وفر أكثر مع النظام المتكامل",
      price: "12,250 ر.س",
      description:
        "الخيار الأمثل لأصحاب الأعمال الذين يسعون للحصول على تقارير شاملة، مميزات متقدمة، وخصائص تدعم توسيع نطاق أعمالهم، مع الاستفادة من خبرات فريق عملنا المحترف.",
      buttonText: "اشترك الآن",
    },
    {
      title: "حزمة الثلاث سنوات",
      subtitle: "وفر أكثر حزمة مع الثلاث سنوات حتي 13%",
      price: "32,500 ر.س",
      description:
        "الخطة المثالية لأصحاب الأعمال الذين يبحثون عن تقارير شاملة، مميزات متطورة، وخصائص تساهم في توسيع نطاق أعمالهم، مع دعم كامل من فريق عملنا المحترف.",
      buttonText: "اشترك الآن",
    },
  ];
  return (
    <div className="createMangeLand">
      <LandingNav />
      <div className="landingTitleCon">
        <Title title="تصميم المشاريع والتسويق" />
      </div>

      <div className="section1Container">
        <img
          src="https://s3-alpha-sig.figma.com/img/1ef7/78a4/a0fc9d8cdd46c39dbd8884d39fdf4805?Expires=1735516800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=nkoBRgD6SiHmfgob5cKmelnl5JrHSlWnkbup2YAK7DS84RDzX5mLkb~Tq3eqWyfBGaoj-jVjVPkHZn3YSJsEvooaJK21xRqA~3brCu0av453fQZKU~yq6BtPFCJ~bs8YqTFosEKEDmPhFP89A7MExjD0aCdTOwVnUt8ic1-0Eii3QhQXw-tOliBsTfSvnN6drmL8Ln4MS3jrcgp8OQmZcNRwph0ww67iOhHEjI34OH2YOdTb84vgmknn9YzN2SUm2cRUvT9IRsmrUtXEFOIHVcYUixaboXgx7snulhTaGx~fy62FxWZhdxCVOgNDICdeoEtcUu~1OAfIhbykEmkD0w__"
          alt="sec"
          className="CreateLandingimage"
        />
      </div>

      <div className="starsContainer">
        <Stars />

        <LandingInfo
          text={textData}
          title="تمتع الآن بتسويق وتصميم المشاريع الخاصة بك"
        />

        <OurSystemContainer items={cardItems} />

        <SubscriptionContainer plans={subscriptionPlans} />

        <BenefitsConatiner
          title="أساليب مبتكرة ومُلهمة لتعزيز التواصل، التفاعل، والإنتاجية."
          benTitle="مع خدمة المشاركة من Your Gates"
          benDesc="يمكنك الاستفادة من خدماتنا المتخصصة في إدارة وتسويق المشاريع، بالإضافة إلى تصميم وتنفيذ حلول مبتكرة تلبي احتياجاتك. نحرص على تقديم خدمات عالية الكفاءة والاحترافية لمساعدتك في تحقيق نجاح أعمالك بسهولة."
        />
      </div>
      <LandingFooter />
    </div>
  );
}

export default DesignMarketingLanding;
