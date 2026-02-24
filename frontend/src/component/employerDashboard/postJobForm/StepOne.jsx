import React from "react";

export default function StepOne({ register, errors }) {
  return (
    <>
    <div className="space-y-6 animate-fade-in">
      <div>
        <label htmlFor="jobTitle" className="block text-sm font-semibold text-gray-700 mb-1 cursor-pointer">
          Job Title <span className="text-red-500">*</span>
        </label>
        <input
          id="jobTitle"
          type="text"
          {...register("jobTitle", {
            required: "Job title is required",
            minLength: {
              value: 3,
              message: "Job title must be at least 3 characters",
            },
          })}
          placeholder="e.g. Senior Frontend Developer"
          className={`w-full border px-4 py-2.5 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all ${
            errors.jobTitle ? "border-red-500" : "border-gray-300"
          }`}
        />
        {errors.jobTitle && (
          <p className="text-red-500 text-xs mt-1 italic">{errors.jobTitle.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="companyName" className="block text-sm font-semibold text-gray-700 mb-1 cursor-pointer">
          Company Name <span className="text-red-500">*</span>
        </label>
        <input
          id="companyName"
          type="text"
          {...register("companyName", {
            required: "Company name is required",
            pattern: {
              value: /^[a-zA-Z0-9\s.,&'-]+$/,
              message: "Invalid characters in company name"
            }
          })}
          placeholder="Enter your company name"
          className={`w-full border px-4 py-2.5 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all ${
            errors.companyName ? "border-red-500" : "border-gray-300"
          }`}
        />
        {errors.companyName && (
          <p className="text-red-500 text-xs mt-1 italic">{errors.companyName.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="jobDescription" className="block text-sm font-semibold text-gray-700 mb-1 cursor-pointer">
          Job Description <span className="text-red-500">*</span>
        </label>
        <textarea
          id="jobDescription"
          {...register("jobDescription", {
            required: "Description is required",
            minLength: {
              value: 25,
              message: "Description must be at least 25 characters",
            },
          })}
          rows="6"
          placeholder="Describe the role, responsibilities, and requirements..."
          className={`w-full border px-4 py-2.5 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all resize-none ${
            errors.jobDescription ? "border-red-500" : "border-gray-300"
          }`}
        ></textarea>
        {errors.jobDescription && (
          <p className="text-red-500 text-xs mt-1 italic">{errors.jobDescription.message}</p>
        )}
      </div>
    </div>
    </>
  );
}
