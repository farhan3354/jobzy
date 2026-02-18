import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../../api/register";

export default function ForgotPassword() {
  const [otpSent, setOtpSent] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({ mode: "onBlur" });
  
  const navigate = useNavigate();
  const email = watch("email");

  const onSubmit = async (data) => {
    try {
      const response = await api.post("/forgot-password", data);
      if (response.status === 200) {
        toast.success("Reset OTP sent to your email!");
        setOtpSent(true);
        // Persist email for ResetPassword page
        localStorage.setItem("resetEmail", data.email);
        // Optionally navigate immediately or let them use the "Go to Reset" button
        // navigate("/reset-password", { state: { email: data.email } });
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to send reset OTP");
    }
  };

  const handleResend = async () => {
    if (!email) return toast.error("Please enter your email");
    try {
      const response = await api.post("/forgot-password", { email });
      if (response.status === 200) {
        toast.success("OTP resent successfully!");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to resend OTP");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md">
        <h2 className="text-3xl font-extrabold text-gray-900 mb-2 text-center">
          {otpSent ? "Check Your Email" : "Forgot Password?"}
        </h2>
        <p className="text-gray-600 mb-8 text-center text-sm">
          {otpSent 
            ? `We've sent a 6-digit OTP to ${email}. Please enter it to reset your password.`
            : "No worries! Enter your email and we'll send you an OTP to reset your password."}
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {!otpSent ? (
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Email Address
              </label>
              <input
                type="email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address",
                  },
                })}
                className="w-full border border-gray-300 rounded-xl px-4 py-3 text-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition duration-200"
                placeholder="name@example.com"
              />
              {errors.email && (
                <p className="text-red-500 text-xs mt-1 font-medium">
                  {errors.email.message}
                </p>
              )}
            </div>
          ) : (
            <div className="space-y-4">
              <button
                type="button"
                onClick={() => navigate("/reset-password", { state: { email } })}
                className="w-full bg-blue-600 text-white font-bold py-3.5 px-4 rounded-xl hover:bg-blue-700 active:scale-[0.98] transition transform duration-200 shadow-lg"
              >
                Go to Reset Password
              </button>
              
              <button
                type="button"
                onClick={handleResend}
                className="w-full bg-white text-blue-600 border-2 border-blue-600 font-bold py-3 px-4 rounded-xl hover:bg-blue-50 active:scale-[0.98] transition transform duration-200"
              >
                Resend OTP
              </button>
            </div>
          )}

          {!otpSent && (
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-blue-600 text-white font-bold py-3.5 px-4 rounded-xl hover:bg-blue-700 active:scale-[0.98] transition transform duration-200 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Sending OTP..." : "Send Reset OTP"}
            </button>
          )}

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
