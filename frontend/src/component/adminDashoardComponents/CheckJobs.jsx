import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  FaEye,
  FaEdit,
  FaTrash,
  FaBriefcase,
  FaCheckCircle,
  FaTimesCircle,
  FaSearch,
  FaPlus,
  FaSort,
  FaEllipsisV,
} from "react-icons/fa";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";

export default function CheckJobs() {
  const [jobs, setJobs] = useState([]);
  const [showOptions, setShowOptions] = useState(null);

  const token = useSelector((state) => state.auth.token);
  const fetchadminjobs = async () => {
    try {
      const respo = await axios.get("http://localhost:8000/getalljobs", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setJobs(respo.data.jobs || null);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchadminjobs();
  }, [token]);

  const [searchTerm, setSearchTerm] = useState("");

  const handledelete = async (jobId) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        const response = await axios.delete(
          `http://localhost:8000/remove/${jobId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        if (response.data.success) {
          Swal.fire("Deleted!", "Job has been deleted.", "success");
          setJobs(jobs.filter((job) => job._id !== jobId));
        }
      } catch (error) {
        Swal.fire("Error!", "Failed to delete job.", error);
      }
    }
  };

  const handleStatusChange = async (jobId, status) => {
    try {
      const res = await axios.put(
        `http://localhost:8000/update-job-status/${jobId}`,
        { status },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (res.data.success) {
        setJobs(
          jobs.map((job) => (job._id === jobId ? { ...job, status } : job))
        );
        Swal.fire("Updated!", `Job set to ${status}.`, "success");
      }
    } catch (error) {
      Swal.fire("Error!", "Failed to update status.", error);
    } finally {
      setShowOptions(null);
    }
  };

  return (
    <>
      <div className="min-h-screen bg-gray-50 p-3 sm:p-4 lg:p-6">
        <div className="max-w-7xl mx-auto">
          {/* Header Section */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6 sm:mb-8">
            <div className="flex items-center mb-4 lg:mb-0">
              <div className="bg-blue-100 p-2 sm:p-3 rounded-lg mr-3 sm:mr-4">
                <FaBriefcase className="text-blue-600 text-lg sm:text-xl lg:text-2xl" />
              </div>
              <div>
                <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-1">
                  Manage Jobs
                </h1>
                <p className="text-gray-500 text-sm sm:text-base">
                  View and manage your job postings
                </p>
              </div>
            </div>
          </div>

          {/* Search Section */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 sm:p-5 mb-4 sm:mb-6">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaSearch className="text-gray-400 h-4 w-4" />
              </div>
              <input
                type="text"
                placeholder="Search jobs or employers..."
                className="pl-10 pr-4 py-2 sm:py-3 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          {/* Jobs Table/Cards */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            {/* Desktop Table */}
            <div className="hidden lg:block overflow-x-auto">
              <table className="min-w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 lg:px-6 py-3 lg:py-4 text-left text-xs lg:text-sm font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors">
                      <div className="flex items-center">
                        Job Title
                        <FaSort className="ml-1 lg:ml-2 text-gray-400 h-3 w-3" />
                      </div>
                    </th>
                    <th className="px-4 lg:px-6 py-3 lg:py-4 text-left text-xs lg:text-sm font-medium text-gray-500 uppercase tracking-wider">
                      Employer
                    </th>
                    <th className="px-4 lg:px-6 py-3 lg:py-4 text-left text-xs lg:text-sm font-medium text-gray-500 uppercase tracking-wider">
                      Category
                    </th>
                    <th className="px-4 lg:px-6 py-3 lg:py-4 text-left text-xs lg:text-sm font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors">
                      <div className="flex items-center">
                        Posted On
                        <FaSort className="ml-1 lg:ml-2 text-gray-400 h-3 w-3" />
                      </div>
                    </th>
                    <th className="px-4 lg:px-6 py-3 lg:py-4 text-left text-xs lg:text-sm font-medium text-gray-500 uppercase tracking-wider">
                      Stats
                    </th>
                    <th className="px-4 lg:px-6 py-3 lg:py-4 text-left text-xs lg:text-sm font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors">
                      <div className="flex items-center">
                        Status
                        <FaSort className="ml-1 lg:ml-2 text-gray-400 h-3 w-3" />
                      </div>
                    </th>
                    <th className="px-4 lg:px-6 py-3 lg:py-4 text-right text-xs lg:text-sm font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {jobs.length > 0 ? (
                    jobs.map((job) => (
                      <tr
                        key={job._id}
                        className="hover:bg-gray-50 transition-colors duration-150"
                      >
                        <td className="px-4 lg:px-6 py-4 whitespace-nowrap">
                          <div className="font-medium text-gray-900 text-sm lg:text-base line-clamp-2">
                            {job.jobTitle}
                          </div>
                        </td>
                        <td className="px-4 lg:px-6 py-4 whitespace-nowrap">
                          <div className="text-gray-700 text-sm lg:text-base">
                            {job?.postedBy?.name || "Unknown Employer"}
                          </div>
                        </td>
                        <td className="px-4 lg:px-6 py-4 whitespace-nowrap">
                          <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
                            {job.industry || "N/A"}
                          </span>
                        </td>
                        <td className="px-4 lg:px-6 py-4 whitespace-nowrap text-gray-500 text-sm lg:text-base">
                          {job.createdAt
                            ? new Date(job.createdAt).toLocaleDateString()
                            : "N/A"}
                        </td>
                        <td className="px-4 lg:px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex items-center text-xs lg:text-sm text-gray-500">
                              <span className="mr-1">👤</span>
                              {job.applicants?.length || 0}
                            </div>
                          </div>
                        </td>
                        <td className="px-4 lg:px-6 py-4 whitespace-nowrap">
                          {job.status === "Active" ? (
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                              <FaCheckCircle className="mr-1 h-3 w-3" /> Active
                            </span>
                          ) : (
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                              <FaTimesCircle className="mr-1 h-3 w-3" />{" "}
                              Inactive
                            </span>
                          )}
                        </td>
                        <td className="px-4 lg:px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <div className="flex items-center justify-end space-x-2 lg:space-x-3">
                            <div className="relative inline-block">
                              <button
                                onClick={() =>
                                  setShowOptions(
                                    showOptions === job._id ? null : job._id
                                  )
                                }
                                className="p-2 bg-blue-100 rounded-full text-blue-600 hover:bg-blue-200 transition-colors duration-200"
                              >
                                <FaEdit className="h-3 w-3 lg:h-4 lg:w-4" />
                              </button>

                              {showOptions === job._id && (
                                <div className="absolute right-0 mt-2 w-32 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                                  <button
                                    className="block w-full px-4 py-2 text-left text-sm text-green-600 hover:bg-gray-100 transition-colors"
                                    onClick={() =>
                                      handleStatusChange(job._id, "Active")
                                    }
                                  >
                                    Active
                                  </button>
                                  <button
                                    className="block w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-gray-100 transition-colors"
                                    onClick={() =>
                                      handleStatusChange(job._id, "Inactive")
                                    }
                                  >
                                    Inactive
                                  </button>
                                </div>
                              )}
                            </div>
                            <button
                              className="text-red-600 hover:text-red-900 p-2 rounded-full hover:bg-red-50 transition-colors duration-200"
                              title="Delete"
                              onClick={() => handledelete(job._id)}
                            >
                              <FaTrash className="h-3 w-3 lg:h-4 lg:w-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan="7"
                        className="px-6 py-12 lg:py-16 text-center"
                      >
                        <div className="flex flex-col items-center justify-center">
                          <FaBriefcase className="text-gray-300 text-4xl lg:text-5xl mb-3 lg:mb-4" />
                          <h3 className="text-lg lg:text-xl font-medium text-gray-700 mb-2">
                            No jobs found
                          </h3>
                          <p className="text-gray-500 text-sm lg:text-base max-w-md">
                            Try adjusting your search to find what you're
                            looking for.
                          </p>
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Mobile Cards */}
            <div className="lg:hidden">
              {jobs.length > 0 ? (
                jobs.map((job) => (
                  <div
                    key={job._id}
                    className="border-b border-gray-200 p-4 sm:p-5 hover:bg-gray-50 transition-colors duration-150"
                  >
                    {/* Header with Job Title and Status */}
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium text-gray-900 text-sm line-clamp-2 mb-1">
                          {job.jobTitle}
                        </h3>
                        <p className="text-gray-500 text-xs">
                          {job?.postedBy?.name || "Unknown Employer"}
                        </p>
                      </div>
                      {job.status === "Active" ? (
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 flex-shrink-0 ml-2">
                          <FaCheckCircle className="mr-1 h-3 w-3" /> Active
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800 flex-shrink-0 ml-2">
                          <FaTimesCircle className="mr-1 h-3 w-3" /> Inactive
                        </span>
                      )}
                    </div>

                    {/* Job Details Grid */}
                    <div className="grid grid-cols-2 gap-3 text-sm mb-4">
                      <div>
                        <p className="text-xs text-gray-500 mb-1">Category</p>
                        <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
                          {job.industry || "N/A"}
                        </span>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 mb-1">Posted On</p>
                        <p className="text-gray-900">
                          {job.createdAt
                            ? new Date(job.createdAt).toLocaleDateString()
                            : "N/A"}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 mb-1">Applicants</p>
                        <div className="flex items-center text-gray-900">
                          <span className="mr-1">👤</span>
                          {job.applicants?.length || 0}
                        </div>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex justify-between items-center pt-3 border-t border-gray-200">
                      <div className="relative">
                        <button
                          onClick={() =>
                            setShowOptions(
                              showOptions === job._id ? null : job._id
                            )
                          }
                          className="inline-flex items-center px-3 py-1.5 bg-blue-100 text-blue-600 rounded-lg text-sm font-medium hover:bg-blue-200 transition-colors duration-200"
                        >
                          <FaEdit className="mr-1 h-3 w-3" />
                          Status
                        </button>

                        {showOptions === job._id && (
                          <div className="absolute left-0 mt-2 w-32 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                            <button
                              className="block w-full px-4 py-2 text-left text-sm text-green-600 hover:bg-gray-100 transition-colors"
                              onClick={() =>
                                handleStatusChange(job._id, "Active")
                              }
                            >
                              Active
                            </button>
                            <button
                              className="block w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-gray-100 transition-colors"
                              onClick={() =>
                                handleStatusChange(job._id, "Inactive")
                              }
                            >
                              Inactive
                            </button>
                          </div>
                        )}
                      </div>
                      <button
                        className="inline-flex items-center px-3 py-1.5 bg-red-100 text-red-600 rounded-lg text-sm font-medium hover:bg-red-200 transition-colors duration-200"
                        onClick={() => handledelete(job._id)}
                      >
                        <FaTrash className="mr-1 h-3 w-3" />
                        Delete
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-8 sm:p-12 text-center">
                  <div className="flex flex-col items-center justify-center">
                    <FaBriefcase className="text-gray-300 text-4xl mb-3" />
                    <h3 className="text-lg font-medium text-gray-700 mb-2">
                      No jobs found
                    </h3>
                    <p className="text-gray-500 text-sm max-w-md">
                      Try adjusting your search to find what you're looking for.
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Pagination */}
            {jobs.length > 0 && (
              <div className="px-4 sm:px-6 py-3 sm:py-4 bg-gray-50 border-t border-gray-200 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <div className="text-sm text-gray-700 text-center sm:text-left">
                  Showing <span className="font-medium">1</span> to{" "}
                  <span className="font-medium">{jobs.length}</span> of{" "}
                  <span className="font-medium">{jobs.length}</span> results
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
}
