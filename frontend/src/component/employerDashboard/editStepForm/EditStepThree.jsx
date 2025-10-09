import React, { useState } from "react";

export default function EditStepThree({ register, errors }) {
  const [isRemote, setIsRemote] = useState(false);

  return (
    <>
      <div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-700 mb-1">Location *</label>
            <input
              type="text"
              {...register("location", {
                required: "Location is required",
              })}
              placeholder="e.g. New York, NY"
              className="w-full border rounded-lg px-3 py-2 focus:ring focus:ring-blue-300"
              disabled={isRemote}
            />
            {errors.location && (
              <p className="text-red-500 text-sm mt-1">
                {errors.location.message}
              </p>
            )}
          </div>

          <div className="flex items-center px-6">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                {...register("isRemote")}
                onChange={(e) => setIsRemote(e.target.checked)}
                className="rounded"
              />
              <span className="text-gray-700">Remote job</span>
            </label>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
          <div>
            <label className="block text-gray-700 mb-1">Salary Range *</label>
            <input
              type="text"
              {...register("salary", {
                required: "Salary range is required",
                pattern: {
                  value: /^\$?[0-9,]+(?: - \$?[0-9,]+)?$/,
                  message:
                    "Please enter a valid salary range (e.g. $50,000 - $70,000)",
                },
              })}
              placeholder="e.g. $50,000 - $70,000"
              className="w-full border rounded-lg px-3 py-2 focus:ring focus:ring-blue-300"
            />
            {errors.salary && (
              <p className="text-red-500 text-sm mt-1">
                {errors.salary.message}
              </p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
          <div>
            <label className="block text-gray-700 mb-1">
              Application Deadline
            </label>
            <input
              type="date"
              {...register("applicationDeadline")}
              className="w-full border rounded-lg px-3 py-2 focus:ring focus:ring-blue-300"
            />
          </div>
        </div>

        <div className="border-t pt-4 mt-4">
          <h3 className="text-lg font-semibold mb-3">Contact Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 mb-1">
                Contact Email *
              </label>
              <input
                type="email"
                {...register("contactEmail", {
                  required: "Contact email is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address",
                  },
                })}
                placeholder="hr@company.com"
                className="w-full border rounded-lg px-3 py-2 focus:ring focus:ring-blue-300"
              />
              {errors.contactEmail && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.contactEmail.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-gray-700 mb-1">Contact Phone</label>
              <input
                type="tel"
                {...register("contactPhone")}
                placeholder="+1 (555) 123-4567"
                className="w-full border rounded-lg px-3 py-2 focus:ring focus:ring-blue-300"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
