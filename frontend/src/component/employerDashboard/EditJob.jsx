import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import StepOne from "./postJobForm/StepOne";
import StepTwo from "./postJobForm/StepTwo";
import StepThree from "./postJobForm/StepThree";
import api from "../../api/register";
import Swal from "sweetalert2";

const EditJob = () => {
  const {
    register,
    handleSubmit,
    trigger,
    reset,
    setValue,
    formState: { errors },
  } = useForm({ mode: "onBlur" });

  const { id } = useParams();
  const token = useSelector((state) => state.auth.token);
  const [count, setCount] = useState(1);
  const [job, setJob] = useState(null);
  const navigate = useNavigate();

  const getUpdatedJob = async () => {
    try {
      const res = await api.get(`/get-job/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const jobData = res.data.job;
      setJob(jobData);
      reset({
        ...jobData,
        requirements: Array.isArray(jobData.requirements) ? jobData.requirements.join("\n") : jobData.requirements,
        skills: Array.isArray(jobData.skills) ? jobData.skills.join(", ") : jobData.skills,
      });
    } catch (error) {
      console.log("Error fetching job:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to fetch job details",
      });
    }
  };

  useEffect(() => {
    getUpdatedJob();
  }, [id]);

  const onSubmit = async (data) => {
    try {
      const formattedData = {
        ...data,
        requirements: typeof data.requirements === "string" 
          ? data.requirements.split("\n").map((r) => r.trim()).filter((r) => r !== "")
          : data.requirements,
        skills: typeof data.skills === "string"
          ? data.skills.split(",").map((s) => s.trim()).filter((s) => s !== "")
          : data.skills,
      };

      const res = await api.put(
        `/edit-job/${id}`,
        formattedData,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (res.data.success) {
        Swal.fire({
          icon: "success",
          title: "Updated!",
          text: "Job has been updated successfully.",
          timer: 2000,
          showConfirmButton: false
        });
        navigate("/employer-dashboard/all-job");
      }
    } catch (error) {
      console.log("Error updating job:", error);
      Swal.fire({
        icon: "error",
        title: "Update Failed",
        text: "Something went wrong while updating the job.",
      });
    }
  };

  const nextStep = async () => {
    let valid = false;
    if (count === 1) {
      valid = await trigger(["jobTitle", "companyName", "jobDescription"]);
    } else if (count === 2) {
      valid = await trigger([
        "requirements",
        "experienceLevel",
        "industry",
        "employmentType",
        "numberOfOpenings",
      ]);
    } else {
      valid = true;
    }
    if (valid) setCount((prev) => prev + 1);
  };

  const prevStep = () => setCount((prev) => prev - 1);

  if (!job) return (
    <div className="flex justify-center items-center min-h-[400px]">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto bg-white shadow-2xl rounded-2xl p-8 border border-gray-100 animate-slide-up">
      <h2 className="text-3xl font-extrabold mb-2 text-gray-900 text-center">
        Edit Job Posting
      </h2>
      <p className="text-gray-500 text-center mb-8 pb-4 border-b border-gray-100 italic">
        Step {count} of 3: {count === 1 ? "Job Details" : count === 2 ? "Requirements" : "Location & Finalize"}
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {count === 1 && <StepOne register={register} errors={errors} />}
        {count === 2 && (
          <StepTwo 
            register={register} 
            errors={errors} 
            setValue={setValue} 
          />
        )}
        {count === 3 && (
          <StepThree 
            register={register} 
            errors={errors} 
            setValue={setValue} 
          />
        )}

        <div className="flex justify-between items-center pt-8 border-t border-gray-100 mt-10">
          <div className="flex space-x-4">
            {count > 1 ? (
              <button
                type="button"
                onClick={prevStep}
                className="px-8 py-2.5 border-2 border-gray-200 text-gray-600 rounded-xl font-bold hover:bg-gray-50 hover:border-gray-300 transition-all flex items-center"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="15 19l-7-7 7-7" />
                </svg>
                Back
              </button>
            ) : (
              <button
                type="button"
                onClick={() => navigate(-1)}
                className="px-8 py-2.5 border-2 border-red-100 text-red-600 rounded-xl font-bold hover:bg-red-50 hover:border-red-200 transition-all"
              >
                Cancel
              </button>
            )}
          </div>

          <div className="flex space-x-4">
            {count < 3 ? (
              <button
                type="button"
                onClick={nextStep}
                className="px-8 py-2.5 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 shadow-md hover:shadow-lg transform active:scale-95 transition-all flex items-center"
              >
                Continue
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="9 5l7 7-7 7" />
                </svg>
              </button>
            ) : (
              <>
                <button
                  type="button"
                  onClick={() => reset(job)}
                  className="px-6 py-2.5 border-2 border-gray-200 text-gray-600 rounded-xl font-bold hover:bg-gray-50 transition-all"
                >
                  Reset Changes
                </button>
                <button
                  type="submit"
                  className="px-8 py-2.5 bg-green-600 text-white rounded-xl font-bold hover:bg-green-700 shadow-md hover:shadow-lg transform active:scale-95 transition-all"
                >
                  Save Changes
                </button>
              </>
            )}
          </div>
        </div>
      </form>
    </div>
  );
};

export default EditJob;
