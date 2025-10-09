import axios from "axios";
import React, { useEffect, useState } from "react";
import { FiCalendar, FiClock, FiUser, FiVideo, FiMapPin } from "react-icons/fi";
import { useSelector } from "react-redux";

const InterviewPage = () => {
  const [interviews, setinterview] = useState([]);
  const [loading, setloading] = useState(true);
  const token = useSelector((state) => state.auth.token);
  const fetchdata = async () => {
    try {
      const respo = await axios.get("http://localhost:8000/getjobseeker", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setinterview(respo.data.jobseekerinter || null);
    } catch (error) {
      console.log(error);
    } finally {
      setloading(false);
    }
  };
  useEffect(() => {
    fetchdata();
  }, [token]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }
  if (interviews.length === 0) {
    return (
      <>
        <div className="flex items-center justify-center min-h-screen">
          <div className="p-8 text-center max-w-md">
            <div className="flex justify-center mb-4  text-5xl"></div>
            <h3 className="text-2xl font-semibold text-gray-800 mb-2">
              No Interviews Scheduled
            </h3>
            <p className="text-gray-500">
              You haven’t scheduled any interviews yet. Once an interview is
              set, you’ll see it here.
            </p>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="min-h-screen bg-gray-50 py-6 sm:py-10">
        <div className="max-w-7xl">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            My Interviews
          </h1>

          <div className="bg-white shadow-md rounded-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="hidden md:table w-full text-sm text-left text-gray-700">
                <thead className="bg-gray-100 text-gray-800 uppercase text-xs font-semibold">
                  <tr>
                    <th className="px-6 py-3">Name</th>
                    <th className="px-6 py-3">Email</th>
                    <th className="px-6 py-3">Date</th>
                    <th className="px-6 py-3">Time</th>
                    <th className="px-6 py-3">Interviewer</th>
                    <th className="px-6 py-3">Meeting URL</th>
                    <th className="px-6 py-3">Notes</th>
                    <th className="px-6 py-3">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {interviews.map((interview, index) => {
                    const interviewDate = new Date(
                      `${interview.date}T${interview.time}`
                    );
                    const now = new Date();
                    const isUpcoming = interviewDate > now;
                    const isToday =
                      interviewDate.toDateString() === now.toDateString();

                    let status = "Completed";

                    if (isUpcoming) {
                      status = isToday ? "Today" : "Upcoming";
                    }
                    return (
                      <>
                        <tr
                          key={index}
                          className="hover:bg-gray-50 transition-colors"
                        >
                          <td className="px-6 py-4 font-medium text-gray-900">
                            {interview?.candidateId?.name ||
                              "Unknown Candidate"}
                          </td>
                          <td className="px-6 py-4 text-gray-600">
                            {interview?.candidateId?.email ||
                              "No Email Provided"}
                          </td>
                          <td className="px-6 py-4">{interview?.date}</td>
                          <td className="px-6 py-4">{interview?.time}</td>
                          <td className="px-6 py-4">
                            {interview?.interviewername}
                          </td>
                          <td className="px-6 py-4">
                            <a
                              href={interview?.meetingurl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-600 hover:underline break-all"
                            >
                              {interview?.meetingurl}
                            </a>
                          </td>
                          <td className="px-6 py-4 text-gray-600">
                            {interview?.notes || "—"}
                          </td>
                          <td className="px-6 py-4 text-gray-600">{status}</td>
                        </tr>
                      </>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <div className="md:hidden space-y-5">
              {interviews.map((interview, index) => {
                const interviewDate = new Date(
                  `${interview.date}T${interview.time}`
                );
                const now = new Date();
                const isUpcoming = interviewDate > now;
                const isToday =
                  interviewDate.toDateString() === now.toDateString();

                let status = "Completed";
                let statusColor = "bg-gray-100 text-gray-800";

                if (isUpcoming) {
                  status = isToday ? "Today" : "Upcoming";
                  statusColor = isToday
                    ? "bg-orange-100 text-orange-800"
                    : "bg-green-100 text-green-800";
                }

                return (
                  <div
                    key={index}
                    className="p-5  rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300"
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex items-center">
                        <div className="bg-indigo-100 w-10 h-10 rounded-full flex items-center justify-center mr-3">
                          <span className="text-indigo-700 font-semibold">
                            {interview?.candidateId?.name?.charAt(0) || "U"}
                          </span>
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900 text-base">
                            {interview?.candidateId?.name ||
                              "Unknown Candidate"}
                          </p>
                          <p className="text-gray-600 text-sm">
                            {interview?.candidateId?.email ||
                              "No Email Provided"}
                          </p>
                        </div>
                      </div>
                      <span
                        className={`text-xs px-2 py-1 rounded-full ${statusColor}`}
                      >
                        {status}
                      </span>
                    </div>

                    <div className="space-y-3 text-sm">
                      <div className="flex items-center">
                        <div className="bg-blue-50 p-2 rounded-lg mr-3">
                          <FiCalendar className="h-4 w-4 text-black" />
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Date</p>
                          <p className="text-gray-800">{interview?.date}</p>
                        </div>
                      </div>

                      <div className="flex items-center">
                        <div className="bg-blue-50 p-2 rounded-lg mr-3">
                          <FiClock className="h-4 w-4 text-black" />
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Time</p>
                          <p className="text-gray-800">{interview?.time}</p>
                        </div>
                      </div>

                      <div className="flex items-center">
                        <div className="bg-blue-50 p-2 rounded-lg mr-3">
                          <FiUser className="h-4 w-4 text-black" />
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Interviewer</p>
                          <p className="text-gray-800">
                            {interview?.interviewername}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center">
                        <div className="bg-blue-50 p-2 rounded-lg mr-3">
                          <FiVideo className="h-4 w-4 textblack" />
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Meeting</p>
                          <a
                            href={interview?.meetingurl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:underline break-all text-sm"
                          >
                            Join Meeting
                          </a>
                        </div>
                      </div>
                    </div>

                    {interview?.notes && (
                      <>
                        <div className="border-t border-gray-100 my-4"></div>
                        <div>
                          <p className="text-xs text-gray-500 mb-1">Notes</p>
                          <p className="text-gray-700 text-sm">
                            {interview?.notes}
                          </p>
                        </div>
                      </>
                    )}
                  </div>
                );
              })}

              {interviews.length === 0 && (
                <div className="p-6 bg-white rounded-xl shadow-sm border border-gray-100 text-center">
                  <div className="mx-auto w-14 h-14 bg-gray-100 rounded-full flex items-center justify-center mb-3">
                    <FiCalendar className="h-6 w-6 text-black" />
                  </div>
                  <h3 className="text-base font-medium text-gray-900 mb-1">
                    No interviews scheduled
                  </h3>
                  <p className="text-gray-500 text-sm">
                    Schedule your first interview to get started
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default InterviewPage;

{
  /* <div className="md:hidden divide-y divide-gray-200">
              {interviews.map((interview, index) => (
                <div key={index} className="p-4 sm:p-5 hover:bg-gray-50">
                  <p className="font-semibold text-gray-900 text-base sm:text-lg">
                    {interview?.candidateId?.name || "Unknown Candidate"}
                  </p>
                  <p className="text-gray-600 text-sm sm:text-base">
                    {interview?.candidateId?.email || "No Email Provided"}
                  </p>
                  <div className="mt-2 space-y-1 text-sm sm:text-base">
                    <p>
                      <span className="font-medium">Date:</span>{" "}
                      {interview?.date}
                    </p>
                    <p>
                      <span className="font-medium">Time:</span>{" "}
                      {interview?.time}
                    </p>
                    <p>
                      <span className="font-medium">Interviewer:</span>{" "}
                      {interview?.interviewername}
                    </p>
                    <p>
                      <span className="font-medium">Meeting:</span>{" "}
                      <a
                        href={interview?.meetingurl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline break-all"
                      >
                        {interview?.meetingurl}
                      </a>
                    </p>
                    <p>
                      <span className="font-medium">Notes:</span>{" "}
                      {interview?.notes || "—"}
                    </p>
                  </div>
                </div>
              ))}
            </div> */
}

{
  /* <div className="min-h-screen bg-gray-50 py-8 px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">
            My Interviews
          </h1>
          <div className="bg-white shadow-md rounded-lg overflow-x-auto">
            <table className="hidden md:table w-full text-sm text-left text-gray-700">
              <thead className="bg-gray-100 text-gray-800 uppercase text-xs font-semibold">
                <tr>
                  <th className="px-6 py-3">Name</th>
                  <th className="px-6 py-3">Email</th>
                  <th className="px-6 py-3">Date</th>
                  <th className="px-6 py-3">Time</th>
                  <th className="px-6 py-3">Interviewer</th>
                  <th className="px-6 py-3">Meeting URL</th>
                  <th className="px-6 py-3">Notes</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {interviews.map((interview, index) => (
                  <tr
                    key={index}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-4 font-medium text-gray-900">
                      {interview?.candidateId?.name || "Unknown Candidate"}
                    </td>
                    <td className="px-6 py-4 text-gray-600">
                      {interview?.candidateId?.email || "No Email Provided"}
                    </td>
                    <td className="px-6 py-4">{interview?.date}</td>
                    <td className="px-6 py-4">{interview?.time}</td>
                    <td className="px-6 py-4">{interview?.interviewername}</td>
                    <td className="px-6 py-4">
                      <a
                        href={interview?.meetingurl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline break-all"
                      >
                        {interview?.meetingurl}
                      </a>
                    </td>
                    <td className="px-6 py-4 text-gray-600">
                      {interview?.notes || "—"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="md:hidden divide-y divide-gray-200">
              {interviews.map((interview, index) => (
                <div key={index} className="p-4 hover:bg-gray-50 transition">
                  <p className="font-semibold text-gray-900">
                    {interview?.candidateId?.name || "Unknown Candidate"}
                  </p>
                  <p className="text-gray-600 text-sm">
                    {interview?.candidateId?.email || "No Email Provided"}
                  </p>
                  <div className="mt-2 space-y-1 text-sm">
                    <p>
                      <span className="font-medium">Date:</span>{" "}
                      {interview?.date}
                    </p>
                    <p>
                      <span className="font-medium">Time:</span>{" "}
                      {interview?.time}
                    </p>
                    <p>
                      <span className="font-medium">Interviewer:</span>{" "}
                      {interview?.interviewername}
                    </p>
                    <p>
                      <span className="font-medium">Meeting:</span>{" "}
                      <a
                        href={interview?.meetingurl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline break-all"
                      >
                        {interview?.meetingurl}
                      </a>
                    </p>
                    <p>
                      <span className="font-medium">Notes:</span>{" "}
                      {interview?.notes || "—"}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div> */
}
