const translationCache = new Map();

export const translateSearchTerm = async (text, targetLang = "en") => {
  if (!text || typeof text !== "string") return text;
  
  const cacheKey = `${text}_${targetLang}`;
  if (translationCache.has(cacheKey)) {
    return translationCache.get(cacheKey);
  }

  try {
    const response = await fetch(
      `https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=${targetLang}&dt=t&q=${encodeURIComponent(
        text
      )}`
    );
    const data = await response.json();
    const result = data[0]?.[0]?.[0] || text;
    
    translationCache.set(cacheKey, result);
    return result;
  } catch (error) {
    console.error("Translation error for search term:", error);
    return text;
  }
};
