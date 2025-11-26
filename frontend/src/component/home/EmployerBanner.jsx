import React from "react";
import { Link } from "react-router-dom";
import { FaUserTie } from "react-icons/fa"; // Employer icon
import TranslatedText from "../TranslatedText";

const EmployerBanner = () => {
  return (
    <section className="text-gray-600 rounded-2xl shadow-lg my-12 bg-white">
      <div className="max-w-7xl mx-auto px-6 py-16 flex flex-col md:flex-row items-center justify-between">
        <div className="md:w-2/3">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
            <TranslatedText>Are you an Employer?</TranslatedText>
          </h2>
          <p className="text-lg text-blue-700 mb-6">
            <TranslatedText>
              Create your free employer account today and start posting jobs to
              hire top talent. Reach thousands of job seekers instantly.
            </TranslatedText>
          </p>
          <Link
            to="/register/employer"
            className="bg-blue-700 text-white font-semibold px-6 py-3 rounded-xl shadow hover:bg-black transition"
          >
            <TranslatedText>Create Employer Account</TranslatedText>
          </Link>
        </div>

        <div className="mt-8 md:mt-0 md:w-1/3 flex justify-center">
          <div className="bg-blue-100 p-8 rounded-full shadow-lg">
            <FaUserTie className="text-blue-700 w-24 h-24" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default EmployerBanner;
