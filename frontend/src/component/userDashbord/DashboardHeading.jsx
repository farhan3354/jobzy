import React from "react";
import { FaChartLine, FaFileAlt, FaBookmark } from "react-icons/fa";
import { MdWork } from "react-icons/md";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function DashboardHeading(userStats) {
  const user = useSelector((state) => state.auth.user.name);
  const arr = [
    {
      icon: <FaChartLine className="text-purple-500" />,
      title: "All Jobs",
      value: userStats.offers,
      path: "jobs",
    },

    {
      icon: <FaFileAlt className="text-blue-500" />,
      title: "Applied Jobs",
      value: userStats.applications,
      path: "applied",
    },
    {
      icon: <MdWork className="text-green-500" />,
      title: "Interviews",
      value: userStats.interviews,
      path: "interview",
    },
  ];
  return (
    <>
      <div className="pt-2 pb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Welcome ,{user}</h1>
          <p className="text-gray-600 mt-1">
            Here's what's happening with your job search
          </p>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {arr.map((stat, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
          >
            <Link to={stat.path}>
              <div className="flex items-center justify-between">
                <div className="p-3 rounded-full bg-blue-50">{stat.icon}</div>
                <div className="text-right">
                  <p className="text-gray-500">{stat.title}</p>
                  <p className="text-2xl font-bold">{stat.value}</p>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </>
  );
}
