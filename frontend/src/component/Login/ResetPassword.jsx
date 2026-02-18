import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../../api/register";

export default function ResetPassword() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
  } = useForm({ mode: "onBlur" });

  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email || localStorage.getItem("resetEmail") || "";

  const onSubmit = async (data) => {
    if (!email) {
      toast.error("Email is missing. Please request a new OTP.");
      return navigate("/forgot-password");
    }
    try {
      const resetData = {
        email: email,
        otp: data.otp,
        newpassword: data.newpassword,
      };
      const response = await api.post("/reset-password", resetData);
      if (response.status === 200) {
        toast.success("Password reset successfully! You can now login.");
        localStorage.removeItem("resetEmail");
        navigate("/login");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to reset password");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md">
        <h2 className="text-3xl font-extrabold text-gray-900 mb-2 text-center">
          Reset Password
        </h2>
        <p className="text-gray-600 mb-8 text-center text-sm">
          Enter the 6-digit OTP sent to <span className="font-semibold text-gray-800">{email}</span> and your new password.
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              6-Digit OTP
            </label>
            <input
              type="text"
              {...register("otp", {
                required: "OTP is required",
                minLength: { value: 6, message: "OTP must be 6 digits" },
                maxLength: { value: 6, message: "OTP must be 6 digits" },
                pattern: { value: /^[0-9]+$/, message: "OTP must be numeric" },
              })}
              className="w-full border border-gray-300 rounded-xl px-4 py-3 text-center text-2xl font-bold tracking-[0.5em] text-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition duration-200"
              placeholder="000000"
            />
            {errors.otp && (
              <p className="text-red-500 text-xs mt-1 font-medium">
                {errors.otp.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              New Password
            </label>
            <input
              type="password"
              {...register("newpassword", {
                required: "New password is required",
                minLength: { value: 6, message: "Must be at least 6 characters" },
                pattern: {
                  value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/,
                  message: "Must contain uppercase, lowercase & number",
                },
              })}
              className="w-full border border-gray-300 rounded-xl px-4 py-3 text-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition duration-200"
              placeholder="••••••••"
            />
            {errors.newpassword && (
              <p className="text-red-500 text-xs mt-1 font-medium">
                {errors.newpassword.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Confirm New Password
            </label>
            <input
              type="password"
              {...register("confirmPassword", {
                required: "Please confirm your password",
                validate: (val) => {
                  if (watch("newpassword") !== val) {
                    return "Passwords do not match";
                  }
                },
              })}
              className="w-full border border-gray-300 rounded-xl px-4 py-3 text-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition duration-200"
              placeholder="••••••••"
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-xs mt-1 font-medium">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-blue-600 text-white font-bold py-3.5 px-4 rounded-xl hover:bg-blue-700 active:scale-[0.98] transition transform duration-200 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "Resetting Password..." : "Reset Password"}
          </button>

          <div className="text-center mt-6">
            <Link
              to="/login"
              className="text-sm font-semibold text-blue-600 hover:text-blue-800 transition"
            >
              Back to Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
