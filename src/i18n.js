import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "./locales/en.json";
import ar from "./locales/ar.json";

const savedLanguage = localStorage.getItem("i18nextLng") || "ar";

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      ar: { translation: ar },
    },
    lng: savedLanguage, 
    fallbackLng: "ar",
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
