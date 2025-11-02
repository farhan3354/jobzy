// import React, { useState, useEffect } from "react";
// import { useForm } from "react-hook-form";
// import { useSelector } from "react-redux";
// import { useNavigate, useParams } from "react-router-dom";
// import { toast } from "react-toastify";
// import api from "../../api/register";

// export default function Apply() {
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//     watch,
//   } = useForm();

//   const { id } = useParams();
//   const token = useSelector((state) => state.auth.token);
//   const navigate = useNavigate();

//   const [profile, setProfile] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [submitting, setSubmitting] = useState(false);
//   const [selectedFile, setSelectedFile] = useState(null);

//   // Fetch user profile
//   useEffect(() => {
//     const fetchProfile = async () => {
//       try {
//         const response = await api.get("/getprofile", {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//           timeout: 10000, // 10 seconds timeout
//         });
//         if (response.data.success) {
//           setProfile(response.data.profile);
//         }
//       } catch (error) {
//         console.error("Error fetching profile:", error);
//         toast.error("Failed to load profile");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProfile();
//   }, [token]);

//   const handleFileChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       // Validate file type
//       const allowedTypes = [
//         "application/pdf",
//         "application/msword",
//         "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
//       ];
//       if (!allowedTypes.includes(file.type)) {
//         toast.error("Please upload a PDF or Word document");
//         return;
//       }

//       // Validate file size (5MB max)
//       if (file.size > 10 * 1024 * 1024) {
//         toast.error("File size should be less than 5MB");
//         return;
//       }

//       setSelectedFile(file);
//     }
//   };

//   const applyformdata = async (data) => {
//     setSubmitting(true);
//     try {
//       const formData = new FormData();

//       // Append all form fields
//       formData.append("lastcompany", data.lastcompany);
//       formData.append("lastsalary", data.lastsalary);
//       formData.append("availability", data.availability);
//       formData.append("coverLetter", data.coverLetter);
//       formData.append("experience", data.experience);

//       // Append new CV if selected
//       if (selectedFile) {
//         formData.append("resume", selectedFile);
//       }

//       const respo = await api.post(`/apply/${id}`, formData, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//           "Content-Type": "multipart/form-data",
//         },
//         timeout: 30000, // 30 seconds timeout for file upload
//       });

//       if (respo.data.success) {
//         toast.success("Application submitted successfully!");
//         navigate("/user-dashboard");
//       }
//     } catch (error) {
//       if (error.code === "ECONNABORTED") {
//         toast.error("Request timeout. Please try again.");
//       } else {
//         toast.error(
//           `❌ Error submitting form: ${
//             error.response?.data?.message || error.message
//           }`
//         );
//       }
//       console.error("Application error:", error);
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   // ✅ Use reusable loading component
//   if (loading)
//     return (
//       <>
//         <h2>loading ...</h2>
//       </>
//     );

//   return (
//     <div className="max-w-2xl mx-auto border-t border-gray-200 pt-2 px-6 bg-white shadow-md rounded-lg">
//       <h3 className="text-2xl font-bold mb-6 text-center text-gray-800">
//         Apply for this Position
//       </h3>

//       {/* Current CV Section */}
//       {profile?.seekerresumeUrl && (
//         <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
//           <h4 className="text-lg font-semibold text-blue-800 mb-2">
//             Current CV
//           </h4>
//           <div className="flex items-center justify-between">
//             <div className="flex items-center">
//               <svg
//                 className="w-8 h-8 text-blue-600 mr-3"
//                 fill="none"
//                 stroke="currentColor"
//                 viewBox="0 0 24 24"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth={2}
//                   d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
//                 />
//               </svg>
//               <div>
//                 <p className="text-gray-700 font-medium">
//                   {profile.seekerresumeUrl.split("/").pop()}
//                 </p>
//                 <p className="text-sm text-gray-500">
//                   Uploaded on {new Date(profile.updatedAt).toLocaleDateString()}
//                 </p>
//               </div>
//             </div>
//             <a
//               href={profile.seekerresumeUrl}
//               target="_blank"
//               rel="noopener noreferrer"
//               className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition text-sm"
//             >
//               View CV
//             </a>
//           </div>
//         </div>
//       )}

//       {/* Change CV Section */}
//       <div className="mb-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
//         <h4 className="text-lg font-semibold text-gray-800 mb-3">
//           {profile?.seekerresumeUrl ? "Update Your CV" : "Upload Your CV"}
//         </h4>
//         <div className="space-y-3">
//           <div>
//             <label className="block text-gray-700 font-medium mb-2">
//               {profile?.seekerresumeUrl ? "Upload New CV" : "Upload CV"}
//             </label>
//             <input
//               type="file"
//               accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
//               onChange={handleFileChange}
//               className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
//             />
//             <p className="text-sm text-gray-500 mt-1">
//               Accepted formats: PDF, DOC, DOCX (Max 5MB)
//             </p>
//             {selectedFile && (
//               <p className="text-green-600 text-sm mt-1">
//                 Selected file: {selectedFile.name}
//               </p>
//             )}
//           </div>

