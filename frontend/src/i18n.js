import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  en: {
    translation: {
      website: {
        name: "Jobzy",
      },
      "hero.title": "Find Your Dream Job Today",
      "hero.subtitle":
        "Thousands of jobs in technology, business, and more. Start your career journey with us.",
      "sections.featured_jobs": "Featured Jobs",
      "sections.popular_categories": "Popular Categories",
      "sections.categories_description":
        "Browse jobs by category to find the perfect match for your skills and interests",
      "sections.testimonials":
        "Hear from people who found their dream jobs through our platform",
      "sections.success_stories": "Success Stories",
      "sections.cta_title": "Ready to take the next step in your career?",
      "sections.cta_description":
        "Create a free account and get matched with your perfect job today.",
      "sections.cta_signup": "Sign Up Now",
      "sections.cta_learn": "Learn More",
      "sections.employer_title": "Are you an Employer?",
      "sections.employer_description":
        "Create your free employer account today and start posting jobs to hire top talent. Reach thousands of job seekers instantly.",
      "sections.employer_button": "Create Employer Account",
      navigation: {
        home: "Home",
        about: "About",
        contact: "Contact Us",
        blogs: "Blogs",
      },
    },
  },
  ar: {
    translation: {
      website: {
        name: "جوبزي",
      },
      "hero.title": "ابحث عن وظيفة أحلامك اليوم",
      "hero.subtitle":
        "الآلاف من الوظائف في التكنولوجيا والأعمال والمزيد. ابدأ رحلتك المهنية معنا.",
      "sections.featured_jobs": "وظائف مميزة",
      "sections.popular_categories": "الفئات الشائعة",
      "sections.categories_description":
        "تصفح الوظائف حسب الفئة للعثور على الوظيفة المثالية لمهاراتك واهتماماتك",
      "sections.testimonials":
        "استمع إلى أشخاص وجدوا وظائف أحلامهم من خلال منصتنا",
      "sections.success_stories": "قصص النجاح",
      "sections.cta_title":
        "هل أنت مستعد لاتخاذ الخطوة التالية في مسيرتك المهنية؟",
      "sections.cta_description":
        "أنشئ حسابًا مجانيًا وتمت مطابقتك مع وظيفتك المثالية اليوم.",
      "sections.cta_signup": "اشترك الآن",
      "sections.cta_learn": "اعرف المزيد",
      "sections.employer_title": "هل أنت صاحب عمل؟",
      "sections.employer_description":
        "أنشئ حساب صاحب العمل المجاني اليوم وابدأ في نشر الوظائف لتوظيف أفضل المواهب. الوصول إلى الآلاف من الباحثين عن عمل على الفور.",
      "sections.employer_button": "إنشاء حساب صاحب العمل",
      navigation: {
        home: "الرئيسية",
        about: "معلومات عنا",
        contact: "اتصل بنا",
        blogs: "المدونات",
      },
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: "en",
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;

// import i18n from 'i18next';
// import { initReactI18next } from 'react-i18next';
// import Backend from 'i18next-http-backend';

// i18n
//   .use(Backend)
//   .use(initReactI18next)
//   .init({
//     fallbackLng: 'en',
//     debug: false,
//     backend: {
//       loadPath: '../public/locales/{{lng}}/{{ns}}.json',
//     }
//   });

// export default i18n;
