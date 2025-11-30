import { useState, useEffect } from "react";

const useAutoTranslate = (text, targetLang = "ar") => {
  const [translatedText, setTranslatedText] = useState(text);
  const [loading, setLoading] = useState(false);

  // COMPLETE STATIC DICTIONARY - No API calls needed!
  const staticDictionary = {
    en: {
      // Header & Navigation
      Home: "Home",
      About: "About",
      "Contact Us": "Contact Us",
      Blogs: "Blogs",
      Jobzy: "Jobzy",
      Register: "Register",
      Login: "Login",
      "Go to Dashboard": "Go to Dashboard",
      Logout: "Logout",

      // Footer
      "Your gateway to better careers and great talent. We connect job seekers and employers with ease.":
        "Your gateway to better careers and great talent. We connect job seekers and employers with ease.",
      "Quick Links": "Quick Links",
      "Find Jobs": "Find Jobs",
      "Post a Job": "Post a Job",
      "About Us": "About Us",
      Resources: "Resources",
      "Job Tips": "Job Tips",
      "Career Advice": "Career Advice",
      FAQs: "FAQs",
      Support: "Support",
      Contact: "Contact",
      "123 Hiring Lane": "123 Hiring Lane",
      "San Francisco, CA 94107": "San Francisco, CA 94107",
      "© 2025 JobConnect. All rights reserved.":
        "© 2025 JobConnect. All rights reserved.",

      // Hero Section
      "Find Your Dream Job Today": "Find Your Dream Job Today",
      "Thousands of jobs in technology, business, and more. Start your career journey with us.":
        "Thousands of jobs in technology, business, and more. Start your career journey with us.",
      "Featured Jobs": "Featured Jobs",
      "Popular Categories": "Popular Categories",
      "Browse jobs by category to find the perfect match for your skills and interests":
        "Browse jobs by category to find the perfect match for your skills and interests",

      // About Page
      "About Us": "About Us",
      "Finding a fulfilling career or the ideal candidate shouldn't feel like searching for a needle in a haystack. That's why we built jobzy. We are a dynamic job portal dedicated to simplifying the entire hiring process. For Job Seekers, we offer a personalized platform to discover roles that align with your skills and aspirations. Create a powerful profile, get matched with relevant opportunities, and access resources to ace your interviews.":
        "Finding a fulfilling career or the ideal candidate shouldn't feel like searching for a needle in a haystack. That's why we built jobzy. We are a dynamic job portal dedicated to simplifying the entire hiring process. For Job Seekers, we offer a personalized platform to discover roles that align with your skills and aspirations. Create a powerful profile, get matched with relevant opportunities, and access resources to ace your interviews.",
      "Learn more about us": "Learn more about us",

      // Authentication Banners
      "Jobzy is your trusted gateway to career success — connecting talented job seekers with top companies. Whether you're looking for your first job or your next big opportunity, Jobzy makes the process simple, fast, and effective.":
        "Jobzy is your trusted gateway to career success — connecting talented job seekers with top companies. Whether you're looking for your first job or your next big opportunity, Jobzy makes the process simple, fast, and effective.",
      "Sign up": "Sign up",
      "Find Exceptional Talent with Jobzy — the smart way to recruit top-quality candidates.":
        "Find Exceptional Talent with Jobzy — the smart way to recruit top-quality candidates.",
      "Post jobs to reach qualified candidates":
        "Post jobs to reach qualified candidates",
      "Advanced candidate matching": "Advanced candidate matching",
      "Manage applications easily": "Manage applications easily",
      "Schedule interviews seamlessly": "Schedule interviews seamlessly",
      "Streamline your hiring process with Jobzy!":
        "Streamline your hiring process with Jobzy!",
      "Sign in to Jobzy": "Sign in to Jobzy",

      // Employer Banner
      "Are you an Employer?": "Are you an Employer?",
      "Create your free employer account today and start posting jobs to hire top talent. Reach thousands of job seekers instantly.":
        "Create your free employer account today and start posting jobs to hire top talent. Reach thousands of job seekers instantly.",
      "Create Employer Account": "Create Employer Account",

      // Registration Selection Page
      "Join Our Platform": "Join Our Platform",
      "Choose how you'd like to get started and unlock opportunities that match your goals":
        "Choose how you'd like to get started and unlock opportunities that match your goals",
      "Register as a Job Seeker": "Register as a Job Seeker",
      "Find your dream job with access to thousands of opportunities. Build your profile, showcase your skills, and connect with top employers.":
        "Find your dream job with access to thousands of opportunities. Build your profile, showcase your skills, and connect with top employers.",
      "Search thousands of jobs": "Search thousands of jobs",
      "Create professional profile": "Create professional profile",
      "Track applications": "Track applications",
      "Get Started as Job Seeker": "Get Started as Job Seeker",
      "Register as an Employer": "Register as an Employer",
      "Find the perfect candidates for your company. Post jobs, manage applications, and build your team with qualified professionals.":
        "Find the perfect candidates for your company. Post jobs, manage applications, and build your team with qualified professionals.",
      "Post unlimited jobs": "Post unlimited jobs",
      "Access talent database": "Access talent database",
      "Analytics & insights": "Analytics & insights",
      "Get Started as Employer": "Get Started as Employer",
      "Already have an account?": "Already have an account?",
      "Sign in here": "Sign in here",

      // CTA Section
      "Ready to take the next step in your career?":
        "Ready to take the next step in your career?",
      "Create a free account and get matched with your perfect job today.":
        "Create a free account and get matched with your perfect job today.",
      "Sign Up Now": "Sign Up Now",
      "Learn More": "Learn More",

      // Testimonials/Success Stories
      "Success Stories": "Success Stories",
      "Hear from people who found their dream jobs through our platform":
        "Hear from people who found their dream jobs through our platform",

      // CONTACT FORM TEXT
      "Let's Connect!": "Let's Connect!",
      "Have a question, suggestion, or job inquiry? We'd love to hear from you. Fill out the form and our team will get back to you shortly.":
        "Have a question, suggestion, or job inquiry? We'd love to hear from you. Fill out the form and our team will get back to you shortly.",
      "Full Name": "Full Name",
      "Enter your name": "Enter your name",
      "The Name is required": "The Name is required",
      Email: "Email",
      "Enter your email": "Enter your email",
      "Email Address is required": "Email Address is required",
      Message: "Message",
      "Write your message here...": "Write your message here...",
      "The message is required": "The message is required",
      "Send Message": "Send Message",

      // REGISTRATION FORM TEXT
      "Create your employer account": "Create your employer account",
      "Create your job seeker account": "Create your job seeker account",
      "I am a *": "I am a *",
      "Please select a role": "Please select a role",
      "Select Role": "Select Role",
      "Job Seeker": "Job Seeker",
      Employer: "Employer",
      "Name is required": "Name is required",
      "Name must be at least 2 characters":
        "Name must be at least 2 characters",
      "Full Name": "Full Name",
      "Email is required": "Email is required",
      "Enter a valid email address": "Enter a valid email address",
      "Phone Number": "Phone Number",
      "Please enter a valid phone number": "Please enter a valid phone number",
      "Password is required": "Password is required",
      "Minimum 6 characters": "Minimum 6 characters",
      "Must contain uppercase, lowercase & number":
        "Must contain uppercase, lowercase & number",
      Password: "Password",
      "Create Account": "Create Account",
      "Already have an account?": "Already have an account?",
      "Sign In": "Sign In",

      // NEW ADDITIONS
      "Trusted by job seekers and employers worldwide":
        "Trusted by job seekers and employers worldwide",
      "We connect talent with opportunity, helping both candidates and companies grow.":
        "We connect talent with opportunity, helping both candidates and companies grow.",
    },
    ar: {
      // Header & Navigation
      Home: "الرئيسية",
      About: "معلومات عنا",
      "Contact Us": "اتصل بنا",
      Blogs: "المدونات",
      Jobzy: "جوبزي",
      Register: "إنشاء حساب",
      Login: "تسجيل الدخول",
      "Go to Dashboard": "انتقل إلى لوحة التحكم",
      Logout: "تسجيل الخروج",

      // Footer
      "Your gateway to better careers and great talent. We connect job seekers and employers with ease.":
        "بوابتك إلى وظائف أفضل ومواهب رائعة. نحن نربط بين الباحثين عن عمل وأصحاب العمل بسهولة.",
      "Quick Links": "روابط سريعة",
      "Find Jobs": "ابحث عن وظائف",
      "Post a Job": "انشر وظيفة",
      "About Us": "معلومات عنا",
      Resources: "مصادر",
      "Job Tips": "نصائح للوظائف",
      "Career Advice": "نصائح مهنية",
      FAQs: "الأسئلة الشائعة",
      Support: "الدعم",
      Contact: "اتصل بنا",
      "123 Hiring Lane": "123 شارع التوظيف",
      "San Francisco, CA 94107": "سان فرانسيسكو، كاليفورنيا 94107",
      "© 2025 JobConnect. All rights reserved.":
        "© 2025 JobConnect. جميع الحقوق محفوظة.",

      // Hero Section
      "Find Your Dream Job Today": "ابحث عن وظيفة أحلامك اليوم",
      "Thousands of jobs in technology, business, and more. Start your career journey with us.":
        "الآلاف من الوظائف في التكنولوجيا والأعمال والمزيد. ابدأ رحلتك المهنية معنا.",
      "Featured Jobs": "وظائف مميزة",
      "Popular Categories": "الفئات الشائعة",
      "Browse jobs by category to find the perfect match for your skills and interests":
        "تصفح الوظائف حسب الفئة للعثور على الوظيفة المثالية لمهاراتك واهتماماتك",

      // About Page
      "About Us": "معلومات عنا",
      "Finding a fulfilling career or the ideal candidate shouldn't feel like searching for a needle in a haystack. That's why we built jobzy. We are a dynamic job portal dedicated to simplifying the entire hiring process. For Job Seekers, we offer a personalized platform to discover roles that align with your skills and aspirations. Create a powerful profile, get matched with relevant opportunities, and access resources to ace your interviews.":
        "العثور على وظيفة مرضية أو المرشح المثالي لا ينبغي أن يشبه البحث عن إبرة في كومة قش. لهذا بنينا جوبزي. نحن بوابة توظيف ديناميكية مكرسة لتبسيط عملية التوظيف بأكملها. بالنسبة للباحثين عن عمل، نقدم منصة مخصصة لاكتشاف الأدوار التي تتماشى مع مهاراتك وتطلعاتك. أنشئ ملفًا شخصيًا قويًا، واحصل على مطابقة مع الفرص ذات الصلة، واذهب إلى الموارد لاجتياز مقابلاتك بنجاح.",
      "Learn more about us": "اعرف المزيد عنا",

      // Authentication Banners
      "Jobzy is your trusted gateway to career success — connecting talented job seekers with top companies. Whether you're looking for your first job or your next big opportunity, Jobzy makes the process simple, fast, and effective.":
        "جوبزي هو بوابتك الموثوقة للنجاح الوظيفي - يربط الباحثين عن العمل الموهوبين بأفضل الشركات. سواء كنت تبحث عن وظيفتك الأولى أو فرصتك الكبيرة القادمة، فإن جوبزي يجعل العملية بسيطة وسريعة وفعالة.",
      "Sign up": "اشتراك",
      "Find Exceptional Talent with Jobzy — the smart way to recruit top-quality candidates.":
        "ابحث عن مواهب استثنائية مع جوبزي - الطريقة الذكية لتوظيف مرشحين عالي الجودة.",
      "Post jobs to reach qualified candidates":
        "انشر الوظائف للوصول إلى مرشحين مؤهلين",
      "Advanced candidate matching": "مطابقة المرشحين المتقدمة",
      "Manage applications easily": "إدارة الطلبات بسهولة",
      "Schedule interviews seamlessly": "جدولة المقابلات بسلاسة",
      "Streamline your hiring process with Jobzy!":
        "بسط عملية التوظيف الخاصة بك مع جوبزي!",
      "Sign in to Jobzy": "تسجيل الدخول إلى جوبزي",

      // Employer Banner
      "Are you an Employer?": "هل أنت صاحب عمل؟",
      "Create your free employer account today and start posting jobs to hire top talent. Reach thousands of job seekers instantly.":
        "أنشئ حساب صاحب العمل المجاني اليوم وابدأ في نشر الوظائف لتوظيف أفضل المواهب. الوصول إلى الآلاف من الباحثين عن عمل على الفور.",
      "Create Employer Account": "إنشاء حساب صاحب العمل",

      // Registration Selection Page
      "Join Our Platform": "انضم إلى منصتنا",
      "Choose how you'd like to get started and unlock opportunities that match your goals":
        "اختر كيف تريد البدء وافتح الفرص التي تتطابق مع أهدافك",
      "Register as a Job Seeker": "سجل كباحث عن عمل",
      "Find your dream job with access to thousands of opportunities. Build your profile, showcase your skills, and connect with top employers.":
        "ابحث عن وظيفة أحلامك مع الوصول إلى آلاف الفرص. أنشئ ملفك الشخصي، اعرض مهاراتك، وتواصل مع أفضل أصحاب العمل.",
      "Search thousands of jobs": "ابحث في آلاف الوظائف",
      "Create professional profile": "إنشاء ملف شخصي احترافي",
      "Track applications": "تتبع الطلبات",
      "Get Started as Job Seeker": "ابدأ كباحث عن عمل",
      "Register as an Employer": "سجل كصاحب عمل",
      "Find the perfect candidates for your company. Post jobs, manage applications, and build your team with qualified professionals.":
        "ابحث عن المرشحين المثاليين لشركتك. انشر الوظائف، وأدر الطلبات، وابني فريقك مع محترفين مؤهلين.",
      "Post unlimited jobs": "انشر وظائف غير محدودة",
      "Access talent database": "الوصول إلى قاعدة بيانات المواهب",
      "Analytics & insights": "التحليلات والرؤى",
      "Get Started as Employer": "ابدأ كصاحب عمل",
      "Already have an account?": "هل لديك حساب بالفعل؟",
      "Sign in here": "سجل الدخول من هنا",

      // CTA Section
      "Ready to take the next step in your career?":
        "هل أنت مستعد لاتخاذ الخطوة التالية في مسيرتك المهنية؟",
      "Create a free account and get matched with your perfect job today.":
        "أنشئ حسابًا مجانيًا وتمت مطابقتك مع وظيفتك المثالية اليوم.",
      "Sign Up Now": "اشترك الآن",
      "Learn More": "اعرف المزيد",

      // Testimonials/Success Stories
      "Success Stories": "قصص النجاح",
      "Hear from people who found their dream jobs through our platform":
        "استمع إلى أشخاص وجدوا وظائف أحلامهم من خلال منصتنا",

      // CONTACT FORM TEXT - ARABIC
      "Let's Connect!": "لنتواصل!",
      "Have a question, suggestion, or job inquiry? We'd love to hear from you. Fill out the form and our team will get back to you shortly.":
        "هل لديك سؤال أو اقتراح أو استفسار حول وظيفة؟ نحن نحب أن نسمع منك. املأ النموذج وسيعود فريقنا إليك قريبًا.",
      "Full Name": "الاسم الكامل",
      "Enter your name": "أدخل اسمك",
      "The Name is required": "الاسم مطلوب",
      Email: "البريد الإلكتروني",
      "Enter your email": "أدخل بريدك الإلكتروني",
      "Email Address is required": "عنوان البريد الإلكتروني مطلوب",
      Message: "الرسالة",
      "Write your message here...": "اكتب رسالتك هنا...",
      "The message is required": "الرسالة مطلوبة",
      "Send Message": "إرسال الرسالة",

      // REGISTRATION FORM TEXT - ARABIC
      "Create your employer account": "أنشئ حساب صاحب العمل الخاص بك",
      "Create your job seeker account": "أنشئ حساب الباحث عن عمل الخاص بك",
      "I am a *": "أنا *",
      "Please select a role": "الرجاء اختيار دور",
      "Select Role": "اختر الدور",
      "Job Seeker": "باحث عن عمل",
      Employer: "صاحب عمل",
      "Name is required": "الاسم مطلوب",
      "Name must be at least 2 characters":
        "يجب أن يكون الاسم مكونًا من حرفين على الأقل",
      "Full Name": "الاسم الكامل",
      "Email is required": "البريد الإلكتروني مطلوب",
      "Enter a valid email address": "أدخل عنوان بريد إلكتروني صالح",
      "Phone Number": "رقم الهاتف",
      "Please enter a valid phone number": "الرجاء إدخال رقم هاتف صالح",
      "Password is required": "كلمة المرور مطلوبة",
      "Minimum 6 characters": "6 أحرف على الأقل",
      "Must contain uppercase, lowercase & number":
        "يجب أن تحتوي على أحرف كبيرة وصغيرة وأرقام",
      Password: "كلمة المرور",
      "Create Account": "إنشاء حساب",
      "Already have an account?": "هل لديك حساب بالفعل؟",
      "Sign In": "تسجيل الدخول",

      // NEW ADDITIONS - ARABIC
      "Trusted by job seekers and employers worldwide":
        "موثوق به من قبل الباحثين عن عمل وأصحاب العمل في جميع أنحاء العالم",
      "We connect talent with opportunity, helping both candidates and companies grow.":
        "نحن نربط المواهب بالفرص، مما يساعد كلًا من المرشحين والشركات على النمو.",
    },
  };

  const translateWithMyMemory = async (text, targetLang) => {
    try {
      const response = await fetch(
        `https://api.mymemory.translated.net/get?q=${encodeURIComponent(
          text
        )}&langpair=en|${targetLang}`
      );
      if (!response.ok) throw new Error("MyMemory API failed");
      const data = await response.json();
      return data.responseData?.translatedText || null;
    } catch (error) {
      console.error("MyMemory error:", error);
      return null;
    }
  };

  const translateWithLibreTranslate = async (text, targetLang) => {
    try {
      const response = await fetch("https://libretranslate.de/translate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          q: text,
          source: "en",
          target: targetLang,
          format: "text",
        }),
      });
      const data = await response.json();
      return data.translatedText || null;
    } catch (error) {
      console.error("LibreTranslate error:", error);
      return null;
    }
  };

  const translateWithGoogle = async (text, targetLang) => {
    try {
      const response = await fetch(
        `https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=${targetLang}&dt=t&q=${encodeURIComponent(
          text
        )}`
      );
      const data = await response.json();
      return data[0]?.[0]?.[0] || null;
    } catch (error) {
      console.error("Google Translate error:", error);
      return null;
    }
  };

  useEffect(() => {
    const translateText = async () => {
      // Don't translate if same language or no text
      if (targetLang === "en" || !text || typeof text !== "string") {
        setTranslatedText(text);
        return;
      }

      // First, check static dictionary
      const staticTranslation = staticDictionary[targetLang]?.[text];
      if (staticTranslation) {
        setTranslatedText(staticTranslation);
        return;
      }

      // If not found in static dictionary, try APIs in sequence
      setLoading(true);

      let translated = null;

      // Try MyMemory first
      translated = await translateWithMyMemory(text, targetLang);

      // If MyMemory fails, try LibreTranslate
      if (!translated) {
        translated = await translateWithLibreTranslate(text, targetLang);
      }

      // If LibreTranslate fails, try Google Translate
      if (!translated) {
        translated = await translateWithGoogle(text, targetLang);
      }

      // If all APIs fail, use original text
      setTranslatedText(translated || text);
      setLoading(false);
    };

    translateText();
  }, [text, targetLang]);

  return { translatedText, loading };
};

