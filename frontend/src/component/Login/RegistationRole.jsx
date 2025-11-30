import React from "react";
import {
  FaUser,
  FaBuilding,
  FaArrowRight,
  FaSearch,
  FaBriefcase,
  FaUsers,
  FaChartLine,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import TranslatedText from "../TranslatedText";

export default function RegistrationSelectionPage() {
  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-6">
        <div className="max-w-6xl w-full">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              <TranslatedText>Join Our Platform</TranslatedText>
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              <TranslatedText>
                Choose how you'd like to get started and unlock opportunities
                that match your goals
              </TranslatedText>
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <FaUser className="text-white" size={32} />
              </div>

              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                <TranslatedText>Register as a Job Seeker</TranslatedText>
              </h2>
              <p className="text-gray-600 mb-8 leading-relaxed">
                <TranslatedText>
                  Find your dream job with access to thousands of opportunities.
                  Build your profile, showcase your skills, and connect with top
                  employers.
                </TranslatedText>
              </p>

              <div className="space-y-3 mb-8">
                <div className="flex items-center gap-3">
                  <FaSearch className="text-blue-500" size={18} />
                  <span className="text-gray-700">
                    <TranslatedText>Search thousands of jobs</TranslatedText>
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <FaUser className="text-blue-500" size={18} />
                  <span className="text-gray-700">
                    <TranslatedText>Create professional profile</TranslatedText>
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <FaBriefcase className="text-blue-500" size={18} />
                  <span className="text-gray-700">
                    <TranslatedText>Track applications</TranslatedText>
                  </span>
                </div>
              </div>

              <Link to="/register/job-seeker">
                <button className="cursor-pointer w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-4 px-6 rounded-xl font-semibold flex items-center justify-center gap-2 hover:from-blue-600 hover:to-blue-700 transition-all duration-300 group-hover:scale-105">
                  <TranslatedText>Get Started as Job Seeker</TranslatedText>
                  <FaArrowRight
                    size={20}
                    className="group-hover:translate-x-1 transition-transform duration-300"
                  />
                </button>
              </Link>
            </div>

            <div className=" bg-white rounded-2xl shadow-lg border border-gray-100 p-8 hover:shadow-2xl hover:-translate-y-6 transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <FaBuilding className="text-white" size={32} />
              </div>

              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                <TranslatedText>Register as an Employer</TranslatedText>
              </h2>
              <p className="text-gray-600 mb-8 leading-relaxed">
                <TranslatedText>
                  Find the perfect candidates for your company. Post jobs,
                  manage applications, and build your team with qualified
                  professionals.
                </TranslatedText>
              </p>

              <div className="space-y-3 mb-8">
                <div className="flex items-center gap-3">
                  <FaBriefcase className="text-purple-500" size={18} />
                  <span className="text-gray-700">
                    <TranslatedText>Post unlimited jobs</TranslatedText>
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <FaUsers className="text-purple-500" size={18} />
                  <span className="text-gray-700">
                    <TranslatedText>Access talent database</TranslatedText>
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <FaChartLine className="text-purple-500" size={18} />
                  <span className="text-gray-700">
                    <TranslatedText>Analytics & insights</TranslatedText>
                  </span>
                </div>
              </div>

              <Link to="/register/employer">
                <button className="cursor-pointer w-full bg-gradient-to-r from-purple-500 to-purple-600 text-white py-4 px-6 rounded-xl font-semibold flex items-center justify-center gap-2 hover:from-purple-600 hover:to-purple-700 transition-all duration-300 group-hover:scale-105">
                  <TranslatedText>Get Started as Employer</TranslatedText>
                  <FaArrowRight
                    size={20}
                    className="group-hover:translate-x-1 transition-transform duration-300"
                  />
                </button>
              </Link>
            </div>
          </div>

          <div className="text-center mt-12">
            <p className="text-gray-500">
              <TranslatedText>Already have an account?</TranslatedText>
              <Link
                to="/login"
                className="text-blue-600 hover:text-blue-700 font-medium ml-1 hover:underline"
              >
                <TranslatedText>Sign in here</TranslatedText>
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
