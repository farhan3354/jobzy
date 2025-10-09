import React from "react";
import { MdWorkOutline, MdPeople, MdOutlineBarChart } from "react-icons/md";
import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useEffect } from "react";

export default function EmployerDashboard() {
  const stats = [
    {
      title: "Active Jobs",
      to: "all-job",
      icon: <MdWorkOutline />,
      color: "text-blue-500",
      bg: "bg-blue-100",
    },
    {
      title: "Applicants",
      to: "alljobs-applicant",
      icon: <MdPeople />,
      color: "text-green-500",
      bg: "bg-green-100",
    },
    {
      title: "Interviews Scheduled",
      to: "view-interviews",
      icon: <MdOutlineBarChart />,
      color: "text-purple-500",
      bg: "bg-purple-100",
    },
  ];
  const [job, setjob] = useState(null);
  const token = useSelector((state) => state.auth.token);

  const fetchdatejob = async () => {
    try {
      const respo = await axios.get("http://localhost:8000/employerjob", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setjob(respo.data.job || null);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchdatejob();
  }, [token]);

  

  return (

    <>
 <div className="max-w-7xl mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-8">Employer Dashboard</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        {stats.map((stat, index) => (
          <Link
            key={index}
            to={stat.to}
            className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition flex items-center gap-4"
          >
            <div
              className={`p-3 rounded-full text-3xl ${stat.bg} ${stat.color}`}
            >
              {stat.icon}
            </div>
            <div>
              <h4 className="text-lg font-semibold">{stat.title}</h4>
            </div>
          </Link>
        ))}
      </div>
      {job ? (
        <div className="bg-white p-6 rounded-2xl shadow mb-8">
          <h3 className="text-xl font-bold mb-4">Recent Job Postings</h3>
          <ul className="divide-y divide-gray-200">
            <li className="py-3 flex justify-between items-center">
              <div>
                <h4 className="font-semibold">{job.jobTitle}</h4>
                <p className="text-gray-600 text-sm">
                  {new Date(job.createdAt).toDateString()}
                </p>
              </div>
              <span
                className={`text-sm font-medium ${
                  job.status === "Open" ? "text-blue-500" : "text-red-500"
                }`}
              >
                {job.status}
              </span>
            </li>
          </ul>
        </div>
      ) : (
        <div className="text-gray-500 text-sm">No recent job found.</div>
      )}

      
    </div>

    </>

   
  );
}


// import React from "react";
// import { MdWork, MdPeople, MdMessage } from "react-icons/md";

// export default function Dashboard() {
//   return (
//     <>
//       <div className="max-w-7xl mx-auto px-4 py-8">
//         <h4 className="text-2xl font-semibold mb-6">Employer Dashboard</h4>

//         {/* Stats Cards */}
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//           <div className="bg-white p-6 rounded-lg shadow flex items-center space-x-4 hover:shadow-md transition">
//             <div className="p-3 bg-blue-100 rounded-full text-blue-600 text-3xl">
//               <MdWork />
//             </div>
//             <div>
//               <p className="text-lg font-semibold">12</p>
//               <p className="text-sm text-gray-500">Jobs Posted</p>
//             </div>
//           </div>

//           <div className="bg-white p-6 rounded-lg shadow flex items-center space-x-4 hover:shadow-md transition">
//             <div className="p-3 bg-green-100 rounded-full text-green-600 text-3xl">
//               <MdPeople />
//             </div>
//             <div>
//               <p className="text-lg font-semibold">87</p>
//               <p className="text-sm text-gray-500">Applicants</p>
//             </div>
//           </div>

//           <div className="bg-white p-6 rounded-lg shadow flex items-center space-x-4 hover:shadow-md transition">
//             <div className="p-3 bg-purple-100 rounded-full text-purple-600 text-3xl">
//               <MdMessage />
//             </div>
//             <div>
//               <p className="text-lg font-semibold">5</p>
//               <p className="text-sm text-gray-500">New Messages</p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }
