import React from "react";

export default function StepTwo({ register, errors }) {
  return (
    <>
      <div>
        <label className="block mb-1 font-medium">Job Title</label>
        <input
          type="text"
          {...register("seekerjobstitle", {
            required: "Job title is required",
          })}
          placeholder="Job Title"
          className="w-full border px-3 py-2 rounded"
        />
        {errors.seekerjobstitle && (
          <p className="text-red-500">{errors.seekerjobstitle.message}</p>
        )}
      </div>

      <div>
        <label className="block mb-1 font-medium">Company Name</label>
        <input
          type="text"
          {...register("seekerjobscompany", {
            required: "Comany name is required",
          })}
          placeholder="Company"
          className="w-full border px-3 py-2 rounded"
        />
        {errors.seekerjobscompany && (
          <p className="text-red-500">{errors.seekerjobscompany.message}</p>
        )}
      </div>

      <div>
        <label className="block mb-1 font-medium">Experience</label>
        <input
          type="text"
          {...register("seekerexperience", {
            required: "Experience is required",
          })}
          placeholder="experience"
          className="w-full border px-3 py-2 rounded"
        />
        {errors.seekerexperience && (
          <p className="text-red-500">{errors.seekerexperience.message}</p>
        )}
      </div>

      <div>
        <label className="block mb-1 font-medium">Job Descripition</label>
        <textarea
          {...register("seekerjobdescripition", {
            required: "job descripition is required",
          })}
          placeholder="Job Description"
          rows="2"
          className="w-full border px-3 py-2 rounded"
        />
        {errors.seekerjobdescripition && (
          <p className="text-red-500">{errors.seekerjobdescripition.message}</p>
        )}
      </div>
    </>
  );
}
