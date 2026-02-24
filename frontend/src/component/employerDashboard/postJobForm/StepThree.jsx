import React from "react";
import LocationAutocomplete from "../../common/LocationAutocomplete";
import { jobSchedules, benefitsList } from "../../../data/data";

export default function StepThree({ register, errors, setValue }) {
  return (
    <>
    <div className="space-y-8 animate-fade-in">
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="salary" className="block text-sm font-semibold text-gray-700 mb-1 cursor-pointer">
            Salary Range <span className="text-red-500">*</span>
          </label>
          <input
            id="salary"
            type="text"
            {...register("salary", {
              required: "Salary range is required",
              pattern: {
                value: /^\$?[0-9,]+(?: - \$?[0-9,]+)?$/,
                message: "e.g. $50,000 - $70,000",
              },
            })}
            placeholder="e.g. $50,000 - $70,000"
            className={`w-full border px-4 py-2.5 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all ${
              errors.salary ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.salary && (
            <p className="text-red-500 text-xs mt-1 italic">{errors.salary.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="applicationDeadline" className="block text-sm font-semibold text-gray-700 mb-1 cursor-pointer">
            Application Deadline
          </label>
          <input
            id="applicationDeadline"
            type="date"
            {...register("applicationDeadline")}
            className="w-full border border-gray-300 px-4 py-2.5 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all bg-white"
          />
        </div>
      </div>

      {/* Indeed Style: Schedule Section */}
      <div className="space-y-4">
        <label className="block text-sm font-semibold text-gray-700">
          Job Schedule
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {jobSchedules.map((schedule) => (
            <label key={schedule} className="flex items-center p-3 border border-gray-200 rounded-xl cursor-pointer hover:bg-blue-50 hover:border-blue-200 transition-all group">
              <input
                type="checkbox"
                value={schedule}
                {...register("schedule")}
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 cursor-pointer"
              />
              <span className="ml-3 text-sm text-gray-600 group-hover:text-blue-700 font-medium transition-colors">
                {schedule}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Indeed Style: Benefits Section */}
      <div className="space-y-4">
        <label className="block text-sm font-semibold text-gray-700">
          Benefits
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {benefitsList.map((benefit) => (
            <label key={benefit} className="flex items-center p-3 border border-gray-200 rounded-xl cursor-pointer hover:bg-green-50 hover:border-green-200 transition-all group">
              <input
                type="checkbox"
                value={benefit}
                {...register("benefits")}
                className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500 cursor-pointer"
              />
              <span className="ml-3 text-sm text-gray-600 group-hover:text-green-700 font-medium transition-colors">
                {benefit}
              </span>
            </label>
          ))}
        </div>
      </div>

      <div className="bg-blue-50 p-6 rounded-2xl border border-blue-100 space-y-4">
        <h3 className="text-lg font-bold text-blue-900 border-b border-blue-200 pb-2">
          Contact Information
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="contactEmail" className="block text-sm font-semibold text-blue-800 mb-1 cursor-pointer">
              Contact Email <span className="text-red-500">*</span>
            </label>
            <input
              id="contactEmail"
              type="email"
              {...register("contactEmail", {
                required: "Contact email is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email address",
                },
              })}
              placeholder="hr@company.com"
              className={`w-full border px-4 py-2.5 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all ${
                errors.contactEmail ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.contactEmail && (
              <p className="text-red-500 text-xs mt-1 italic">{errors.contactEmail.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="contactPhone" className="block text-sm font-semibold text-blue-800 mb-1 cursor-pointer">
              Contact Phone
            </label>
            <input
              id="contactPhone"
              type="tel"
              {...register("contactPhone")}
              placeholder="+1 (555) 123-4567"
              className="w-full border border-gray-300 px-4 py-2.5 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
            />
          </div>
        </div>
      </div>
    </div>
    </>
  );
}
