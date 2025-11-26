import { FaBriefcase, FaMoneyBillWave, FaBookmark } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import TranslatedText from "../TranslatedText";

export default function JobCard({ job }) {
  const token = useSelector((state) => state.auth.token);
  const navigate = useNavigate();
  function handleuser() {
    if (!token) {
      navigate("/login");
    } else {
      navigate("user-dashboard/jobs");
    }
  }
  return (
    <div className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
      <div className="flex justify-between">
        <div className="flex items-start space-x-4">
          {/* <img
            src={job.logo}
            alt={job.companyName}
            className="w-12 h-12 object-contain"
          /> */}
          <div>
            <h3 className="font-bold text-lg">
              <TranslatedText>{job.jobTitle}</TranslatedText>
            </h3>
            <p className="text-gray-600">
              <TranslatedText>
                {job.companyName} • {job.location}
              </TranslatedText>
            </p>
          </div>
        </div>
        <button className="text-gray-400 hover:text-blue-600">
          <FaBookmark className="text-blue-600" />
        </button>
      </div>

      <div className="flex flex-wrap items-center gap-4 mt-4 text-gray-600">
        <div className="flex items-center">
          <FaBriefcase className="mr-2 text-blue-500" />

          <span>
            <TranslatedText>{job.employmentType}</TranslatedText>
          </span>
        </div>
        <div className="flex items-center">
          <FaMoneyBillWave className="mr-2 text-blue-500" />
          <span>
            <TranslatedText>{job.salary}</TranslatedText>
          </span>
        </div>
      </div>

      <div className="mt-6 flex justify-between items-center">
        <span className="text-sm text-gray-500">
          <TranslatedText>
            Posted on {new Date(job.createdAt).toDateString()}
          </TranslatedText>
        </span>
        <button
          onClick={handleuser}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm font-medium"
        >
          <TranslatedText>Apply Now</TranslatedText>
        </button>
      </div>
    </div>
  );
}
