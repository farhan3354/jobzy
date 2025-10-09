import React from "react";
import BannerLogin from "../component/Login/BannerLogin";
import LoginForm from "../component/Login/LoginForm";

export default function Login() {
  return (
    <>
      <div className="flex flex-col md:flex-row min-h-screen">
        <BannerLogin />
        <LoginForm />
      </div>
    </>
  );
}
