// import React, { useEffect, useState } from "react";
// import { useParams, useNavigate, Link } from "react-router-dom";
// import {
//   FiMail,
//   FiPhone,
//   FiMapPin,
//   FiBriefcase,
//   FiDownload,
//   FiArrowLeft,
// } from "react-icons/fi";
// import axios from "axios";
// import { useSelector } from "react-redux";

// const JobSeekerDetail = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();

//   const [profile, setProfile] = useState(null);
//   const token = useSelector((state) => state.auth.token);
//   const getApplicant = async () => {
//     try {
//       const response = await axios.get(
//         `http://localhost:8000/jobseeker-details/${id}`,
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );

//       setProfile(response.data.profile || null);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   useEffect(() => {
//     getApplicant();
//   }, [id]);

//   if (!profile) {
//     return (
//       <div className="min-h-screen bg-gray-50 flex items-center justify-center">
//         <div className="text-center">
//           <h1 className="text-2xl font-bold text-gray-900">
//             Applicant Not Found
//           </h1>
//           <button
//             onClick={() => navigate("/employer-dashboard")}
//             className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
//           >
//             Back to Applications
//           </button>
//         </div>
//       </div>
//     );
//   }

//   const handleDownload = () => {
//     if (profile.seekerresumeUrl) {
//       window.open(profile.seekerresumeUrl, "_blank");
//     } else {
//       alert("No resume uploaded");
//     }
//   };

//   return (
//     <>
//       <div className="min-h-screen bg-gray-50">
//         <div className="max-w-4xl mx-auto px-4 py-8">
//           <div className="mb-6">
//             <button
//               onClick={() => navigate(-1)}
//               className="flex items-center text-blue-600 hover:text-blue-800 mb-4"
//             >
//               <FiArrowLeft className="mr-2" /> Back to Applications
//             </button>
//             <div className="flex justify-between items-center">
//               <div>
//                 <h1 className="text-2xl font-bold text-gray-900">
//                   {profile?.userId.name}
//                 </h1>
//                 <p className="text-sm text-gray-600">{profile.headline}</p>
//               </div>
//               <button
//                 onClick={handleDownload}
//                 className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
//               >
//                 <FiDownload className="mr-2" />
//                 Download CV
//               </button>
//             </div>
//           </div>

//           <div className="bg-white rounded-lg shadow overflow-hidden">
//             <div className="px-6 py-5 border-b border-gray-200">
//               <div className="flex items-center">
//                 <div className="flex-shrink-0 h-16 w-16">
//                   <img
//                     className="h-16 w-16 rounded-full object-cover"
//                     src={profile.profileImage}
//                     alt="Profile"
//                   />
//                 </div>
//                 <div className="ml-4">
//                   <h2 className="text-xl font-bold text-gray-900">
//                     {profile?.userId.name}
//                   </h2>
//                   <p className="text-sm text-gray-500">
//                     {profile.seekerjobstitle} at {profile.seekerjobscompany}
//                   </p>
//                 </div>
//               </div>
//             </div>

//             <div className="px-6 py-6 grid grid-cols-1 md:grid-cols-3 gap-6">
//               <div className="md:col-span-1">
//                 <div className="bg-gray-50 p-4 rounded-lg">
//                   <h3 className="text-lg font-medium text-gray-900 mb-4">
//                     Contact Information
//                   </h3>

//                   <div className="space-y-3">
//                     <div className="flex items-center">
//                       <FiMail className="h-4 w-4 text-gray-400 mr-3" />
//                       <span className="text-sm text-gray-900">
//                         {profile?.userId.email}
//                       </span>
//                     </div>

//                     <div className="flex items-center">
//                       <FiPhone className="h-4 w-4 text-gray-400 mr-3" />
//                       <span className="text-sm text-gray-900">
//                         {profile?.userId.phone}
//                       </span>
//                     </div>

//                     <div className="flex items-center">
//                       <FiMapPin className="h-4 w-4 text-gray-400 mr-3" />
//                       <span className="text-sm text-gray-900">
//                         {profile.location}
//                       </span>
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               <div className="md:col-span-2 space-y-6">
//                 <div>
//                   <h3 className="text-lg font-medium text-gray-900 mb-2">
//                     About
//                   </h3>
//                   <p className="text-sm text-gray-700">{profile.about}</p>
//                 </div>

