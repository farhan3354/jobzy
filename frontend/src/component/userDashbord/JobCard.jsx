import {
  FaMapMarkerAlt,
  FaBriefcase,
  FaMoneyBillWave,
  FaRegBookmark,
  FaBookmark,
} from "react-icons/fa";
import { useState } from "react";

export default function JobCard({ job }) {
  const [isSaved, setIsSaved] = useState(false);

  const toggleSave = () => {
    setIsSaved(!isSaved);
  };

  return (
    <div className="bg-white sm:w-full rounded-lg shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow duration-300 relative">
      <button
        type="button"
        onClick={toggleSave}
        className="absolute top-4 right-4 p-2 text-gray-500 hover:text-blue-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-300 rounded-full"
        aria-label={isSaved ? "Unsave job" : "Save job"}
      >
        {isSaved ? (
          <FaBookmark className="text-blue-600 text-lg" />
        ) : (
          <FaRegBookmark className="text-lg" />
        )}
      </button>

      <div className="p-6">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            <h3 className="text-xl font-semibold text-gray-800 mb-1 truncate">
              {job.title}
            </h3>
            <p className="text-gray-600 mb-2 truncate">{job.company}</p>
          </div>
          <div className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full whitespace-nowrap">
            {job.type}
          </div>
        </div>

        <div className="mt-4 space-y-3">
          <div className="flex items-center text-gray-600">
            <FaMapMarkerAlt className="mr-2 text-blue-500 flex-shrink-0" />
            <span className="truncate">{job.location}</span>
          </div>

          <div className="flex items-center text-gray-600">
            <FaBriefcase className="mr-2 text-blue-500 flex-shrink-0" />
            <span className="truncate">{job.experience}</span>
          </div>

          <div className="flex items-center text-gray-600">
            <FaMoneyBillWave className="mr-2 text-blue-500 flex-shrink-0" />
            <span className="truncate">{job.salary}</span>
          </div>
        </div>

        <div className="mt-6 flex justify-between items-center">
          <span className="text-sm text-gray-500">Posted {job.postedDate}</span>
          <button
            type="button"
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-offset-2"
          >
            Apply Now
          </button>
        </div>
      </div>
    </div>
  );
}
