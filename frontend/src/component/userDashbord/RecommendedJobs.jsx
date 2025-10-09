import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  FiUser,
  FiBriefcase,
  FiMapPin,
  FiDollarSign,
  FiClock,
  FiTrendingUp,
  FiSearch,
} from "react-icons/fi";
import { MdWorkOutline, MdBusinessCenter } from "react-icons/md";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const UserDashboard = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = useSelector((state) => state.auth.token);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const resp = await axios.get("http://localhost:8000/getjobsdashboard", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setJobs(resp.data.jobs || []);
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      fetchDashboardData();
    }
  }, [token]);

  const formatSalary = (salary) => {
    if (!salary) return "Not specified";
    if (typeof salary === "number") {
      return `$${salary.toLocaleString()}/year`;
    }
    return salary;
  };

  const getDaysAgo = (date) => {
    const now = new Date();
    const postedDate = new Date(date);
    const diffTime = Math.abs(now - postedDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 1) return "1 day ago";
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.ceil(diffDays / 7)} weeks ago`;
    return `${Math.ceil(diffDays / 30)} months ago`;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading job recommendations...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen  py-8">
      <div className=" rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold text-gray-900">
                Recommended Jobs
              </h2>
              <p className="text-gray-600 mt-1">
                Latest opportunities matching your profile
              </p>
            </div>
            <Link
              to="jobs"
              className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 font-medium"
            >
              <span>View All Jobs</span>
              <FiSearch className="text-lg" />
            </Link>
          </div>
        </div>

        <div className="p-6">
          {jobs.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {jobs.map((job) => (
                <div
                  key={job._id}
                  className="border border-gray-200 rounded-lg p-6 hover:border-blue-300 hover:shadow-md transition duration-200 group"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-blue-200 rounded-lg flex items-center justify-center">
                        <MdWorkOutline className="text-2xl text-blue-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition duration-200">
                          {job.jobTitle}
                        </h3>
                        <p className="text-sm text-gray-600">
                          {job.companyName}
                        </p>
                      </div>
                    </div>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        job.status === "Active"
                          ? "bg-green-100 text-green-800"
                          : job.status === "Closed"
                          ? "bg-red-100 text-red-800"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {job.status}
                    </span>
                  </div>

                  <div className="space-y-3 mb-4">
                    <div className="flex items-center text-sm text-gray-600">
                      <FiMapPin className="mr-2" />
                      <span>{job.location}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <FiDollarSign className="mr-2" />
                      <span>{formatSalary(job.salary)}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <FiClock className="mr-2" />
                      <span>{job.employmentType}</span>
                    </div>
                  </div>

                  <div className="mb-4">
                    <div className="flex flex-wrap gap-2">
                      {job.skills.slice(0, 3).map((skill, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-md"
                        >
                          {skill}
                        </span>
                      ))}
                      {job.skills.length > 3 && (
                        <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-md">
                          +{job.skills.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <span className="text-xs text-gray-500">
                      Posted {getDaysAgo(job.createdAt)}
                    </span>
                    <Link
                      to={`jobs`}
                      className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                    >
                      View Details →
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <FiBriefcase className="text-4xl text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No jobs available
              </h3>
              <p className="text-gray-600 mb-4">
                Check back later for new opportunities
              </p>
              <Link
                to="jobs"
                className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200"
              >
                <FiSearch className="mr-2" />
                Browse All Jobs
              </Link>
            </div>
          )}
        </div>
      </div>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-100">
          <h3 className="font-semibold text-gray-900 mb-2">
            Update Your Profile
          </h3>
          <p className="text-gray-600 text-sm mb-4">
            Keep your profile updated to get better job matches
          </p>
          <Link
            to="profile"
            className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium"
          >
            Edit Profile →
          </Link>
        </div>

        <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6 border border-green-100">
          <h3 className="font-semibold text-gray-900 mb-2">
            Application Status
          </h3>
          <p className="text-gray-600 text-sm mb-4">
            Track your job applications and interview status
          </p>
          <Link
            to="applied"
            className="inline-flex items-center text-green-600 hover:text-green-700 font-medium"
          >
            View Applications →
          </Link>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;

// import axios from "axios";
// import React, { useEffect, useState } from "react";
// import { FiUser } from "react-icons/fi";
// import { useSelector } from "react-redux";
// import { Link } from "react-router-dom";

// const UserDashboard = () => {
//   const [profile, setProfile] = useState(0);
//   const [missingFields, setMissingFields] = useState([]);
//   const token = useSelector((state) => state.auth.token);
//   const fetchProfile = async () => {
//     try {
//       const resp = await axios.get("http://localhost:8000/get-profile-score", {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setProfile(resp.data.profileCompletion || 0);
//       setMissingFields(resp.data.missingFields || []);
//     } catch (error) {
//       console.error("Error fetching profile score:", error);
//     }
//   };

//   useEffect(() => {
//     if (token) {
//       fetchProfile();
//     }
//   }, [token]);

//   return (
//     <div className="min-h-screen bg-gray-50 py-8">
//       <div className="max-w-8xl">
//         {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
//           <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
//             <div className="flex items-center justify-between mb-4">
//               <h2 className="text-lg font-semibold text-gray-800">
//                 Job Opportunities
//               </h2>
//               <FiBriefcase className="h-6 w-6 text-blue-600" />
//             </div>
//             <p className="text-3xl font-bold text-gray-900 mb-2">12</p>
//             <p className="text-gray-600 text-sm mb-4">
//               New jobs match your profile
//             </p>
//             <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors">
//               Browse All Jobs
//             </button>
//           </div>

//           <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
//             <div className="flex items-center justify-between mb-4">
//               <h2 className="text-lg font-semibold text-gray-800">
//                 Interviews
//               </h2>
//               <FiCalendar className="h-6 w-6 text-green-600" />
//             </div>
//             <p className="text-3xl font-bold text-gray-900 mb-2">2 </p>
//             <p className="text-gray-600 text-sm mb-4">Upcoming interviews</p>
//             <button className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-colors">
//               View Interviews
//             </button>
//           </div>

//           <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
//             <div className="flex items-center justify-between mb-4">
//               <h2 className="text-lg font-semibold text-gray-800">
//                 Applications
//               </h2>
//               <FiFileText className="h-6 w-6 text-purple-600" />
//             </div>
//             <p className="text-3xl font-bold text-gray-900 mb-2">12 </p>
//             <p className="text-gray-600 text-sm mb-4">
//               Total applications submitted
//             </p>
//             <button className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition-colors">
//               View Applications
//             </button>
//           </div>
//         </div> */}

//         <div className="grid grid-cols-1 lg:grid-cols-1 gap-6">
//           <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100 hover:shadow-lg transition-shadow duration-300">
//             <h2 className="text-lg font-semibold text-gray-800 mb-5 flex items-center">
//               <FiUser className="h-5 w-5 text-black mr-2" />
//               Profile Completion
//             </h2>

//             <div className="mb-6">
//               <div className="flex justify-between text-sm text-gray-600 mb-2">
//                 <span>Profile Completion</span>
//                 <span className="font-medium text-gray-800">{profile}%</span>
//               </div>
//               <div className="w-full bg-gray-200 rounded-full h-3">
//                 <div
//                   className="bg-gradient-to-r from-orange-500 to-orange-600 h-3 rounded-full transition-all duration-500 ease-out"
//                   style={{ width: `${profile}%` }}
//                 ></div>
//               </div>

//               {profile < 100 && (
//                 <div className="mt-3 text-sm text-gray-700 bg-gray-50 px-3 py-2 rounded-lg border border-amber-50">
//                   <p>
//                     Your profile is{" "}
//                     <span className="font-semibold">
//                       {100 - profile}% incomplete
//                     </span>
//                     .
//                   </p>
//                   {missingFields.length > 0 && (
//                     <p className="mt-1">
//                       Missing:{" "}
//                       <span className="font-semibold">
//                         {missingFields.join(", ")}
//                       </span>
//                     </p>
//                   )}
//                 </div>
//               )}
//             </div>

//             <p className="text-gray-600 text-sm mb-5 leading-relaxed">
//               Complete your profile to get more job matches and interview calls
//               🚀
//             </p>

//             <Link
//               to={"profile"}
//               className="bg-blue-600 text-white font-medium py-2.5 px-4 rounded-lg hover:bg-blue-700 active:scale-95 transition transform duration-200"
//             >
//               Complete Profile
//             </Link>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default UserDashboard;
