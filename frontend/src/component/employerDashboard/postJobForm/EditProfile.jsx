import React, { useEffect, useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function EditProfile() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const [profileId, setProfileId] = useState(null);

  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get(
          "http://localhost:8000/getprofileemployer",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data = res.data.user;
        setProfileId(data._id);
        reset({
          companyName: data.companyName,
          companyWebsite: data.companyWebsite,
          industry: data.industry,
          location: data.location,
          description: data.description,
          companysize: data.companysize,
          companylogo: data.companylogo,
        });
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };

    if (token) {
      fetchProfile();
    }
  }, [token, reset]);

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      formData.append("companyName", data.companyName);
      formData.append("companyWebsite", data.companyWebsite);
      formData.append("industry", data.industry);
      formData.append("location", data.location);
      formData.append("description", data.description);
      formData.append("companysize", data.companysize);
      if (data.companylogo && data.companylogo[0]) {
        formData.append("companylogo", data.companylogo[0]);
      }

      const repo = await axios.put(
        "http://localhost:8000/updateemployer",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      toast.success("Profile Update successfully");
      console.log(repo);
      navigate("employer-dashboard/profile");
    } catch (error) {
      console.error("Update failed:", error.response?.data || error.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="bg-white shadow-md rounded-xl p-8 w-full max-w-2xl">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Edit Company Profile
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Company Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Company Name
            </label>
            <input
              type="text"
              {...register("companyName", {
                required: "Company name is required",
              })}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-700 focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="Enter company name"
            />
            {errors.companyName && (
              <p className="text-red-500 text-sm mt-1">
                {errors.companyName.message}
              </p>
            )}
          </div>

          {/* Company Website */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Company Website
            </label>
            <input
              type="url"
              {...register("companyWebsite", {
                required: "Website is required",
                pattern: {
                  value: /^(https?:\/\/)?[\w.-]+\.[a-z]{2,}(\S*)?$/,
                  message: "Enter a valid URL",
                },
              })}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-700 focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="https://example.com"
            />
            {errors.companyWebsite && (
              <p className="text-red-500 text-sm mt-1">
                {errors.companyWebsite.message}
              </p>
            )}
          </div>

          {/* Industry */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Industry
            </label>
            <input
              type="text"
              {...register("industry", { required: "Industry is required" })}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-700 focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="E.g. Software, Finance"
            />
            {errors.industry && (
              <p className="text-red-500 text-sm mt-1">
                {errors.industry.message}
              </p>
            )}
          </div>

          {/* Location */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Location
            </label>
            <input
              type="text"
              {...register("location", { required: "Location is required" })}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-700 focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="City, Country"
            />
            {errors.location && (
              <p className="text-red-500 text-sm mt-1">
                {errors.location.message}
              </p>
            )}
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              rows="4"
              {...register("description", {
                required: "Description is required",
              })}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-700 focus:ring-2 focus:ring-blue-500 outline-none resize-none"
              placeholder="Write a short company description..."
            />
            {errors.description && (
              <p className="text-red-500 text-sm mt-1">
                {errors.description.message}
              </p>
            )}
          </div>

          {/* Company Size */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Company Size
            </label>
            <select
              {...register("companysize", {
                required: "Company size is required",
              })}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-700 focus:ring-2 focus:ring-blue-500 outline-none bg-white"
            >
              <option value="">Select Size</option>
              <option value="1-10">1-10</option>
              <option value="11-50">11-50</option>
              <option value="51-200">51-200</option>
              <option value="201-500">201-500</option>
              <option value="500+">500+</option>
            </select>
            {errors.companysize && (
              <p className="text-red-500 text-sm mt-1">
                {errors.companysize.message}
              </p>
            )}
          </div>

          {/* Company Logo */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Company Logo
            </label>
            <input
              type="file"
              accept="image/*"
              {...register("companylogo")}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-700 focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-medium py-2.5 px-4 rounded-lg hover:bg-blue-700 active:scale-95 transition transform duration-200"
          >
            Update Profile
          </button>
        </form>
      </div>
    </div>
  );
}
