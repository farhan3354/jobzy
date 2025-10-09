import React from "react";
import {
  FaSearch,
  FaBookmark,
  FaRegBookmark,
  FaBriefcase,
  FaMapMarkerAlt,
  FaMoneyBillWave,
  FaTrash,
} from "react-icons/fa";

export default function JobSaved() {
  // Sample saved jobs data (static)
  const savedJobs = [
    {
      id: 1,
      title: "Senior Frontend Developer",
      company: "TechCorp Inc.",
      location: "San Francisco, CA (Remote)",
      salary: "$120,000 - $150,000",
      type: "Full-time",
      postedDate: "2023-05-10",
      description:
        "We are looking for an experienced frontend developer to join our team working with React and TypeScript.",
      isSaved: true,
    },
    {
      id: 2,
      title: "Backend Engineer",
      company: "DataSystems LLC",
      location: "New York, NY",
      salary: "$110,000 - $140,000",
      type: "Full-time",
      postedDate: "2023-05-15",
      description:
        "Join our backend team to build scalable APIs and microservices using Node.js and Python.",
      isSaved: true,
    },
    {
      id: 3,
      title: "UX Designer",
      company: "CreativeMinds",
      location: "Austin, TX (Hybrid)",
      salary: "$90 - $120/hr",
      type: "Contract",
      postedDate: "2023-05-05",
      description:
        "Looking for a talented UX designer to revamp our customer-facing applications.",
      isSaved: true,
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Saved Jobs</h1>
        <p className="text-gray-600">
          Your collection of saved job opportunities
        </p>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Search */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaSearch className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search saved jobs..."
              className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
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

          {/* Clear Filters */}
          <div>
            <button className="w-full px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors">
              Clear Filters
            </button>
          </div>
        </div>
      </div>

      {/* Saved Jobs List */}
      <div className="space-y-6">
        {savedJobs.map((job) => (
          <div
            key={job.id}
            className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow duration-300 relative"
          >
            {/* Save/Unsave button */}
            <button
              className="absolute top-4 right-4 p-2 text-blue-600 hover:text-blue-800 transition-colors"
              aria-label={job.isSaved ? "Unsave job" : "Save job"}
            >
              {job.isSaved ? <FaBookmark /> : <FaRegBookmark />}
            </button>

            {/* Remove button */}
            <button
              className="absolute top-4 right-16 p-2 text-gray-400 hover:text-red-500 transition-colors"
              aria-label="Remove job"
            >
              <FaTrash />
            </button>

            <div className="p-6">
              <div className="flex flex-col md:flex-row md:justify-between md:items-start">
                <div className="mb-4 md:mb-0">
                  <h3 className="text-xl font-semibold text-gray-800 mb-1">
                    {job.title}
                  </h3>
                  <p className="text-gray-600 mb-2">{job.company}</p>

                  <div className="flex flex-wrap items-center gap-4 mt-3">
                    <div className="flex items-center text-gray-600">
                      <FaBriefcase className="mr-2 text-blue-500" />
                      <span>{job.type}</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <FaMapMarkerAlt className="mr-2 text-blue-500" />
                      <span>{job.location}</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <FaMoneyBillWave className="mr-2 text-blue-500" />
                      <span>{job.salary}</span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col items-start md:items-end">
                  <span className="text-sm text-gray-500 mb-3">
                    Saved on {new Date(job.postedDate).toLocaleDateString()}
                  </span>
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-sm font-medium">
                    Apply Now
                  </button>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-gray-100">
                <p className="text-gray-700">{job.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
