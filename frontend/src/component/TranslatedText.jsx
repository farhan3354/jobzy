import React from "react";
import useAutoTranslate from "../hook/useTranslation";
import { useLanguage } from "../context/LanguageContext";

const TranslatedText = ({ children, className = "" }) => {
  const { language } = useLanguage();
  const { translatedText, loading } = useAutoTranslate(children, language);

  // Show loading state with opacity
  if (loading) {
    return <span className={`${className} opacity-70`}>{children}</span>;
  }

  return <span className={className}>{translatedText}</span>;
};

export default TranslatedText;
