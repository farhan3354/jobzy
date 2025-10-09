import React, { useEffect, useState } from "react";
import { FaUsersLine } from "react-icons/fa6";
import { ImUserCheck } from "react-icons/im";
import { IoBriefcaseSharp } from "react-icons/io5";
import { Link } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";

export default function AdminDashboard() {
  const [data, setData] = useState({
    users: [],
    employer: [],
    jobs: [],
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const token = useSelector((state) => state.auth.token);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const response = await axios.get("http://localhost:8000/alldetails", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.data.success) {
        setData({
          users: response.data.users || [],
          employer: response.data.employer || [],
          jobs: response.data.jobs || [],
        });
      }
    } catch (err) {
      setError("Failed to fetch dashboard data");
      console.error("Error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const stats = [
    {
      title: "Total Employers",
      value: data.employer.length,
      icon: FaUsersLine,
      color: "bg-blue-500",
      to: "manage-employers",
    },
    {
      title: "Total Job Seekers",
      value: data.users.length,
      icon: ImUserCheck,
      color: "bg-green-500",
      to: "manage-users",
    },
    {
      title: "Active Jobs",
      value: data.jobs.length,
      icon: IoBriefcaseSharp,
      color: "bg-purple-500",
      to: "manage-jobs",
    },
  ];

  const latestUsers = [...data.users]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 2);

  const latestEmployers = [...data.employer]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 2);

  const latestJobs = [...data.jobs]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 2);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        <p className="mt-4 text-gray-600">Loading dashboard data...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-64">
        <p className="text-red-500 mb-4">{error}</p>
        <button
          onClick={fetchDashboardData}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <>
      <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
        <div className="max-w-7xl mx-auto space-y-6 sm:space-y-8 lg:space-y-10">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
                Admin Dashboard
              </h1>
              <p className="text-sm sm:text-base text-gray-600">
                Overview of platform statistics and recent activities
              </p>
            </div>
            <button
              onClick={fetchDashboardData}
              className="inline-flex items-center justify-center px-4 sm:px-6 py-2.5 sm:py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-all duration-200 hover:shadow-lg transform hover:-translate-y-0.5 text-sm sm:text-base whitespace-nowrap"
            >
              <svg
                className="w-4 h-4 sm:w-5 sm:h-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                />
              </svg>
              Refresh Data
            </button>
          </div>

          <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5 lg:gap-6">
            {stats.map((stat, index) => (
              <Link
                to={stat.to}
                key={index}
                className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 sm:p-5 lg:p-6 flex items-center space-x-3 sm:space-x-4 hover:shadow-lg hover:border-blue-200 transition-all duration-300 hover:-translate-y-1 group"
              >
                <div
                  className={`${stat.color} p-2 sm:p-3 rounded-xl text-white flex-shrink-0 group-hover:scale-110 transition-transform duration-200`}
                >
                  <stat.icon className="h-5 w-5 sm:h-6 sm:w-6 lg:h-7 lg:w-7" />
                </div>
                <div className="min-w-0 flex-1">
                  <h2 className="text-sm sm:text-base lg:text-lg font-semibold text-gray-700 truncate">
                    {stat.title}
                  </h2>
                  <p className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mt-1">
                    {stat.value}
                  </p>
                </div>
              </Link>
            ))}
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="p-4 sm:p-6 lg:p-8">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 sm:mb-6 gap-3">
                <h2 className="text-lg sm:text-xl lg:text-2xl font-semibold text-gray-900">
                  Latest Job Seekers
                </h2>
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs sm:text-sm font-medium bg-blue-100 text-blue-800">
                  {latestUsers.length} Total New
                </span>
              </div>

              <div className="hidden lg:block overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 lg:px-6 py-3 text-left text-xs lg:text-sm font-medium text-gray-500 uppercase tracking-wider">
                        Name
                      </th>
                      <th className="px-4 lg:px-6 py-3 text-left text-xs lg:text-sm font-medium text-gray-500 uppercase tracking-wider">
                        Email
                      </th>
                      <th className="px-4 lg:px-6 py-3 text-left text-xs lg:text-sm font-medium text-gray-500 uppercase tracking-wider">
                        Skills
                      </th>
                      <th className="px-4 lg:px-6 py-3 text-left text-xs lg:text-sm font-medium text-gray-500 uppercase tracking-wider">
                        Experience
                      </th>
                      <th className="px-4 lg:px-6 py-3 text-left text-xs lg:text-sm font-medium text-gray-500 uppercase tracking-wider">
                        Location
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {latestUsers.map((user) => (
                      <tr
                        key={user._id}
                        className="hover:bg-gray-50 transition-colors duration-150"
                      >
                        <td className="px-4 lg:px-6 py-4 whitespace-nowrap text-sm lg:text-base font-medium text-gray-900">
                          {user?.userId?.name || "N/A"}
                        </td>
                        <td className="px-4 lg:px-6 py-4 whitespace-nowrap text-sm lg:text-base text-gray-500">
                          {user?.userId?.email || "N/A"}
                        </td>
                        <td className="px-4 lg:px-6 py-4 text-sm lg:text-base text-gray-500">
                          <div className="line-clamp-2">
                            {user.seekerskills
                              ? user.seekerskills.slice(0, 3).join(", ")
                              : "N/A"}
                            {user.seekerskills &&
                              user.seekerskills.length > 3 &&
                              "..."}
                          </div>
                        </td>
                        <td className="px-4 lg:px-6 py-4 whitespace-nowrap text-sm lg:text-base text-gray-500">
                          {user.seekerexperience || "0"} years
                        </td>
                        <td className="px-4 lg:px-6 py-4 whitespace-nowrap">
                          <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                            {user.location || "N/A"}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="lg:hidden space-y-4">
                {latestUsers.map((user) => (
                  <div
                    key={user._id}
                    className="bg-gray-50 rounded-xl p-4 border border-gray-200"
                  >
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="text-sm font-semibold text-gray-900">
                          {user?.userId?.name || "N/A"}
                        </h3>
                        <p className="text-xs text-gray-500 mt-1">
                          {user?.userId?.email || "N/A"}
                        </p>
                      </div>
                      <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                        {user.location || "N/A"}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <div>
                        <p className="text-xs text-gray-500">Skills</p>
                        <p className="text-gray-900 line-clamp-2">
                          {user.seekerskills
                            ? user.seekerskills.slice(0, 3).join(", ")
                            : "N/A"}
                          {user.seekerskills &&
                            user.seekerskills.length > 3 &&
                            "..."}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Experience</p>
                        <p className="text-gray-900">
                          {user.seekerexperience || "0"} years
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="p-4 sm:p-6 lg:p-8">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 sm:mb-6 gap-3">
                <h2 className="text-lg sm:text-xl lg:text-2xl font-semibold text-gray-900">
                  Latest Employers
                </h2>
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs sm:text-sm font-medium bg-green-100 text-green-800">
                  {latestEmployers.length} Total New
                </span>
              </div>

              <div className="hidden lg:block overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 lg:px-6 py-3 text-left text-xs lg:text-sm font-medium text-gray-500 uppercase tracking-wider">
                        Name
                      </th>
                      <th className="px-4 lg:px-6 py-3 text-left text-xs lg:text-sm font-medium text-gray-500 uppercase tracking-wider">
                        Email
                      </th>
                      <th className="px-4 lg:px-6 py-3 text-left text-xs lg:text-sm font-medium text-gray-500 uppercase tracking-wider">
                        Industry
                      </th>
                      <th className="px-4 lg:px-6 py-3 text-left text-xs lg:text-sm font-medium text-gray-500 uppercase tracking-wider">
                        Company Name
                      </th>
                      <th className="px-4 lg:px-6 py-3 text-left text-xs lg:text-sm font-medium text-gray-500 uppercase tracking-wider">
                        Company Size
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {latestEmployers.map((employer) => (
                      <tr
                        key={employer._id}
                        className="hover:bg-gray-50 transition-colors duration-150"
                      >
                        <td className="px-4 lg:px-6 py-4 whitespace-nowrap text-sm lg:text-base font-medium text-gray-900">
                          {employer?.userId?.name || "N/A"}
                        </td>
                        <td className="px-4 lg:px-6 py-4 whitespace-nowrap text-sm lg:text-base text-gray-500">
                          {employer?.userId?.email || "N/A"}
                        </td>
                        <td className="px-4 lg:px-6 py-4 whitespace-nowrap text-sm lg:text-base text-gray-500">
                          {employer.industry || "N/A"}
                        </td>
                        <td className="px-4 lg:px-6 py-4 whitespace-nowrap text-sm lg:text-base text-gray-500">
                          {employer.companyName || "N/A"}
                        </td>
                        <td className="px-4 lg:px-6 py-4 whitespace-nowrap">
                          <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                            {employer.companysize || "N/A"}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="lg:hidden space-y-4">
                {latestEmployers.map((employer) => (
                  <div
                    key={employer._id}
                    className="bg-gray-50 rounded-xl p-4 border border-gray-200"
                  >
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="text-sm font-semibold text-gray-900">
                          {employer?.userId?.name || "N/A"}
                        </h3>
                        <p className="text-xs text-gray-500 mt-1">
                          {employer?.userId?.email || "N/A"}
                        </p>
                      </div>
                      <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                        {employer.companysize || "N/A"}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <div>
                        <p className="text-xs text-gray-500">Company</p>
                        <p className="text-gray-900 line-clamp-1">
                          {employer.companyName || "N/A"}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Industry</p>
                        <p className="text-gray-900">
                          {employer.industry || "N/A"}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="p-4 sm:p-6 lg:p-8">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 sm:mb-6 gap-3">
                <h2 className="text-lg sm:text-xl lg:text-2xl font-semibold text-gray-900">
                  Latest Jobs
                </h2>
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs sm:text-sm font-medium bg-purple-100 text-purple-800">
                  {latestJobs.length} Total New
                </span>
              </div>

              <div className="hidden lg:block overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 lg:px-6 py-3 text-left text-xs lg:text-sm font-medium text-gray-500 uppercase tracking-wider">
                        Title
                      </th>
                      <th className="px-4 lg:px-6 py-3 text-left text-xs lg:text-sm font-medium text-gray-500 uppercase tracking-wider">
                        Company
                      </th>
                      <th className="px-4 lg:px-6 py-3 text-left text-xs lg:text-sm font-medium text-gray-500 uppercase tracking-wider">
                        Type
                      </th>
                      <th className="px-4 lg:px-6 py-3 text-left text-xs lg:text-sm font-medium text-gray-500 uppercase tracking-wider">
                        Salary
                      </th>
                      <th className="px-4 lg:px-6 py-3 text-left text-xs lg:text-sm font-medium text-gray-500 uppercase tracking-wider">
                        Applications
                      </th>
                      <th className="px-4 lg:px-6 py-3 text-left text-xs lg:text-sm font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {latestJobs.map((job) => (
                      <tr
                        key={job._id}
                        className="hover:bg-gray-50 transition-colors duration-150"
                      >
                        <td className="px-4 lg:px-6 py-4 whitespace-nowrap text-sm lg:text-base font-medium text-gray-900">
                          {job.jobTitle || "N/A"}
                        </td>
                        <td className="px-4 lg:px-6 py-4 whitespace-nowrap text-sm lg:text-base text-gray-500">
                          {job.companyName || "N/A"}
                        </td>
                        <td className="px-4 lg:px-6 py-4 whitespace-nowrap text-sm lg:text-base text-gray-500">
                          {job.employmentType || "N/A"}
                        </td>
                        <td className="px-4 lg:px-6 py-4 whitespace-nowrap text-sm lg:text-base text-gray-500">
                          {job.salary ? `$${job.salary}` : "Not specified"}
                        </td>
                        <td className="px-4 lg:px-6 py-4 whitespace-nowrap text-sm lg:text-base text-gray-500">
                          {job.applicants ? job.applicants.length : 0}
                        </td>
                        <td className="px-4 lg:px-6 py-4 whitespace-nowrap">
                          <span
                            className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                              job.status
                                ? "bg-green-100 text-green-800"
                                : "bg-red-100 text-red-800"
                            }`}
                          >
                            {job.status ? "Active" : "Closed"}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="lg:hidden space-y-4">
                {latestJobs.map((job) => (
                  <div
                    key={job._id}
                    className="bg-gray-50 rounded-xl p-4 border border-gray-200"
                  >
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex-1 min-w-0">
                        <h3 className="text-sm font-semibold text-gray-900 line-clamp-2">
                          {job.jobTitle || "N/A"}
                        </h3>
                        <p className="text-xs text-gray-500 mt-1">
                          {job.companyName || "N/A"}
                        </p>
                      </div>
                      <span
                        className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full flex-shrink-0 ml-2 ${
                          job.status
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {job.status ? "Active" : "Closed"}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <div>
                        <p className="text-xs text-gray-500">Type</p>
                        <p className="text-gray-900">
                          {job.employmentType || "N/A"}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Salary</p>
                        <p className="text-gray-900">
                          {job.salary ? `$${job.salary}` : "Not specified"}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Applications</p>
                        <p className="text-gray-900">
                          {job.applicants ? job.applicants.length : 0}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
