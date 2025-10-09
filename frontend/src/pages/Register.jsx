import React from "react";
import { useLocation } from "react-router-dom";
import BannerLogin from "../component/Login/BannerLogin";
import RegisterForm from "../component/Login/RegisterForm";

export default function Register() {
  const location = useLocation();

  return (
    <>
      <div className="flex flex-col md:flex-row min-h-screen">
        {location.pathname === "/register/job-seeker" && (
          <>
            <BannerLogin />
            <RegisterForm />
          </>
        )}
        {location.pathname === "/register/employer" && (
          <>
            <RegisterForm />
            <BannerLogin />
          </>
        )}
      </div>
    </>
  );
}
