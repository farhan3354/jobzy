import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import StepThree from "./StepThree";
import StepTwo from "./StepTwo";
import StepOneProfile from "./StepOneProfile";

export default function EditJobSeeker() {
  const {
    register,
    handleSubmit,
    trigger,
    reset,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();
  const token = useSelector((state) => state.auth.token);
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(true);

  const [profileId, setProfileId] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get("http://localhost:8000/getprofile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = response.data.profile;
        setProfileId(data._id);

        reset({
          headline: data.headline || "",
          about: data.about || "",
          location: data.location || "",
          seekerjobstitle: data.seekerjobstitle || "",
          seekerjobscompany: data.seekerjobscompany || "",
          seekerjobdescripition: data.seekerjobdescripition || "",
          seekerexperience: data.seekerexperience || "",
          seekerdegree: data.seekerdegree || "",
          seekerinsitute: data.seekerinsitute || "",
          seekereducation: data.seekereducation || "",
          skills: data.seekerskills?.join(", ") || "",
          resume: data.seekerresumeUrl || "",
        });

        setLoading(false);
      } catch (error) {
        toast.error("Failed to load profile", error);
        setLoading(false);
      }
    };

    fetchProfile();
  }, [reset, token]);

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

      const response = await axios.put(
        `http://localhost:8000/update/${profileId}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (response.data.success) {
        toast.success("Profile updated successfully");
        navigate("/user-dashboard/profile");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Error updating profile");
    }
  };

  const nextStep = async () => {
    let valid = false;

    if (step === 1) {
      valid = await trigger(["headline", "about", "location"]);
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

  if (loading) {
    return <div className="text-center py-8">Loading profile...</div>;
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 bg-white shadow rounded">
      <h2 className="text-2xl font-bold mb-6 text-center">
        Edit Your Job Seeker Profile
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
              Update Profile
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
