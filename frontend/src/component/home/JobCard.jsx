import { FaBriefcase, FaMoneyBillWave, FaBookmark } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

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
            <h3 className="font-bold text-lg">{job.jobTitle}</h3>
            <p className="text-gray-600">
              {job.companyName} • {job.location}
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
          <span>{job.employmentType}</span>
        </div>
        <div className="flex items-center">
          <FaMoneyBillWave className="mr-2 text-blue-500" />
          <span>{job.salary}</span>
        </div>
      </div>

      <div className="mt-6 flex justify-between items-center">
        <span className="text-sm text-gray-500">
          Posted on {new Date(job.createdAt).toDateString()}
        </span>
        <button
          onClick={handleuser}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm font-medium"
        >
          Apply Now
        </button>
      </div>
    </div>
  );
}
