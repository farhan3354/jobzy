import React, { useEffect, useState } from "react";
import {
  FaMapMarkerAlt,
  FaBriefcase,
  FaMoneyBillWave,
  FaClock,
  FaBuilding,
  FaSearch,
  FaFilter,
  FaCalendarAlt,
  FaTimes,
  FaArrowLeft,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import LeftSidejob from "./LeftSideJob";
import api from "../../api/register";
import TranslatedText from "../TranslatedText";
import { useLanguage } from "../../context/LanguageContext";
import { useJobSearch } from "../../hook/useJobSearch";

export default function JobList() {
  const [jobs, setJobs] = useState([]);
  const { language } = useLanguage();
  const [showFilters, setShowFilters] = useState(false);
  const [showMobileDetails, setShowMobileDetails] = useState(false);

  // Use the custom hook for all search and filtering logic
  const {
    searchTerm,
    setSearchTerm,
    locationFilter,
    setLocationFilter,
    dateFilter,
    setDateFilter,
    filteredJobs,
    selectedJob,
    setSelectedJob,
    clearFilters,
  } = useJobSearch(jobs, language);

  const fetchAllJobs = async () => {
    try {
      const response = await api.get("/get-alljobs");
      setJobs(response.data.jobs || []);
    } catch (error) {
      console.error("Server error", error);
    }
  };

  useEffect(() => {
    fetchAllJobs();
  }, []);

  // Handle job selection for mobile
  const handleJobSelect = (job) => {
    setSelectedJob(job);
    setShowMobileDetails(true);
  };

  // Handle back button on mobile
  const handleBackToList = () => {
    setShowMobileDetails(false);
  };

  return (
    <div className="bg-[#f8faff] min-h-screen">
      <div className="container mx-auto px-4 py-8 max-w-7xl animate-fade-in">
        <div className="mb-10">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 transition-all hover:shadow-md">
            <div className="flex flex-col lg:flex-row gap-6">
              <div className="flex-1 relative group">
                <FaSearch className="absolute left-5 top-1/2 transform -translate-y-1/2 text-gray-400 transition-colors group-focus-within:text-blue-500" />
                <input
                  type="text"
                  placeholder="Search jobs by title, company, or skills..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-14 pr-6 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-blue-500/20 focus:bg-white transition-all text-gray-700 placeholder-gray-400 font-medium shadow-inner"
                />
              </div>

              <div className="flex gap-4">
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className={`flex items-center gap-3 px-8 py-4 rounded-2xl border transition-all font-bold shadow-sm ${
                    showFilters || locationFilter || dateFilter
                      ? "bg-blue-600 border-blue-600 text-white shadow-blue-200"
                      : "bg-white border-gray-200 text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  <FaFilter className={showFilters ? "rotate-180 transition-transform" : "transition-transform"} />
                  <TranslatedText>Filters</TranslatedText>
                  {(locationFilter || dateFilter) && (
                    <span className="bg-white text-blue-600 text-[10px] rounded-full w-5 h-5 flex items-center justify-center font-black">
                      {(locationFilter ? 1 : 0) + (dateFilter ? 1 : 0)}
                    </span>
                  )}
                </button>

                {(searchTerm || locationFilter || dateFilter) && (
                  <button
                    onClick={clearFilters}
                    className="px-6 py-4 text-gray-400 hover:text-red-500 transition-colors text-sm font-bold uppercase tracking-wider"
                  >
                    <TranslatedText>Reset</TranslatedText>
                  </button>
                )}
              </div>
            </div>
            <div
              className={`grid grid-cols-1 md:grid-cols-2 gap-8 transition-all duration-500 ease-in-out overflow-hidden ${
                showFilters ? "mt-8 max-h-[500px] opacity-100" : "max-h-0 opacity-0"
              }`}
            >
              <div className="space-y-3">
                <label className="text-sm font-black text-gray-500 uppercase tracking-widest flex items-center gap-2">
                  <FaMapMarkerAlt className="text-blue-500" />
                  <TranslatedText>Location</TranslatedText>
                </label>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="E.g. San Francisco, Remote..."
                    value={locationFilter}
                    onChange={(e) => setLocationFilter(e.target.value)}
                    className="w-full px-5 py-3.5 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:bg-white transition-all font-medium"
                  />
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-sm font-black text-gray-500 uppercase tracking-widest flex items-center gap-2">
                  <FaCalendarAlt className="text-blue-500" />
                  <TranslatedText>Date Posted</TranslatedText>
                </label>
                <div className="relative">
                  <select
                    value={dateFilter}
                    onChange={(e) => setDateFilter(e.target.value)}
                    className="w-full px-5 py-3.5 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:bg-white transition-all cursor-pointer appearance-none font-medium"
                  >
                    <option value="">Any time</option>
                    <option value="last24h">Last 24 hours</option>
                    <option value="last3days">Last 3 days</option>
                    <option value="lastWeek">Last week</option>
                    <option value="lastMonth">Last month</option>
                  </select>
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                    <FaFilter className="w-3 h-3" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-6 flex items-center justify-between px-4">
          <p className="text-gray-500 font-medium">
             <TranslatedText>Found</TranslatedText>{" "}
             <span className="text-gray-900 font-black">{filteredJobs.length}</span>{" "}
             <TranslatedText>opportunities match your profile</TranslatedText>
          </p>
        </div>

        <div className="hidden lg:flex flex-row gap-10 h-[calc(100vh-280px)]">
          <div className="w-[420px] xl:w-[480px] flex flex-col shrink-0">
            <div className="bg-white rounded-[2rem] shadow-sm border border-gray-100 overflow-hidden flex-1 flex flex-col transition-all hover:shadow-md">
              <div className="flex-1 overflow-y-auto scrollbar-hide py-4 px-2">
                <LeftSidejob
                  selectedJob={selectedJob}
                  setSelectedJob={setSelectedJob}
                  jobs={filteredJobs}
                />
              </div>
            </div>
          </div>

          <div className="flex-1 flex flex-col min-w-0">
            {selectedJob ? (
              <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 overflow-y-auto">
                <JobDetails job={selectedJob} />
              </div>
            ) : (
              <div className="bg-white rounded-[2rem] shadow-sm border border-gray-100 p-20 text-center flex items-center justify-center flex-1">
                <div className="max-w-md">
                  <div className="w-32 h-32 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-10 relative">
                     <div className="absolute inset-0 bg-blue-50 rounded-full animate-ping opacity-20" />
                     <FaSearch className="text-gray-300 text-5xl relative z-10" />
                  </div>
                  <h3 className="text-3xl font-black text-gray-900 mb-4 tracking-tight">
                    <TranslatedText>No matches found</TranslatedText>
                  </h3>
                  <p className="text-gray-500 mb-10 leading-relaxed text-lg font-medium">
                    <TranslatedText>
                      We couldn't find any jobs matching your current search. Try resetting your filters to explore more opportunities.
                    </TranslatedText>
                  </p>
                  {(searchTerm || locationFilter || dateFilter) && (
                    <button
                      onClick={clearFilters}
                      className="bg-blue-600 text-white px-12 py-5 rounded-2xl hover:bg-blue-700 transition-all font-black text-lg shadow-xl shadow-blue-200"
                    >
                      <TranslatedText>Reset All Parameters</TranslatedText>
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="lg:hidden">
          {!showMobileDetails ? (
            <div className="space-y-8 animate-fade-in">
              <div className="bg-white rounded-3xl p-4 shadow-sm border border-gray-100">
                <LeftSidejob
                  selectedJob={selectedJob}
                  setSelectedJob={handleJobSelect}
                  jobs={filteredJobs}
                />
              </div>
            </div>
          ) : (
            <div className="fixed inset-0 bg-white z-50 overflow-y-auto">
              <div className="sticky top-0 bg-white border-b border-gray-200 p-4 flex items-center gap-4">
                <button
                  onClick={handleBackToList}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <FaArrowLeft className="text-gray-600" />
                </button>
                <h2 className="text-lg font-bold text-gray-800 truncate flex-1">
                  {selectedJob?.jobTitle}
                </h2>
                <button
                  onClick={handleBackToList}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <FaTimes className="text-gray-600" />
                </button>
              </div>
              <div className="p-4">
                {selectedJob && <JobDetails job={selectedJob} />}
              </div>
            </div>
          )}
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slide-up {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in { animation: fade-in 0.6s ease-out forwards; }
        .animate-slide-up { animation: slide-up 0.5s ease-out forwards; }
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}} />
    </div>
  );
}

const JobDetails = ({ job }) => {
  return (
    <>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-start gap-4 mb-4">
        <div className="flex-1">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-800">
            {job.jobTitle}
          </h2>
          <div className="flex items-center mt-1 sm:mt-2">
            <FaBuilding className="text-gray-500 mr-2 flex-shrink-0" />
            <span className="text-gray-700 font-medium">
              {job.companyName}
            </span>
          </div>
        </div>
      </div>

      <div className="border-t border-b border-gray-200 py-3 sm:py-4 my-3 sm:my-4">
        <div className="flex flex-wrap gap-3 sm:gap-4 text-xs sm:text-sm text-gray-600">
          <div className="flex items-center">
            <FaMapMarkerAlt className="mr-2 flex-shrink-0" />
            <span>{job.location}</span>
          </div>
          <div className="flex items-center">
            <FaBriefcase className="mr-2 flex-shrink-0" />
            <span>{job.employmentType}</span>
          </div>
          <div className="flex items-center">
            <FaMoneyBillWave className="mr-2 flex-shrink-0" />
            <span>{job.salary}</span>
          </div>
          <div className="flex items-center">
            <FaClock className="mr-2 flex-shrink-0" />
            <span>
              {new Date(job.createdAt).toLocaleDateString()}
            </span>
          </div>
        </div>
      </div>

      <div className="mb-4 sm:mb-6">
        <h3 className="text-lg font-semibold mb-2">
          Job Description
        </h3>
        <p className="text-gray-700">{job.jobDescription}</p>
      </div>

      <div className="mb-4 sm:mb-6">
        <h3 className="text-lg font-semibold mb-2">Requirements</h3>
        <ul className="list-disc pl-5 text-gray-700 space-y-1">
          {job.requirements &&
            job.requirements.map((req, index) => (
              <li key={index}>{req}</li>
            ))}
        </ul>
      </div>

      {job.skills && job.skills.length > 0 && (
        <div className="mb-4 sm:mb-6">
          <h3 className="text-lg font-semibold mb-2">Skills</h3>
          <div className="flex flex-wrap gap-2">
            {job.skills.map((skill, index) => (
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
          to={`/user-dashboard/apply/${job._id}`}
          className="w-full sm:w-auto bg-blue-600 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg hover:bg-blue-700 transition font-medium text-center"
        >
          Apply Now
        </Link>
      </div>
    </>
  );
};

// import React, { useEffect, useState } from "react";
// import {
//   FaMapMarkerAlt,
//   FaBriefcase,
//   FaMoneyBillWave,
//   FaClock,
//   FaBuilding,
//   FaSearch,
//   FaFilter,
//   FaCalendarAlt,
// } from "react-icons/fa";
// import { Link } from "react-router-dom";
// import LeftSidejob from "./LeftSideJob";
// import api from "../../api/register";
// import TranslatedText from "../TranslatedText";
// import { useLanguage } from "../../context/LanguageContext";
// import { useJobSearch } from "../../hook/useJobSearch";

// export default function JobList() {
//   const [jobs, setJobs] = useState([]);
//   const { language } = useLanguage();
//   const [showFilters, setShowFilters] = useState(false);

//   // Use the custom hook for all search and filtering logic
//   const {
//     searchTerm,
//     setSearchTerm,
//     locationFilter,
//     setLocationFilter,
//     dateFilter,
//     setDateFilter,
//     filteredJobs,
//     selectedJob,
//     setSelectedJob,
//     clearFilters,
//   } = useJobSearch(jobs, language);

//   const fetchAllJobs = async () => {
//     try {
//       const response = await api.get("/get-alljobs");
//       setJobs(response.data.jobs || []);
//     } catch (error) {
//       console.error("Server error", error);
//     }
//   };

//   useEffect(() => {
//     fetchAllJobs();
//   }, []);

//   return (
//     <div className="bg-[#f8faff] min-h-screen">
//       <div className="container mx-auto px-4 py-8 max-w-7xl animate-fade-in">
//         {/* Modern Search & Filter Header */}
//         <div className="mb-10">
//           <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 transition-all hover:shadow-md">
//             <div className="flex flex-col lg:flex-row gap-6">
//               <div className="flex-1 relative group">
//                 <FaSearch className="absolute left-5 top-1/2 transform -translate-y-1/2 text-gray-400 transition-colors group-focus-within:text-blue-500" />
//                 <input
//                   type="text"
//                   placeholder="Search jobs by title, company, or skills..."
//                   value={searchTerm}
//                   onChange={(e) => setSearchTerm(e.target.value)}
//                   className="w-full pl-14 pr-6 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-blue-500/20 focus:bg-white transition-all text-gray-700 placeholder-gray-400 font-medium shadow-inner"
//                 />
//               </div>

//               <div className="flex gap-4">
//                 <button
//                   onClick={() => setShowFilters(!showFilters)}
//                   className={`flex items-center gap-3 px-8 py-4 rounded-2xl border transition-all font-bold shadow-sm ${
//                     showFilters || locationFilter || dateFilter
//                       ? "bg-blue-600 border-blue-600 text-white shadow-blue-200"
//                       : "bg-white border-gray-200 text-gray-700 hover:bg-gray-50"
//                   }`}
//                 >
//                   <FaFilter className={showFilters ? "rotate-180 transition-transform" : "transition-transform"} />
//                   <TranslatedText>Filters</TranslatedText>
//                   {(locationFilter || dateFilter) && (
//                     <span className="bg-white text-blue-600 text-[10px] rounded-full w-5 h-5 flex items-center justify-center font-black">
//                       {(locationFilter ? 1 : 0) + (dateFilter ? 1 : 0)}
//                     </span>
//                   )}
//                 </button>

//                 {(searchTerm || locationFilter || dateFilter) && (
//                   <button
//                     onClick={clearFilters}
//                     className="px-6 py-4 text-gray-400 hover:text-red-500 transition-colors text-sm font-bold uppercase tracking-wider"
//                   >
//                     <TranslatedText>Reset</TranslatedText>
//                   </button>
//                 )}
//               </div>
//             </div>

//             {/* Expandable Smooth Filters */}
//             <div
//               className={`grid grid-cols-1 md:grid-cols-2 gap-8 transition-all duration-500 ease-in-out overflow-hidden ${
//                 showFilters ? "mt-8 max-h-[500px] opacity-100" : "max-h-0 opacity-0"
//               }`}
//             >
//               <div className="space-y-3">
//                 <label className="text-sm font-black text-gray-500 uppercase tracking-widest flex items-center gap-2">
//                   <FaMapMarkerAlt className="text-blue-500" />
//                   <TranslatedText>Location</TranslatedText>
//                 </label>
//                 <div className="relative">
//                   <input
//                     type="text"
//                     placeholder="E.g. San Francisco, Remote..."
//                     value={locationFilter}
//                     onChange={(e) => setLocationFilter(e.target.value)}
//                     className="w-full px-5 py-3.5 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:bg-white transition-all font-medium"
//                   />
//                 </div>
//               </div>

//               <div className="space-y-3">
//                 <label className="text-sm font-black text-gray-500 uppercase tracking-widest flex items-center gap-2">
//                   <FaCalendarAlt className="text-blue-500" />
//                   <TranslatedText>Date Posted</TranslatedText>
//                 </label>
//                 <div className="relative">
//                   <select
//                     value={dateFilter}
//                     onChange={(e) => setDateFilter(e.target.value)}
//                     className="w-full px-5 py-3.5 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:bg-white transition-all cursor-pointer appearance-none font-medium"
//                   >
//                     <option value="">Any time</option>
//                     <option value="last24h">Last 24 hours</option>
//                     <option value="last3days">Last 3 days</option>
//                     <option value="lastWeek">Last week</option>
//                     <option value="lastMonth">Last month</option>
//                   </select>
//                   <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
//                     <FaFilter className="w-3 h-3" />
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Counter Info */}
//         <div className="mb-6 flex items-center justify-between px-4">
//           <p className="text-gray-500 font-medium">
//              <TranslatedText>Found</TranslatedText>{" "}
//              <span className="text-gray-900 font-black">{filteredJobs.length}</span>{" "}
//              <TranslatedText>opportunities match your profile</TranslatedText>
//           </p>
//         </div>

//         {/* Layout Components */}
//         <div className="hidden lg:flex flex-row gap-10 h-[calc(100vh-280px)]">
//           {/* List Panel */}
//           <div className="w-[420px] xl:w-[480px] flex flex-col shrink-0">
//             <div className="bg-white rounded-[2rem] shadow-sm border border-gray-100 overflow-hidden flex-1 flex flex-col transition-all hover:shadow-md">
//               <div className="flex-1 overflow-y-auto scrollbar-hide py-4 px-2">
//                 <LeftSidejob
//                   selectedJob={selectedJob}
//                   setSelectedJob={setSelectedJob}
//                   jobs={filteredJobs}
//                 />
//               </div>
//             </div>
//           </div>

//           {/* Details Panel */}
//           <div className="flex-1 flex flex-col min-w-0">
//             {selectedJob ? (
             
//               <div className="lg:w-1/2 py-8">
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
//                         {new Date(selectedJob.createdAt).toLocaleDateString()}
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
//                     to={`/user-dashboard/apply/${selectedJob._id}`}
//                     className="w-full sm:w-auto bg-blue-600 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg hover:bg-blue-700 transition font-medium text-center"
//                   >
//                     Apply Now
//                   </Link>
//                 </div>
//               </div>
//             </div>
//             ) : (
//               <div className="bg-white rounded-[2rem] shadow-sm border border-gray-100 p-20 text-center flex items-center justify-center flex-1">
//                 <div className="max-w-md">
//                   <div className="w-32 h-32 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-10 relative">
//                      <div className="absolute inset-0 bg-blue-50 rounded-full animate-ping opacity-20" />
//                      <FaSearch className="text-gray-300 text-5xl relative z-10" />
//                   </div>
//                   <h3 className="text-3xl font-black text-gray-900 mb-4 tracking-tight">
//                     <TranslatedText>No matches found</TranslatedText>
//                   </h3>
//                   <p className="text-gray-500 mb-10 leading-relaxed text-lg font-medium">
//                     <TranslatedText>
//                       We couldn't find any jobs matching your current search. Try resetting your filters to explore more opportunities.
//                     </TranslatedText>
//                   </p>
//                   {(searchTerm || locationFilter || dateFilter) && (
//                     <button
//                       onClick={clearFilters}
//                       className="bg-blue-600 text-white px-12 py-5 rounded-2xl hover:bg-blue-700 transition-all font-black text-lg shadow-xl shadow-blue-200"
//                     >
//                       <TranslatedText>Reset All Parameters</TranslatedText>
//                     </button>
//                   )}
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>

//         {/* Improved Mobile View */}
//         <div className="lg:hidden space-y-8 animate-fade-in">
//            <div className="bg-white rounded-3xl p-4 shadow-sm border border-gray-100">
//              <LeftSidejob
//                selectedJob={selectedJob}
//                setSelectedJob={setSelectedJob}
//                jobs={filteredJobs}
//              />
//            </div>
//         </div>
//       </div>

//       <style dangerouslySetInnerHTML={{ __html: `
//         @keyframes fade-in {
//           from { opacity: 0; }
//           to { opacity: 1; }
//         }
//         @keyframes slide-up {
//           from { opacity: 0; transform: translateY(20px); }
//           to { opacity: 1; transform: translateY(0); }
//         }
//         .animate-fade-in { animation: fade-in 0.6s ease-out forwards; }
//         .animate-slide-up { animation: slide-up 0.5s ease-out forwards; }
//         .scrollbar-hide::-webkit-scrollbar { display: none; }
//         .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
//       `}} />
//     </div>
//   );
// }