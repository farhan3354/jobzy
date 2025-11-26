import { useState, useEffect } from "react";

const useAutoTranslate = (text, targetLang = "ar") => {
  const [translatedText, setTranslatedText] = useState(text);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const translateText = async () => {
      // Don't translate if same language or no text
      if (targetLang === "en" || !text || typeof text !== "string") {
        setTranslatedText(text);
        return;
      }

      setLoading(true);
      try {
        // Use MyMemory Translation API (FREE)
        const response = await fetch(
          `https://api.mymemory.translated.net/get?q=${encodeURIComponent(
            text
          )}&langpair=en|${targetLang}`
        );

        if (!response.ok) {
          throw new Error("Translation API failed");
        }

        const data = await response.json();

        if (data.responseData && data.responseData.translatedText) {
          setTranslatedText(data.responseData.translatedText);
        } else {
          setTranslatedText(text); // Fallback to original
        }
      } catch (error) {
        console.error("Translation error for:", text, error);
        setTranslatedText(text); // Fallback to original text
      } finally {
        setLoading(false);
      }
    };

    translateText();
  }, [text, targetLang]);

  return { translatedText, loading };
};

export default useAutoTranslate;
