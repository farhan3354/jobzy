import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useSelector } from "react-redux";

export default function ChangePassword() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    watch,
  } = useForm();

  const token = useSelector((state) => state.auth.token);
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    setLoading(true);
    setMessage(null);

    try {
      const res = await axios.patch(
        "http://localhost:8000/changepassword",
        data,

        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setMessage({ type: "success", text: res.data.message });
      reset();
    } catch (error) {
      const errorMsg = error.response?.data?.message || "Something went wrong!";
      setMessage({ type: "error", text: errorMsg });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white shadow-md rounded-lg p-6 mt-10">
      <h2 className="text-xl font-bold mb-4 text-center">Change Password</h2>

      {message && (
        <p
          className={`text-center mb-4 ${
            message.type === "error" ? "text-red-500" : "text-green-600"
          }`}
        >
          {message.text}
        </p>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block mb-1 font-medium text-gray-700">
            Old Password
          </label>
          <input
            type="password"
            {...register("oldpassword", {
              required: "Old password is required",
            })}
            className="w-full border px-4 py-2 rounded focus:ring focus:ring-blue-300"
          />
          {errors.oldpassword && (
            <p className="text-sm text-red-500 mt-1">
              {errors.oldpassword.message}
            </p>
          )}
        </div>

        <div>
          <label className="block mb-1 font-medium text-gray-700">
            New Password
          </label>
          <input
            type="password"
            {...register("newpassword", {
              required: "New password is required",
              minLength: { value: 6, message: "Must be at least 6 characters" },
            })}
            className="w-full border px-4 py-2 rounded focus:ring focus:ring-blue-300"
          />
          {errors.newpassword && (
            <p className="text-sm text-red-500 mt-1">
              {errors.newpassword.message}
            </p>
          )}
        </div>

        <div>
          <label className="block mb-1 font-medium text-gray-700">
            Confirm New Password
          </label>
          <input
            type="password"
            {...register("confirmNewPassword", {
              required: "Please confirm your password",
              validate: (value) =>
                value === watch("newpassword") || "Passwords do not match",
            })}
            className="w-full border px-4 py-2 rounded focus:ring focus:ring-blue-300"
          />
          {errors.confirmNewPassword && (
            <p className="text-sm text-red-500 mt-1">
              {errors.confirmNewPassword.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:bg-gray-400 transition"
        >
          {loading ? "Changing..." : "Change Password"}
        </button>
      </form>
    </div>
  );
}