//                 <div>
//                   <h3 className="text-lg font-medium text-gray-900 mb-2">
//                     Skills
//                   </h3>
//                   <div className="flex flex-wrap gap-2">
//                     {profile.seekerskills.map((skill, i) => (
//                       <span
//                         key={i}
//                         className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full"
//                       >
//                         {skill}
//                       </span>
//                     ))}
//                   </div>
//                 </div>

//                 <div>
//                   <h3 className="text-lg font-medium text-gray-900 mb-2">
//                     Education
//                   </h3>
//                   <p className="text-sm text-gray-700">
//                     {profile.seekerdegree} from {profile.seekerinsitute}
//                   </p>
//                 </div>

//                 <div>
//                   <h3 className="text-lg font-medium text-gray-900 mb-2">
//                     Experience
//                   </h3>
//                   <p className="text-sm text-gray-700">
//                     {profile.seekerexperience}
//                   </p>
//                 </div>

//                 <div>
//                   <h3 className="text-lg font-medium text-gray-900 mb-2">
//                     Resume
//                   </h3>
//                   <div className="bg-gray-100 p-4 rounded-lg">
//                     {profile.seekerresumeUrl ? (
//                       <a
//                         href={profile.seekerresumeUrl}
//                         target="_blank"
//                         rel="noopener noreferrer"
//                         className="text-blue-600 hover:underline"
//                       >
//                         View Resume
//                       </a>
//                     ) : (
//                       <p className="text-sm text-gray-500">
//                         No resume uploaded.
//                       </p>
//                     )}
//                   </div>
//                 </div>
//               </div>
//             </div>

//             <div className="px-6 py-4 border-t border-gray-200 bg-gray-50 flex justify-end space-x-3">
//               <button
//                 onClick={() => navigate(-1)}
//                 className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
//               >
//                 Close
//               </button>
//               <Link to="schedule-interview">
//                 <button className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700">
//                   Schedule Interview
//                 </button>
//               </Link>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default JobSeekerDetail;


import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import {
  FiMail,
  FiPhone,
  FiMapPin,
  FiBriefcase,
  FiDownload,
  FiArrowLeft,
  FiCalendar,
  FiDollarSign,
  FiClock,
  FiAward,
  FiFileText,
} from "react-icons/fi";
import axios from "axios";
import { useSelector } from "react-redux";

const JobSeekerDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setloading] = useState(true);
  const [profile, setProfile] = useState(null);
  const [application, setApplication] = useState(null);
  const token = useSelector((state) => state.auth.token);

  const getApplicant = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8000/jobseeker-details/${id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setProfile(response.data.profile || null);
      setApplication(response.data.application || null);
    } catch (error) {
      console.log(error);
    } finally {
      setloading(false);
    }
  };

  useEffect(() => {
    getApplicant();
  }, [id]);
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }
  if (!profile) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900">
            Applicant Not Found
          </h1>
          <button
            onClick={() => navigate("/employer-dashboard")}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Back to Applications
          </button>
        </div>
      </div>
    );
  }


  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="mb-6">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center text-blue-600 hover:text-blue-800 mb-4 transition-colors duration-200"
          >
            <FiArrowLeft className="mr-2" /> Back to Applications
          </button>

          {/* <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                {profile?.userId?.name}
              </h1>
              <p className="text-lg text-gray-600 mt-1">{profile.headline}</p>

              {application && (
                <div className="mt-3 flex items-center gap-3">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                      application.status
                    )}`}
                  >
                    {application.status}
                  </span>
                  <span className="text-sm text-gray-500">
                    Applied on{" "}
                    {new Date(application.createdAt).toLocaleDateString()}
                  </span>
                </div>
              )}
            </div>

            <button
              onClick={handleDownload}
              className="flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 shadow-md"
            >
              <FiDownload className="mr-2" />
              Download CV
            </button>
          </div> */}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex justify-center mb-4">
                <img
                  className="h-32 w-32 rounded-full object-cover border-4 border-white shadow-lg"
                  src={profile.profileImage}
                  alt="Profile"
                />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-1 text-center">
                {profile?.userId?.name}
              </h3>
              <p className="text-lg text-center text-gray-600 mb-2.5">
                {profile.headline}
              </p>

              <div className="space-y-4">
                <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                  <FiMail className="h-5 w-5 text-blue-600 mr-3" />
                  <div className="truncate">
                    <p className="text-sm text-gray-500">Email</p>
                    <p className="truncate text-gray-900 font-medium">
                      {profile?.userId?.email}
                    </p>
                  </div>
                </div>

                <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                  <FiPhone className="h-5 w-5 text-blue-600 mr-3" />
                  <div>
                    <p className="text-sm text-gray-500">Phone</p>
                    <p className="text-gray-900 font-medium">
                      {profile?.userId?.phone}
                    </p>
                  </div>
                </div>

                <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                  <FiMapPin className="h-5 w-5 text-blue-600 mr-3" />
                  <div>
                    <p className="text-sm text-gray-500">Location</p>
                    <p className="text-gray-900 font-medium">
                      {profile.location}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {application && (
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  Application Details
                </h3>

                <div className="space-y-4">
                  <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                    <FiBriefcase className="h-5 w-5 text-blue-600 mr-3" />
                    <div>
                      <p className="text-sm text-gray-500">Last Company</p>
                      <p className="text-gray-900 font-medium">
                        {application.lastcompany || "Not specified"}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                    <FiDollarSign className="h-5 w-5 text-blue-600 mr-3" />
                    <div>
                      <p className="text-sm text-gray-500">Last Salary</p>
                      <p className="text-gray-900 font-medium">
                        {application.lastsalary || "Not specified"}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                    <FiClock className="h-5 w-5 text-blue-600 mr-3" />
                    <div>
                      <p className="text-sm text-gray-500">Availability</p>
                      <p className="text-gray-900 font-medium">
                        {application.availability}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                    <FiAward className="h-5 w-5 text-blue-600 mr-3" />
                    <div>
                      <p className="text-sm text-gray-500">Experience</p>
                      <p className="text-gray-900 font-medium">
                        {application.experience}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <FiFileText className="mr-2 text-blue-600" />
                About
              </h3>
              <p className="text-gray-700 leading-relaxed">{profile.about}</p>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <FiAward className="mr-2 text-blue-600" />
                Skills & Expertise
              </h3>
              <div className="flex flex-wrap gap-3">
                {profile.seekerskills.map((skill, i) => (
                  <span
                    key={i}
                    className="px-4 py-2 bg-blue-200 text-blue-800 text-sm font-medium rounded-full"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                  <FiBriefcase className="mr-2 text-blue-600" />
                  Professional Experience
                </h3>
                <div className="space-y-3">
                  <div>
                    <p className="font-medium text-gray-900">
                      {profile.seekerjobstitle}
                    </p>
                    <p className="text-gray-600">{profile.seekerjobscompany}</p>
                    <p className="text-sm text-gray-500 mt-1">
                      {profile.seekerexperience}
                    </p>
                  </div>
                  <p className="text-gray-700 text-sm mt-2">
                    {profile.seekerjobdescripition}
                  </p>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                  <FiAward className="mr-2 text-blue-600" />
                  Education
                </h3>
                <div className="space-y-3">
                  <div>
                    <p className="font-medium text-gray-900">
                      {profile.seekerdegree}
                    </p>
                    <p className="text-gray-600">{profile.seekerinsitute}</p>
                    <p className="text-sm text-gray-500 mt-1">
                      {profile.seekereducation}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {application?.coverLetter && (
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                  <FiFileText className="mr-2 text-blue-600" />
                  Cover Letter
                </h3>
                <p className="text-gray-700 leading-relaxed bg-gray-50 p-4 rounded-lg">
                  {application.coverLetter}
                </p>
              </div>
            )}

            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <FiDownload className="mr-2 text-blue-600" />
                Resume
              </h3>
              <div className="bg-gray-50 p-4 rounded-lg">
                {profile.seekerresumeUrl ? (
                  <div className="flex items-center justify-between">
                    <span className="text-gray-700">
                      View candidate's resume
                    </span>
                    <a
                      href={profile.seekerresumeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
                    >
                      View Resume
                    </a>
                  </div>
                ) : (
                  <p className="text-gray-500">No resume uploaded.</p>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 bg-white rounded-xl shadow-sm p-6">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="text-sm text-gray-500">
              Last updated: {new Date(profile.updatedAt).toLocaleDateString()}
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => navigate(-1)}
                className="px-6 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors duration-200"
              >
                Close
              </button>
              <Link to="schedule-interview">
                <button className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200 shadow-md">
                  Schedule Interview
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobSeekerDetail;
