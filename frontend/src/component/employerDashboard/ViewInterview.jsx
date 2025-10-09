import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FiArrowLeft,
  FiCalendar,
  FiClock,
  FiUser,
  FiVideo,
  FiEdit,
  FiFilter,
} from "react-icons/fi";
import { MdEmail } from "react-icons/md";
import axios from "axios";
import { useSelector } from "react-redux";
import { LuNotebookPen } from "react-icons/lu";

const ViewInterview = () => {
  const navigate = useNavigate();
  const [interviews, setInterviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("upcoming");
  const token = useSelector((state) => state.auth.token);

  const fetchData = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/getinterview`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setInterviews(response.data.intervi || []);
    } catch (error) {
      console.log("Error fetching interviews:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [token]);

  const filteredInterviews = interviews.filter((interview) => {
    const interviewDate = new Date(interview.date);
    const today = new Date();

    const interviewDay = new Date(
      interviewDate.getFullYear(),
      interviewDate.getMonth(),
      interviewDate.getDate()
    );
    const todayDay = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate()
    );

    if (filter === "upcoming") {
      return interviewDay >= todayDay;
    } else {
      return interviewDay < todayDay;
    }
  });

  const sortedInterviews = [...filteredInterviews].sort((a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);

    if (filter === "upcoming") {
      return dateA - dateB;
    } else {
      return dateB - dateA;
    }
  });

  const upcomingCount = interviews.filter((interview) => {
    const interviewDate = new Date(interview.date);
    const today = new Date();
    const interviewDay = new Date(
      interviewDate.getFullYear(),
      interviewDate.getMonth(),
      interviewDate.getDate()
    );
    const todayDay = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate()
    );
    return interviewDay >= todayDay;
  }).length;

  const pastCount = interviews.filter((interview) => {
    const interviewDate = new Date(interview.date);
    const today = new Date();
    const interviewDay = new Date(
      interviewDate.getFullYear(),
      interviewDate.getMonth(),
      interviewDate.getDate()
    );
    const todayDay = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate()
    );
    return interviewDay < todayDay;
  }).length;

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-4 sm:py-6 lg:py-8 px-3 sm:px-4 lg:px-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6 sm:mb-8 lg:mb-10">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center text-blue-600 hover:text-blue-800 mb-3 sm:mb-4 transition-all duration-200 group font-medium"
          >
            <FiArrowLeft className="mr-2 h-4 w-4 sm:h-5 sm:w-5 group-hover:-translate-x-1 transition-transform" />
            Back to Dashboard
          </button>
          <div className="text-center sm:text-left">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
              Interview Details
            </h1>
            <p className="text-sm sm:text-base lg:text-lg text-gray-600 max-w-2xl">
              Manage and view all scheduled interview information in one place
            </p>
          </div>
        </div>

        <div className="mb-6 sm:mb-8 bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center">
              <FiFilter className="h-5 w-5 text-gray-500 mr-2" />
              <span className="text-sm font-medium text-gray-700">
                Filter by:
              </span>
            </div>
            <div className="flex flex-wrap gap-2 sm:gap-3">
              <button
                onClick={() => setFilter("upcoming")}
                className={`flex items-center px-4 py-2 rounded-lg border transition-all duration-200 ${
                  filter === "upcoming"
                    ? "bg-blue-50 border-blue-200 text-blue-700 shadow-sm"
                    : "bg-white border-gray-300 text-gray-600 hover:bg-gray-50"
                }`}
              >
                <FiCalendar className="mr-2 h-4 w-4" />
                Upcoming Interviews
                <span
                  className={`ml-2 px-2 py-1 rounded-full text-xs font-medium ${
                    filter === "upcoming"
                      ? "bg-blue-100 text-blue-700"
                      : "bg-gray-100 text-gray-600"
                  }`}
                >
                  {upcomingCount}
                </span>
              </button>
              <button
                onClick={() => setFilter("past")}
                className={`flex items-center px-4 py-2 rounded-lg border transition-all duration-200 ${
                  filter === "past"
                    ? "bg-gray-100 border-gray-300 text-gray-700 shadow-sm"
                    : "bg-white border-gray-300 text-gray-600 hover:bg-gray-50"
                }`}
              >
                <FiCalendar className="mr-2 h-4 w-4" />
                Past Interviews
                <span
                  className={`ml-2 px-2 py-1 rounded-full text-xs font-medium ${
                    filter === "past"
                      ? "bg-gray-200 text-gray-700"
                      : "bg-gray-100 text-gray-600"
                  }`}
                >
                  {pastCount}
                </span>
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4 sm:gap-5 lg:gap-6">
          {sortedInterviews.map((interview) => {
            const interviewDate = new Date(interview.date);
            const today = new Date();
            const isToday =
              interviewDate.toDateString() === today.toDateString();
            const isPast = interviewDate < today && !isToday;

            return (
              <div
                key={interview._id}
                className={`bg-white rounded-2xl shadow-sm hover:shadow-xl border p-5 sm:p-6 lg:p-7 transition-all duration-300 hover:-translate-y-1 group ${
                  isToday
                    ? "border-green-200 hover:border-green-300"
                    : isPast
                    ? "border-gray-200 hover:border-gray-300"
                    : "border-blue-200 hover:border-blue-300"
                }`}
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <h2 className="text-lg sm:text-xl lg:text-xl font-bold text-gray-900 mb-1 line-clamp-1">
                      {interview.candidateId?.name || "Unnamed Candidate"}
                    </h2>
                    <p className="text-xs sm:text-sm text-gray-500 flex items-center">
                      <MdEmail className="mr-1.5 h-3.5 w-3.5 sm:h-4 sm:w-4" />
                      <span className="truncate">
                        {interview.candidateId?.email || "No email provided"}
                      </span>
                    </p>
                  </div>
                  <span
                    className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
                      isToday
                        ? "bg-green-100 text-green-800"
                        : isPast
                        ? "bg-gray-100 text-gray-800"
                        : "bg-blue-100 text-blue-800"
                    }`}
                  >
                    {isToday ? "Today" : isPast ? "Completed" : "Upcoming"}
                  </span>
                </div>

                <div className="space-y-3 sm:space-y-3.5">
                  <div className="flex items-center text-gray-700">
                    <div
                      className={`flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center mr-3 ${
                        isToday
                          ? "bg-green-50"
                          : isPast
                          ? "bg-gray-50"
                          : "bg-blue-50"
                      }`}
                    >
                      <FiCalendar
                        className={`h-4 w-4 ${
                          isToday
                            ? "text-green-600"
                            : isPast
                            ? "text-gray-600"
                            : "text-blue-600"
                        }`}
                      />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Date</p>
                      <p className="text-sm font-medium">
                        {new Date(interview.date).toLocaleDateString("en-US", {
                          weekday: "short",
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                        {isToday && " (Today)"}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center text-gray-700">
                    <div
                      className={`flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center mr-3 ${
                        isToday
                          ? "bg-green-50"
                          : isPast
                          ? "bg-gray-50"
                          : "bg-blue-50"
                      }`}
                    >
                      <FiClock
                        className={`h-4 w-4 ${
                          isToday
                            ? "text-green-600"
                            : isPast
                            ? "text-gray-600"
                            : "text-blue-600"
                        }`}
                      />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Time</p>
                      <p className="text-sm font-medium">{interview.time}</p>
                    </div>
                  </div>

                  <div className="flex items-center text-gray-700">
                    <div
                      className={`flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center mr-3 ${
                        isToday
                          ? "bg-green-50"
                          : isPast
                          ? "bg-gray-50"
                          : "bg-blue-50"
                      }`}
                    >
                      <FiUser
                        className={`h-4 w-4 ${
                          isToday
                            ? "text-green-600"
                            : isPast
                            ? "text-gray-600"
                            : "text-blue-600"
                        }`}
                      />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Interviewer</p>
                      <p className="text-sm font-medium line-clamp-1">
                        {interview.interviewername || "Not specified"}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center text-gray-700">
                    <div
                      className={`flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center mr-3 ${
                        isToday
                          ? "bg-green-50"
                          : isPast
                          ? "bg-gray-50"
                          : "bg-blue-50"
                      }`}
                    >
                      <FiVideo
                        className={`h-4 w-4 ${
                          isToday
                            ? "text-green-600"
                            : isPast
                            ? "text-gray-600"
                            : "text-blue-600"
                        }`}
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-gray-500">Meeting Link</p>
                      <a
                        href={interview.meetingurl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm font-medium text-blue-600 hover:text-blue-800 truncate block transition-colors duration-200"
                      >
                        Join Meeting
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start text-gray-700">
                    <div
                      className={`flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center mr-3 mt-0.5 ${
                        isToday
                          ? "bg-green-50"
                          : isPast
                          ? "bg-gray-50"
                          : "bg-blue-50"
                      }`}
                    >
                      <LuNotebookPen
                        className={`h-4 w-4 ${
                          isToday
                            ? "text-green-600"
                            : isPast
                            ? "text-gray-600"
                            : "text-blue-600"
                        }`}
                      />
                    </div>
                    <div className="flex-1">
                      <p className="text-xs text-gray-500 mb-1">Notes</p>
                      <p className="text-sm text-gray-800 leading-relaxed">
                        {interview.notes ? (
                          <span className="line-clamp-3">
                            {interview.notes}
                          </span>
                        ) : (
                          <span className="text-gray-400 italic">
                            No notes added
                          </span>
                        )}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-6 sm:mt-7 pt-4 sm:pt-5 border-t border-gray-100">
                  <Link
                    to={`/employer-dashboard/edit-interview/${interview._id}`}
                    className="w-full inline-flex items-center justify-center px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-all duration-200 hover:shadow-lg transform hover:-translate-y-0.5 text-sm sm:text-base"
                  >
                    <FiEdit className="mr-2 h-4 w-4" />
                    Edit Interview
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {sortedInterviews.length === 0 && (
          <div className="text-center py-12 sm:py-16 lg:py-20">
            <div className="max-w-md mx-auto">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FiCalendar className="h-8 w-8 sm:h-10 sm:w-10 text-gray-400" />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">
                {filter === "upcoming"
                  ? "No Upcoming Interviews"
                  : "No Past Interviews"}
              </h3>
              <p className="text-gray-500 text-sm sm:text-base mb-6">
                {filter === "upcoming"
                  ? "There are no upcoming interviews scheduled at the moment."
                  : "There are no past interviews to display."}
              </p>
              {filter === "upcoming" && (
                <Link
                  to="/employer-dashboard/alljobs-applicant"
                  className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-200"
                >
                  <FiCalendar className="mr-2 h-4 w-4" />
                  Schedule New Interview
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewInterview;
