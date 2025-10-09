import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function CreateBlog() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const navigate = useNavigate();
  const token = useSelector((state) => state.auth.token);

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      formData.append("title", data.title);
      formData.append("content", data.content);
      formData.append("author", data.author);
      formData.append("category", data.category);

      if (data.blog[0]) {
        formData.append("blog", data.blog[0]);
      }

      const response = await axios.post(
        "http://localhost:8000/blogs/create",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.data.success) {
        alert("Blog created successfully!");
        reset();
        navigate("/blog");
      }
    } catch (error) {
      console.error("Error creating blog:", error);
      alert("Failed to create blog.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-xl p-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          ✍️ Create New Blog
        </h2>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-6"
          encType="multipart/form-data"
        >
          {/* Title */}
          <div>
            <label className="block font-medium text-gray-700 mb-2">
              Blog Title
            </label>
            <input
              {...register("title", { required: "Title is required" })}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              placeholder="Enter blog title"
            />
            {errors.title && (
              <p className="text-red-500 text-sm mt-1">
                {errors.title.message}
              </p>
            )}
          </div>

          {/* Content */}
          <div>
            <label className="block font-medium text-gray-700 mb-2">
              Blog Content
            </label>
            <textarea
              {...register("content", { required: "Content is required" })}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 h-32 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              placeholder="Write your blog content..."
            />
            {errors.content && (
              <p className="text-red-500 text-sm mt-1">
                {errors.content.message}
              </p>
            )}
          </div>

          {/* Author */}
          <div>
            <label className="block font-medium text-gray-700 mb-2">
              Author Name
            </label>
            <input
              {...register("author", { required: "Author is required" })}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              placeholder="Author name"
            />
            {errors.author && (
              <p className="text-red-500 text-sm mt-1">
                {errors.author.message}
              </p>
            )}
          </div>

          {/* Category */}
          <div>
            <label className="block font-medium text-gray-700 mb-2">
              Category
            </label>
            <select
              {...register("category", { required: "Category is required" })}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            >
              <option value="">Select category</option>
              <option value="career-tips">Career Tips</option>
              <option value="tech">Tech</option>
              <option value="remote-work">Remote Work</option>
              <option value="personal-growth">Personal Growth</option>
            </select>
            {errors.category && (
              <p className="text-red-500 text-sm mt-1">
                {errors.category.message}
              </p>
            )}
          </div>

          {/* Image */}
          <div>
            <label className="block font-medium text-gray-700 mb-2">
              Blog Image
            </label>
            <input
              type="file"
              accept="image/*"
              {...register("blog", { required: "Blog image is required" })}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            />
            {errors.blog && (
              <p className="text-red-500 text-sm mt-1">{errors.blog.message}</p>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition duration-200"
          >
            🚀 Create Blog
          </button>
        </form>
      </div>
    </div>
  );
}
