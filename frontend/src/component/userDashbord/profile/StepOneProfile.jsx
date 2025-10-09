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

export default function StepOneProfile({ register, errors }) {
  return (
    <>
      <div>
        <label className="block mb-1 font-medium">Headline</label>
        <input
          type="text"
          {...register("headline", { required: "Headline is required" })}
          className="w-full border px-3 py-2 rounded"
        />
        {errors.headline && (
          <p className="text-red-500 text-sm">{errors.headline.message}</p>
        )}
      </div>

      <div>
        <label className="block mb-1 font-medium">Location</label>
        <input
          type="text"
          {...register("location", { required: "Location is required" })}
          className="w-full border px-3 py-2 rounded"
        />
        {errors.location && (
          <p className="text-red-500 text-sm">{errors.location.message}</p>
        )}
      </div>

      <div>
        <label className="block mb-1 font-medium">About</label>
        <textarea
          {...register("about", { required: "About is required" })}
          rows="4"
          className="w-full border px-3 py-2 rounded"
        />
        {errors.about && (
          <p className="text-red-500 text-sm">{errors.about.message}</p>
        )}
      </div>

      <div>
        <label className="block mb-1 font-medium">Profile Image</label>
        <input
          type="file"
          accept="image/*"
          {...register("profileImage", {
            required: "Profile image is required",
          })}
          className="w-full border px-3 py-2 rounded file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
        />
        {errors.profileImage && (
          <p className="text-red-500 text-sm">{errors.profileImage.message}</p>
        )}
      </div>
    </>
  );
}
