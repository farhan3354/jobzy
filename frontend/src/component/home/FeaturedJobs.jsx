import React, { useEffect, useState } from "react";
import { FaArrowRight } from "react-icons/fa";
import JobCard from "./JobCard";
import { Link } from "react-router-dom";
import axios from "axios";

export default function FeaturedJobs() {
  const [jobs, setJobs] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const jobsPerPage = 4;

  useEffect(() => {
    const getAllJobs = async () => {
      try {
        const resp = await axios.get("http://localhost:8000/get-alljobs");
        setJobs(resp.data.jobs || []);
      } catch (error) {
        console.log("Error getting data", error);
      }
    };

    getAllJobs();
  }, []);

  const activeJobs = jobs.filter(
    (job) => job?.status !== "Closed" && job?.status !== "Inactive"
  );

  const filteredJobs = activeJobs.filter((job) => {
    const title = job?.jobTitle?.toLowerCase() || "";
    const industry = job?.industry?.toLowerCase() || "";
    const query = searchQuery.toLowerCase();
    return title.includes(query) || industry.includes(query);
  });

  const totalPages = Math.ceil(filteredJobs.length / jobsPerPage);
  const startIndex = (currentPage - 1) * jobsPerPage;
  const currentJobs = filteredJobs.slice(startIndex, startIndex + jobsPerPage);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-10 space-y-4 md:space-y-0">
          <h2 className="text-3xl font-bold">Featured Jobs</h2>
          <Link
            to="/user-dashboard/jobs"
            className="flex items-center text-blue-600 hover:text-blue-800"
          >
            View all jobs <FaArrowRight className="ml-2" />
          </Link>
        </div>

        <div className="mb-6">
          <input
            type="text"
            placeholder="Search by title or industry..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full md:w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {currentJobs.length > 0 ? (
            currentJobs.map((job) => <JobCard key={job._id} job={job} />)
          ) : (
            <p>No jobs found.</p>
          )}
        </div>

        {totalPages > 1 && (
          <div className="flex justify-center mt-10 space-x-2">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-3 py-1 border rounded disabled:opacity-50"
            >
              Prev
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={`px-3 py-1 border rounded ${
                  currentPage === page
                    ? "bg-blue-600 text-white"
                    : "hover:bg-gray-200"
                }`}
              >
                {page}
              </button>
            ))}

            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-3 py-1 border rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

// import React, { useEffect, useState } from "react";
// import { FaArrowRight } from "react-icons/fa";
// import JobCard from "./JobCard";
// import { Link } from "react-router-dom";
// import axios from "axios";

// export default function FeaturedJobs() {
//   const [jobs, setJobs] = useState([]);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [currentPage, setCurrentPage] = useState(1);
//   const jobsPerPage = 4;

//   const getAllJobs = async () => {
//     try {
//       const resp = await axios.get("http://localhost:8000/get-alljobs");
//       setJobs(resp.data.jobs || []);
//     } catch (error) {
//       console.log("Error getting data", error);
//     }
//   };

//   useEffect(() => {
//     getAllJobs();
//   }, []);

//   const activeJobs = jobs.filter(
//     (job) => job.status !== "Closed" && job.status !== "Inactive"
//   );

//   const filteredJobs = activeJobs.filter((job) =>
//     job.jobTitle.toLowerCase().includes(searchQuery.toLowerCase())
//   );

//   const totalPages = Math.ceil(filteredJobs.length / jobsPerPage);
//   const startIndex = (currentPage - 1) * jobsPerPage;
//   const currentJobs = filteredJobs.slice(startIndex, startIndex + jobsPerPage);

//   const handlePageChange = (page) => {
//     if (page >= 1 && page <= totalPages) {
//       setCurrentPage(page);
//     }
//   };

//   useEffect(() => {
//     setCurrentPage(1);
//   }, [searchQuery]);

//   return (
//     <div className="py-16 px-4">
//       <div className="max-w-6xl mx-auto">
//         <div className="flex flex-col md:flex-row justify-between items-center mb-10">
//           <h2 className="text-3xl font-bold mb-4 md:mb-0">Featured Jobs</h2>

//           <div className="w-full md:w-1/2 flex items-center">
//             <input
//               type="text"
//               placeholder="Search jobs by title..."
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//               className="w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//             />
//           </div>
//         </div>

//         <div className="flex justify-end mb-6">
//           <Link
//             to="/user-dashboard/jobs"
//             className="flex items-center text-blue-600 hover:text-blue-800"
//           >
//             View all jobs <FaArrowRight className="ml-2" />
//           </Link>
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//           {currentJobs.length > 0 ? (
//             currentJobs.map((job) => <JobCard key={job._id} job={job} />)
//           ) : (
//             <p className="text-gray-500">No jobs found.</p>
//           )}
//         </div>

//         {totalPages > 1 && (
//           <div className="flex justify-center mt-10 space-x-2">
//             <button
//               onClick={() => handlePageChange(currentPage - 1)}
//               disabled={currentPage === 1}
//               className="px-3 py-1 border rounded disabled:opacity-50"
//             >
//               Prev
//             </button>

//             {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
//               <button
//                 key={page}
//                 onClick={() => handlePageChange(page)}
//                 className={`px-3 py-1 border rounded ${
//                   currentPage === page
//                     ? "bg-blue-600 text-white"
//                     : "hover:bg-gray-200"
//                 }`}
//               >
//                 {page}
//               </button>
//             ))}

//             <button
//               onClick={() => handlePageChange(currentPage + 1)}
//               disabled={currentPage === totalPages}
//               className="px-3 py-1 border rounded disabled:opacity-50"
//             >
//               Next
//             </button>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }
