import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import StepThree from "./StepThree";
import StepTwo from "./StepTwo";
import StepOneProfile from "./StepOneProfile";

export default function JobSeekerProfileForm() {
  const {
    register,
    handleSubmit,
    trigger,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();
  const token = useSelector((state) => state.auth.token);
  const [step, setStep] = useState(1);

  //   const onSubmit = async (data) => {
  //     try {
  //       const formData = new FormData();

  //       formData.append("headline", data.headline);
  //       formData.append("about", data.about);

  //       formData.append("experience[0].title", data.experience?.[0]?.title || "");
  //       formData.append(
  //         "experience[0].company",
  //         data.experience?.[0]?.company || ""
  //       );
  //       formData.append(
  //         "location",
  //         data.location || ""
  //       );

  //       formData.append(
  //         "experience[0].description",
  //         data.experience?.[0]?.description || ""
  //       );

  //       formData.append("education[0].degree", data.education?.[0]?.degree || "");
  //       formData.append(
  //         "education[0].institution",
  //         data.education?.[0]?.institution || ""
  //       );
  //       formData.append("education[0].year", data.education?.[0]?.year || "");

  //       const skillsArray = data.skills.split(",").map((skill) => skill.trim());
  //       skillsArray.forEach((skill, index) => {
  //         formData.append(`skills[${index}]`, skill);
  //       });

  //       if (data.resume && data.resume[0]) {
  //         formData.append("resume", data.resume[0]);
  //       }

  //       const response = await axios.post(
  //         "http://localhost:8000/createprofile",
  //         formData,
  //         {
  //           headers: {
  //             Authorization: `Bearer ${token}`,
  //             "Content-Type": "multipart/form-data",
  //           },
  //         }
  //       );

  //       if (response.data.success) {
  //         toast.success("Profile created successfully");
  //         navigate("/profile");
  //       }
  //     } catch (error) {
  //       toast.error(error.response?.data?.message || "Error creating profile");
  //     }
  //   };

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();

      formData.append("headline", data.headline);
      formData.append("about", data.about);
      formData.append("location", data.location);
      if (data.profileImage && data.profileImage[0]) {
        formData.append("profileImage", data.profileImage[0]);
      }

      formData.append("seekerjobstitle", data.seekerjobstitle);
      formData.append("seekerjobscompany", data.seekerjobscompany);
      formData.append("seekerjobdescripition", data.seekerjobdescripition);
      formData.append("seekerexperience", data.seekerexperience);
      formData.append("seekerdegree", data.seekerdegree);
      formData.append("seekerinsitute", data.seekerinsitute);
      formData.append("seekereducation", data.seekereducation);

      const seekerskills = data.skills
        .split(",")
        .map((s) => s.trim())
        .filter((s) => s !== "");

      formData.append("seekerskills", JSON.stringify(seekerskills));

      if (data.resume && data.resume[0]) {
        formData.append("resume", data.resume[0]);
      }

      const response = await axios.post(
        "http://localhost:8000/createprofile",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.data.success) {
        toast.success("Profile created successfully");
        navigate("/user-dashboard/profile");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Error creating profile");
    }
  };

  const nextStep = async () => {
    let valid = false;

    if (step === 1) {
      valid = await trigger(["headline", "about", "location", "profileImage"]);
    } else if (step === 2) {
      valid = await trigger([
        "seekerjobstitle",
        "seekerjobscompany",
        "seekerexperience",
        "seekerjobdescripition",
      ]);
    } else {
      valid = true;
    }

    if (valid) {
      setStep((prev) => prev + 1);
    }
  };
  const prevStep = () => setStep((prev) => prev - 1);

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 bg-white shadow rounded">
      <h2 className="text-2xl font-bold mb-6 text-center">
        Create Your Job Seeker Profile
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {step === 1 && <StepOneProfile register={register} errors={errors} />}

        {step === 2 && <StepTwo register={register} errors={errors} />}

        {step === 3 && <StepThree register={register} errors={errors} />}

        <div className="flex justify-between pt-4">
          {step > 1 && (
            <button
              type="button"
              onClick={prevStep}
              className="px-4 py-2 bg-gray-300 rounded"
            >
              Back
            </button>
          )}
          {step < 3 && (
            <button
              type="button"
              onClick={nextStep}
              className="ml-auto px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Next
            </button>
          )}
          {step === 3 && (
            <button
              type="submit"
              className="ml-auto px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700"
            >
              Save Profile
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

// import React, { useState } from "react";
// import { useForm } from "react-hook-form";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import { useSelector } from "react-redux";
// import { toast } from "react-toastify";
// import StepThree from "./StepThree";
// import StepTwo from "./StepTwo";
// import StepOneProfile from "./StepOneProfile";

// export default function JobSeekerProfileForm() {
//   const {
//     register,
//     handleSubmit,
//     trigger,
//     formState: { errors },
//   } = useForm();

//   const navigate = useNavigate();
//   const token = useSelector((state) => state.auth.token);
//   const [step, setStep] = useState(1);

//   // const onSubmit = async (data) => {
//   //   try {
//   //     const formData = new FormData();

//   //     formData.append("headline", data.headline);
//   //     formData.append("about", data.about);
//   //     formData.append("location", data.location);

//   //     formData.append("seekerjobstitle", data.seekerjobstitle);
//   //     formData.append("seekerjobscompany", data.seekerjobscompany);
//   //     formData.append("seekerjobdescripition", data.seekerjobdescripition);
//   //     formData.append("seekerexperience", data.seekerexperience);
//   //     formData.append("seekerdegree", data.seekerdegree);
//   //     formData.append("seekerinsitute", data.seekerinsitute);
//   //     formData.append("seekereducation", data.seekereducation);

//   //     // Handle skills
//   //     const seekerskills = data.skills
//   //       ? data.skills
//   //           .split(",")
//   //           .map((s) => s.trim())
//   //           .filter((s) => s !== "")
//   //       : [];
//   //     formData.append("seekerskills", JSON.stringify(seekerskills));

//   //     // Handle resume (optional)
//   //     if (data.resume && data.resume[0]) {
//   //       formData.append("resume", data.resume[0]);
//   //     }

//   //     const response = await axios.post(
//   //       "http://localhost:8000/createprofile",
//   //       formData,
//   //       {
//   //         headers: {
//   //           Authorization: `Bearer ${token}`,
//   //           "Content-Type": "multipart/form-data",
//   //         },
//   //       }
//   //     );

//   //     if (response.data.success) {
//   //       toast.success("Profile created successfully");
//   //       navigate("/profile");
//   //     }
//   //   } catch (error) {
//   //     console.error("Create profile error:", error);
//   //     toast.error(error.response?.data?.message || "Error creating profile");
//   //   }
//   // };

//   const mode = useSelector((state) => state.auth.mode);
//   const profileId = useSelector((state) => state.auth.profileId);

//   const onSubmit = async (data) => {
//     try {
//       const formData = new FormData();
//       formData.append("headline", data.headline);
//       formData.append("about", data.about);
//       formData.append("location", data.location);

//       formData.append("seekerjobstitle", data.seekerjobstitle);
//       formData.append("seekerjobscompany", data.seekerjobscompany);
//       formData.append("seekerjobdescripition", data.seekerjobdescripition);
//       formData.append("seekerexperience", data.seekerexperience);
//       formData.append("seekerdegree", data.seekerdegree);
//       formData.append("seekerinsitute", data.seekerinsitute);
//       formData.append("seekereducation", data.seekereducation);

//       const seekerskills = data.skills
//         ? data.skills
//             .split(",")
//             .map((s) => s.trim())
//             .filter((s) => s !== "")
//         : [];
//       formData.append("seekerskills", JSON.stringify(seekerskills));

//       if (data.resume && data.resume[0]) {
//         formData.append("resume", data.resume[0]);
//       }

//       let response;
//       if (mode && profileId) {
//         // UPDATE PROFILE
//         response = await axios.put(
//           `http://localhost:8000/update/${profileId}`,
//           formData,
//           {
//             headers: {
//               Authorization: `Bearer ${token}`,
//               "Content-Type": "multipart/form-data",
//             },
//           }
//         );
//       } else {
//         // CREATE PROFILE
//         response = await axios.post(
//           "http://localhost:8000/createprofile",
//           formData,
//           {
//             headers: {
//               Authorization: `Bearer ${token}`,
//               "Content-Type": "multipart/form-data",
//             },
//           }
//         );
//       }

//       if (response.data.success) {
//         toast.success(
//           mode ? "Profile updated successfully" : "Profile created successfully"
//         );
//         navigate("/profile");
//       }
//     } catch (error) {
//       console.error("Profile save error:", error);
//       toast.error(error.response?.data?.message || "Error saving profile");
//     }
//   };

//   const nextStep = async () => {
//     let valid = false;

//     if (step === 1) {
//       valid = await trigger(["headline", "about", "location"]);
//     } else if (step === 2) {
//       valid = await trigger([
//         "seekerjobstitle",
//         "seekerjobscompany",
//         "seekerexperience",
//         "seekerjobdescripition",
//       ]);
//     } else {
//       valid = true;
//     }

//     if (valid) {
//       setStep((prev) => prev + 1);
//     }
//   };

//   const prevStep = () => setStep((prev) => prev - 1);

//   return (
//     <div className="max-w-3xl mx-auto px-4 py-8 bg-white shadow rounded">
//       <h2 className="text-2xl font-bold mb-6 text-center">
//         Create Your Job Seeker Profile
//       </h2>

//       <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
//         {step === 1 && <StepOneProfile register={register} errors={errors} />}
//         {step === 2 && <StepTwo register={register} errors={errors} />}
//         {step === 3 && <StepThree register={register} errors={errors} />}

//         <div className="flex justify-between pt-4">
//           {step > 1 && (
//             <button
//               type="button"
//               onClick={prevStep}
//               className="px-4 py-2 bg-gray-300 rounded"
//             >
//               Back
//             </button>
//           )}
//           {step < 3 && (
//             <button
//               type="button"
//               onClick={nextStep}
//               className="ml-auto px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
//             >
//               Next
//             </button>
//           )}
//           {step === 3 && (
//             <button
//               type="submit"
//               className="ml-auto px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700"
//             >
//               Save Profile
//             </button>
//           )}
//         </div>
//       </form>
//     </div>
//   );
// }

// import React, { useState } from "react";
// import { useForm } from "react-hook-form";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import { useSelector } from "react-redux";
// import { toast } from "react-toastify";
// import StepThree from "./StepThree";
// import StepTwo from "./StepTwo";
// import StepOneProfile from "./StepOneProfile";

// export default function JobSeekerProfileForm() {
//   const {
//     register,
//     handleSubmit,
//     trigger,
//     formState: { errors },
//   } = useForm();

//   const navigate = useNavigate();
//   const token = useSelector((state) => state.auth.token);

//   const mode = useSelector((state) => state.auth.mode);
//   const profileId = useSelector((state) => state.auth.profileId);

//   const [step, setStep] = useState(1);

//   const onSubmit = async (data) => {
//     try {
//       const formData = new FormData();
//       formData.append("headline", data.headline || "");
//       formData.append("about", data.about || "");
//       formData.append("location", data.location || "");

//       formData.append("seekerjobstitle", data.seekerjobstitle || "");
//       formData.append("seekerjobscompany", data.seekerjobscompany || "");
//       formData.append(
//         "seekerjobdescripition",
//         data.seekerjobdescripition || ""
//       );
//       formData.append("seekerexperience", data.seekerexperience || "");
//       formData.append("seekerdegree", data.seekerdegree || "");
//       formData.append("seekerinsitute", data.seekerinsitute || "");
//       formData.append("seekereducation", data.seekereducation || "");

//       const seekerskills = data.skills
//         ? data.skills
//             .split(",")
//             .map((s) => s.trim())
//             .filter((s) => s !== "")
//         : [];
//       formData.append("seekerskills", JSON.stringify(seekerskills));

//       if (data.resume && data.resume[0]) {
//         formData.append("resume", data.resume[0]);
//       }

//       let response;
//       if (mode === "edit" && profileId) {
//         response = await axios.put(
//           `http://localhost:8000/updateprofile/${profileId}`,
//           formData,
//           {
//             headers: {
//               Authorization: `Bearer ${token}`,
//               "Content-Type": "multipart/form-data",
//             },
//           }
//         );
//       } else {
//         response = await axios.post(
//           "http://localhost:8000/createprofile",
//           formData,
//           {
//             headers: {
//               Authorization: `Bearer ${token}`,
//               "Content-Type": "multipart/form-data",
//             },
//           }
//         );
//       }

//       if (response.data.success) {
//         toast.success(
//           mode === "edit"
//             ? "Profile updated successfully ✅"
//             : "Profile created successfully 🎉"
//         );
//         navigate("/profile");
//       }
//     } catch (error) {
//       console.error("Profile save error:", error);
//       toast.error(error.response?.data?.message || "Error saving profile");
//     }
//   };

//   const nextStep = async () => {
//     let valid = false;
//     if (step === 1) {
//       valid = await trigger(["headline", "about", "location"]);
//     } else if (step === 2) {
//       valid = await trigger([
//         "seekerjobstitle",
//         "seekerjobscompany",
//         "seekerexperience",
//         "seekerjobdescripition",
//       ]);
//     } else {
//       valid = true;
//     }
//     if (valid) setStep((prev) => prev + 1);
//   };

//   const prevStep = () => setStep((prev) => prev - 1);

//   return (
//     <div className="max-w-3xl mx-auto px-4 py-8 bg-white shadow rounded">
//       <h2 className="text-2xl font-bold mb-6 text-center">
//         {mode === "edit"
//           ? "Edit Your Profile"
//           : "Create Your Job Seeker Profile"}
//       </h2>

//       <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
//         {step === 1 && <StepOneProfile register={register} errors={errors} />}
//         {step === 2 && <StepTwo register={register} errors={errors} />}
//         {step === 3 && <StepThree register={register} errors={errors} />}

//         <div className="flex justify-between pt-4">
//           {step > 1 && (
//             <button
//               type="button"
//               onClick={prevStep}
//               className="px-4 py-2 bg-gray-300 rounded"
//             >
//               Back
//             </button>
//           )}

//           {step < 3 && (
//             <button
//               type="button"
//               onClick={nextStep}
//               className="ml-auto px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
//             >
//               Next
//             </button>
//           )}

//           {step === 3 && (
//             <button
//               type="submit"
//               className="ml-auto px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700"
//             >
//               {mode === "edit" ? "Update Profile" : "Save Profile"}
//             </button>
//           )}
//         </div>
//       </form>
//     </div>
//   );
// }
