import React from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import {
  FiCalendar,
  FiClock,
  FiUser,
  FiFileText,
  FiArrowLeft,
} from "react-icons/fi";
import axios from "axios";
import { useSelector } from "react-redux";

const ScheduleInterview = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const token = useSelector((state) => state.auth.token);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const respo = await axios.post(
        `http://localhost:8000/interview/${id}`,
        data,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      console.log(respo);
      navigate(`/employer-dashboard/view-interviews`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="mb-4">
          <Link
            to={`/employer-dashboard/applicant/${id}`}
            className="flex items-center text-blue-600 hover:text-blue-800 mb-4"
          >
            <FiArrowLeft className="mr-2" /> Back to Applicant Details
          </Link>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
            Schedule Interview
          </h1>
          <p className="text-sm sm:text-base text-gray-600 mt-1">
            Set up an interview with the candidate
          </p>
        </div>

        <div className="bg-white rounded-lg shadow overflow-hidden">
          <form onSubmit={handleSubmit(onSubmit)} className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Interview Date
                </label>
                <input
                  type="date"
                  {...register("date", {
                    required: "Interview date is required",
                  })}
                  className="pl-10 w-full border border-gray-300 rounded-md py-2 px-3"
                />
                {errors.date && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.date.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Interview Time
                </label>
                <input
                  type="time"
                  {...register("time", {
                    required: "Interview time is required",
                  })}
                  className="pl-10 w-full border border-gray-300 rounded-md py-2 px-3"
                />
                {errors.time && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.time.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Interviewer Name
                </label>
                <input
                  type="text"
                  placeholder="Interviewer name"
                  {...register("interviewername", {
                    required: "Interviewer name is required",
                  })}
                  className="pl-10 w-full border border-gray-300 rounded-md py-2 px-3"
                />
                {errors.interviewername && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.interviewername.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Meeting URL
                </label>
                <input
                  type="text"
                  placeholder="https://meet.example.com/room"
                  {...register("meetingurl", {
                    required: "Meeting URL is required",
                  })}
                  className="w-full border border-gray-300 rounded-md py-2 px-3"
                />
                {errors.meetingurl && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.meetingurl.message}
                  </p>
                )}
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Notes/Agenda
                </label>
                <div className="relative">
                  <div className="absolute top-3 left-3 pointer-events-none">
                    <FiFileText className="h-5 w-5 text-gray-400" />
                  </div>
                  <textarea
                    {...register("notes")}
                    rows={4}
                    placeholder="Add any notes or agenda items for the interview..."
                    className="pl-10 w-full border border-gray-300 rounded-md py-2 px-3"
                  ></textarea>
                  {errors.notes && <p>{errors.notes.message}</p>}
                </div>
              </div>
            </div>

            <div className="mt-8 flex justify-end space-x-3">
              <button
                type="button"
                onClick={() => navigate(`/employer-dashboard/applicants`)}
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
              >
                Schedule Interview
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ScheduleInterview;

// import React, { useState } from "react";
// import { useParams, useNavigate,Link } from "react-router-dom";
// import {
//   FiMail,
//   FiPhone,
//   FiMapPin,
//   FiBriefcase,
//   FiDownload,
//   FiArrowLeft,
//   FiCalendar,
//   FiClock,
//   FiUser,
//   FiFileText,
// } from "react-icons/fi";

// const ScheduleInterview = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();

//   const [formData, setformData] = useState({
//     date: "",
//     time: "",
//     duration: "",
//     interviewer: "",
//     interviewType: "",
//     location: "",
//     notes: "",
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setformData((pre) => ({ ...pre, [name]: value }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     alert(`Interview scheduled for ${formData.date} at ${formData.time}`);
//     navigate(`/employer-dashboard/view-interviews`);
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 py-8 px-4">
//       <div className="max-w-2xl mx-auto">
//         <div className="mb-8">
//           <Link
//             to={`/employer-dashboard/applicant/${id}`}
//             className="flex items-center text-blue-600 hover:text-blue-800 mb-4"
//           >
//             <FiArrowLeft className="mr-2" /> Back to Applicant Details
//           </Link>
//           <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
//             Schedule Interview
//           </h1>
//           <p className="text-sm sm:text-base text-gray-600 mt-1">
//             Set up an interview with the candidate
//           </p>
//         </div>

//         <div className="bg-white rounded-lg shadow overflow-hidden">
//           <form onSubmit={handleSubmit} className="p-6">
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               <div className="md:col-span-1">
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Interview Date
//                 </label>
//                 <div className="relative">
//                   <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                     <FiCalendar className="h-5 w-5 text-gray-400" />
//                   </div>
//                   <input
//                     type="date"
//                     name="date"
//                     value={formData.date}
//                     onChange={handleChange}
//                     className="pl-10 w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                     required
//                   />
//                 </div>
//               </div>

//               <div className="md:col-span-1">
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Interview Time
//                 </label>
//                 <div className="relative">
//                   <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                     <FiClock className="h-5 w-5 text-gray-400" />
//                   </div>
//                   <input
//                     type="time"
//                     name="time"
//                     value={formData.time}
//                     onChange={handleChange}
//                     className="pl-10 w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                     required
//                   />
//                 </div>
//               </div>

//               <div className="md:col-span-1">
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Duration (minutes)
//                 </label>
//                 <select
//                   name="duration"
//                   value={formData.duration}
//                   onChange={handleChange}
//                   className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                 >
//                   <option value="30">30 minutes</option>
//                   <option value="45">45 minutes</option>
//                   <option value="60">60 minutes</option>
//                   <option value="90">90 minutes</option>
//                 </select>
//               </div>

//               <div className="md:col-span-1">
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Interviewer
//                 </label>
//                 <div className="relative">
//                   <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                     <FiUser className="h-5 w-5 text-gray-400" />
//                   </div>
//                   <input
//                     type="text"
//                     name="interviewer"
//                     value={formData.interviewer}
//                     onChange={handleChange}
//                     placeholder="Interviewer name"
//                     className="pl-10 w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                     required
//                   />
//                 </div>
//               </div>

//               <div className="md:col-span-1">
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Interview Type
//                 </label>
//                 <select
//                   name="interviewType"
//                   value={formData.interviewType}
//                   onChange={handleChange}
//                   className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                 >
//                   <option value="online">online</option>
//                   <option value="phone">Phone Call</option>
//                 </select>
//               </div>

//               <div className="md:col-span-1">
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   {formData.interviewType === "in-person"
//                     ? "Location"
//                     : "Meeting URL"}
//                 </label>
//                 <input
//                   type="text"
//                   name="location"
//                   value={formData.location}
//                   onChange={handleChange}
//                   placeholder={"https://meet.example.com/room"}
//                   className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                   required
//                 />
//               </div>

//               <div className="md:col-span-2">
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Notes/Agenda
//                 </label>
//                 <div className="relative">
//                   <div className="absolute top-3 left-3 pointer-events-none">
//                     <FiFileText className="h-5 w-5 text-gray-400" />
//                   </div>
//                   <textarea
//                     name="notes"
//                     value={formData.notes}
//                     onChange={handleChange}
//                     rows={4}
//                     placeholder="Add any notes or agenda items for the interview..."
//                     className="pl-10 w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                   ></textarea>
//                 </div>
//               </div>
//             </div>

//             <div className="mt-8 flex justify-end space-x-3">
//               <button
//                 type="button"
//                 onClick={() => navigate(`/employer-dashboard/applicants`)}
//                 className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
//               >
//                 Cancel
//               </button>
//               <button
//                 type="submit"
//                 className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
//               >
//                 Schedule Interview
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ScheduleInterview;
