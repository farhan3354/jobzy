import React from "react";
import { experienceLevels } from "../../../data/data";

export default function StepTwo({ register, errors }) {
  return (
    <div className="space-y-4 animate-fade-in">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            Job Title
          </label>
          <input
            type="text"
            {...register("seekerjobstitle", {
              required: "Recent job title is required",
            })}
            placeholder="e.g. Software Engineer"
            className={`w-full border px-4 py-2.5 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all ${
              errors.seekerjobstitle ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.seekerjobstitle && (
            <p className="text-red-500 text-xs mt-1 italic">{errors.seekerjobstitle.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            Company Name
          </label>
          <input
            type="text"
            {...register("seekerjobscompany", {
              required: "Recent company name is required",
            })}
            placeholder="e.g. Google"
            className={`w-full border px-4 py-2.5 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all ${
              errors.seekerjobscompany ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.seekerjobscompany && (
            <p className="text-red-500 text-xs mt-1 italic">{errors.seekerjobscompany.message}</p>
          )}
        </div>
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1">
          Experience Level
        </label>
        <select
          {...register("seekerexperience", {
            required: "Experience level is required",
          })}
          className={`w-full border px-4 py-2.5 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all appearance-none bg-white ${
            errors.seekerexperience ? "border-red-500" : "border-gray-300"
          }`}
        >
          <option value="">Select your experience level</option>
          {experienceLevels.map((level) => (
            <option key={level} value={level}>
              {level}
            </option>
          ))}
        </select>
        {errors.seekerexperience && (
          <p className="text-red-500 text-xs mt-1 italic">{errors.seekerexperience.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1">
          Brief Job Description
        </label>
        <textarea
          {...register("seekerjobdescripition", {
            required: "Job description is required",
          })}
          placeholder="Describe your primary responsibilities and achievements..."
          rows="4"
          className={`w-full border px-4 py-2.5 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all resize-none ${
            errors.seekerjobdescripition ? "border-red-500" : "border-gray-300"
          }`}
        />
        {errors.seekerjobdescripition && (
          <p className="text-red-500 text-xs mt-1 italic">{errors.seekerjobdescripition.message}</p>
        )}
      </div>
    </div>
  );
}
