import React from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import {
  FiCalendar,
  FiClock,
  FiUser,
  FiFileText,
  FiArrowLeft,
  FiLink,
} from "react-icons/fi";
import { useSelector } from "react-redux";
import api from "../../api/register";
import Swal from "sweetalert2";

const ScheduleInterview = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const token = useSelector((state) => state.auth.token);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onBlur" });

  const onSubmit = async (data) => {
    try {
      const respo = await api.post(
        `/interview/${id}`,
        data,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      
      if (respo.data.success || respo.status === 200 || respo.status === 201) {
        Swal.fire({
          icon: "success",
          title: "Interview Scheduled",
          text: "The candidate has been notified.",
          timer: 2000,
          showConfirmButton: false
        });
        navigate(`/employer-dashboard/view-interviews`);
      }
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: "error",
        title: "Scheduling Failed",
        text: "Could not schedule the interview. Please try again.",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="mb-6 flex items-center justify-between">
          <Link
            to={`/employer-dashboard/applicant/${id}`}
            className="flex items-center text-gray-600 hover:text-blue-600 font-medium transition-colors"
          >
            <FiArrowLeft className="mr-2" /> Back to Applicant
          </Link>
          <span className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
            Interview Setup
          </span>
        </div>

        <div className="bg-white shadow-2xl rounded-2xl p-8 border border-gray-100 animate-slide-up">
          <div className="text-center mb-10">
            <h1 className="text-3xl font-extrabold text-gray-900">
              Schedule Interview
            </h1>
            <p className="text-gray-500 mt-2 italic">
              Set a date and time to meet with your potential candidate.
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Interview Date */}
              <div>
                <label htmlFor="date" className="block text-sm font-semibold text-gray-700 mb-1 cursor-pointer">
                  Interview Date <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiCalendar className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="date"
                    type="date"
                    {...register("date", {
                      required: "Interview date is required",
                    })}
                    className={`pl-10 w-full border px-4 py-2.5 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all ${
                      errors.date ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                </div>
                {errors.date && (
                  <p className="text-red-500 text-xs mt-1 italic">{errors.date.message}</p>
                )}
              </div>

              {/* Interview Time */}
              <div>
                <label htmlFor="time" className="block text-sm font-semibold text-gray-700 mb-1 cursor-pointer">
                  Interview Time <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiClock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="time"
                    type="time"
                    {...register("time", {
                      required: "Interview time is required",
                    })}
                    className={`pl-10 w-full border px-4 py-2.5 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all ${
                      errors.time ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                </div>
                {errors.time && (
                  <p className="text-red-500 text-xs mt-1 italic">{errors.time.message}</p>
                )}
              </div>

              {/* Interviewer Name */}
              <div>
                <label htmlFor="interviewername" className="block text-sm font-semibold text-gray-700 mb-1 cursor-pointer">
                  Interviewer Name <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiUser className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="interviewername"
                    type="text"
                    placeholder="e.g. John Doe"
                    {...register("interviewername", {
                      required: "Interviewer name is required",
                    })}
                    className={`pl-10 w-full border px-4 py-2.5 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all ${
                      errors.interviewername ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                </div>
                {errors.interviewername && (
                  <p className="text-red-500 text-xs mt-1 italic">{errors.interviewername.message}</p>
                )}
              </div>

              {/* Meeting URL */}
              <div>
                <label htmlFor="meetingurl" className="block text-sm font-semibold text-gray-700 mb-1 cursor-pointer">
                  Meeting URL <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiLink className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="meetingurl"
                    type="url"
                    placeholder="https://meet.google.com/xxx-xxxx-xxx"
                    {...register("meetingurl", {
                      required: "Meeting URL is required",
                      pattern: {
                        value: /^(https?:\/\/)?[\w.-]+\.[a-z]{2,}(\S*)?$/,
                        message: "Enter a valid URL",
                      },
                    })}
                    className={`pl-10 w-full border px-4 py-2.5 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all ${
                      errors.meetingurl ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                </div>
                {errors.meetingurl && (
                  <p className="text-red-500 text-xs mt-1 italic">{errors.meetingurl.message}</p>
                )}
              </div>

              {/* Notes/Agenda */}
              <div className="md:col-span-2">
                <label htmlFor="notes" className="block text-sm font-semibold text-gray-700 mb-1 cursor-pointer">
                  Notes / Agenda
                </label>
                <div className="relative">
                  <div className="absolute top-3 left-3 pointer-events-none">
                    <FiFileText className="h-5 w-5 text-gray-400" />
                  </div>
                  <textarea
                    id="notes"
                    {...register("notes")}
                    rows={4}
                    placeholder="Briefly describe what will be discussed..."
                    className="pl-10 w-full border border-gray-300 rounded-lg py-2.5 px-4 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all resize-none"
                  ></textarea>
                </div>
              </div>
            </div>

            <div className="pt-8 flex space-x-4 border-t border-gray-100">
              <button
                type="button"
                onClick={() => navigate(-1)}
                className="flex-1 px-8 py-3 border-2 border-gray-200 text-gray-600 rounded-xl font-bold hover:bg-gray-50 transition-all active:scale-95"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-[2] px-8 py-3 bg-green-600 text-white rounded-xl font-bold hover:bg-green-700 shadow-md hover:shadow-lg transform active:scale-95 transition-all text-center"
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
