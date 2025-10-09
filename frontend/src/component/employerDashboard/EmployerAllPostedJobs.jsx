import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { FaEdit, FaTrash, FaUsers } from "react-icons/fa";
import { MdOutlineWork } from "react-icons/md";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

export default function EmployerAllPostedJobs() {
  const token = useSelector((state) => state.auth.token);

  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showOptions, setShowOptions] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const jobsPerPage = 3;

  const fetchAllJobs = async () => {
    try {
      const res = await axios.get("http://localhost:8000/get-jobs", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setJobs(res.data.jobs || []);
    } catch (error) {
      console.error("Error fetching jobs:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllJobs();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  const handleDelete = async (jobId) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This job will be marked as Closed!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, close it!",
    });

    if (result.isConfirmed) {
      try {
        const response = await axios.put(
          `http://localhost:8000/update-job-status/${jobId}`,
          { status: "Closed" },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        if (response.data.success) {
          Swal.fire("Updated!", "Job has been closed.", "success");

          setJobs((prevJobs) =>
            prevJobs.map((job) =>
              job._id === jobId ? { ...job, status: "Closed" } : job
            )
          );
        }
      } catch (error) {
        Swal.fire("Error!", "Failed to close job.", error);
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

  const activeJobs = jobs.filter((job) => job.status !== "Closed");

  const totalPages = Math.ceil(activeJobs.length / jobsPerPage);
  const startIndex = (currentPage - 1) * jobsPerPage;
  const currentJobs = activeJobs.slice(startIndex, startIndex + jobsPerPage);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="p-6 min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">
              All Posted Jobs
            </h2>
            <p className="text-gray-600">
              Manage your job postings and applications
            </p>
          </div>
        </div>

        <div className="grid gap-6">
          {currentJobs.map((job) => (
            <div
              key={job._id}
              className="bg-white shadow-md rounded-xl p-5 flex flex-col md:flex-row justify-between items-start md:items-center hover:shadow-lg transition"
            >
              <Link to={`/employer-dashboard/all-job/details/${job._id}`}>
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-blue-100 rounded-full">
                    <MdOutlineWork className="text-blue-600 text-2xl" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">
                      {job.jobTitle}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {job.companyName} • {job.location}
                    </p>
                    <p className="text-sm text-gray-500 mt-1">
                      Type:{" "}
                      <span className="font-medium">{job.employmentType}</span>
                    </p>
                    <p className="text-sm text-gray-400">
                      Posted on: {new Date(job.createdAt).toDateString()}
                    </p>
                  </div>
                </div>
              </Link>

              <div className="flex flex-col md:flex-row items-start md:items-center gap-4 mt-4 md:mt-0">
                <div className="flex items-center gap-2 text-gray-600">
                  <FaUsers className="text-gray-500" />
                  <span>{job.applicants?.length || 0} Applicants</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="relative inline-block">
                    <button
                      onClick={() =>
                        setShowOptions(showOptions === job._id ? null : job._id)
                      }
                      className="p-2 bg-blue-100 rounded-full text-blue-600 hover:bg-blue-200 transition"
                    >
                      <FaEdit />
                    </button>

                    {showOptions === job._id && (
                      <div className="absolute right-0 mt-2 w-32 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                        <button
                          className="block w-full px-4 py-2 text-left text-sm text-green-600 hover:bg-gray-100"
                          onClick={() => handleStatusChange(job._id, "Active")}
                        >
                          Active
                        </button>
                        <button
                          className="block w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-gray-100"
                          onClick={() =>
                            handleStatusChange(job._id, "Inactive")
                          }
                        >
                          Inactive
                        </button>
                      </div>
                    )}
                  </div>

                  <Link to={`/employer-dashboard/all-job/${job._id}`}>
                    <button className="p-2 bg-blue-100 rounded-full text-blue-600 hover:bg-blue-200 transition">
                      <FaEdit />
                    </button>
                  </Link>
                  <button
                    className="p-2 bg-red-100 rounded-full text-red-600 hover:bg-red-200 transition"
                    onClick={() => handleDelete(job._id)}
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>
            </div>
          ))}
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
        {jobs.length === 0 && (
          <div className="text-center py-12">
            <div className="text-4xl text-gray-400 mb-4">📋</div>
            <h3 className="text-lg font-medium text-gray-600">
              No jobs posted yet
            </h3>
            <p className="text-gray-500">
              Get started by creating your first job posting
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useSelector } from "react-redux";
// import { FaEdit, FaTrash, FaUsers } from "react-icons/fa";
// import { MdOutlineWork } from "react-icons/md";
// import { Link } from "react-router-dom";
// import Swal from "sweetalert2";
import Job from "./../../pages/userDashboardPages/Job";

// export default function EmployerAllPostedJobs() {
//   const token = useSelector((state) => state.auth.token);

//   const [jobs, setJobs] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const fetchAllJobs = async () => {
//     try {
//       const res = await axios.get("http://localhost:8000/get-jobs", {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       setJobs(res.data.jobs || []);
//     } catch (error) {
//       console.error("Error fetching jobs:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchAllJobs();
//   }, []);

//   if (loading) {
//     return (
//       <div className="flex items-center justify-center min-h-screen bg-gray-50">
//         <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
//       </div>
//     );
//   }

//   const handledelete = async (jobId) => {
//     const result = await Swal.fire({
//       title: "Are you sure?",
//       text: "You won't be able to revert this!",
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonColor: "#d33",
//       cancelButtonColor: "#3085d6",
//       confirmButtonText: "Yes, delete it!",
//     });

//     if (result.isConfirmed) {
//       try {
//         const response = await axios.delete(
//           `http://localhost:8000/remove/${jobId}`,
//           {
//             headers: { Authorization: `Bearer ${token}` },
//           }
//         );

//         if (response.data.success) {
//           Swal.fire("Deleted!", "Job has been deleted.", "success");
//           setJobs(jobs.filter((job) => job._id !== jobId));
//         }
//       } catch (error) {
//         Swal.fire("Error!", "Failed to delete job.", error);
//       }
//     }
//   };

//   return (
//     <div className="p-6 min-h-screen bg-gray-50">
//       <div className="max-w-6xl mx-auto">
//         <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
//           <div>
//             <h2 className="text-2xl font-bold text-gray-800">
//               All Posted Jobs
//             </h2>
//             <p className="text-gray-600">
//               Manage your job postings and applications
//             </p>
//           </div>

//           <div className="mt-4 md:mt-0">
//             <label className="mr-2 text-sm font-medium text-gray-700">
//               Filter by status:
//             </label>
//             <select className="px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
//               <option value="All">All Statuses</option>
//               <option value="Active">Active</option>
//               <option value="Closed">Closed</option>
//             </select>
//           </div>
//         </div>

//         <div className="grid gap-6">
//           {jobs.map((job) => (
//             <div
//               key={job._id}
//               className="bg-white shadow-md rounded-xl p-5 flex flex-col md:flex-row justify-between items-start md:items-center hover:shadow-lg transition"
//             >
//               <Link to={`/employer-dashboard/all-job/details/${job._id}`}>
//                 <div className="flex items-start gap-4">
//                   <div className="p-3 bg-blue-100 rounded-full">
//                     <MdOutlineWork className="text-blue-600 text-2xl" />
//                   </div>
//                   <div>
//                     <h3 className="text-lg font-semibold text-gray-800">
//                       {job.jobTitle}
//                     </h3>
//                     <p className="text-sm text-gray-500">
//                       {job.companyName} • {job.location}
//                     </p>
//                     <p className="text-sm text-gray-500 mt-1">
//                       Type:{" "}
//                       <span className="font-medium">{job.employmentType}</span>
//                     </p>
//                     <p className="text-sm text-gray-400">
//                       Posted on: {new Date(job.createdAt).toDateString()}
//                     </p>
//                   </div>
//                 </div>
//               </Link>

//               <div className="flex flex-col md:flex-row items-start md:items-center gap-4 mt-4 md:mt-0">
//                 <div className="flex items-center gap-2 text-gray-600">
//                   <FaUsers className="text-gray-500" />
//                   <span>{job.applicants?.length || 0} Applicants</span>
//                 </div>
//                 <div className="flex items-center gap-3">
//                   <Link to={`/employer-dashboard/all-job/${job._id}`}>
//                     <button className="p-2 bg-blue-100 rounded-full text-blue-600 hover:bg-blue-200 transition">
//                       <FaEdit />
//                     </button>
//                   </Link>
//                   <button
//                     className="p-2 bg-red-100 rounded-full text-red-600 hover:bg-red-200 transition"
//                     onClick={() => handledelete(job._id)}
//                   >
//                     <FaTrash />
//                   </button>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//         {jobs.length === 0 && (
//           <div className="text-center py-12">
//             <div className="text-4xl text-gray-400 mb-4">📋</div>
//             <h3 className="text-lg font-medium text-gray-600">
//               No jobs posted yet
//             </h3>
//             <p className="text-gray-500">
//               Get started by creating your first job posting
//             </p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }
