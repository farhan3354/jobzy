import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { MdOutlineWork } from "react-icons/md";
import { FaUsers } from "react-icons/fa";
import { useSelector } from "react-redux";
import axios from "axios";

export default function EmployerJobDetails() {
  const { id } = useParams();
  const token = useSelector((state) => state.auth.token);
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchJobDetails = async () => {
    try {
      const res = await axios.get(`http://localhost:8000/get-job/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setJob(res.data.job);
    } catch (error) {
      console.error("Error fetching job details:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobDetails();
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!job) {
    return <div className="text-2xl text-center">Job not found</div>;
  }

  return (
    <div className="p-6 min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-xl p-8">
        <div className="flex items-center gap-4 mb-6">
          <div className="p-3 bg-blue-100 rounded-full">
            <MdOutlineWork className="text-blue-600 text-3xl" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-800">{job.jobTitle}</h2>
            <p className="text-gray-600">
              {job.companyName} • {job.location}
            </p>
            <p className="py-2 text-gray-600">{job.industry}</p>
            <p className="text-sm text-gray-400">
              Posted on: {new Date(job.createdAt).toDateString()}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div>
            <p className="font-medium text-gray-700">Job Type:</p>
            <p className="text-gray-600">{job.employmentType}</p>
          </div>
          <div>
            <p className="font-medium text-gray-700">Salary:</p>
            <p className="text-gray-600">{job.salary}</p>
          </div>
          <div>
            <p className="font-medium text-gray-700">contact Email:</p>
            <p className="text-gray-600">{job.contactEmail}</p>
          </div>
          <div>
            <p className="font-medium text-gray-700">contact Phone:</p>
            <p className="text-gray-600">{job.contactPhone}</p>
          </div>
          <div>
            <p className="font-medium text-gray-700">Applicants:</p>
            <p className="flex items-center gap-2 text-gray-600">
              <FaUsers /> {job.applicants?.length || 0} Applicants
            </p>
          </div>
          <div>
            <p className="font-medium text-gray-700">Status:</p>
            <p
              className={
                job.status === "Active"
                  ? "text-green-600 font-medium"
                  : "text-red-600 font-medium"
              }
            >
              {job.status}
            </p>
          </div>
        </div>

        <div className="mb-8">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            Job Description
          </h3>
          <p className="text-gray-600 leading-relaxed">{job.jobDescription}</p>
        </div>

        <div className="mb-8">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            Requirements & Qualifications
          </h3>
          <ul className="list-disc list-inside text-gray-600 space-y-1">
            {job.requirements?.map((req, index) => (
              <li key={index}>{req}</li>
            ))}
          </ul>
        </div>

        {job.skills.length > 0 ? (
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Skills</h3>
            <div className="mt-3 flex flex-wrap gap-1">
              {job.skills?.slice(0, 9).map((skill, index) => (
                <span
                  key={index}
                  className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ) : null}

        <div className="flex justify-end">
          <Link
            to="/employer-dashboard/all-job"
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition cursor-pointer"
          >
            Back to Jobs
          </Link>
        </div>
      </div>
    </div>
  );
}
