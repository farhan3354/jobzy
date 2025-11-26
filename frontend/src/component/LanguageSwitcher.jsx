import React from "react";
import { useLanguage } from "../context/LanguageContext";

const LanguageSwitcher = () => {
  const { language, changeLanguage } = useLanguage();

  const switchLanguage = () => {
    const newLang = language === "en" ? "ar" : "en";
    changeLanguage(newLang);
  };

  return (
    <button
      onClick={switchLanguage}
      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
    >
      {language === "en" ? "العربية" : "English"}
    </button>
  );
};

export default LanguageSwitcher;
