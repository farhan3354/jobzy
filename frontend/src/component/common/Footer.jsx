import React from "react";
import { Link } from "react-router-dom";
import TranslatedText from "../TranslatedText";
import { useLanguage } from "../../context/LanguageContext";
import logo from "../../assets/jobzyworldlogo.jfif";

export default function Footer() {
  const { language } = useLanguage();

  return (
    <>
      <footer className="bg-white text-gray-700 pt-16 mt-12 pb-10 border-t shadow-2xl border-blue-100">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
            <div className="space-y-4">
              <Link to="/" className="flex items-center">
                <img src={logo} className="h-10 w-auto object-contain" alt="Jobzy World Logo" />
              </Link>
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
                © 2025 Jobzy World. All rights reserved.
              </TranslatedText>
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}
