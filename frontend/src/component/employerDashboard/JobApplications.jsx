import React from "react";
import { Link } from "react-router-dom";
import {
  FiMail,
  FiPhone,
  FiMapPin,
  FiBriefcase,
  FiClock,
  FiUser,
  FiX,
  FiDownload,
} from "react-icons/fi";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

const JobApplications = () => {
  const { id: jobId } = useParams();
  const [applicants, setApplicants] = useState([]);
  const token = useSelector((state) => state.auth.token);
  const [loading, setloading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const applicantsPerPage = 10;

  const indexOfLastApplicant = currentPage * applicantsPerPage;
  const indexOfFirstApplicant = indexOfLastApplicant - applicantsPerPage;
  const currentApplicants = applicants.slice(
    indexOfFirstApplicant,
    indexOfLastApplicant
  );

  const totalPages = Math.ceil(applicants.length / applicantsPerPage);

  useEffect(() => {
    const fetchApplicants = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8000/all-applicant/${jobId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setApplicants(res.data.applicants);
      } catch (err) {
        console.error("Failed to fetch applicants:", err);
      } finally {
        setloading(false);
      }
    };
    window.scrollTo({ top: 0, behavior: "smooth" });

    if (jobId && token) {
      fetchApplicants();
    }
  }, [jobId, token, currentPage]);

  const isSameDay = (d1, d2) =>
    d1.getFullYear() === d2.getFullYear() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getDate() === d2.getDate();

  const today = new Date();

  const todaysApplicants = applicants.filter((applicant) =>
    isSameDay(new Date(applicant.createdAt), today)
  );

  const todaysApplicantsCount = todaysApplicants.length;

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <>
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 py-4 sm:py-6 lg:py-8">
          <div className="mb-6 sm:mb-8 lg:mb-10">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
              Job Applications
            </h1>
            <p className="text-sm sm:text-base lg:text-lg text-gray-600">
              Manage and review all job applications in one place
            </p>
          </div>

          <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6 mb-6 sm:mb-8 lg:mb-10">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 sm:p-5 lg:p-6 hover:shadow-md transition-shadow duration-200">
              <div className="flex items-center">
                <div className="p-2 sm:p-3 rounded-xl bg-blue-100 text-blue-600">
                  <FiUser className="h-4 w-4 sm:h-5 sm:w-5 lg:h-6 lg:w-6" />
                </div>
                <div className="ml-3 sm:ml-4">
                  <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900">
                    {applicants.length}
                  </h2>
                  <p className="text-xs sm:text-sm text-gray-600 mt-1">
                    Total Applicants
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 sm:p-5 lg:p-6 hover:shadow-md transition-shadow duration-200">
              <div className="flex items-center">
                <div className="p-2 sm:p-3 rounded-xl bg-green-100 text-green-600">
                  <FiClock className="h-4 w-4 sm:h-5 sm:w-5 lg:h-6 lg:w-6" />
                </div>
                <div className="ml-3 sm:ml-4">
                  <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900">
                    {todaysApplicantsCount}
                  </h2>
                  <p className="text-xs sm:text-sm text-gray-600 mt-1">
                    New Applications
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 sm:p-5 lg:p-6 hover:shadow-md transition-shadow duration-200">
              <div className="flex items-center">
                <div className="p-2 sm:p-3 rounded-xl bg-yellow-100 text-yellow-600">
                  <FiBriefcase className="h-4 w-4 sm:h-5 sm:w-5 lg:h-6 lg:w-6" />
                </div>
                <div className="ml-3 sm:ml-4">
                  <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900">
                    {applicants.filter((a) => a.status === "Interview").length}
                  </h2>
                  <p className="text-xs sm:text-sm text-gray-600 mt-1">
                    Interview Stage
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 sm:p-5 lg:p-6 hover:shadow-md transition-shadow duration-200">
              <div className="flex items-center">
                <div className="p-2 sm:p-3 rounded-xl bg-red-100 text-red-600">
                  <FiX className="h-4 w-4 sm:h-5 sm:w-5 lg:h-6 lg:w-6" />
                </div>
                <div className="ml-3 sm:ml-4">
                  <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900">
                    {applicants.filter((a) => a.status === "Rejected").length}
                  </h2>
                  <p className="text-xs sm:text-sm text-gray-600 mt-1">
                    Rejected
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="hidden lg:block overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-4 lg:px-6 py-3 lg:py-4 text-left text-xs lg:text-sm font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Applicant
                    </th>
                    <th
                      scope="col"
                      className="px-4 lg:px-6 py-3 lg:py-4 text-left text-xs lg:text-sm font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Applied For
                    </th>
                    <th
                      scope="col"
                      className="px-4 lg:px-6 py-3 lg:py-4 text-left text-xs lg:text-sm font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Status
                    </th>
                    <th
                      scope="col"
                      className="px-4 lg:px-6 py-3 lg:py-4 text-left text-xs lg:text-sm font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Date Applied
                    </th>
                    <th
                      scope="col"
                      className="px-4 lg:px-6 py-3 lg:py-4 text-left text-xs lg:text-sm font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {currentApplicants.map((applicant, index) => (
                    <tr
                      key={index}
                      className="hover:bg-gray-50 transition-colors duration-150"
                    >
                      <td className="px-4 lg:px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10 lg:h-12 lg:w-12">
                            <div className="h-10 w-10 lg:h-12 lg:w-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-medium text-sm lg:text-base">
                              {applicant?.applicantId?.name?.charAt(0) || "U"}
                            </div>
                          </div>
                          <div className="ml-3 lg:ml-4">
                            <div className="text-sm lg:text-base font-medium text-gray-900 line-clamp-1">
                              {applicant?.applicantId?.name || "Unknown"}
                            </div>
                            <div className="text-xs lg:text-sm text-gray-500 line-clamp-1">
                              {applicant?.applicantId?.email || "No email"}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 lg:px-6 py-4 whitespace-nowrap">
                        <div className="text-sm lg:text-base text-gray-900 line-clamp-1">
                          {applicant?.jobId?.jobTitle || "Unknown Job"}
                        </div>
                        <div className="text-xs lg:text-sm text-gray-500">
                          {applicant?.experience || "Experience not specified"}
                        </div>
                      </td>
                      <td className="px-4 lg:px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-2 lg:px-3 py-1 inline-flex text-xs lg:text-sm font-semibold rounded-full
                      ${
                        applicant.status === "New"
                          ? "bg-blue-100 text-blue-800"
                          : ""
                      }
                      ${
                        applicant.status === "Reviewed"
                          ? "bg-green-100 text-green-800"
                          : ""
                      }
                      ${
                        applicant.status === "Interview"
                          ? "bg-yellow-100 text-yellow-800"
                          : ""
                      }
                      ${
                        applicant.status === "Rejected"
                          ? "bg-red-100 text-red-800"
                          : ""
                      }
                    `}
                        >
                          {applicant.status || "Unknown"}
                        </span>
                      </td>
                      <td className="px-4 lg:px-6 py-4 whitespace-nowrap text-sm lg:text-base text-gray-500">
                        {applicant.createdAt
                          ? new Date(applicant.createdAt).toLocaleDateString()
                          : "N/A"}
                      </td>
                      <td className="px-4 lg:px-6 py-4 whitespace-nowrap text-sm lg:text-base font-medium">
                        <div className="flex items-center space-x-3">
                          <Link
                            to={`/employer-dashboard/applicant/${applicant?.applicantId?._id}`}
                            className="text-blue-600 hover:text-blue-900 transition-colors duration-200"
                          >
                            Details
                          </Link>
                          <button className="text-gray-600 hover:text-gray-900 transition-colors duration-200">
                            <FiDownload className="h-4 w-4 lg:h-5 lg:w-5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="lg:hidden">
              {currentApplicants.map((applicant, index) => (
                <div
                  key={index}
                  className="border-b border-gray-200 p-4 sm:p-5 hover:bg-gray-50 transition-colors duration-150"
                >
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex items-center space-x-3">
                      <div className="flex-shrink-0 h-12 w-12">
                        <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-medium text-base">
                          {applicant?.applicantId?.name?.charAt(0) || "U"}
                        </div>
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="text-sm font-medium text-gray-900 line-clamp-1">
                          {applicant?.applicantId?.name || "Unknown"}
                        </div>
                        <div className="text-xs text-gray-500 line-clamp-1">
                          {applicant?.applicantId?.email || "No email"}
                        </div>
                      </div>
                    </div>
                    <span
                      className={`px-2 py-1 inline-flex text-xs font-semibold rounded-full
                  ${
                    applicant.status === "New"
                      ? "bg-blue-100 text-blue-800"
                      : ""
                  }
                  ${
                    applicant.status === "Reviewed"
                      ? "bg-green-100 text-green-800"
                      : ""
                  }
                  ${
                    applicant.status === "Interview"
                      ? "bg-yellow-100 text-yellow-800"
                      : ""
                  }
                  ${
                    applicant.status === "Rejected"
                      ? "bg-red-100 text-red-800"
                      : ""
                  }
                `}
                    >
                      {applicant.status || "Unknown"}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-3 sm:gap-4 mb-3">
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Job Title</p>
                      <p className="text-sm text-gray-900 font-medium line-clamp-2">
                        {applicant?.jobId?.jobTitle || "Unknown Job"}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Experience</p>
                      <p className="text-sm text-gray-900">
                        {applicant?.experience || "Not specified"}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Applied Date</p>
                      <p className="text-sm text-gray-900">
                        {applicant.createdAt
                          ? new Date(applicant.createdAt).toLocaleDateString()
                          : "N/A"}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Location</p>
                      <p className="text-sm text-gray-900 line-clamp-1">
                        {applicant?.location || "Not specified"}
                      </p>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-gray-200 flex justify-between items-center">
                    <Link
                      to={`/employer-dashboard/applicant/${applicant?.applicantId?._id}`}
                      className="inline-flex items-center text-blue-600 hover:text-blue-900 text-sm font-medium transition-colors duration-200"
                    >
                      View Details
                    </Link>
                    <button className="inline-flex items-center text-gray-600 hover:text-gray-900 text-sm transition-colors duration-200">
                      <FiDownload className="h-4 w-4 mr-1" />
                      Resume
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {totalPages > 1 && (
            <div className="flex justify-center mt-6 sm:mt-8 space-x-2 sm:space-x-3">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className={`px-3 sm:px-4 py-2 border rounded-lg text-sm sm:text-base font-medium transition-colors duration-200 ${
                  currentPage === 1
                    ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                    : "bg-white text-gray-700 hover:bg-gray-50 border-gray-300"
                }`}
              >
                Previous
              </button>

              {[...Array(totalPages)].map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentPage(index + 1)}
                  className={`px-3 sm:px-4 py-2 border rounded-lg text-sm sm:text-base font-medium transition-colors duration-200 ${
                    currentPage === index + 1
                      ? "bg-blue-600 text-white border-blue-600"
                      : "bg-white text-gray-700 hover:bg-gray-50 border-gray-300"
                  }`}
                >
                  {index + 1}
                </button>
              ))}

              <button
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
                disabled={currentPage === totalPages}
                className={`px-3 sm:px-4 py-2 border rounded-lg text-sm sm:text-base font-medium transition-colors duration-200 ${
                  currentPage === totalPages
                    ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                    : "bg-white text-gray-700 hover:bg-gray-50 border-gray-300"
                }`}
              >
                Next
              </button>
            </div>
          )}

          {currentApplicants.length === 0 && (
            <div className="text-center py-12 sm:py-16 lg:py-20">
              <div className="max-w-md mx-auto">
                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FiUser className="h-8 w-8 sm:h-10 sm:w-10 text-gray-400" />
                </div>
                <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">
                  No Applications Found
                </h3>
                <p className="text-gray-500 text-sm sm:text-base mb-6">
                  There are no job applications to display at the moment.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default JobApplications;
