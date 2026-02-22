import React from "react";
import {
  FaMapMarkerAlt,
  FaBriefcase,
  FaMoneyBillWave,
  FaClock,
} from "react-icons/fa";
import TranslatedText from "../TranslatedText";

export default function LeftSidejob({ selectedJob, setSelectedJob, jobs }) {
  return (
    <div className="px-2">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 mb-2 gap-2 border-b border-gray-50">
        <h2 className="text-lg font-bold text-gray-800">
          <span className="text-blue-600">{jobs.length}</span>{" "}
          <TranslatedText>Available Positions</TranslatedText>
        </h2>
      </div>

      {jobs.length > 0 ? (
        <div className="space-y-3 p-2">
          {jobs.map((job) => {
            const isSelected = selectedJob?._id === job._id;
            
            return (
              <div
                key={job._id}
                className={`group relative rounded-xl p-5 cursor-pointer transition-all duration-300 border ${
                  isSelected
                    ? "bg-blue-50 border-blue-200 shadow-sm ring-1 ring-blue-100"
                    : "bg-white border-gray-100 hover:border-blue-200 hover:shadow-md"
                }`}
                onClick={() => setSelectedJob(job)}
              >
                {isSelected && (
                  <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-blue-600 rounded-l-xl" />
                )}

                <div className="flex justify-between items-start mb-3">
                  <div className="flex-1 min-w-0 mr-3">
                    <h3
                      className={`text-lg font-bold truncate transition-colors ${
                        isSelected
                          ? "text-blue-700"
                          : "text-gray-900 group-hover:text-blue-600"
                      }`}
                    >
                      <TranslatedText>{job.jobTitle}</TranslatedText>
                    </h3>
                    <p className="text-gray-700 font-medium truncate">
                      <TranslatedText>{job.companyName}</TranslatedText>
                    </p>
                  </div>
                  {job.remote && (
                    <span className="bg-green-50 text-green-700 text-[10px] px-2 py-0.5 rounded-full font-bold border border-green-100 uppercase tracking-tighter">
                      Remote
                    </span>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-y-2.5 gap-x-3 text-[13px] text-gray-500">
                  <div className="flex items-center">
                    <FaMapMarkerAlt className="mr-2 text-gray-400 flex-shrink-0" />
                    <span className="truncate">
                      <TranslatedText>{job.location}</TranslatedText>
                    </span>
                  </div>
                  
                  <div className="flex items-center">
                    <FaBriefcase className="mr-2 text-gray-400 flex-shrink-0" />
                    <span className="truncate">
                      <TranslatedText>{job.employmentType}</TranslatedText>
                    </span>
                  </div>
                  
                  <div className="flex items-center">
                    <FaMoneyBillWave className="mr-2 text-gray-400 flex-shrink-0" />
                    <span className="font-semibold text-gray-700">
                      <TranslatedText>{job.salary}</TranslatedText>
                    </span>
                  </div>
                  
                  <div className="flex items-center">
                    <FaClock className="mr-2 text-gray-400 flex-shrink-0" />
                    <span>{new Date(job.createdAt).toLocaleDateString()}</span>
                  </div>
                </div>

                {job.skills && job.skills.length > 0 && (
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {job.skills.slice(0, 3).map((skill, index) => (
                      <span
                        key={index}
                        className="bg-gray-50 text-gray-600 text-[11px] px-2 py-0.5 rounded-md border border-gray-100 group-hover:border-blue-100 group-hover:bg-blue-50/50"
                      >
                        {skill}
                      </span>
                    ))}
                    {job.skills.length > 3 && (
                      <span className="text-[11px] text-gray-400 font-medium self-center">
                        +{job.skills.length - 3}
                      </span>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      ) : (
        <div className="p-8 text-center bg-gray-50/50 rounded-xl border border-dashed border-gray-200 m-4">
          <p className="text-gray-400 font-medium">
            <TranslatedText>No jobs match your criteria</TranslatedText>
          </p>
        </div>
      )}
    </div>
  );
}

// import React from "react";
// import {
//   FaMapMarkerAlt,
//   FaBriefcase,
//   FaMoneyBillWave,
//   FaClock,
// } from "react-icons/fa";
// import TranslatedText from "../TranslatedText";
// import TranslatedText from "../TranslatedText";

// export default function LeftSidejob({ selectedJob, setSelectedJob, jobs }) {
//   return (
//     <div className="px-2">
//       <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 mb-2 gap-2 border-b border-gray-50">
//         <h2 className="text-lg font-bold text-gray-800">
//           <span className="text-blue-600">{jobs.length}</span>{" "}
//           <TranslatedText>Available Positions</TranslatedText>
//         </h2>
//       </div>

//       {jobs.length > 0 ? (
//         <div className="space-y-3 p-2">
//           {jobs.map((job) => {
//             const isSelected = selectedJob?._id === job._id;
//             return (
//               <div
//                 key={job._id}
//                 className={`group relative rounded-xl p-5 cursor-pointer transition-all duration-300 border ${
//                   isSelected
//                     ? "bg-blue-50 border-blue-200 shadow-sm ring-1 ring-blue-100"
//                     : "bg-white border-gray-100 hover:border-blue-200 hover:shadow-md"
//                 }`}
//                 onClick={() => setSelectedJob(job)}
//               >
//                 {isSelected && (
//                   <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-blue-600 rounded-l-xl" />
//                 )}

//                 <div className="flex justify-between items-start mb-3">
//                   <div className="flex-1 min-w-0 mr-3">
//                     <h3 className={`text-lg font-bold truncate transition-colors ${
//                       isSelected ? "text-blue-700" : "text-gray-900 group-hover:text-blue-600"
//                     }`}>
//                       <TranslatedText>{job.jobTitle}</TranslatedText>
//                 key={index}
//                 className="bg-white rounded-lg shadow-md p-4 sm:p-6 cursor-pointer transition-all hover:shadow-lg 
//                     border-l-4 border-blue-500"
//                 onClick={() => {
//                   setSelectedJob(job);
//                 }}
//               >
//                 <div className="flex justify-between items-start gap-2">
//                   <div className="flex-1 min-w-0">
//                     <h3 className="text-lg sm:text-xl font-semibold text-blue-600 hover:text-blue-800 truncate">
//                       <TranslatedText>{job.jobTitle}</TranslatedText>
//                     </h3>
//                     <p className="text-gray-500 font-medium text-sm mt-0.5 truncate flex items-center gap-1">
//                       <span className="text-blue-400 group-hover:text-blue-500 font-bold">@</span>
//                       <TranslatedText>{job.companyName}</TranslatedText>
//                     <p className="text-gray-700 font-medium truncate">
//                       <TranslatedText>{job.companyName}</TranslatedText>
//                     </p>
//                   </div>
//                   {job.remote && (
//                     <span className="bg-green-50 text-green-700 text-[10px] px-2 py-0.5 rounded-full font-bold border border-green-100 uppercase tracking-tighter">
//                       Remote
//                     </span>
//                   )}
//                 </div>

//                 <div className="grid grid-cols-2 gap-y-2.5 gap-x-3 text-[13px] text-gray-500">
//                   <div className="flex items-center">
//                     <FaMapMarkerAlt className="mr-2 text-gray-400 flex-shrink-0" />
//                     <span className="truncate">
//                       <TranslatedText>{job.location}</TranslatedText>
//                     </span>
//                     <FaMapMarkerAlt className="mr-2 flex-shrink-0" />
//                     <span className="truncate">
//                       <TranslatedText>{job.location}</TranslatedText>
//                     </span>
//                   </div>
//                   <div className="flex items-center">
//                     <FaBriefcase className="mr-2 text-gray-400 flex-shrink-0" />
//                     <span className="truncate">
//                       <TranslatedText>{job.employmentType}</TranslatedText>
//                     </span>
//                   </div>
//                   <div className="flex items-center">
//                     <FaMoneyBillWave className="mr-2 text-gray-400 flex-shrink-0" />
//                     <span className="font-semibold text-gray-700">
//                       <TranslatedText>{job.salary}</TranslatedText>
//                     </span>
//                   </div>
//                   <div className="flex items-center">
//                     <FaClock className="mr-2 text-gray-400 flex-shrink-0" />
//                     <span>{new Date(job.createdAt).toLocaleDateString()}</span>
//                   </div>
//                 </div>

//                 {job.skills && job.skills.length > 0 && (
//                   <div className="mt-4 flex flex-wrap gap-1.5">
//                     {job.skills.slice(0, 3).map((skill, index) => (
//                       <span
//                         key={index}
//                         className="bg-gray-50 text-gray-600 text-[11px] px-2 py-0.5 rounded-md border border-gray-100 group-hover:border-blue-100 group-hover:bg-blue-50/50"
//                       >
//                         {skill}
//                       </span>
//                     ))}
//                     {job.skills.length > 3 && (
//                       <span className="text-[11px] text-gray-400 font-medium self-center">
//                         +{job.skills.length - 3}
//                       </span>
//                     )}
//                   </div>
//                 )}
//               </div>
//             );
//           })}
//         </div>
//       ) : (
//         <div className="p-8 text-center bg-gray-50/50 rounded-xl border border-dashed border-gray-200 m-4">
//           <p className="text-gray-400 font-medium">
//             <TranslatedText>No jobs match your criteria</TranslatedText>
//           </p>
//         </div>
//       )}
//     </div>
//   );
// }
