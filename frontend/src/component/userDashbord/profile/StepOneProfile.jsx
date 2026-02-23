// import React from "react";

// export default function StepOneProfile({ register, errors }) {
//   return (
//     <>
//       <div>
//         <label className="block mb-1 font-medium">Headline</label>
//         <input
//           type="text"
//           {...register("headline", { required: "Headline is required" })}
//           className="w-full border px-3 py-2 rounded"
//         />
//         {errors.headline && (
//           <p className="text-red-500 text-sm">{errors.headline.message}</p>
//         )}
//       </div>
//       <div>
//         <label className="block mb-1 font-medium">Location</label>
//         <input
//           type="text"
//           {...register("location", { required: "Location is required" })}
//           className="w-full border px-3 py-2 rounded"
//         />
//         {errors.location && (
//           <p className="text-red-500 text-sm">{errors.location.message}</p>
//         )}
//       </div>
//       <div>
//         <label className="block mb-1 font-medium">About</label>
//         <textarea
//           {...register("about", { required: "About is required" })}
//           rows="4"
//           className="w-full border px-3 py-2 rounded"
//         />
//         {errors.about && (
//           <p className="text-red-500 text-sm">{errors.about.message}</p>
//         )}
//       </div>
//     </>
//   );
// }
import React from "react";
import LocationAutocomplete from "../../common/LocationAutocomplete";

export default function StepOneProfile({ register, errors, setValue, isEdit }) {
  return (
    <div className="space-y-4 animate-fade-in">
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1">
          Professional Headline
        </label>
        <input
          type="text"
          {...register("headline", { 
            required: "Professional headline is required",
            minLength: { value: 5, message: "Headline must be at least 5 characters" }
          })}
          placeholder="e.g. Senior Frontend Developer | React Specialist"
          className={`w-full border px-4 py-2.5 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all ${
            errors.headline ? "border-red-500" : "border-gray-300"
          }`}
        />
        {errors.headline && (
          <p className="text-red-500 text-xs mt-1 italic">{errors.headline.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1">
          Location
        </label>
        <LocationAutocomplete
          name="location"
          register={register}
          errors={errors}
          setValue={setValue}
          placeholder="e.g. San Francisco, CA"
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1">
          Personal Summary / About
        </label>
        <textarea
          {...register("about", { 
            required: "About section is required",
            minLength: { value: 20, message: "Summary must be at least 20 characters" }
          })}
          placeholder="Briefly describe your professional journey, key achievements, and what you're looking for next..."
          rows="5"
          className={`w-full border px-4 py-2.5 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all resize-none ${
            errors.about ? "border-red-500" : "border-gray-300"
          }`}
        />
        {errors.about && (
          <p className="text-red-500 text-xs mt-1 italic">{errors.about.message}</p>
        )}
      </div>

      <div className="bg-blue-50 p-4 rounded-xl border border-blue-100">
        <label htmlFor="profileImage" className="block text-sm font-semibold text-blue-800 mb-2 cursor-pointer">
          Profile Photo
        </label>
        <div className="flex items-center space-x-4">
          <input
            id="profileImage"
            type="file"
            accept="image/*"
            onClick={(e) => e.stopPropagation()}
            {...register("profileImage", {
              required: !isEdit && "Profile photo is required",
            })}
            className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-700 transition-all cursor-pointer"
          />
        </div>
        {errors.profileImage && (
          <p className="text-red-500 text-xs mt-2 italic">{errors.profileImage.message}</p>
        )}
      </div>
    </div>
  );
}
