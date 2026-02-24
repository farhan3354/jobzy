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
import api from "../../api/register";

export default function EmployerProfile() {
  const token = useSelector((state) => state.auth.token);
  const [profile, setProfile] = useState(null);
  const [loading, setloading] = useState(true);

  const fetchprofile = async () => {
    try {
      const repo = await api.get("/getprofileemployer", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProfile(repo.data.user || null);
    } catch (error) {
      console.error("Server Error", error);
    } finally {
      setloading(false);
    }
  };

  useEffect(() => {
    fetchprofile();
  }, [token]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-transparent">
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
            Tell us about your company to start posting jobs!
          </p>

          <Link
            to={"/employer-dashboard/createprofile"}
            className="inline-flex items-center px-8 py-3 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 shadow-md transition-all active:scale-95"
          >
            <FaPlus className="mr-2" />
            Create Your Profile
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-transparent p-3 sm:p-4 lg:p-6 animate-slide-up">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header Profile Card */}
        <div className="bg-white shadow-2xl rounded-2xl p-6 sm:p-8 lg:p-10 border border-gray-100">
          <div className="flex flex-col lg:flex-row items-center gap-6 sm:gap-8 lg:gap-10">
            <div className="flex-shrink-0 relative group">
              <img
                src={profile.companylogo || "https://via.placeholder.com/120"}
                alt="Company Logo"
                className="w-24 h-24 sm:w-28 sm:h-28 lg:w-32 lg:h-32 xl:w-40 xl:h-40 rounded-full border-4 border-blue-100 object-cover shadow-xl transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 rounded-full border-2 border-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 scale-110"></div>
            </div>
            
            <div className="flex-1 text-center lg:text-left space-y-4">
              <div>
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-gray-900 leading-tight">
                  {profile.companyName || "Company Name"}
                </h1>
                <p className="text-blue-600 font-semibold tracking-wide uppercase text-xs mt-1">Professional Employer</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-2xl mx-auto lg:mx-0">
                <div className="flex items-center justify-center lg:justify-start gap-3 text-gray-600 bg-gray-50 px-4 py-2 rounded-xl border border-gray-100">
                  <FaEnvelope className="text-blue-500 flex-shrink-0" />
                  <span className="truncate text-sm font-medium">
                    {profile.userId?.email || "No email provided"}
                  </span>
                </div>
                <div className="flex items-center justify-center lg:justify-start gap-3 text-gray-600 bg-gray-50 px-4 py-2 rounded-xl border border-gray-100">
                  <FaMapMarkerAlt className="text-blue-500 flex-shrink-0" />
                  <span className="text-sm font-medium">{profile.location || "Location not specified"}</span>
                </div>
                <div className="flex items-center justify-center lg:justify-start gap-3 text-gray-600 bg-gray-50 px-4 py-2 rounded-xl border border-gray-100">
                  <FaRegUserCircle className="text-blue-500 flex-shrink-0" />
                  <span className="text-sm font-medium">{profile.userId?.name || "Name not provided"}</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row lg:flex-col gap-4 w-full lg:w-auto pt-4 lg:pt-0">
              <Link
                to="/employer-dashboard/editprofile"
                className="flex-1 inline-flex items-center justify-center px-6 py-3 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 shadow-md hover:shadow-lg transition-all duration-200 active:scale-95 whitespace-nowrap"
              >
                <FaEdit className="mr-2 flex-shrink-0" />
                Edit Profile
              </Link>
              <Link
                to="/employer-dashboard/change-password"
                className="flex-1 inline-flex items-center justify-center px-6 py-3 border-2 border-gray-100 text-gray-700 font-bold rounded-xl hover:bg-gray-50 hover:border-gray-200 transition-all duration-200 active:scale-95 whitespace-nowrap"
              >
                <FaLock className="mr-2 flex-shrink-0" />
                Security
              </Link>
            </div>
          </div>
        </div>

        {/* Details Sections */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Company Info Card */}
          <div className="lg:col-span-2 bg-white shadow-2xl rounded-2xl p-6 sm:p-8 lg:p-10 border border-gray-100">
            <h2 className="text-xl sm:text-2xl font-extrabold text-gray-900 mb-8 flex items-center">
              <span className="w-10 h-10 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center mr-4">
                <FaBuilding />
              </span>
              Company Details
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="bg-blue-50 rounded-2xl p-5 border border-blue-100 flex items-center gap-4 group hover:bg-blue-100 transition-colors duration-300">
                <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center transform group-hover:scale-110 transition-transform">
                  <FaIndustry className="text-blue-600 text-xl" />
                </div>
                <div>
                  <p className="text-xs font-bold text-blue-900 uppercase tracking-wider">Industry</p>
                  <p className="text-gray-900 font-bold">{profile.industry || "Not specified"}</p>
                </div>
              </div>

              <div className="bg-green-50 rounded-2xl p-5 border border-green-100 flex items-center gap-4 group hover:bg-green-100 transition-colors duration-300">
                <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center transform group-hover:scale-110 transition-transform">
                  <FaUsers className="text-green-600 text-xl" />
                </div>
                <div>
                  <p className="text-xs font-bold text-green-900 uppercase tracking-wider">Company Size</p>
                  <p className="text-gray-900 font-bold">{profile.companysize || "Not specified"}</p>
                </div>
              </div>

              <div className="sm:col-span-2 bg-purple-50 rounded-2xl p-5 border border-purple-100 flex items-center gap-4 group hover:bg-purple-100 transition-colors duration-300">
                <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center transform group-hover:scale-110 transition-transform">
                  <FaGlobe className="text-purple-600 text-xl" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-bold text-purple-900 uppercase tracking-wider">Official Website</p>
                  {profile.companyWebsite ? (
                    <a
                      href={profile.companyWebsite}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 font-bold hover:underline truncate block transition-colors"
                    >
                      {profile.companyWebsite}
                    </a>
                  ) : (
                    <p className="text-gray-500 italic">Not provided</p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* About Us Card */}
          <div className="bg-white shadow-2xl rounded-2xl p-6 sm:p-8 lg:p-10 border border-gray-100 h-full flex flex-col">
            <h2 className="text-xl sm:text-2xl font-extrabold text-gray-900 mb-8 flex items-center">
              <span className="w-10 h-10 bg-indigo-100 text-indigo-600 rounded-lg flex items-center justify-center mr-4">
                <FaInfoCircle />
              </span>
              About Us
            </h2>

            <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100 flex-1 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-100/20 rounded-full -mr-16 -mt-16 group-hover:scale-110 transition-transform duration-500"></div>
              <p className="text-gray-700 leading-relaxed relative z-10 whitespace-pre-wrap italic">
                {profile.description ? (
                  `"${profile.description}"`
                ) : (
                  <span className="text-gray-400">
                    No company description provided yet. Sharing your story helps attract the right talent!
                  </span>
                )}
              </p>

              {!profile.description && (
                <div className="mt-8 relative z-10">
                  <Link
                    to="/employer-dashboard/editprofile"
                    className="inline-flex items-center px-5 py-2.5 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 shadow-md transition-all active:scale-95 text-sm"
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
    </div>
  );
}
