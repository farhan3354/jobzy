import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  FaUser,
  FaUserTimes,
  FaEnvelope,
  FaPhone,
  FaUserShield,
  FaPlus,
  FaCamera,
  FaEdit,
  FaArrowLeft,
} from "react-icons/fa";
import { MdDateRange } from "react-icons/md";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import ChangePassword from "./ChangePassword";

export default function SeeProfile() {
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const token = useSelector((state) => state.auth.token);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get("http://localhost:8000/admin", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProfileData(response.data.profile);
    } catch (error) {
      console.error("Error fetching profile:", error);
      setError("Failed to load profile. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      fetchData();
    } else {
      setLoading(false);
      setError("Authentication required. Please log in.");
    }
  }, [token]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen ">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading your profile...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="max-w-md w-full text-center bg-white p-8 rounded-2xl shadow-lg">
          <div className="mb-6">
            <div className="relative inline-flex">
              <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center">
                <FaUserTimes className="w-10 h-10 text-red-600" />
              </div>
            </div>
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mb-3">
            Error Loading Profile
          </h2>
          <p className="text-gray-600 mb-6">{error}</p>

          <button
            onClick={fetchData}
            className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors mr-4"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (!profileData) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="max-w-md w-full text-center bg-white p-8 rounded-2xl shadow-lg">
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
          <p className="text-gray-600 mb-6">
            It looks like you haven't created your professional profile yet.
            Let's get started and showcase your skills!
          </p>

          <Link
            to="/admin-dashboard/createprofile"
            className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors mb-4"
          >
            <FaPlus className="mr-2" />
            Create Your Profile
          </Link>

          <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-100">
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
              Complete your profile to access all features
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6  min-h-screen">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 border border-gray-100">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
            <h1 className="text-2xl font-bold text-gray-800 mb-4 md:mb-0">
              Admin Profile
            </h1>
            <div className="flex space-x-3">
              <Link
                to="/admin-dashboard/editadmin"
                className="inline-flex items-center px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
              >
                <FaEdit className="mr-2" />
                Edit Profile
              </Link>
              <Link
                to="/admin-dashboard/change-password"
                className="inline-flex items-center px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
              >
                <FaEdit className="mr-2" />
                Change Password
              </Link>
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-start gap-8 mb-10">
            <div className="relative">
              <img
                src={
                  profileData?.profileImage || "https://via.placeholder.com/150"
                }
                alt="Admin Avatar"
                className="w-32 h-32 md:w-36 md:h-36 rounded-full border-4 border-blue-500 shadow-md object-cover"
              />
              <button className="absolute bottom-2 right-2 bg-white shadow-md p-2 rounded-full hover:bg-gray-100 transition">
                <FaCamera className="text-gray-600" />
              </button>
            </div>

            <div className="flex-1">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
                {profileData?.userId?.name || "Admin Name"}
              </h2>
              <p className="mt-2 text-gray-600 italic">
                {profileData?.bio || "No bio provided yet..."}
              </p>
              <p className="mt-1 text-gray-600">
                {profileData?.location || "Location not specified"}
              </p>
            </div>
          </div>

          <div className="border-t border-gray-200 pt-6">
            <h3 className="text-xl md:text-2xl font-semibold mb-6 text-gray-800">
              Personal Information
            </h3>

            <div className="grid md:grid-cols-2 gap-4 md:gap-6">
              <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl hover:shadow transition">
                <div className="p-3 bg-green-100 rounded-full">
                  <FaEnvelope className="text-green-600 text-lg" />
                </div>
                <div>
                  <p className="font-semibold text-gray-700">Email</p>
                  <p className="text-gray-600">
                    {profileData?.userId?.email || "N/A"}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl hover:shadow transition">
                <div className="p-3 bg-purple-100 rounded-full">
                  <FaPhone className="text-purple-600 text-lg" />
                </div>
                <div>
                  <p className="font-semibold text-gray-700">Phone</p>
                  <p className="text-gray-600">
                    {profileData?.userId?.phone || "N/A"}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl hover:shadow transition">
                <div className="p-3 bg-blue-100 rounded-full">
                  <FaUserShield className="text-blue-600 text-lg" />
                </div>
                <div>
                  <p className="font-semibold text-gray-700">Role</p>
                  <p className="text-gray-600">
                    {profileData?.userId?.role || "N/A"}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl hover:shadow transition">
                <div className="p-3 bg-orange-100 rounded-full">
                  <MdDateRange className="text-orange-600 text-lg" />
                </div>
                <div>
                  <p className="font-semibold text-gray-700">Joined</p>
                  <p className="text-gray-600">
                    {profileData?.createdAt
                      ? new Date(profileData.createdAt).toLocaleDateString()
                      : "N/A"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
