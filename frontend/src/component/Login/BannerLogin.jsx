import React from "react";
import { useLocation } from "react-router-dom";
import Header1 from "./Header1";

export default function BannerLogin() {
  const location = useLocation();

  return (
    <>
      {location.pathname === "/register/job-seeker" && (
        <>
          <div className="bg-blue-500 text-white p-8 md:p-12 md:w-1/2 relative overflow-hidden">
            <div className="z-10 relative">
              {/* <h2 className="text-2xl font-bold mb-6">Jobzy</h2> */}
              <div className="mt-20 md:mt-32">
                <Header1 label="Sign up" className="text-white" />

                <p className="max-w-md opacity-90">
                  Jobzy is your trusted gateway to career success — connecting
                  talented job seekers with top companies. Whether you're
                  looking for your first job or your next big opportunity, Jobzy
                  makes the process simple, fast, and effective.
                </p>
              </div>
            </div>
          </div>
        </>
      )}

      {location.pathname === "/register/employer" && (
        <>
          <div className="bg-blue-500 text-white p-8 md:p-12 md:w-1/2 relative overflow-hidden">
            <div className="z-10 relative">
              <div className="mt-20 md:mt-32">
                {/* <h1 className="text-3xl font-bold mb-4 text-center">
                  Sign in For Employers
                </h1> */}
                <Header1 />
                <div className="bg-green-50 p-6 rounded-lg border border-green-200 mt-8 text-gray-900">
                  <p className="mb-3">
                    💼 <strong>Find Exceptional Talent</strong> with Jobzy — the
                    smart way to recruit top-quality candidates.
                  </p>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start">
                      <span className="text-blue-500 mr-2">✓</span>
                      Post jobs to reach qualified candidates
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-500 mr-2">✓</span>
                      Advanced candidate matching
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-500 mr-2">✓</span>
                      Manage applications easily
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-500 mr-2">✓</span>
                      Schedule interviews seamlessly
                    </li>
                  </ul>
                  <p className="mt-3 text-sm">
                    Streamline your hiring process with Jobzy!
                  </p>
                  <p className="mt-6 max-w-2xl">
                    Jobzy is your trusted gateway to career success — connecting
                    talented job seekers with top companies. Whether you're
                    looking for your first job or your next big opportunity,
                    Jobzy makes the process simple, fast, and effective.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
      {location.pathname === "/login" && (
        <>
          <div className="bg-blue-500 text-white p-8 md:p-12 md:w-1/2 relative overflow-hidden">
            <div className="z-10 relative">
              {/* <h2 className="text-2xl font-bold mb-6">Jobzy</h2> */}
              <div className="mt-20 md:mt-32">
                <h1 className="text-3xl font-bold mb-4">Sign in to Jobzy</h1>
                <p className="max-w-md opacity-90">
                  Jobzy is your trusted gateway to career success — connecting
                  talented job seekers with top companies. Whether you're
                  looking for your first job or your next big opportunity, Jobzy
                  makes the process simple, fast, and effective.
                </p>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
