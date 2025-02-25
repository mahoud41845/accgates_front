// i18n.js
import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  en: {
    translation: {
      home: "Home",
      notifications: "Notifications",
      clearAll: "Clear All",
      sidebarToggle: "Toggle Sidebar",
    },
  },
  ar: {
    translation: {
      home: "الصفحة الرئيسية",
      notifications: "الإشعارات",
      clearAll: "مسح الكل",
      sidebarToggle: "إظهار الشريط الجانبي",
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: "en", // Default language
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;    
