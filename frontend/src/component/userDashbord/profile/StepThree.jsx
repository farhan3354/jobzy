import React from "react";

export default function StepThree({ register, errors }) {
  return (
    <>
      <h3 className="font-semibold mb-2 text-center">Degree</h3>
      <div>
        <input
          type="text"
          {...register("seekerdegree")}
          placeholder="Degree"
          className="w-full border px-3 py-2 rounded"
        />{" "}
        {errors.seekerdegree && (
          <p className="text-red-500 text-sm">{errors.seekerdegree.message}</p>
        )}
      </div>
      <div>
        <input
          type="text"
          {...register("seekerinsitute")}
          placeholder="Institution"
          className="w-full border px-3 py-2 rounded"
        />
        {errors.seekerinsitute && (
          <p className="text-red-500 text-sm">
            {errors.seekerinsitute.message}
          </p>
        )}
      </div>
      <div>
        <input
          type="text"
          {...register("seekereducation", { required: "Eduction is required" })}
          placeholder="Education"
          className="w-full border px-3 py-2 rounded"
        />
        {errors.seekereducation && (
          <p className="text-red-500 text-sm">
            {errors.seekereducation.message}
          </p>
        )}
      </div>
      <div>
        <label className="block mb-1 font-medium">
          Skills (comma-separated)
        </label>
        <input
          type="text"
          {...register("skills")}
          placeholder="e.g. React, Node.js, MongoDB"
          className="w-full border px-3 py-2 rounded"
        />
      </div>

      <div>
        <label className="block mb-1 font-medium">Upload Resume (PDF)</label>
        <input
          type="file"
          accept="application/pdf"
          {...register("resume", { required: "Resume is required" })}
          className="w-full border px-3 py-2 rounded"
        />
        {errors.resume && (
          <p className="text-red-500 text-sm">{errors.resume.message}</p>
        )}
      </div>
    </>
  );
}
