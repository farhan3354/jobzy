import {
  FiCalendar,
  FiClock,
  FiUser,
  FiFileText,
  FiArrowLeft,
} from "react-icons/fi";
import axios from "axios";
import { useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";

const EditScheduledInterview = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const token = useSelector((state) => state.auth.token);
  const [loading, setLoading] = useState(true);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  useEffect(() => {
    const fetchInterviewData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/getinterview/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const interview = response.data.interview;

        reset({
          date: interview.date?.split("T")[0],
          time: interview.time,
          interviewername: interview.interviewername,
          meetingurl: interview.meetingurl,
          notes: interview.notes,
        });

        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch interview data:", error);
        setLoading(false);
      }
    };

    fetchInterviewData();
  }, [id, token, reset]);

  const onSubmit = async (data) => {
    try {
      const respo = await axios.put(
        `http://localhost:8000/editinterview/${id}`,
        data,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      console.log(respo);
      navigate(`/employer-dashboard/view-interviews`);
    } catch (error) {
      console.log(error);
    }
  };
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-700 text-lg">Loading interview data...</p>
      </div>
    );
  }
  return (
    <>
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
    </>
  );
};

export default EditScheduledInterview;