//           {!profile?.seekerresumeUrl && (
//             <div className="p-3 bg-yellow-50 border border-yellow-200 rounded">
//               <p className="text-yellow-800 text-sm">
//                 <strong>Note:</strong> Uploading a CV will also update your
//                 profile. This CV will be used for all future applications unless
//                 changed.
//               </p>
//             </div>
//           )}
//         </div>
//       </div>

//       <form onSubmit={handleSubmit(applyformdata)} className="space-y-5">
//         <div>
//           <label
//             className="block text-gray-700 font-medium mb-1"
//             htmlFor="company"
//           >
//             Current Company
//           </label>
//           <input
//             type="text"
//             id="company"
//             {...register("lastcompany")}
//             className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
//           />
//         </div>

//         <div>
//           <label
//             className="block text-gray-700 font-medium mb-1"
//             htmlFor="salary"
//           >
//             Current Salary
//           </label>
//           <input
//             type="text"
//             id="salary"
//             {...register("lastsalary")}
//             className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
//           />
//         </div>

//         <div>
//           <label
//             className="block text-gray-700 font-medium mb-1"
//             htmlFor="availability"
//           >
//             Availability
//           </label>
//           <input
//             type="text"
//             id="availability"
//             {...register("availability", {
//               required: "Availability is required",
//             })}
//             className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
//           />
//           {errors.availability && (
//             <p className="text-red-500">{errors.availability.message}</p>
//           )}
//         </div>

//         <div>
//           <label
//             className="block text-gray-700 font-medium mb-1"
//             htmlFor="coverLetter"
//           >
//             Cover Letter
//           </label>
//           <textarea
//             id="coverLetter"
//             rows="4"
//             {...register("coverLetter")}
//             className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
//           ></textarea>
//         </div>

//         <div>
//           <label
//             className="block text-gray-700 font-medium mb-1"
//             htmlFor="experience"
//           >
//             Experience (Years)
//           </label>
//           <input
//             type="number"
//             id="experience"
//             {...register("experience", { required: "Experience is required" })}
//             className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
//           />
//           {errors.experience && (
//             <p className="text-red-600">{errors.experience.message}</p>
//           )}
//         </div>

//         <button
//           type="submit"
//           disabled={submitting}
//           className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition font-medium shadow-md disabled:bg-blue-400 disabled:cursor-not-allowed"
//         >
//           {submitting ? "Submitting..." : "Submit Application"}
//         </button>
//       </form>
//     </div>
//   );
// }

import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../../api/register";

