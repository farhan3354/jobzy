import React from "react";
import { FaHistory } from "react-icons/fa";
import DashboardHeading from "./DashboardHeading";
import RecommendedJobs from "./RecommendedJobs";

export default function UserHome() {
  const userStats = {
    applications: 12,
    interviews: 3,
    offers: 1,
  };

  const recommendedJobs = [
    {
      id: 1,
      title: "Senior Frontend Developer",
      company: "TechCorp Inc.",
      location: "Remote",
      salary: "$120,000 - $150,000",
      type: "Full-time",
      postedDate: "2023-06-15",
      isSaved: false,
      match: 92,
    },
    {
      id: 2,
      title: "UX/UI Designer",
      company: "Creative Solutions",
      location: "New York, NY",
      salary: "$90,000 - $110,000",
      type: "Full-time",
      postedDate: "2023-06-10",
      isSaved: true,
      match: 87,
    },
    {
      id: 3,
      title: "DevOps Engineer",
      company: "CloudSystems",
      location: "Austin, TX",
      salary: "$130,000 - $160,000",
      type: "Contract",
      postedDate: "2023-06-05",
      isSaved: false,
      match: 78,
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <DashboardHeading userStats={userStats} />

      <RecommendedJobs recommendedJobs={recommendedJobs} />
    </div>
  );
}