export default useAutoTranslate;

//   useEffect(() => {
//     const translateText = async () => {
//       // Don't translate if same language or no text
//       if (targetLang === "en" || !text || typeof text !== "string") {
//         setTranslatedText(text);
//         return;
//       }

//       // First, check static dictionary
//       const staticTranslation = staticDictionary[targetLang]?.[text];

//       if (staticTranslation) {
//         setTranslatedText(staticTranslation);
//         return;
//       }

//       // If not found in static dictionary, use API fallback
//       setLoading(true);
//       try {
//         // Use MyMemory Translation API (FREE)
//         const response = await fetch(
//           `https://api.mymemory.translated.net/get?q=${encodeURIComponent(
//             text
//           )}&langpair=en|${targetLang}`
//         );

//         if (!response.ok) {
//           throw new Error("Translation API failed");
//         }

//         const data = await response.json();

//         if (data.responseData && data.responseData.translatedText) {
//           setTranslatedText(data.responseData.translatedText);
//         } else {
//           setTranslatedText(text); // Fallback to original
//         }
//       } catch (error) {
//         console.error("Translation error for:", text, error);
//         setTranslatedText(text); // Fallback to original text
//       } finally {
//         setLoading(false);
//       }
//     };

//     translateText();
//   }, [text, targetLang]);

//   return { translatedText, loading };
// };

// export default useAutoTranslate;

// import { useState, useEffect } from "react";

// const useAutoTranslate = (text, targetLang = "ar") => {
//   const [translatedText, setTranslatedText] = useState(text);
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     const translateText = async () => {
//       // Don't translate if same language or no text
//       if (targetLang === "en" || !text || typeof text !== "string") {
//         setTranslatedText(text);
//         return;
//       }

//       setLoading(true);
//       try {
//         // Use MyMemory Translation API (FREE)
//         const response = await fetch(
//           `https://api.mymemory.translated.net/get?q=${encodeURIComponent(
//             text
//           )}&langpair=en|${targetLang}`
//         );

//         if (!response.ok) {
//           throw new Error("Translation API failed");
//         }

//         const data = await response.json();

//         if (data.responseData && data.responseData.translatedText) {
//           setTranslatedText(data.responseData.translatedText);
//         } else {
//           setTranslatedText(text); // Fallback to original
//         }
//       } catch (error) {
//         console.error("Translation error for:", text, error);
//         setTranslatedText(text); // Fallback to original text
//       } finally {
//         setLoading(false);
//       }
//     };

//     translateText();
//   }, [text, targetLang]);

//   return { translatedText, loading };
// };

// export default useAutoTranslate;
