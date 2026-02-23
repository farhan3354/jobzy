import React from "react";
import StaticAutocomplete from "../../common/StaticAutocomplete";
import { degrees, fieldsOfStudy } from "../../../data/data";

export default function StepThree({ register, errors, isEdit, setValue }) {
  return (
    <div className="space-y-4 animate-fade-in">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="seekerdegree" className="block text-sm font-semibold text-gray-700 mb-1 cursor-pointer">
            Degree / Certification
          </label>
          <StaticAutocomplete
            name="seekerdegree"
            register={register}
            errors={errors}
            setValue={setValue}
            options={degrees}
            placeholder="e.g. Bachelor of Science"
            validation={{ required: "Degree / Certification is required" }}
          />
        </div>

        <div>
          <label htmlFor="seekerinsitute" className="block text-sm font-semibold text-gray-700 mb-1 cursor-pointer">
            Institute / University
          </label>
          <input
            id="seekerinsitute"
            type="text"
            {...register("seekerinsitute")}
            placeholder="e.g. Stanford University"
            className={`w-full border px-4 py-2.5 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all ${
              errors.seekerinsitute ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.seekerinsitute && (
            <p className="text-red-500 text-xs mt-1 italic">{errors.seekerinsitute.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="seekereducation" className="block text-sm font-semibold text-gray-700 mb-1 cursor-pointer">
            Field of Study / Education
          </label>
          <StaticAutocomplete
            name="seekereducation"
            register={register}
            errors={errors}
            setValue={setValue}
            options={fieldsOfStudy}
            placeholder="e.g. Computer Science"
            validation={{ required: "Field of Study is required" }}
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1">
          Skills (comma-separated)
        </label>
        <input
          type="text"
          {...register("skills")}
          placeholder="e.g. React, Node.js, Project Management"
          className="w-full border border-gray-300 px-4 py-2.5 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
        />
        <p className="text-gray-400 text-[10px] mt-1 italic">Add your top skills separated by commas to help employers find you.</p>
      </div>

      <div className="bg-blue-50 p-4 rounded-xl border border-blue-100">
        <label htmlFor="resumeInput" className="block text-sm font-semibold text-blue-800 mb-2 cursor-pointer">
          Upload Resume (PDF)
        </label>
        <div className="mt-1 flex items-center">
          <input
            id="resumeInput"
            type="file"
            accept="application/pdf"
            onClick={(e) => e.stopPropagation()}
            {...register("resume", { required: !isEdit && "Resume is required" })}
            className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-700 transition-all cursor-pointer"
          />
        </div>
        {errors.resume && (
          <p className="text-red-500 text-xs mt-2 italic">{errors.resume.message}</p>
        )}
      </div>
    </div>
  );
}
