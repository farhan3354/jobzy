import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useSelector } from "react-redux";

export default function EditAdminProfile() {
  const { register, handleSubmit, setValue } = useForm();
  const token = useSelector((state) => state.auth.token);
  const [loading, setLoading] = useState(false);
  const [profilim, setProfilim] = useState(null);
  const [edit, setedit] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get("http://localhost:8000/admin", {
          headers: { Authorization: `Bearer ${token}` },
        });

        const profile = res.data.profile;
        setProfilim(res.data.profile);
        if (profile) {
          setValue("name", profile.userId?.name || "");
          setValue("email", profile.userId?.email || "");
          setValue("phone", profile.userId?.phone || "");
          setValue("bio", profile.bio || "");
          setValue("location", profile.location || "");
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };

    if (token) fetchProfile();
  }, [token, setValue]);

  const onSubmit = async (data) => {
    try {
      setLoading(true);

      const formData = new FormData();
      if (data.name) formData.append("name", data.name);
      if (data.email) formData.append("email", data.email);
      if (data.phone) formData.append("phone", data.phone);
      if (data.bio) formData.append("bio", data.bio);
      if (data.location) formData.append("location", data.location);
      if (data.profileImage && data.profileImage.length > 0) {
        formData.append("profileImage", data.profileImage[0]);
      }

      const res = await axios.patch("http://localhost:8000/edit", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      alert("Profile updated successfully!");
      console.log("Updated profile:", res.data);
    } catch (error) {
      console.error("Error updating profile:", error);
      alert(error.response?.data?.message || "Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="p-6 min-h-screen flex items-center justify-center">
        <div className="bg-white shadow-lg rounded-2xl w-full max-w-2xl p-8">
          <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
            Edit Admin Profile
          </h2>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Name
              </label>
              <input
                type="text"
                {...register("name")}
                className="w-full border rounded-lg px-4 py-2 focus:ring focus:ring-blue-200"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Email
              </label>
              <input
                type="email"
                {...register("email")}
                className="w-full border rounded-lg px-4 py-2 focus:ring focus:ring-blue-200"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Phone
              </label>
              <input
                type="text"
                {...register("phone")}
                className="w-full border rounded-lg px-4 py-2 focus:ring focus:ring-blue-200"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Bio
              </label>
              <textarea
                {...register("bio")}
                className="w-full border rounded-lg px-4 py-2 focus:ring focus:ring-blue-200"
                rows="3"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Location
              </label>
              <input
                type="text"
                {...register("location")}
                className="w-full border rounded-lg px-4 py-2 focus:ring focus:ring-blue-200"
              />
            </div>

            <div>
              <label
                className="block text-gray-700 font-medium mb-2"
                onClick={()=>setedit(true)}
              >
                Profile Image
              </label>

              {profilim?.profileImage && !edit ? (
                <img
                  src={profilim?.profileImage}
                  alt="Current profile"
                  className="w-32 h-32 object-cover rounded-full mb-2"
                />
              ) : (
                <input
                  type="file"
                  {...register("profileImage")}
                  accept="image/*"
                  className="w-full border rounded-lg px-4 py-2 focus:ring focus:ring-blue-200"
                />
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white font-medium py-2 px-4 rounded-lg hover:bg-blue-700 transition disabled:bg-gray-400"
            >
              {loading ? "Updating..." : "Save Changes"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
