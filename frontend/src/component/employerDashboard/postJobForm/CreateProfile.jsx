import React from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import api from './../../../api/register';
import LocationAutocomplete from "../../common/LocationAutocomplete";
import { industries } from "../../../data/data";
import StaticAutocomplete from "../../common/StaticAutocomplete";

export default function CreateProfile() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({ mode: "onBlur" });
  const token = useSelector((state) => state.auth.token);
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
      const repo = await api.post(
        "/createemployerprofile",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      toast.success("Profile created successfully");

      console.log(repo);
      navigate("/employer-dashboard/profile");
    } catch (error) {
      console.log(error);
      toast.error("Failed to create profile");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-2xl border border-gray-100 animate-slide-up">
        <h2 className="text-3xl font-extrabold text-gray-900 mb-2 text-center">
          Setup Your Company Profile
        </h2>
        <p className="text-gray-500 text-center mb-8 italic">
          Tell us about your company to start posting jobs.
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="companyName" className="block text-sm font-semibold text-gray-700 mb-1 cursor-pointer">
                Company Name <span className="text-red-500">*</span>
              </label>
              <input
                id="companyName"
                type="text"
                {...register("companyName", {
                  required: "Company name is required",
                })}
                className={`w-full border px-4 py-2.5 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all ${
                  errors.companyName ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Enter company name"
              />
              {errors.companyName && (
                <p className="text-red-500 text-xs mt-1 italic">{errors.companyName.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="companyWebsite" className="block text-sm font-semibold text-gray-700 mb-1 cursor-pointer">
                Company Website <span className="text-red-500">*</span>
              </label>
              <input
                id="companyWebsite"
                type="url"
                {...register("companyWebsite", {
                  required: "Website is required",
                  pattern: {
                    value: /^(https?:\/\/)?[\w.-]+\.[a-z]{2,}(\S*)?$/,
                    message: "Enter a valid URL",
                  },
                })}
                className={`w-full border px-4 py-2.5 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all ${
                  errors.companyWebsite ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="https://example.com"
              />
              {errors.companyWebsite && (
                <p className="text-red-500 text-xs mt-1 italic">{errors.companyWebsite.message}</p>
              )}
            </div>
          </div>

          <div>
            <label htmlFor="industry" className="block text-sm font-semibold text-gray-700 mb-1 cursor-pointer">
              Industry <span className="text-red-500">*</span>
            </label>
            <StaticAutocomplete
              name="industry"
              register={register}
              errors={errors}
              setValue={setValue}
              options={industries}
              placeholder="Select industry"
              validation={{ required: "Industry is required" }}
            />
          </div>

          <div>
            <label htmlFor="location" className="block text-sm font-semibold text-gray-700 mb-1 cursor-pointer">
              Location <span className="text-red-500">*</span>
            </label>
            <LocationAutocomplete
              name="location"
              register={register}
              errors={errors}
              setValue={setValue}
              placeholder="e.g. Lahore, Pakistan"
            />
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-semibold text-gray-700 mb-1 cursor-pointer">
              Description <span className="text-red-500">*</span>
            </label>
            <textarea
              id="description"
              rows="4"
              {...register("description", {
                required: "Description is required",
              })}
              className={`w-full border px-4 py-2.5 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all resize-none ${
                errors.description ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Write a short company description..."
            />
            {errors.description && (
              <p className="text-red-500 text-xs mt-1 italic">{errors.description.message}</p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="companysize" className="block text-sm font-semibold text-gray-700 mb-1 cursor-pointer">
                Company Size <span className="text-red-500">*</span>
              </label>
              <select
                id="companysize"
                {...register("companysize", {
                  required: "Company size is required",
                })}
                className={`w-full border px-4 py-2.5 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all bg-white cursor-pointer ${
                  errors.companysize ? "border-red-500" : "border-gray-300"
                }`}
              >
                <option value="">Select Size</option>
                <option value="1-10">1-10 employees</option>
                <option value="11-50">11-50 employees</option>
                <option value="51-200">51-200 employees</option>
                <option value="201-500">201-500 employees</option>
                <option value="500+">500+ employees</option>
              </select>
              {errors.companysize && (
                <p className="text-red-500 text-xs mt-1 italic">{errors.companysize.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="companylogo" className="block text-sm font-semibold text-gray-700 mb-1 cursor-pointer">
                Company Logo <span className="text-red-500">*</span>
              </label>
              <input
                id="companylogo"
                type="file"
                accept="image/*"
                {...register("companylogo", {
                  required: "Company logo is required",
                })}
                className={`w-full border px-4 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all file:mr-4 file:py-1 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 ${
                  errors.companylogo ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.companylogo && (
                <p className="text-red-500 text-xs mt-1 italic">{errors.companylogo.message}</p>
              )}
            </div>
          </div>

          <div className="pt-4">
            <button
              type="submit"
              className="w-full bg-blue-600 text-white font-bold py-3 px-4 rounded-xl hover:bg-blue-700 shadow-md hover:shadow-lg active:scale-95 transition transform duration-200"
            >
              Finish Setup
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
