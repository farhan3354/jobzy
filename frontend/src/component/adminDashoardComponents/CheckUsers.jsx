import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaSearch, FaEdit, FaFilter, FaPlus, FaSort } from "react-icons/fa";
import { IoIosEye } from "react-icons/io";
import { LuTrash2 } from "react-icons/lu";
import {
  RiUserSearchLine,
  RiUserFollowLine,
  RiUserUnfollowLine,
} from "react-icons/ri";
import { useSelector } from "react-redux";

const CheckUsers = () => {
  const [search, setSearch] = useState("");
  // const [user, setuser] = useState([]);
  const token = useSelector((state) => state.auth.token);
  const [profile, setprofile] = useState([]);
  const fetchjobseeker = async () => {
    try {
      const respo = await axios("http://localhost:8000/getuser", {
        headers: { Authorization: `Bearer ${token}` },
      });
      // setuser(respo.data.users || null);
      setprofile(respo.data.profile || null);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchjobseeker();
  }, [token]);
  // const filteredUsers = users;

  return (
    <>
      <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6 sm:mb-8">
            <div className="flex items-center mb-4 lg:mb-0">
              <div className="bg-blue-100 p-2 sm:p-3 rounded-lg mr-3 sm:mr-4">
                <RiUserSearchLine className="text-blue-600 text-lg sm:text-xl lg:text-2xl" />
              </div>
              <div>
                <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-1">
                  User Management
                </h1>
                <p className="text-gray-500 text-sm sm:text-base">
                  Manage and monitor user accounts
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 sm:p-6 mb-4 sm:mb-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 sm:gap-4">
              <div className="relative flex-1">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaSearch className="text-gray-400 h-4 w-4" />
                </div>
                <input
                  type="text"
                  placeholder="Search users by name or email..."
                  className="pl-10 pr-4 py-2 sm:py-3 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="hidden lg:block overflow-x-auto">
              <table className="min-w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 lg:px-6 py-3 lg:py-4 text-left text-xs lg:text-sm font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors">
                      <div className="flex items-center">
                        User
                        <FaSort className="ml-1 lg:ml-2 text-gray-400 h-3 w-3" />
                      </div>
                    </th>
                    <th className="px-4 lg:px-6 py-3 lg:py-4 text-left text-xs lg:text-sm font-medium text-gray-500 uppercase tracking-wider">
                      Role
                    </th>
                    <th className="px-4 lg:px-6 py-3 lg:py-4 text-left text-xs lg:text-sm font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors">
                      <div className="flex items-center">
                        Join Date
                        <FaSort className="ml-1 lg:ml-2 text-gray-400 h-3 w-3" />
                      </div>
                    </th>
                    <th className="px-4 lg:px-6 py-3 lg:py-4 text-left text-xs lg:text-sm font-medium text-gray-500 uppercase tracking-wider">
                      Phone
                    </th>
                    <th className="px-4 lg:px-6 py-3 lg:py-4 text-left text-xs lg:text-sm font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors">
                      <div className="flex items-center">
                        Status
                        <FaSort className="ml-1 lg:ml-2 text-gray-400 h-3 w-3" />
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {profile.length > 0 ? (
                    profile.map((user) => (
                      <tr
                        key={user.id}
                        className="hover:bg-gray-50 transition-colors duration-150"
                      >
                        <td className="px-4 lg:px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-10 w-10 lg:h-12 lg:w-12 bg-blue-100 rounded-full flex items-center justify-center">
                              <span className="text-blue-600 font-medium text-sm lg:text-base">
                                {user?.userId?.name?.charAt(0) || "U"}
                              </span>
                            </div>
                            <div className="ml-3 lg:ml-4 min-w-0">
                              <div className="font-medium text-gray-900 text-sm lg:text-base line-clamp-1">
                                {user?.userId?.name || "Unknown User"}
                              </div>
                              <div className="text-gray-500 text-xs lg:text-sm line-clamp-1">
                                {user?.userId?.email || "No email"}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 lg:px-6 py-4 whitespace-nowrap">
                          <span
                            className={`px-2 lg:px-3 py-1 text-xs lg:text-sm font-medium rounded-full ${
                              user?.userId?.role === "Job Seeker"
                                ? "bg-purple-100 text-purple-800"
                                : user?.userId?.role === "Employer"
                                ? "bg-green-100 text-green-800"
                                : "bg-gray-100 text-gray-800"
                            }`}
                          >
                            {user?.userId?.role || "Unknown"}
                          </span>
                        </td>
                        <td className="px-4 lg:px-6 py-4 whitespace-nowrap text-gray-500 text-sm lg:text-base">
                          {user?.userId?.createdAt
                            ? new Date(
                                user.userId.createdAt
                              ).toLocaleDateString()
                            : "N/A"}
                        </td>
                        <td className="px-4 lg:px-6 py-4 whitespace-nowrap text-gray-500 text-sm lg:text-base">
                          {user?.userId?.phone || "N/A"}
                        </td>
                        <td className="px-4 lg:px-6 py-4 whitespace-nowrap">
                          <span
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              user?.userId?.status === "Active"
                                ? "bg-green-100 text-green-800"
                                : "bg-red-100 text-red-800"
                            }`}
                          >
                            {user?.location || "N/A"}
                          </span>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan="5"
                        className="px-6 py-12 lg:py-16 text-center"
                      >
                        <div className="flex flex-col items-center justify-center">
                          <RiUserSearchLine className="text-gray-300 text-4xl lg:text-5xl mb-3 lg:mb-4" />
                          <h3 className="text-lg lg:text-xl font-medium text-gray-700 mb-2">
                            No users found
                          </h3>
                          <p className="text-gray-500 text-sm lg:text-base max-w-md">
                            Try adjusting your search or filter to find what
                            you're looking for.
                          </p>
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            <div className="lg:hidden">
              {profile.length > 0 ? (
                profile.map((user) => (
                  <div
                    key={user.id}
                    className="border-b border-gray-200 p-4 sm:p-5 hover:bg-gray-50 transition-colors duration-150"
                  >
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex items-center space-x-3">
                        <div className="flex-shrink-0 h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center">
                          <span className="text-blue-600 font-medium text-base">
                            {user?.userId?.name?.charAt(0) || "U"}
                          </span>
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="font-medium text-gray-900 text-sm line-clamp-1">
                            {user?.userId?.name || "Unknown User"}
                          </div>
                          <div className="text-gray-500 text-xs line-clamp-1">
                            {user?.userId?.email || "No email"}
                          </div>
                        </div>
                      </div>
                      <span
                        className={`px-2 py-1 text-xs font-medium rounded-full flex-shrink-0 ${
                          user?.userId?.role === "Job Seeker"
                            ? "bg-purple-100 text-purple-800"
                            : user?.userId?.role === "Employer"
                            ? "bg-green-100 text-green-800"
                            : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {user?.userId?.role || "Unknown"}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <div>
                        <p className="text-xs text-gray-500 mb-1">Join Date</p>
                        <p className="text-gray-900">
                          {user?.userId?.createdAt
                            ? new Date(
                                user.userId.createdAt
                              ).toLocaleDateString()
                            : "N/A"}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 mb-1">Phone</p>
                        <p className="text-gray-900">
                          {user?.userId?.phone || "N/A"}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 mb-1">Location</p>
                        <p className="text-gray-900 line-clamp-1">
                          {user?.location || "N/A"}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 mb-1">Status</p>
                        <span
                          className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                            user?.userId?.status === "Active"
                              ? "bg-green-100 text-green-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {user?.userId?.status || "Unknown"}
                        </span>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-8 sm:p-12 text-center">
                  <div className="flex flex-col items-center justify-center">
                    <RiUserSearchLine className="text-gray-300 text-4xl mb-3" />
                    <h3 className="text-lg font-medium text-gray-700 mb-2">
                      No users found
                    </h3>
                    <p className="text-gray-500 text-sm max-w-md">
                      Try adjusting your search or filter to find what you're
                      looking for.
                    </p>
                  </div>
                </div>
              )}
            </div>

            {profile.length > 0 && (
              <div className="px-4 sm:px-6 py-3 sm:py-4 bg-gray-50 border-t border-gray-200 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <div className="text-sm text-gray-700 text-center sm:text-left">
                  Showing <span className="font-medium">1</span> to{" "}
                  <span className="font-medium">{profile.length}</span> of{" "}
                  <span className="font-medium">{profile.length}</span> results
                </div>
                <div className="flex justify-center sm:justify-end space-x-2">
                  <button className="px-3 py-1.5 sm:px-4 sm:py-2 rounded-md border border-gray-300 bg-white text-sm text-gray-700 hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
                    Previous
                  </button>
                  <button className="px-3 py-1.5 sm:px-4 sm:py-2 rounded-md border border-gray-300 bg-blue-50 text-blue-600 text-sm font-medium">
                    1
                  </button>
                  <button className="px-3 py-1.5 sm:px-4 sm:py-2 rounded-md border border-gray-300 bg-white text-sm text-gray-700 hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
                    Next
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default CheckUsers;
