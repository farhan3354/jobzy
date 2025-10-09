import React, { useEffect, useState } from "react";
import {
  FaSearch,
  FaBriefcase,
  FaMapMarkerAlt,
  FaCalendarAlt,
} from "react-icons/fa";
import axios from "axios";
import { useSelector } from "react-redux";

export default function AppliedAllJobs() {
  const [appliedJobs, setappliedjobs] = useState([]);
  const [loading, setloading] = useState(true);
  const token = useSelector((state) => state.auth.token);

  const fetchaplliedjobs = async () => {
    try {
      const repos = await axios.get("http://localhost:8000/details", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setappliedjobs(repos.data.applications || null);
    } catch (error) {
      console.log(error);
    } finally {
      setloading(false);
    }
  };
  useEffect(() => {
    fetchaplliedjobs();
  }, [token]);
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!appliedJobs || appliedJobs.length === 0) {
    return (
      <div className="text-center py-10">
        <h3 className="text-xl font-semibold text-gray-700">
          No applied jobs found
        </h3>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Applied Jobs</h1>
        <p className="text-gray-600">
          Track all the jobs you've applied to and their current status
        </p>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaSearch className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search jobs or companies..."
              className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Status Filter */}
          <div>
            <select className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option value="all">All Statuses</option>
              <option value="applied">Applied</option>
              <option value="interview">Interview</option>
              <option value="offer">Offer</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>

          {/* Job Type Filter */}
          <div>
            <select className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option value="all">All Types</option>
              <option value="Full-time">Full-time</option>
              <option value="Part-time">Part-time</option>
              <option value="Contract">Contract</option>
              <option value="Internship">Internship</option>
            </select>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        {appliedJobs.map((job) => (
          <div
            key={job._id}
            className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow duration-300"
          >
            <div className="p-6">
              <div className="flex flex-col md:flex-row md:justify-between md:items-start">
                <div className="mb-4 md:mb-0">
                  <h3 className="text-xl font-semibold text-gray-800 mb-1">
                    {job?.jobId.jobTitle}
                  </h3>
                  <p className="text-gray-600 mb-2">{job?.jobId.companyName}</p>

                  <div className="flex flex-wrap items-center gap-4 mt-3">
                    <div className="flex items-center text-gray-600">
                      <FaBriefcase className="mr-2 text-blue-500" />
                      <span>{job?.jobId.employmentType}</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <FaMapMarkerAlt className="mr-2 text-blue-500" />
                      <span>{job?.jobId.location}</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <FaCalendarAlt className="mr-2 text-blue-500" />
                      <span>
                        Applied on{" "}
                        {new Date(job?.jobId.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col items-start md:items-end">
                  <p className="text-gray-700 font-medium">
                    {job?.jobId.salary}
                  </p>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-gray-100">
                <p className="text-gray-700 mb-4">
                  {job?.jobId.jobDescription}
                </p>

                {job.status === "interview" && job?.jobId.jobDescription && (
                  <div className="bg-blue-50 text-blue-800 px-4 py-3 rounded-md">
                    <p className="font-medium">
                      Interview scheduled for{" "}
                      {new Date(job?.jobId.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                )}

                {job.status === "offer" && (
                  <div className="bg-green-50 text-green-800 px-4 py-3 rounded-md">
                    <p className="font-medium">
                      You've received an offer for this position!
                    </p>
                  </div>
                )}

                {job.status === "rejected" && (
                  <div className="bg-red-50 text-red-800 px-4 py-3 rounded-md">
                    <p className="font-medium">
                      This application was not successful
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
