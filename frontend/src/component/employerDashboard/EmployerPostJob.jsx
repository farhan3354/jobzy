import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import StepOne from "./postJobForm/StepOne";
import StepTwo from "./postJobForm/StepTwo";
import StepThree from "./postJobForm/StepThree";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
import api from "../../api/register";

export default function EmployerPostJob() {
  const {
    register,
    handleSubmit,
    trigger,
    setValue,
    formState: { errors },
  } = useForm({ mode: "onBlur" });

  const navigate = useNavigate();
  const [count, setCount] = useState(1);
  const token = useSelector((state) => state.auth.token);

  const onSubmit = async (data) => {
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

    try {
      const response = await api.post(
        "/post-job",
        formattedData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 201) {
        Swal.fire({
          title: "Success!",
          text: "Job posted successfully!",
          icon: "success",
          confirmButtonText: "OK",
        }).then(() => {
          navigate("/employer-dashboard");
        });
      }
    } catch (error) {
      console.error(error);
      Swal.fire({
        title: "Error",
        text: error.response?.formattedData?.message || "Something went wrong",
        icon: "error",
      });
    }

    console.log("Job Data Submitted:", formattedData);
  };

  const nextStep = async () => {
    let valid = false;

    if (count === 1) {
      valid = await trigger(["jobTitle", "companyName", "jobDescription"]);
    } else if (count === 2) {
      valid = await trigger(["requirements", "experienceLevel", "industry", "numberOfOpenings"]);
    } else {
      valid = true;
    }

    if (valid) {
      setCount((prev) => prev + 1);
    }
  };

  const prevStep = () => setCount((prev) => prev - 1);

  return (
    <div className="max-w-4xl mx-auto bg-white shadow-2xl rounded-2xl p-8 border border-gray-100 animate-slide-up">
      <h2 className="text-3xl font-extrabold mb-2 text-gray-900 text-center">
        Post a New Job Opening
      </h2>
      <p className="text-gray-500 text-center mb-8 pb-4 border-b border-gray-100 italic">
        Step {count} of 3: {count === 1 ? "Job Details" : count === 2 ? "Requirements" : "Location & Finalize"}
      </p>

      <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
        {count === 1 && <StepOne register={register} errors={errors} setValue={setValue} />}
        {count === 2 && <StepTwo register={register} errors={errors} setValue={setValue} />}
        {count === 3 && <StepThree register={register} errors={errors} setValue={setValue} />}

        <div className="flex justify-between items-center pt-8 border-t border-gray-100 mt-10">
          {count > 1 ? (
            <button
              type="button"
              onClick={prevStep}
              className="px-8 py-2.5 border-2 border-gray-200 text-gray-600 rounded-xl font-bold hover:bg-gray-50 hover:border-gray-300 transition-all flex items-center"
            >
              <span className="mr-2">←</span> Back
            </button>
          ) : (
            <div></div> // Spacer for flex-between
          )}

          <div className="flex space-x-4">
            <button
              type="button"
              className="px-8 py-2.5 border-2 border-red-100 text-red-600 rounded-xl font-bold hover:bg-red-50 hover:border-red-200 transition-all"
              onClick={() => navigate(-1)}
            >
              Cancel
            </button>

            {count < 3 ? (
              <button
                type="button"
                onClick={nextStep}
                className="px-8 py-2.5 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 shadow-md hover:shadow-lg transform active:scale-95 transition-all"
              >
                Continue
              </button>
            ) : (
              <button
                type="submit"
                className="px-8 py-2.5 bg-green-600 text-white rounded-xl font-bold hover:bg-green-700 shadow-md hover:shadow-lg transform active:scale-95 transition-all"
              >
                Post Job
              </button>
            )}
          </div>
        </div>
      </form>
    </div>
  );
}


