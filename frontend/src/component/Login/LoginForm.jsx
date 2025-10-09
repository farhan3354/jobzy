import React from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import { useDispatch } from "react-redux";
import { loginsucc } from "../../redux/slices/authslices/userslice";

export default function Form() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onSubmit = async (data) => {
    try {
      const res = await axios.post("http://localhost:8000/login", data);
      if (res.data && res.data.message) {
        // console.log("Login Successfully:", data, res);
        dispatch(loginsucc(res.data));
        const userRole = res.data.user?.role;

        Swal.fire({
          title: "Success!",
          text: "Login successful!",
          icon: "success",
          confirmButtonText: "OK",
        }).then(() => {
          if (userRole === "employer") {
            navigate("/employer-dashboard");
          } else if (userRole == "admin") {
            navigate("/admin-dashboard");
          } else {
            navigate("/user-dashboard");
          }
        });
      } else {
        Swal.fire({
          title: "Login Failed!",
          text: res.data?.message || "Invalid credentials",
          icon: "error",
          confirmButtonText: "Try Again",
        });
      }
    } catch (err) {
      // console.log("Login error:", err);

      const errorMessage =
        err.response?.data?.message ||
        err.message ||
        "Login failed. Please try again.";

      Swal.fire({
        title: "Error!",
        text: errorMessage,
        icon: "error",
        confirmButtonText: "OK",
        confirmButtonColor: "#d33",
      });
    }
  };

  return (
    <>
      {/* Right Section */}
      <div className="p-8 md:p-12 md:w-1/2 flex items-center justify-center">
        <div className="w-full max-w-md bg-white rounded-3xl shadow-lg p-8">
          <div className="mb-8 text-center">
            <p className="mb-1 text-2xl text-blue-500 font-bold">Login</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Enter your username
              </label>
              <input
                id="email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^\S+@\S+$/i,
                    message: "Invalid email address",
                  },
                })}
                type="text"
                placeholder="Username or email address"
                className="w-full h-12 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Enter your Password
              </label>
              <input
                id="password"
                {...register("password", { required: "password is required" })}
                type="password"
                placeholder="Password"
                className="w-full h-12 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full h-12 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-md transition duration-200 cursor-pointer"
            >
              Sign in
            </button>
          </form>

          <div className="text-left mt-4">
            <span className="text-gray-500">No Account?</span>{" "}
            <Link to="/chose-register" className="text-blue-500 font-medium">
              Register
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
