import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useSearchParams, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import api from "../../api/register";

export default function OTPVerifyForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [isResending, setIsResending] = useState(false);
  const [resendCooldown, setResendCooldown] = useState(0);

  const email = searchParams.get("email");

  const onSubmit = async (data) => {
    try {
      const res = await api.post("/verify-otp", {
        email,
        otp: data.otp,
      });

      Swal.fire({
        title: "Verified!",
        text: "Your account is now active. Please login.",
        icon: "success",
        confirmButtonText: "OK",
      });

      navigate("/login");
    } catch (error) {
      Swal.fire({
        title: "Invalid OTP!",
        text: error.response?.data?.message || "Please try again.",
        icon: "error",
        confirmButtonText: "Retry",
      });
    }
  };

  const handleResendOTP = async () => {
    if (resendCooldown > 0) return;

    setIsResending(true);
    try {
      await api.post("/resend-otp", { email });
      setResendCooldown(60); // 60 seconds cooldown

      // Start countdown
      const countdown = setInterval(() => {
        setResendCooldown((prev) => {
          if (prev <= 1) {
            clearInterval(countdown);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      Swal.fire({
        title: "Email Sent!",
        text: "A new OTP has been sent to your email.",
        icon: "success",
        confirmButtonText: "OK",
      });
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text:
          error.response?.data?.message ||
          "Failed to resend OTP. Please try again.",
        icon: "error",
        confirmButtonText: "OK",
      });
    } finally {
      setIsResending(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-center text-blue-500 mb-6">
          Verify OTP
        </h2>
        <p className="text-center text-gray-600 mb-4">
          Enter the OTP sent to <span className="font-medium">{email}</span>
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <input
            {...register("otp", {
              required: "OTP is required",
              pattern: {
                value: /^[0-9]{6}$/,
                message: "OTP must be 6 digits",
              },
            })}
            type="text"
            placeholder="Enter 6-digit OTP"
            maxLength="6"
            className="w-full h-12 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-center text-lg font-semibold"
          />
          {errors.otp && (
            <p className="text-red-500 text-sm text-center">
              {errors.otp.message}
            </p>
          )}

          <button
            type="submit"
            className="w-full h-12 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-md transition duration-200"
          >
            Verify OTP
          </button>
        </form>

        <div className="text-center mt-6">
          <button
            onClick={handleResendOTP}
            disabled={isResending || resendCooldown > 0}
            className={`text-blue-500 font-medium hover:underline ${
              isResending || resendCooldown > 0
                ? "opacity-50 cursor-not-allowed"
                : ""
            }`}
          >
            {isResending
              ? "Sending..."
              : resendCooldown > 0
              ? `Resend in ${resendCooldown}s`
              : "Resend OTP"}
          </button>
        </div>

        <div className="text-center mt-4">
          <button
            onClick={() => navigate("/login")}
            className="text-gray-500 hover:text-gray-700 text-sm"
          >
            Back to Login
          </button>
        </div>
      </div>
    </div>
  );
}

// import React from "react";
// import { useForm } from "react-hook-form";
// import { useSearchParams, useNavigate } from "react-router-dom";
// import Swal from "sweetalert2";
// import api from "../../api/register";

// export default function OTPVerifyForm() {
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm();
//   const [searchParams] = useSearchParams();
//   const navigate = useNavigate();

//   const email = searchParams.get("email");

//   const onSubmit = async (data) => {
//     try {
//       const res = await api.post("/verify-otp", {
//         email,
//         otp: data.otp,
//       });
//       console.log(res);
//       Swal.fire({
//         title: "Verified!",
//         text: "Your account is now active. Please login.",
//         icon: "success",
//         confirmButtonText: "OK",
//       });

//       navigate("/login");
//     } catch (error) {
//       Swal.fire({
//         title: "Invalid OTP!",
//         text: error.response?.data?.message || "Please try again.",
//         icon: "error",
//         confirmButtonText: "Retry",
//       });
//     }
//   };

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gray-50">
//       <div className="w-full max-w-md bg-white rounded-3xl shadow-lg p-8">
//         <h2 className="text-2xl font-bold text-center text-blue-500 mb-6">
//           Verify OTP
//         </h2>
//         <p className="text-center text-gray-600 mb-4">
//           Enter the OTP sent to <span className="font-medium">{email}</span>
//         </p>
//         <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
//           <input
//             {...register("otp", { required: "OTP is required" })}
//             type="text"
//             placeholder="Enter OTP"
//             className="w-full h-12 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />
//           {errors.otp && (
//             <p className="text-red-500 text-sm">{errors.otp.message}</p>
//           )}

//           <button
//             type="submit"
//             className="w-full h-12 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-md transition duration-200"
//           >
//             Verify OTP
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }
