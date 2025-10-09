import React from "react";

export default function EditStepOne({ register, errors }) {
  return (
    <>
      <div>
        <div>
          <label className="block text-gray-700 mb-1">Job Title *</label>
          <input
            type="text"
            {...register("jobTitle", {
              required: "Job title is required",
              minLength: {
                value: 3,
                message: "Job title must be at least 3 characters",
              },
            })}
            placeholder="e.g. Senior Frontend Developer"
            className="w-full border rounded-lg px-3 py-2 focus:ring focus:ring-blue-300"
            required
          />
          {errors.jobTitle && (
            <p className="text-red-500 text-sm mt-1">
              {errors.jobTitle.message}
            </p>
          )}
        </div>

        <div>
          <label className="block text-gray-700 mb-1">Company Name *</label>
          <input
            type="text"
            {...register("companyName", {
              required: "Company name is required",
            })}
            placeholder="Enter your company name"
            className="w-full border rounded-lg px-3 py-2 focus:ring focus:ring-blue-300"
            required
          />
          {errors.companyName && (
            <p className="text-red-500 text-sm mt-1">
              {errors.companyName.message}
            </p>
          )}
        </div>

        <div>
          <label className="block text-gray-700 mb-1">Job Description *</label>
          <textarea
            {...register("jobDescription", {
              required: "Description is required",
              minLength: {
                value: 25,
                message: "Description must be at least 25 characters",
              },
            })}
            rows="5"
            placeholder="Describe the role, responsibilities, and requirements..."
            className="w-full border rounded-lg px-3 py-2 focus:ring focus:ring-blue-300"
            required
          ></textarea>
          {errors.jobDescription && (
            <p className="text-red-500 text-sm mt-1">
              {errors.jobDescription.message}
            </p>
          )}
        </div>
      </div>
    </>
  );
}
