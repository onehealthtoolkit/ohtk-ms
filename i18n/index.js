import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";
import translationEn from "./translations.en.json";
import translationTh from "./translations.th.json";
import translationKm from "./translations.km.json";
import translationLa from "./translations.la.json";

export const resources = {
  en: {
    translation: translationEn,
  },
  th: {
    translation: translationTh,
  },
  km: {
    translation: translationKm,
  },
  la: {
    translation: translationLa,
  },
};

const DETECTION_OPTIONS = {
  lookupQuerystring: "lang",
  order: [
    "querystring",
    "cookie",
    "localStorage",
    "sessionStorage",
    "navigator",
    "htmlTag",
    "path",
    "subdomain",
  ],
  caches: ["localStorage", "cookie"],
};
i18n
  .use(initReactI18next)
  .use(LanguageDetector)
  .init({
    detection: DETECTION_OPTIONS,
    fallbackLng: "en",
    resources,
    debug: false,
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
  });

export default i18n;
