import React, { useEffect, useState } from "react";
import {
  FaMapMarkerAlt,
  FaBriefcase,
  FaMoneyBillWave,
  FaClock,
  FaBuilding,
  FaBookmark,
  FaShareAlt,
  FaSearch,
  FaFilter,
  FaCalendarAlt,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import LeftSidejob from "./LeftSideJob";
import axios from "axios";

export default function JobList() {
  const [selectedJob, setSelectedJob] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);

  const [searchTerm, setSearchTerm] = useState("");
  const [locationFilter, setLocationFilter] = useState("");
  const [dateFilter, setDateFilter] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  const fetchAllJobs = async () => {
    try {
      const response = await axios.get("http://localhost:8000/get-alljobs");
      const allJobs = response.data.jobs || [];
      setJobs(allJobs);
      setFilteredJobs(allJobs);
      if (allJobs.length > 0) {
        setSelectedJob(allJobs[0]);
      }
    } catch (error) {
      console.log("Server error", error);
    }
  };

  useEffect(() => {
    fetchAllJobs();
  }, []);

  useEffect(() => {
    let results = jobs.filter(
      (job) => job.status !== "Closed" && job.status !== "Inactive"
    );

    if (searchTerm) {
      results = results.filter(
        (job) =>
          job.jobTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
          job.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          job.skills.some((skill) =>
            skill.toLowerCase().includes(searchTerm.toLowerCase())
          )
      );
    }

    if (locationFilter) {
      results = results.filter((job) =>
        job.location.toLowerCase().includes(locationFilter.toLowerCase())
      );
    }

    if (dateFilter) {
      const today = new Date();
      const filterDate = new Date();

      switch (dateFilter) {
        case "last24h":
          filterDate.setDate(today.getDate() - 1);
          break;
        case "last3days":
          filterDate.setDate(today.getDate() - 3);
          break;
        case "lastWeek":
          filterDate.setDate(today.getDate() - 7);
          break;
        case "lastMonth":
          filterDate.setMonth(today.getMonth() - 1);
          break;
        default:
          break;
      }

      results = results.filter((job) => new Date(job.createdAt) >= filterDate);
    }

    setFilteredJobs(results);

    if (selectedJob && !results.find((job) => job._id === selectedJob._id)) {
      setSelectedJob(results.length > 0 ? results[0] : null);
    }
  }, [searchTerm, locationFilter, dateFilter, jobs, selectedJob]);

  const clearFilters = () => {
    setSearchTerm("");
    setLocationFilter("");
    setDateFilter("");
  };

  const activeJobs = filteredJobs.filter(
    (job) => job.status !== "Closed" && job.status !== "Inactive"
  );

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <div className="bg-white rounded-lg shadow-sm p-4">
            <div className="flex flex-col md:flex-row gap-4 mb-4">
              <div className="flex-1 relative">
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search jobs by title, company, or skills..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="flex items-center gap-2 px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <FaFilter className="text-gray-600" />
                  <span>Filters</span>
                  {(locationFilter || dateFilter) && (
                    <span className="bg-blue-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      {(locationFilter ? 1 : 0) + (dateFilter ? 1 : 0)}
                    </span>
                  )}
                </button>

                {(searchTerm || locationFilter || dateFilter) && (
                  <button
                    onClick={clearFilters}
                    className="px-4 py-3 text-gray-600 hover:text-gray-800 transition-colors"
                  >
                    Clear All
                  </button>
                )}
              </div>
            </div>

            {showFilters && (
              <div className="border-t pt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <FaMapMarkerAlt className="inline mr-2" />
                    Location
                  </label>
                  <input
                    type="text"
                    placeholder="Filter by location..."
                    value={locationFilter}
                    onChange={(e) => setLocationFilter(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <FaCalendarAlt className="inline mr-2" />
                    Date Posted
                  </label>
                  <select
                    value={dateFilter}
                    onChange={(e) => setDateFilter(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Any time</option>
                    <option value="last24h">Last 24 hours</option>
                    <option value="last3days">Last 3 days</option>
                    <option value="lastWeek">Last week</option>
                    <option value="lastMonth">Last month</option>
                  </select>
                </div>
              </div>
            )}

            <div className="mt-4 text-sm text-gray-600">
              Showing {activeJobs.length} of{" "}
              {
                jobs.filter(
                  (job) => job.status !== "Closed" && job.status !== "Inactive"
                ).length
              }{" "}
              jobs
              {(searchTerm || locationFilter || dateFilter) && (
                <span className="ml-2">
                  •{" "}
                  <button
                    onClick={clearFilters}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    Clear filters
                  </button>
                </span>
              )}
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          <LeftSidejob
            selectedJob={selectedJob}
            setSelectedJob={setSelectedJob}
            jobs={activeJobs}
          />

          {selectedJob ? (
            <div className="lg:w-1/2 py-8">
              <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 sticky top-4">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-start gap-4 mb-4">
                  <div className="flex-1">
                    <h2 className="text-xl sm:text-2xl font-bold text-gray-800">
                      {selectedJob.jobTitle}
                    </h2>
                    <div className="flex items-center mt-1 sm:mt-2">
                      <FaBuilding className="text-gray-500 mr-2 flex-shrink-0" />
                      <span className="text-gray-700 font-medium">
                        {selectedJob.companyName}
                      </span>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <button className="bg-gray-200 hover:bg-gray-300 p-2 rounded-full transition">
                      <FaBookmark className="text-gray-500" />
                    </button>
                    <button className="bg-gray-200 hover:bg-gray-300 p-2 rounded-full transition">
                      <FaShareAlt className="text-gray-500" />
                    </button>
                  </div>
                </div>

                <div className="border-t border-b border-gray-200 py-3 sm:py-4 my-3 sm:my-4">
                  <div className="flex flex-wrap gap-3 sm:gap-4 text-xs sm:text-sm text-gray-600">
                    <div className="flex items-center">
                      <FaMapMarkerAlt className="mr-2 flex-shrink-0" />
                      <span>{selectedJob.location}</span>
                    </div>
                    <div className="flex items-center">
                      <FaBriefcase className="mr-2 flex-shrink-0" />
                      <span>{selectedJob.employmentType}</span>
                    </div>
                    <div className="flex items-center">
                      <FaMoneyBillWave className="mr-2 flex-shrink-0" />
                      <span>{selectedJob.salary}</span>
                    </div>
                    <div className="flex items-center">
                      <FaClock className="mr-2 flex-shrink-0" />
                      <span>
                        {new Date(selectedJob.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mb-4 sm:mb-6">
                  <h3 className="text-lg font-semibold mb-2">
                    Job Description
                  </h3>
                  <p className="text-gray-700">{selectedJob.jobDescription}</p>
                </div>

                <div className="mb-4 sm:mb-6">
                  <h3 className="text-lg font-semibold mb-2">Requirements</h3>
                  <ul className="list-disc pl-5 text-gray-700 space-y-1">
                    {selectedJob.requirements &&
                      selectedJob.requirements.map((req, index) => (
                        <li key={index}>{req}</li>
                      ))}
                  </ul>
                </div>

                {selectedJob.skills && selectedJob.skills.length > 0 && (
                  <div className="mb-4 sm:mb-6">
                    <h3 className="text-lg font-semibold mb-2">Skills</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedJob.skills.map((skill, index) => (
                        <span
                          key={index}
                          className="bg-blue-100 text-blue-800 px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                <div className="flex flex-col sm:flex-row justify-between items-center gap-3 pt-4 border-t border-gray-200">
                  <Link
                    to={`/user-dashboard/apply/${selectedJob._id}`}
                    className="w-full sm:w-auto bg-blue-600 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg hover:bg-blue-700 transition font-medium text-center"
                  >
                    Apply Now
                  </Link>
                </div>
              </div>
            </div>
          ) : (
            <div className="lg:w-1/2 py-8">
              <div className="bg-white rounded-lg shadow-md p-8 text-center">
                <h3 className="text-xl font-semibold text-gray-600 mb-2">
                  No jobs found
                </h3>
                <p className="text-gray-500 mb-4">
                  {searchTerm || locationFilter || dateFilter
                    ? "Try adjusting your search criteria or clear filters to see more jobs."
                    : "There are currently no active job listings."}
                </p>
                {(searchTerm || locationFilter || dateFilter) && (
                  <button
                    onClick={clearFilters}
                    className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
                  >
                    Clear Filters
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// import React, { useEffect, useState } from "react";
// import {
//   FaMapMarkerAlt,
//   FaBriefcase,
//   FaMoneyBillWave,
//   FaClock,
//   FaBuilding,
//   FaArrowLeft,
//   FaBookmark,
//   FaShareAlt,
// } from "react-icons/fa";
// import { Link } from "react-router-dom";
// import LeftSidejob from "./LeftSideJob";
// // import { useSelector } from "react-redux";
// import axios from "axios";

// export default function JobList() {
//   const [selectedJob, setSelectedJob] = useState(null);
//   const [jobs, setJobs] = useState([]);

//   const fetchAllJobs = async () => {
//     try {
//       const response = await axios.get("http://localhost:8000/get-alljobs");
//       setJobs(response.data.jobs || []);
//       if (response.data.jobs && response.data.jobs.length > 0) {
//         setSelectedJob(response.data.jobs[0]);
//       }
//     } catch (error) {
//       console.log("Server error", error);
//     }
//   };

//   useEffect(() => {
//     fetchAllJobs();
//   }, []);
//   const activeJobs = jobs.filter(
//     (job) => job.status !== "Closed" && job.status !== "Inactive"
//   );

//   return (
//     <div className="bg-gray-50 min-h-screen">
//       <div className="container mx-auto px-4 py-8">
//         <div className="flex flex-col lg:flex-row gap-6">
//           <LeftSidejob
//             selectedJob={selectedJob}
//             setSelectedJob={setSelectedJob}
//             jobs={activeJobs}
//           />

//           {selectedJob && (
//             <div
//               className="lg:w-1/2 py-8"
//               key={selectedJob._id || selectedJob.id}
//             >
//               <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 sticky top-4">
//                 <div className="flex flex-col sm:flex-row justify-between items-start sm:items-start gap-4 mb-4">
//                   <div className="flex-1">
//                     <h2 className="text-xl sm:text-2xl font-bold text-gray-800">
//                       {selectedJob.jobTitle}
//                     </h2>
//                     <div className="flex items-center mt-1 sm:mt-2">
//                       <FaBuilding className="text-gray-500 mr-2 flex-shrink-0" />
//                       <span className="text-gray-700 font-medium">
//                         {selectedJob.companyName}
//                       </span>
//                     </div>
//                   </div>

//                   <div className="flex gap-2">
//                     <button className="bg-gray-200 hover:bg-gray-300 p-2 rounded-full transition">
//                       <FaBookmark className="text-gray-500" />
//                     </button>
//                     <button className="bg-gray-200 hover:bg-gray-300 p-2 rounded-full transition">
//                       <FaShareAlt className="text-gray-500" />
//                     </button>
//                   </div>
//                 </div>

//                 <div className="border-t border-b border-gray-200 py-3 sm:py-4 my-3 sm:my-4">
//                   <div className="flex flex-wrap gap-3 sm:gap-4 text-xs sm:text-sm text-gray-600">
//                     <div className="flex items-center">
//                       <FaMapMarkerAlt className="mr-2 flex-shrink-0" />
//                       <span>{selectedJob.location}</span>
//                     </div>
//                     <div className="flex items-center">
//                       <FaBriefcase className="mr-2 flex-shrink-0" />
//                       <span>{selectedJob.employmentType}</span>
//                     </div>
//                     <div className="flex items-center">
//                       <FaMoneyBillWave className="mr-2 flex-shrink-0" />
//                       <span>{selectedJob.salary}</span>
//                     </div>
//                     <div className="flex items-center">
//                       <FaClock className="mr-2 flex-shrink-0" />
//                       <span>
//                         {new Date(selectedJob.createdAt).toDateString()}
//                       </span>
//                     </div>
//                   </div>
//                 </div>

//                 <div className="mb-4 sm:mb-6">
//                   <h3 className="text-lg font-semibold mb-2">
//                     Job Description
//                   </h3>
//                   <p className="text-gray-700">{selectedJob.jobDescription}</p>
//                 </div>

//                 <div className="mb-4 sm:mb-6">
//                   <h3 className="text-lg font-semibold mb-2">Requirements</h3>
//                   <ul className="list-disc pl-5 text-gray-700 space-y-1">
//                     {selectedJob.requirements &&
//                       selectedJob.requirements.map((req, index) => (
//                         <li key={index}>{req}</li>
//                       ))}
//                   </ul>
//                 </div>

//                 {selectedJob.skills && selectedJob.skills.length > 0 && (
//                   <div className="mb-4 sm:mb-6">
//                     <h3 className="text-lg font-semibold mb-2">Skills</h3>
//                     <div className="flex flex-wrap gap-2">
//                       {selectedJob.skills.map((skill, index) => (
//                         <span
//                           key={index}
//                           className="bg-blue-100 text-blue-800 px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm"
//                         >
//                           {skill}
//                         </span>
//                       ))}
//                     </div>
//                   </div>
//                 )}

//                 <div className="flex flex-col sm:flex-row justify-between items-center gap-3 pt-4 border-t border-gray-200">
//                   <Link
//                     to={`/user-dashboard/apply/${
//                       selectedJob._id || selectedJob.id
//                     }`}
//                     className="w-full sm:w-auto bg-blue-600 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg hover:bg-blue-700 transition font-medium text-center"
//                   >
//                     Apply Now
//                   </Link>
//                   {/* <button className="w-full sm:w-auto text-blue-600 hover:text-blue-800 font-medium text-center sm:text-right">
//                     Save for Later
//                   </button> */}
//                 </div>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

// // import React, { useState, useEffect } from "react";
// // import {
// //   FaMapMarkerAlt,
// //   FaBriefcase,
// //   FaMoneyBillWave,
// //   FaClock,
// //   FaBuilding,
// //   FaSearch,
// //   FaFilter,
// //   FaBookmark,
// //   FaShareAlt,
// //   FaArrowLeft,
// // } from "react-icons/fa";
// // import { Link } from "react-router-dom";
// // import LeftSidejob from "./LeftSidejob";
// // import { alljobs } from "./../../data/data";

// // export default function JobList() {
// //   const [selectedJob, setSelectedJob] = useState(null);
// //   const [searchTerm, setSearchTerm] = useState("");
// //   const [filters, setFilters] = useState({
// //     jobType: "",
// //     location: "",
// //     salaryRange: "",
// //   });
// //   const [bookmarkedJobs, setBookmarkedJobs] = useState([]);
// //   const [isMobileView, setIsMobileView] = useState(false);

// //   // Check screen size on resize and initial load
// //   useEffect(() => {
// //     const checkScreenSize = () => {
// //       setIsMobileView(window.innerWidth < 1024);
// //     };

// //     checkScreenSize();
// //     window.addEventListener("resize", checkScreenSize);

// //     return () => window.removeEventListener("resize", checkScreenSize);
// //   }, []);

// //   // Filter jobs based on search and filters
// //   const filteredJobs = alljobs.filter((job) => {
// //     const matchesSearch =
// //       job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
// //       job.company.toLowerCase().includes(searchTerm.toLowerCase());

// //     const matchesType = !filters.jobType || job.type === filters.jobType;
// //     const matchesLocation =
// //       !filters.location ||
// //       job.location.toLowerCase().includes(filters.location.toLowerCase());

// //     return matchesSearch && matchesType && matchesLocation;
// //   });

// //   const toggleBookmark = (jobId) => {
// //     if (bookmarkedJobs.includes(jobId)) {
// //       setBookmarkedJobs(bookmarkedJobs.filter((id) => id !== jobId));
// //     } else {
// //       setBookmarkedJobs([...bookmarkedJobs, jobId]);
// //     }
// //   };

// //   // Auto-select first job if none selected on mobile
// //   useEffect(() => {
// //     if (isMobileView && filteredJobs.length > 0 && !selectedJob) {
// //       setSelectedJob(filteredJobs[0]);
// //     }
// //   }, [filteredJobs, selectedJob, isMobileView]);

// //   return (
// //     <div className="bg-gray-50 min-h-screen">
// //       <div className="container mx-auto px-4 py-8">
// //         {/* Search and Filter Bar - Improved for mobile */}
// //         <div className="bg-white rounded-lg shadow-md p-4 mb-6">
// //           <div className="flex flex-col md:flex-row gap-4">
// //             <div className="flex-1 relative">
// //               <FaSearch className="absolute left-3 top-3 text-gray-400" />
// //               <input
// //                 type="text"
// //                 placeholder="Search jobs or companies..."
// //                 className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
// //                 value={searchTerm}
// //                 onChange={(e) => setSearchTerm(e.target.value)}
// //               />
// //             </div>

// //             <div className="flex gap-2 flex-wrap">
// //               <select
// //                 className="flex-1 min-w-[150px] border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
// //                 value={filters.jobType}
// //                 onChange={(e) =>
// //                   setFilters({ ...filters, jobType: e.target.value })
// //                 }
// //               >
// //                 <option value="">All Types</option>
// //                 <option value="Full-time">Full-time</option>
// //                 <option value="Part-time">Part-time</option>
// //                 <option value="Contract">Contract</option>
// //                 <option value="Internship">Internship</option>
// //               </select>

// //               <select
// //                 className="flex-1 min-w-[150px] border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
// //                 value={filters.location}
// //                 onChange={(e) =>
// //                   setFilters({ ...filters, location: e.target.value })
// //                 }
// //               >
// //                 <option value="">All Locations</option>
// //                 <option value="Remote">Remote</option>
// //                 <option value="San Francisco">San Francisco</option>
// //                 <option value="New York">New York</option>
// //               </select>

// //               <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition whitespace-nowrap">
// //                 <FaFilter /> Filters
// //               </button>
// //             </div>
// //           </div>
// //         </div>

// //         <div className="flex flex-col lg:flex-row gap-6">
// //           <LeftSidejob
// //             selectedJob={selectedJob}
// //             isMobileView={isMobileView}
// //             filteredJobs={filteredJobs}
// //             setSelectedJob={setSelectedJob}
// //             bookmarkedJobs={bookmarkedJobs}
// //             toggleBookmark={toggleBookmark}
// //           ></LeftSidejob>

// //           {/* Right Side - Job Details */}
// //           {selectedJob && (
// //             <div
// //               className={`${isMobileView ? "w-full" : "lg:w-1/2"} ${
// //                 !isMobileView || (isMobileView && selectedJob)
// //                   ? "block"
// //                   : "hidden"
// //               }`}
// //             >
// //               <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 sticky top-4">
// //                 {isMobileView && (
// //                   <button
// //                     className="flex items-center gap-2 mb-4 text-blue-600 hover:text-blue-800"
// //                     onClick={() => setSelectedJob(null)}
// //                   >
// //                     <FaArrowLeft /> Back to listings
// //                   </button>
// //                 )}

// //                 <div className="flex flex-col sm:flex-row justify-between items-start sm:items-start gap-4 mb-4">
// //                   <div className="flex-1">
// //                     <h2 className="text-xl sm:text-2xl font-bold text-gray-800">
// //                       {selectedJob.title}
// //                     </h2>
// //                     <div className="flex items-center mt-1 sm:mt-2">
// //                       <FaBuilding className="text-gray-500 mr-2 flex-shrink-0" />
// //                       <span className="text-gray-700 font-medium">
// //                         {selectedJob.company}
// //                       </span>
// //                     </div>
// //                   </div>
// //                   <div className="flex gap-2">
// //                     <button
// //                       className="bg-gray-200 hover:bg-gray-300 p-2 rounded-full transition"
// //                       onClick={() => toggleBookmark(selectedJob.id)}
// //                     >
// //                       <FaBookmark
// //                         className={
// //                           bookmarkedJobs.includes(selectedJob.id)
// //                             ? "text-yellow-500 fill-current"
// //                             : "text-gray-500"
// //                         }
// //                       />
// //                     </button>
// //                     <button
// //                       className="bg-gray-200 hover:bg-gray-300 p-2 rounded-full transition"
// //                       onClick={() => {
// //                         /* Implement share functionality */
// //                       }}
// //                     >
// //                       <FaShareAlt className="text-gray-500" />
// //                     </button>
// //                   </div>
// //                 </div>

// //                 <div className="border-t border-b border-gray-200 py-3 sm:py-4 my-3 sm:my-4">
// //                   <div className="flex flex-wrap gap-3 sm:gap-4 text-xs sm:text-sm text-gray-600">
// //                     <div className="flex items-center">
// //                       <FaMapMarkerAlt className="mr-2 flex-shrink-0" />
// //                       <span>{selectedJob.location}</span>
// //                     </div>
// //                     <div className="flex items-center">
// //                       <FaBriefcase className="mr-2 flex-shrink-0" />
// //                       <span>{selectedJob.type}</span>
// //                     </div>
// //                     <div className="flex items-center">
// //                       <FaMoneyBillWave className="mr-2 flex-shrink-0" />
// //                       <span>{selectedJob.salary}</span>
// //                     </div>
// //                     <div className="flex items-center">
// //                       <FaClock className="mr-2 flex-shrink-0" />
// //                       <span>{selectedJob.posted}</span>
// //                     </div>
// //                   </div>
// //                 </div>

// //                 <div className="mb-4 sm:mb-6">
// //                   <h3 className="text-lg font-semibold mb-2">
// //                     Job Description
// //                   </h3>
// //                   <p className="text-gray-700">{selectedJob.description}</p>
// //                 </div>

// //                 <div className="mb-4 sm:mb-6">
// //                   <h3 className="text-lg font-semibold mb-2">Requirements</h3>
// //                   <ul className="list-disc pl-5 text-gray-700 space-y-1">
// //                     {selectedJob.requirements.map((req, index) => (
// //                       <li key={index}>{req}</li>
// //                     ))}
// //                   </ul>
// //                 </div>

// //                 <div className="mb-4 sm:mb-6">
// //                   <h3 className="text-lg font-semibold mb-2">
// //                     Responsibilities
// //                   </h3>
// //                   <ul className="list-disc pl-5 text-gray-700 space-y-1">
// //                     {selectedJob.responsibilities.map((resp, index) => (
// //                       <li key={index}>{resp}</li>
// //                     ))}
// //                   </ul>
// //                 </div>

// //                 {selectedJob.skills?.length > 0 && (
// //                   <div className="mb-4 sm:mb-6">
// //                     <h3 className="text-lg font-semibold mb-2">Skills</h3>
// //                     <div className="flex flex-wrap gap-2">
// //                       {selectedJob.skills.map((skill, index) => (
// //                         <span
// //                           key={index}
// //                           className="bg-blue-100 text-blue-800 px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm"
// //                         >
// //                           {skill}
// //                         </span>
// //                       ))}
// //                     </div>
// //                   </div>
// //                 )}

// //                 <div className="flex flex-col sm:flex-row justify-between items-center gap-3 pt-4 border-t border-gray-200">
// //                   <Link
// //                     to={`/user-dashboard/apply/${selectedJob.id}`}
// //                     className="w-full sm:w-auto bg-blue-600 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg hover:bg-blue-700 transition font-medium text-center"
// //                   >
// //                     Apply Now
// //                   </Link>
// //                   <button className="w-full sm:w-auto text-blue-600 hover:text-blue-800 font-medium text-center sm:text-right">
// //                     Save for Later
// //                   </button>
// //                 </div>
// //               </div>
// //             </div>
// //           )}
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }
