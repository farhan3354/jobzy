import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  FaBuilding,
  FaEnvelope,
  FaGlobe,
  FaMapMarkerAlt,
  FaUsers,
  FaRegUserCircle,
  FaUserTimes,
  FaPlus,
  FaLock,
  FaEdit,
  FaIndustry,
  FaInfoCircle,
} from "react-icons/fa";

import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function EmployerProfile() {
  const token = useSelector((state) => state.auth.token);
  const [profile, setProfile] = useState(null);
  const [loading, setloading] = useState(true);
  const fetchprofile = async () => {
    try {
      const repo = await axios.get("http://localhost:8000/getprofileemployer", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProfile(repo.data.user || null);
    } catch (error) {
      console("Server Error", error);
    } finally {
      setloading(false);
    }
  };
  useEffect(() => {
    fetchprofile();
  }, [token]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }
  if (!profile) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="max-w-md w-full text-center">
          <div className="mb-6">
            <div className="relative inline-flex">
              <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center">
                <FaUserTimes className="w-10 h-10 text-blue-600" />
              </div>
            </div>
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mb-3">
            Profile Not Found
          </h2>
          <p className="text-gray-600 mb-8 leading-relaxed">
            It looks like you haven't created your professional profile yet.
            Let's get started and showcase your skills to potential employers!
          </p>

          <Link
            to={"/employer-dashboard/createprofile"}
            className="inline-flex items-center px-6 py-3 text-white font-semibold rounded-xl bg-blue-600"
          >
            <FaPlus />
            Create Your Profile
          </Link>

          <div className="mt-8 p-4 bg-blue-50 rounded-xl border border-blue-100">
            <p className="text-sm text-blue-700 flex items-center justify-center">
              <svg
                className="w-4 h-4 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              Complete your profile to increase your job opportunities
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="min-h-screen p-3 sm:p-4 lg:p-6">
        <div className="max-w-6xl mx-auto space-y-4 sm:space-y-6">
          <div className="bg-white shadow-sm rounded-2xl p-4 sm:p-6 lg:p-8">
            <div className="flex flex-col lg:flex-row items-center gap-4 sm:gap-6 lg:gap-8">
              <div className="flex-shrink-0">
                <img
                  src={profile.companylogo || "https://via.placeholder.com/120"}
                  alt="Company Logo"
                  className="w-20 h-20 sm:w-24 sm:h-24 lg:w-28 lg:h-28 xl:w-32 xl:h-32 rounded-full border-4 border-blue-500 object-cover shadow-md"
                />
              </div>
              <div className="flex-1 text-center lg:text-left space-y-2 sm:space-y-3">
                <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 leading-tight">
                  {profile.companyName || "Company Name"}
                </h1>

                <div className="space-y-1 sm:space-y-2">
                  <p className="text-gray-600 flex items-center justify-center lg:justify-start gap-2 text-sm sm:text-base">
                    <FaEnvelope className="text-blue-500 flex-shrink-0" />
                    <span className="truncate">
                      {profile.userId?.email || "No email provided"}
                    </span>
                  </p>
                  <p className="text-gray-600 flex items-center justify-center lg:justify-start gap-2 text-sm sm:text-base">
                    <FaMapMarkerAlt className="text-blue-500 flex-shrink-0" />
                    <span>{profile.location || "Location not specified"}</span>
                  </p>
                  <p className="text-gray-600 flex items-center justify-center lg:justify-start gap-2 text-sm sm:text-base">
                    <FaRegUserCircle className="text-blue-500 flex-shrink-0" />
                    <span>{profile.userId?.name || "Name not provided"}</span>
                  </p>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row lg:flex-col gap-3 w-full lg:w-auto">
                <Link
                  to="/employer-dashboard/editprofile"
                  className="inline-flex items-center justify-center px-4 py-2.5 bg-blue-600 text-white font-medium rounded-xl hover:bg-blue-700 transition-all duration-200 hover:shadow-lg transform hover:-translate-y-0.5 text-sm sm:text-base whitespace-nowrap"
                >
                  <FaEdit className="mr-2 flex-shrink-0" />
                  Edit Profile
                </Link>
                <Link
                  to="/employer-dashboard/change-password"
                  className="inline-flex items-center justify-center px-4 py-2.5 bg-gray-600 text-white font-medium rounded-xl hover:bg-gray-700 transition-all duration-200 hover:shadow-lg transform hover:-translate-y-0.5 text-sm sm:text-base whitespace-nowrap"
                >
                  <FaLock className="mr-2 flex-shrink-0" />
                  Change Password
                </Link>
              </div>
            </div>
          </div>
          <div className="bg-white shadow-sm rounded-2xl p-4 sm:p-6 lg:p-8">
            <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 mb-4 sm:mb-6 flex items-center">
              <FaBuilding className="text-blue-500 mr-3" />
              Company Information
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              <div className="bg-blue-50 rounded-xl p-4 sm:p-5 border border-blue-100">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <FaIndustry className="text-blue-600 text-lg" />
                  </div>
                  <div>
                    <p className="text-xs sm:text-sm font-medium text-blue-900">
                      Industry
                    </p>
                    <p className="text-sm sm:text-base font-semibold text-gray-900">
                      {profile.industry || "Not specified"}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-green-50 rounded-xl p-4 sm:p-5 border border-green-100">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                    <FaUsers className="text-green-600 text-lg" />
                  </div>
                  <div>
                    <p className="text-xs sm:text-sm font-medium text-green-900">
                      Company Size
                    </p>
                    <p className="text-sm sm:text-base font-semibold text-gray-900">
                      {profile.companysize || "Not specified"} Employees
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-purple-50 rounded-xl p-4 sm:p-5 border border-purple-100 sm:col-span-2 lg:col-span-1">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                    <FaGlobe className="text-purple-600 text-lg" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs sm:text-sm font-medium text-purple-900">
                      Website
                    </p>
                    {profile.companyWebsite ? (
                      <a
                        href={profile.companyWebsite}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm sm:text-base font-semibold text-blue-600 hover:text-blue-800 truncate block hover:underline transition-colors"
                      >
                        {profile.companyWebsite}
                      </a>
                    ) : (
                      <p className="text-sm sm:text-base text-gray-500">
                        Not provided
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white shadow-sm rounded-2xl p-4 sm:p-6 lg:p-8">
            <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 mb-4 sm:mb-6 flex items-center">
              <FaInfoCircle className="text-blue-500 mr-3" />
              About Us
            </h2>

            <div className="bg-gray-50 rounded-xl p-4 sm:p-6 border border-gray-200">
              <p className="text-gray-700 text-sm sm:text-base lg:text-lg leading-relaxed sm:leading-loose">
                {profile.description ? (
                  profile.description
                ) : (
                  <span className="text-gray-500 italic">
                    No company description provided. Add a description to tell
                    candidates more about your company.
                  </span>
                )}
              </p>

              {!profile.description && (
                <div className="mt-4">
                  <Link
                    to="/employer-dashboard/editprofile"
                    className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
                  >
                    <FaEdit className="mr-2" />
                    Add Description
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
