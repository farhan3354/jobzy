import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

export default function RegisterForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const [role, setRole] = useState("");

  useEffect(() => {
    if (role === "employer") {
      navigate("/register/employer");
    } else if (role === "job-seeker") {
      navigate("/register/job-seeker");
    }
  }, [role, navigate]);

  const onSubmit = async (data) => {
    try {
      const res = await axios.post("http://localhost:8000/register", data);
      // console.log("Register Data Submitted:", res.data);

      Swal.fire({
        title: "Success!",
        text: "Registration successful!",
        icon: "success",
        confirmButtonText: "OK",
      });

      if (res.data.token && res.data.user) {
        const userRole = res.data.user.role;
        if (userRole === "employer") {
          navigate("/employer-dashboard");
        } else {
          navigate("/user-dashboard");
        }
      } else {
        navigate("/login");
      }
    } catch (error) {
      console.log("Registration error:", error);

      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Registration failed. Please try again.";

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
      <div className="p-8 md:p-12 md:w-1/2 flex items-center justify-center">
        <div className="w-full max-w-md bg-white rounded-3xl shadow-lg p-8">
          <div className="mb-8 text-center">
            <p className="mb-1 text-2xl text-blue-500 font-bold">Register</p>
            <p className="text-gray-600 text-xl">
              {role === "employer"
                ? "Create your employer account"
                : "Create your job seeker account"}
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                I am a *
              </label>
              <select
                {...register("role", { required: "Please select a role" })}
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full h-12 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="" aria-readonly disabled>
                  Select Role
                </option>
                <option value="job-seeker">Job Seeker</option>
                <option value="employer">Employer</option>
              </select>
              {errors.role && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.role.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Full Name *
              </label>
              <input
                {...register("name", {
                  required: "Name is required",
                  minLength: {
                    value: 2,
                    message: "Name must be at least 2 characters",
                  },
                })}
                type="text"
                placeholder="Enter your full name"
                className="w-full h-12 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.name.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email *
              </label>
              <input
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^\S+@\S+\.\S+$/i,
                    message: "Please enter a valid email address",
                  },
                })}
                type="email"
                placeholder="Enter your email"
                className="w-full h-12 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Phone *
              </label>
              <input
                {...register("phone", {
                  required: "Phone number is required",
                  pattern: {
                    value: /^[0-9]{10,11}$/,
                    message: "Please enter a valid phone number (10-11 digits)",
                  },
                })}
                type="tel"
                placeholder="Enter your phone number"
                className="w-full h-12 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.phone && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.phone.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Password *
              </label>
              <input
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                  pattern: {
                    value: /^(?=.*[a-z])/,
                    message: "Password must contain at least one",
                  },
                })}
                type="password"
                placeholder="Create a strong password"
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
              Create Account
            </button>
          </form>

          <div className="text-center mt-6">
            <span className="text-gray-500">Already have an account?</span>{" "}
            <Link
              to="/login"
              className="text-blue-500 font-medium hover:underline"
            >
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
