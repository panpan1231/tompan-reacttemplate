import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "../locals/en.json";
import zh from "../locals/zh.json";
// the translations
// (tip move them in a JSON file and import them)
const resources = {
  En: { translation: en },
  Zh: { translation: zh },
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: "Zh",
    fallbackLng: "Zh",
    keySeparator: false,
    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  });

export default i18n;
