import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import StepOne from "./postJobForm/StepOne";
import StepTwo from "./postJobForm/StepTwo";
import StepThree from "./postJobForm/StepThree";

const EditJob = () => {
  const {
    register,
    handleSubmit,
    trigger,
    reset,
    formState: { errors },
  } = useForm();

  const { id } = useParams();
  const token = useSelector((state) => state.auth.token);
  const [count, setCount] = useState(1);
  const [job, setJob] = useState(null);
  const navigate = useNavigate();

  const getUpdatedJob = async () => {
    try {
      const res = await axios.get(`http://localhost:8000/get-job/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setJob(res.data.job);
      reset({
        ...res.data.job,
        requirements: res.data.job.requirements.join("\n"),
      });
    } catch (error) {
      console.log("Error fetching job:", error);
    }
  };

  useEffect(() => {
    getUpdatedJob();
  }, [id]);

  const onSubmit = async (data) => {
    try {
      const formattedData = {
        ...data,
        requirements: data.requirements
          .split("\n")
          .map((r) => r.trim())
          .filter((r) => r !== ""),
        skills: data.skills
          .split(",")
          .map((s) => s.trim())
          .filter((s) => s !== ""),
      };

      const res = await axios.put(
        `http://localhost:8000/edit-job/${id}`,
        formattedData,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (res.data.success) {
        alert("Job updated successfully!");
        navigate("/employer-dashboard/all-job");
      }
    } catch (error) {
      console.log("Error updating job:", error);
      alert("Failed to update job");
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
        "status",
      ]);
    } else {
      valid = true;
    }
    if (valid) setCount((prev) => prev + 1);
  };

  const prevStep = () => setCount((prev) => prev - 1);

  if (!job) return <div className="text-center">Loading job details...</div>;

  return (
    <div className="max-w-3xl mx-auto bg-white p-8 rounded-2xl shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-center">Edit Job</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {count === 1 && <StepOne register={register} errors={errors} />}
        {count === 2 && <StepTwo register={register} errors={errors} />}
        {count === 3 && <StepThree register={register} errors={errors} />}

        <div className="flex justify-between pt-4">
          {count > 1 && (
            <button
              type="button"
              onClick={prevStep}
              className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition cursor-pointer"
            >
              Back
            </button>
          )}

          {count < 3 ? (
            <button
              type="button"
              onClick={nextStep}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition cursor-pointer"
            >
              Next
            </button>
          ) : (
            <div className="flex justify-between gap-3">
              <button
                type="submit"
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition cursor-pointer "
              >
                Update Job
              </button>
              <button
                type="button"
                onClick={() => reset(job)}
                className="bg-gray-300 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-400 transition cursor-pointer"
              >
                Reset
              </button>
            </div>
          )}
        </div>
      </form>
    </div>
  );
};

export default EditJob;
