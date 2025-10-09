import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";

export default function CreateAdminProfile() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();
  const token = useSelector((state) => state.auth.token);

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      formData.append("bio", data.bio);
      formData.append("location", data.location);

      if (data.profileImage && data.profileImage.length > 0) {
        formData.append("profileImage", data.profileImage[0]);
      }

      const res = await axios.post(
        "http://localhost:8000/adminProfile",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("Profile created:", res.data);
      alert("Profile created successfully!");
    } catch (error) {
      console.error("Error:", error);
      const errorMessage =
        error.response?.data?.message ||
        error.response?.data?.error ||
        "Something went wrong!";
      alert(errorMessage);
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen flex items-center justify-center">
      <div className="bg-white shadow-lg rounded-2xl w-full max-w-2xl p-8">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
          Create Admin Profile
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label className="block text-gray-700 font-medium mb-2">Bio</label>
            <textarea
              {...register("bio", {
                required: "Bio is required",
                minLength: {
                  value: 10,
                  message: "Bio must be at least 10 characters long",
                },
              })}
              className="w-full border rounded-lg px-4 py-2 focus:ring focus:ring-blue-200"
              rows="3"
              placeholder="Write a short bio..."
            />
            {errors.bio && (
              <p className="text-red-500 text-sm mt-1">{errors.bio.message}</p>
            )}
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Profile Image
            </label>
            <input
              type="file"
              accept="image/*"
              {...register("profileImage", {
                required: "Profile image is required",
                validate: {
                  fileType: (files) =>
                    files[0]?.type.startsWith("image/") ||
                    "Only image files are allowed",
                },
              })}
              className="w-full border rounded-lg px-4 py-2 focus:ring focus:ring-blue-200"
            />
            {errors.profileImage && (
              <p className="text-red-500 text-sm mt-1">
                {errors.profileImage.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Location
            </label>
            <input
              type="text"
              {...register("location", {
                required: "Location is required",
                minLength: {
                  value: 3,
                  message: "Location must be at least 3 characters long",
                },
              })}
              className="w-full border rounded-lg px-4 py-2 focus:ring focus:ring-blue-200"
              placeholder="e.g. Karachi, Pakistan"
            />
            {errors.location && (
              <p className="text-red-500 text-sm mt-1">
                {errors.location.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full bg-blue-600 text-white font-medium py-2 px-4 rounded-lg transition ${
              isSubmitting
                ? "opacity-50 cursor-not-allowed"
                : "hover:bg-blue-700"
            }`}
          >
            {isSubmitting ? "Creating Profile..." : "Save Profile"}
          </button>
        </form>
      </div>
    </div>
  );
}
