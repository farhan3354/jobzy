import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import StepThree from "./StepThree";
import StepTwo from "./StepTwo";
import StepOneProfile from "./StepOneProfile";
import api from "../../../api/register";

export default function EditJobSeeker() {
  const {
    register,
    handleSubmit,
    trigger,
    reset,
    setValue,
    formState: { errors },
  } = useForm({ mode: "onBlur" });

  const navigate = useNavigate();
  const token = useSelector((state) => state.auth.token);
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(true);

  const [profileId, setProfileId] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await api.get("/getprofile", {
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

      const response = await api.put(
        `/update/${profileId}`,
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
    <div className="max-w-3xl mx-auto px-6 py-10 bg-white shadow-xl rounded-[2rem] border border-gray-100 animate-slide-up">
      <h2 className="text-3xl font-extrabold mb-2 text-center text-gray-900">
        Update Your Professional Profile
      </h2>
      <p className="text-gray-500 text-center mb-8 pb-4 border-b border-gray-100 italic">
        Step {step} of 3: {step === 1 ? "Basic Information" : step === 2 ? "Experience" : "Education & Skills"}
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {step === 1 && <StepOneProfile register={register} errors={errors} setValue={setValue} isEdit={true} />}
        {step === 2 && <StepTwo register={register} errors={errors} />}
        {step === 3 && <StepThree register={register} errors={errors} isEdit={true} setValue={setValue} />}

        <div className="flex justify-between items-center pt-8 border-t border-gray-100 mt-10">
          {step > 1 ? (
            <button
              type="button"
              onClick={prevStep}
              className="px-6 py-2.5 bg-white border-2 border-gray-200 text-gray-600 rounded-xl font-semibold hover:bg-gray-50 hover:border-gray-300 transition-all flex items-center space-x-2"
            >
              <span>Back</span>
            </button>
          ) : (
            <div />
          )}
          
          {step < 3 ? (
            <button
              type="button"
              onClick={nextStep}
              className="px-8 py-2.5 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 shadow-md hover:shadow-lg transform active:scale-95 transition-all"
            >
              Continue
            </button>
          ) : (
            <button
              type="button"
              onClick={handleSubmit(onSubmit)}
              className="px-8 py-2.5 bg-green-600 text-white rounded-xl font-bold hover:bg-green-700 shadow-md hover:shadow-lg transform active:scale-95 transition-all"
            >
              Save Changes
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
