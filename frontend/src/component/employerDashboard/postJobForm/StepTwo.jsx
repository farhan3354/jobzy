import React from "react";
import { industries, employmentTypes, experienceLevels, hiringTimelines } from "../../../data/data";
import StaticAutocomplete from "../../common/StaticAutocomplete";

export default function StepTwo({ register, errors, setValue }) {
  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <label htmlFor="requirements" className="block text-sm font-semibold text-gray-700 mb-1 cursor-pointer">
          Requirements & Qualifications <span className="text-red-500">*</span>
        </label>
        <textarea
          id="requirements"
          {...register("requirements", {
            required: "Requirements are required",
          })}
          rows="5"
          placeholder={`Enter each requirement on a new line:\n- 5+ years of experience in frontend development\n- Strong proficiency in React.js and its ecosystem\n- Experience with state management (Redux, Context API)`}
          className={`w-full border px-4 py-2.5 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all resize-none ${
            errors.requirements ? "border-red-500" : "border-gray-300"
          }`}
        ></textarea>
        {errors.requirements && (
          <p className="text-red-500 text-xs mt-1 italic">{errors.requirements.message}</p>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="employmentType" className="block text-sm font-semibold text-gray-700 mb-1 cursor-pointer">
            Employment Type <span className="text-red-500">*</span>
          </label>
          <select
            id="employmentType"
            {...register("employmentType", {
              required: "Employment type is required",
            })}
            className={`w-full border px-4 py-2.5 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all bg-white cursor-pointer ${
              errors.employmentType ? "border-red-500" : "border-gray-300"
            }`}
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
            <p className="text-red-500 text-xs mt-1 italic">{errors.employmentType.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="experienceLevel" className="block text-sm font-semibold text-gray-700 mb-1 cursor-pointer">
            Experience Level <span className="text-red-500">*</span>
          </label>
          <select
            id="experienceLevel"
            {...register("experienceLevel", { required: "Experience level is required" })}
            className={`w-full border px-4 py-2.5 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all bg-white cursor-pointer ${
              errors.experienceLevel ? "border-red-500" : "border-gray-300"
            }`}
          >
            <option value="" disabled>Select experience level</option>
            {experienceLevels.map((level) => (
              <option key={level} value={level}>
                {level}
              </option>
            ))}
          </select>
          {errors.experienceLevel && (
            <p className="text-red-500 text-xs mt-1 italic">{errors.experienceLevel.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="numberOfOpenings" className="block text-sm font-semibold text-gray-700 mb-1 cursor-pointer">
            Number of Openings <span className="text-red-500">*</span>
          </label>
          <input
            id="numberOfOpenings"
            type="number"
            min="1"
            {...register("numberOfOpenings", { required: "Required", min: 1 })}
            placeholder="e.g. 5"
            className={`w-full border px-4 py-2.5 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all ${
              errors.numberOfOpenings ? "border-red-500" : "border-gray-300"
            }`}
          />
        </div>

        <div>
          <label htmlFor="hiringTimeline" className="block text-sm font-semibold text-gray-700 mb-1 cursor-pointer">
            How quickly do you need to hire?
          </label>
          <select
            id="hiringTimeline"
            {...register("hiringTimeline")}
            className="w-full border border-gray-300 px-4 py-2.5 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all bg-white cursor-pointer"
          >
            <option value="">Select timeline</option>
            {hiringTimelines.map((timeline) => (
              <option key={timeline} value={timeline}>
                {timeline}
              </option>
            ))}
          </select>
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
        <label htmlFor="skills" className="block text-sm font-semibold text-gray-700 mb-1 cursor-pointer">
          Skills <span className="text-red-500">*</span>
        </label>
        <textarea
          id="skills"
          {...register("skills", { required: "Skills are required" })}
          placeholder="Enter skills separated by commas (e.g. React, Node.js, AWS)"
          className={`w-full border px-4 py-2.5 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all h-24 ${
            errors.skills ? "border-red-500" : "border-gray-300"
          }`}
        />
        {errors.skills && (
          <p className="text-red-500 text-xs mt-1 italic">{errors.skills.message}</p>
        )}
      </div>
    </div>
  );
}