export default function Apply() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    trigger,
  } = useForm();

  const { id } = useParams();
  const token = useSelector((state) => state.auth.token);
  const navigate = useNavigate();

  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [currentStep, setCurrentStep] = useState(1);

  // Fetch user profile
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await api.get("/getprofile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          timeout: 10000,
        });
        if (response.data.success) {
          setProfile(response.data.profile);
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
        toast.error("Failed to load profile");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [token]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const allowedTypes = [
        "application/pdf",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      ];
      if (!allowedTypes.includes(file.type)) {
        toast.error("Please upload a PDF or Word document");
        return;
      }

      if (file.size > 10 * 1024 * 1024) {
        toast.error("File size should be less than 5MB");
        return;
      }

      setSelectedFile(file);
    }
  };

  const handleNextStep = async () => {
    // Validate step 1 fields
    const isValid = await trigger(["availability", "experience"]);
    if (isValid) {
      setCurrentStep(2);
    }
  };

  const handlePreviousStep = () => {
    setCurrentStep(1);
  };

  const applyformdata = async (data) => {
    setSubmitting(true);
    try {
      const formData = new FormData();

      // Append all form fields
      formData.append("lastcompany", data.lastcompany);
      formData.append("lastsalary", data.lastsalary);
      formData.append("availability", data.availability);
      formData.append("coverLetter", data.coverLetter);
      formData.append("experience", data.experience);

      // Append new CV if selected
      if (selectedFile) {
        formData.append("resume", selectedFile);
      }

      const respo = await api.post(`/apply/${id}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
        timeout: 30000,
      });

      if (respo.data.success) {
        toast.success("Application submitted successfully!");
        navigate("/user-dashboard");
      }
    } catch (error) {
      if (error.code === "ECONNABORTED") {
        toast.error("Request timeout. Please try again.");
      } else {
        toast.error(
          `❌ Error submitting form: ${
            error.response?.data?.message || error.message
          }`
        );
      }
      console.error("Application error:", error);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto border-t border-gray-200 pt-2 px-6 bg-white shadow-md rounded-lg">
      <h3 className="text-2xl font-bold mb-6 text-center text-gray-800">
        Apply for this Position
      </h3>

      {/* Progress Steps */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div
            className={`flex items-center ${
              currentStep >= 1 ? "text-blue-600" : "text-gray-400"
            }`}
          >
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${
                currentStep >= 1
                  ? "bg-blue-600 border-blue-600 text-white"
                  : "border-gray-300"
              }`}
            >
              1
            </div>
            <span className="ml-2 font-medium">Basic Information</span>
          </div>
          <div className="flex-1 h-1 mx-4 bg-gray-200">
            <div
              className={`h-1 bg-blue-600 transition-all duration-300 ${
                currentStep >= 2 ? "w-full" : "w-0"
              }`}
            ></div>
          </div>
          <div
            className={`flex items-center ${
              currentStep >= 2 ? "text-blue-600" : "text-gray-400"
            }`}
          >
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${
                currentStep >= 2
                  ? "bg-blue-600 border-blue-600 text-white"
                  : "border-gray-300"
              }`}
            >
              2
            </div>
            <span className="ml-2 font-medium">Additional Details</span>
          </div>
        </div>
      </div>

      {/* Step 1: Basic Information */}
      {currentStep === 1 && (
        <div className="space-y-6">
          {/* Current CV Section */}
          {profile?.seekerresumeUrl && (
            <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
              <h4 className="text-lg font-semibold text-blue-800 mb-2">
                Current CV
              </h4>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <svg
                    className="w-8 h-8 text-blue-600 mr-3"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                  <div>
                    <p className="text-gray-700 font-medium">
                      {profile.seekerresumeUrl.split("/").pop()}
                    </p>
                    <p className="text-sm text-gray-500">
                      Uploaded on{" "}
                      {new Date(profile.updatedAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <a
                  href={profile.seekerresumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition text-sm"
                >
                  View CV
                </a>
              </div>
            </div>
          )}

          {/* CV Upload Section */}
          <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
            <h4 className="text-lg font-semibold text-gray-800 mb-3">
              {profile?.seekerresumeUrl ? "Update Your CV" : "Upload Your CV"}
            </h4>
            <div className="space-y-3">
              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  {profile?.seekerresumeUrl ? "Upload New CV" : "Upload CV"}
                </label>
                <input
                  type="file"
                  accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                  onChange={handleFileChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
                <p className="text-sm text-gray-500 mt-1">
                  Accepted formats: PDF, DOC, DOCX (Max 5MB)
                </p>
                {selectedFile && (
                  <p className="text-green-600 text-sm mt-1">
                    Selected file: {selectedFile.name}
                  </p>
                )}
              </div>

              {!profile?.seekerresumeUrl && (
                <div className="p-3 bg-yellow-50 border border-yellow-200 rounded">
                  <p className="text-yellow-800 text-sm">
                    <strong>Note:</strong> Uploading a CV will also update your
                    profile. This CV will be used for all future applications
                    unless changed.
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Required Fields */}
          <div className="space-y-4">
            <div>
              <label
                className="block text-gray-700 font-medium mb-1"
                htmlFor="availability"
              >
                Availability *
              </label>
              <input
                type="text"
                id="availability"
                {...register("availability", {
                  required: "Availability is required",
                })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                placeholder="When can you start?"
              />
              {errors.availability && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.availability.message}
                </p>
              )}
            </div>

            <div>
              <label
                className="block text-gray-700 font-medium mb-1"
                htmlFor="experience"
              >
                Experience (Years) *
              </label>
              <input
                type="number"
                id="experience"
                {...register("experience", {
                  required: "Experience is required",
                })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                placeholder="Years of experience"
              />
              {errors.experience && (
                <p className="text-red-600 text-sm mt-1">
                  {errors.experience.message}
                </p>
              )}
            </div>
          </div>

          {/* Next Button */}
          <div className="flex justify-end">
            <button
              type="button"
              onClick={handleNextStep}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition font-medium shadow-md"
            >
              Next Step →
            </button>
          </div>
        </div>
      )}

      {/* Step 2: Additional Details */}
      {currentStep === 2 && (
        <div className="space-y-6">
          <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
            <h4 className="text-lg font-semibold text-blue-800 mb-2">
              Additional Information
            </h4>
            <p className="text-blue-700 text-sm">
              Complete your application with these optional details
            </p>
          </div>

          <form onSubmit={handleSubmit(applyformdata)} className="space-y-5">
            <div>
              <label
                className="block text-gray-700 font-medium mb-1"
                htmlFor="company"
              >
                Current Company
              </label>
              <input
                type="text"
                id="company"
                {...register("lastcompany")}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                placeholder="Where do you currently work?"
              />
            </div>

            <div>
              <label
                className="block text-gray-700 font-medium mb-1"
                htmlFor="salary"
              >
                Current Salary
              </label>
              <input
                type="text"
                id="salary"
                {...register("lastsalary")}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                placeholder="Your current salary"
              />
            </div>

            <div>
              <label
                className="block text-gray-700 font-medium mb-1"
                htmlFor="coverLetter"
              >
                Cover Letter
              </label>
              <textarea
                id="coverLetter"
                rows="4"
                {...register("coverLetter")}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                placeholder="Why are you interested in this position? What makes you a good fit?"
              ></textarea>
            </div>

            {/* Navigation Buttons */}
            <div className="flex justify-between pt-4">
              <button
                type="button"
                onClick={handlePreviousStep}
                className="bg-gray-500 text-white px-6 py-3 rounded-lg hover:bg-gray-600 transition font-medium"
              >
                ← Previous
              </button>
              <button
                type="submit"
                disabled={submitting}
                className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition font-medium shadow-md disabled:bg-blue-400 disabled:cursor-not-allowed"
              >
                {submitting ? "Submitting..." : "Submit Application"}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

// import React from "react";
// import { useForm } from "react-hook-form";
// import { useSelector } from "react-redux";
// import { useNavigate, useParams } from "react-router-dom";
// import { toast } from "react-toastify";
// import api from "../../api/register";

// export default function Apply() {
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm();
//   const { id } = useParams();
//   const token = useSelector((state) => state.auth.token);
//   const navigate = useNavigate();
//   const applyformdata = async (data) => {
//     try {
//       const respo = await api.post(
//         `/apply/${id}`,
//         data,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       if (respo.data.success) {
//         toast.success("Form submitted successfullly");
//         navigate("/user-dashboard");
//       }
//     } catch (error) {
//       toast.error(
//         `❌ Error submitting form: ${
//           error.response?.data?.message || error.message
//         }`
//       );
//       navigate("/user-dashboard/profile");
//     }
//   };

//   return (
//     <div className="max-w-2xl mx-auto border-t border-gray-200 pt-2 px-6 bg-white shadow-md rounded-lg">
//       <h3 className="text-2xl font-bold mb-6 text-center text-gray-800">
//         Apply for this Position
//       </h3>

//       <form onSubmit={handleSubmit(applyformdata)} className="space-y-5">
//         <div>
//           <label
//             className="block text-gray-700 font-medium mb-1"
//             htmlFor="company"
//           >
//             Current Company
//           </label>
//           <input
//             type="text"
//             id="company"
//             {...register("lastcompany")}
//             className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
//           />
//         </div>

//         <div>
//           <label
//             className="block text-gray-700 font-medium mb-1"
//             htmlFor="salary"
//           >
//             Current Salary
//           </label>
//           <input
//             type="text"
//             id="salary"
//             {...register("lastsalary")}
//             className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
//           />
//         </div>
//         <div>
//           <label
//             className="block text-gray-700 font-medium mb-1"
//             htmlFor="availability"
//           >
//             Availability
//           </label>
//           <input
//             type="text"
//             id="availability"
//             {...register("availability", {
//               required: "availability is required",
//             })}
//             className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
//           />
//           {errors.availability && (
//             <p className="text-red-500">{errors.availability.message}</p>
//           )}
//         </div>
//         <div>
//           <label
//             className="block text-gray-700 font-medium mb-1"
//             htmlFor="coverLetter"
//           >
//             Cover Letter
//           </label>
//           <textarea
//             id="coverLetter"
//             rows="4"
//             {...register("coverLetter")}
//             className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
//           ></textarea>
//         </div>
//         <div>
//           <label
//             className="block text-gray-700 font-medium mb-1"
//             htmlFor="experience"
//           >
//             Experience
//           </label>
//           <input
//             type="text"
//             id="experience"
//             {...register("experience", { required: "experience is required" })}
//             className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
//           />
//           {errors.experience && (
//             <p className="text-red-600">{errors.experience.message}</p>
//           )}
//         </div>
//         <button
//           type="submit"
//           className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition font-medium shadow-md"
//         >
//           Submit Application
//         </button>
//       </form>
//     </div>
//   );
// }
