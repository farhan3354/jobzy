import React from "react";
import img from "../../assets/about.jpg";
import TranslatedText from "../TranslatedText";
import { useLanguage } from "../../context/LanguageContext"; 

export default function Details() {
  const { language } = useLanguage(); 

  return (
    <>
      <section className="bg-gray-100 pl-5">
        <div className="container mx-auto py-16 px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-8">
            <div className="max-w-lg">
              <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
                <TranslatedText>About Us</TranslatedText>
              </h2>
              <p className="mt-4 text-gray-600 text-lg">
                <TranslatedText>
                  Finding a fulfilling career or the ideal candidate shouldn't
                  feel like searching for a needle in a haystack. That's why we
                  built jobzy. We are a dynamic job portal dedicated to
                  simplifying the entire hiring process. For Job Seekers, we
                  offer a personalized platform to discover roles that align
                  with your skills and aspirations. Create a powerful profile,
                  get matched with relevant opportunities, and access resources
                  to ace your interviews.
                </TranslatedText>
              </p>
              <div className="mt-8">
                <a
                  href="#"
                  className="text-blue-500 hover:text-blue-600 font-medium"
                >
                  <TranslatedText>Learn more about us</TranslatedText>
                </a>
              </div>
            </div>
            <div className="mt-12 md:mt-0">
              <img
                src={img}
                alt="About Us Image"
                className="object-cover rounded-lg shadow-md"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

// import React from "react";
// import img from "../../assets/about.jpg";
// import TranslatedText from "../TranslatedText";
// import { useLanguage } from "../../context/LanguageContext";

// export default function Details() {
//     const { language } = useLanguage();

//   return (
//     <>
//       <section className="bg-gray-100 pl-5">
//         <div className="container mx-auto py-16 px-4 sm:px-6 lg:px-8">
//           <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-8">
//             <div className="max-w-lg">
//               <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
//                 <TranslatedText>About Us</TranslatedText>
//               </h2>
//               <p className="mt-4 text-gray-600 text-lg">
//                 <TranslatedText>
//                   Finding a fulfilling career or the ideal candidate shouldn't
//                   feel like searching for a needle in a haystack. That’s why we
//                   built jobzy. We are a dynamic job portal dedicated to
//                   simplifying the entire hiring process. For Job Seekers, we
//                   offer a personalized platform to discover roles that align
//                   with your skills and aspirations. Create a powerful profile,
//                   get matched with relevant opportunities, and access resources
//                   to ace your interviews.
//                 </TranslatedText>
//               </p>
//               <div className="mt-8">
//                 <a
//                   href="#"
//                   className="text-blue-500 hover:text-blue-600 font-medium"
//                 >
//                   <TranslatedText>Learn more about us</TranslatedText>
//                 </a>
//               </div>
//             </div>
//             <div className="mt-12 md:mt-0">
//               <img
//                 src={img}
//                 alt="About Us Image"
//                 className="object-cover rounded-lg shadow-md"
//               />
//             </div>
//           </div>
//         </div>
//       </section>
//     </>
//   );
// }
