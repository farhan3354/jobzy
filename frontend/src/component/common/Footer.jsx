import React from "react";
import { Link } from "react-router-dom";
import TranslatedText from "../TranslatedText";
import { useLanguage } from "../../context/LanguageContext";

export default function Footer() {
  const { language } = useLanguage();

  return (
    <>
      <footer className="bg-white text-gray-700 pt-16 mt-12 pb-10 border-t shadow-2xl border-blue-100">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
            <div className="space-y-4">
              <div className="flex items-center">
                <div className="bg-blue-600 rounded-full p-2">
                  <svg
                    className="h-6 w-6 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 7h18M3 12h18M3 17h18"
                    />
                  </svg>
                </div>
                <span className="ml-3 text-2xl font-bold text-blue-700">
                  <TranslatedText>Jobzy</TranslatedText>
                </span>
              </div>
              <p className="text-gray-500">
                <TranslatedText>
                  Your gateway to better careers and great talent. We connect
                  job seekers and employers with ease.
                </TranslatedText>
              </p>
            </div>

            <div>
              <h4 className="text-lg font-semibold text-blue-800 mb-4">
                <TranslatedText>Quick Links</TranslatedText>
              </h4>
              <ul className="space-y-2 text-gray-600">
                <li>
                  <Link to={"/"} className="hover:text-blue-700 transition">
                    <TranslatedText>Home</TranslatedText>
                  </Link>
                </li>
                <li>
                  <Link
                    to={"/chose-register"}
                    className="hover:text-blue-700 transition"
                  >
                    <TranslatedText>Find Jobs</TranslatedText>
                  </Link>
                </li>
                <li>
                  <Link
                    to={"/chose-register"}
                    className="hover:text-blue-700 transition"
                  >
                    <TranslatedText>Post a Job</TranslatedText>
                  </Link>
                </li>
                <li>
                  <Link
                    to={"/about"}
                    className="hover:text-blue-700 transition"
                  >
                    <TranslatedText>About Us</TranslatedText>
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-semibold text-blue-800 mb-4">
                <TranslatedText>Resources</TranslatedText>
              </h4>
              <ul className="space-y-2 text-gray-600">
                <li>
                  <a href="#" className="hover:text-blue-700 transition">
                    <TranslatedText>Job Tips</TranslatedText>
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-700 transition">
                    <TranslatedText>Career Advice</TranslatedText>
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-700 transition">
                    <TranslatedText>FAQs</TranslatedText>
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-700 transition">
                    <TranslatedText>Support</TranslatedText>
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-semibold text-blue-800 mb-4">
                <TranslatedText>Contact</TranslatedText>
              </h4>
              <p className="text-gray-600">
                <TranslatedText>123 Hiring Lane</TranslatedText>
                <br />
                <TranslatedText>San Francisco, CA 94107</TranslatedText>
              </p>
            </div>
          </div>

          <div className="border-t border-blue-100 pt-6 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
            <p>
              <TranslatedText>
                © 2025 JobConnect. All rights reserved.
              </TranslatedText>
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}

// import React from "react";
// import { Link } from "react-router-dom";
// import TranslatedText from "../TranslatedText";

// export default function Footer() {
//   return (
//     <>
//       <footer className="bg-white text-gray-700 pt-16 mt-12 pb-10 border-t shadow-2xl border-blue-100">
//         <div className="max-w-7xl mx-auto px-6 lg:px-8">
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
//             <div className="space-y-4">
//               <div className="flex items-center">
//                 <div className="bg-blue-600 rounded-full p-2">
//                   <svg
//                     className="h-6 w-6 text-white"
//                     fill="none"
//                     viewBox="0 0 24 24"
//                     stroke="currentColor"
//                   >
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       strokeWidth={2}
//                       d="M3 7h18M3 12h18M3 17h18"
//                     />
//                   </svg>
//                 </div>
//                 <span className="ml-3 text-2xl font-bold text-blue-700">
//                   <TranslatedText>Jobzy</TranslatedText>
//                 </span>
//               </div>
//               <p className="text-gray-500">
//                 <TranslatedText>
//                   Your gateway to better careers and great talent. We connect
//                   job seekers and employers with ease.
//                 </TranslatedText>
//               </p>
//               <div className="flex space-x-4 mt-4">
//                 {["facebook", "twitter", "linkedin", "instagram"].map(
//                   (platform) => (
//                     <a
//                       key={platform}
//                       href="#"
//                       className="text-blue-600 hover:text-blue-800 transition"
//                     >
//                       <span className="sr-only">{platform}</span>
//                       <i className={`fab fa-${platform} text-xl`}></i>
//                     </a>
//                   )
//                 )}
//               </div>
//             </div>

//             <div>
//               <h4 className="text-lg font-semibold text-blue-800 mb-4">
//                 <TranslatedText>Quick Links</TranslatedText>
//               </h4>
//               <ul className="space-y-2 text-gray-600">
//                 <li>
//                   <Link to={"/"} className="hover:text-blue-700 transition">
//                     <TranslatedText>Home</TranslatedText>
//                   </Link>
//                 </li>
//                 <li>
//                   <Link
//                     to={"/chose-register"}
//                     className="hover:text-blue-700 transition"
//                   >
//                     <TranslatedText>Find Jobs</TranslatedText>
//                   </Link>
//                 </li>
//                 <li>
//                   <Link
//                     to={"/chose-register"}
//                     className="hover:text-blue-700 transition"
//                   >
//                     <TranslatedText>Post a Job</TranslatedText>
//                   </Link>
//                 </li>
//                 <li>
//                   <Link
//                     to={"/about"}
//                     className="hover:text-blue-700 transition"
//                   >
//                     <TranslatedText>About Us</TranslatedText>
//                   </Link>
//                 </li>
//               </ul>
//             </div>

//             <div>
//               <h4 className="text-lg font-semibold text-blue-800 mb-4">
//                 <TranslatedText>Resources</TranslatedText>
//               </h4>
//               <ul className="space-y-2 text-gray-600">
//                 <li>
//                   <a href="#" className="hover:text-blue-700 transition">
//                     <TranslatedText>Job Tips</TranslatedText>
//                   </a>
//                 </li>
//                 <li>
//                   <a href="#" className="hover:text-blue-700 transition">
//                     <TranslatedText>Career Advice</TranslatedText>
//                   </a>
//                 </li>
//                 <li>
//                   <a href="#" className="hover:text-blue-700 transition">
//                     <TranslatedText>FAQs</TranslatedText>
//                   </a>
//                 </li>
//                 <li>
//                   <a href="#" className="hover:text-blue-700 transition">
//                     Support
//                   </a>
//                 </li>
//               </ul>
//             </div>

//             {/* Contact Info */}
//             <div>
//               <h4 className="text-lg font-semibold text-blue-800 mb-4">
//                 <TranslatedText>Contact</TranslatedText>
//               </h4>
//               <p className="text-gray-600">
//                 <TranslatedText>123 Hiring Lane</TranslatedText>
//                 <br />
//                 <TranslatedText>San Francisco, CA 94107</TranslatedText>
//               </p>
//               <p className="mt-2 text-gray-600">
//                 Email:{" "}
//                 <Link
//                   href="mailto:info@jobconnect.com"
//                   className="text-blue-600 hover:underline"
//                 >
//                   info@jobconnect.com
//                 </Link>
//               </p>
//               <p className="text-gray-600">
//                 Phone:{" "}
//                 <Link
//                   href="tel:+11234567890"
//                   className="text-blue-600 hover:underline"
//                 >
//                   +1 (123) 456-7890
//                 </Link>
//               </p>
//             </div>
//           </div>

//           <div className="border-t border-blue-100 pt-6 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
//             <p>
//               <TranslatedText>
//                 © 2025 JobConnect. All rights reserved.
//               </TranslatedText>
//             </p>
//             {/* <div className="flex space-x-6 mt-4 md:mt-0">
//               <a href="#" className="hover:text-blue-600 transition">
//                 Privacy Policy
//               </a>
//               <a href="#" className="hover:text-blue-600 transition">
//                 Terms
//               </a>
//               <a href="#" className="hover:text-blue-600 transition">
//                 Cookies
//               </a>
//             </div> */}
//           </div>
//         </div>
//       </footer>
//     </>
//   );
// }
