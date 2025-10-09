import React from "react";
import { industries, employmentTypes } from "../../../data/data";

export default function StepTwo({ register, errors }) {
  return (
    <>
      <div>
        <div>
          <label className="block text-gray-700 mb-1">
            Requirements & Qualifications *
          </label>
          <textarea
            {...register("requirements", {
              required: "Requirements are required",
            })}
            rows="5"
            placeholder={`Enter each requirement on a new line:\n- 5+ years of experience in frontend development\n- Strong proficiency in React.js and its ecosystem\n- Experience with state management (Redux, Context API)`}
            className="w-full border rounded-lg px-3 py-2 focus:ring focus:ring-blue-300"
            required
          ></textarea>
          {errors.requirements && (
            <p className="text-red-500 text-sm mt-1">
              {errors.requirements.message}
            </p>
          )}
        </div>

        <div>
          <label className="block text-gray-700 mb-1">Employment Type *</label>
          <select
            {...register("employmentType", {
              required: "Employment type is required",
            })}
            className="w-full border rounded-lg px-3 py-2 focus:ring focus:ring-blue-300"
          >
            <option value="" disabled>
              Select employment type
            </option>
            {employmentTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
          {errors.employmentType && (
            <p className="text-red-500 text-sm mt-1">
              {errors.employmentType.message}
            </p>
          )}
        </div>

        <div>
          <label className="block text-gray-700 mb-1">Industry *</label>
          <select
            {...register("industry", { required: "Industry is required" })}
            className="w-full border rounded-lg px-3 py-2 focus:ring focus:ring-blue-300"
          >
            <option value="" disabled>
              Select industry
            </option>
            {industries.map((industry) => (
              <option key={industry} value={industry}>
                {industry}
              </option>
            ))}
          </select>
          {errors.industry && (
            <p className="text-red-500 text-sm mt-1">
              {errors.industry.message}
            </p>
          )}
        </div>
        <div>
          <label className="block text-gray-700 mb-1">Skills *</label>

          <textarea
            {...register("skills", { required: "Skills are required" })}
            placeholder="Enter skills separated by commas"
            className="w-full border rounded-lg px-3 py-2 focus:ring focus:ring-blue-300"
          />
          {errors.skills && (
            <p className="text-red-500 text-sm mt-1">{errors.skills.message}</p>
          )}
        </div>
      </div>
    </>
  );
}
