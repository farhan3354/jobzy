import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function FindByIdBlog() {
  const { id } = useParams();
  const [blogs, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await axios.get(`http://localhost:8000/api/blog/${id}`);
        setBlog(res.data.blog);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch blog.", err);
        setLoading(false);
      }
    };
    fetchBlog();
  }, [id]);

  if (loading) return <p className="text-center mt-6">Loading blog...</p>;
  if (error) return <p className="text-center text-red-500 mt-6">{error}</p>;
  if (!blogs) return <p className="text-center mt-6">Blog not found.</p>;

  return (
    <>
      <div className="max-w-7xl mx-auto px-6 py-10 bg-white rounded-2xl shadow-lg mt-10 border border-gray-100">
        {blogs.image && (
          <img
            src={blogs.image}
            alt={blogs.title}
            className="w-full h-96 object-cover rounded-xl mb-8 shadow-md"
          />
        )}

        <h1 className="text-3xl md:text-4xl font-semibold mb-6 text-gray-900 leading-snug">
          {blogs.title}
        </h1>

        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center text-sm md:text-base text-gray-600 mb-8 gap-y-3">
          <div>
            By{" "}
            <span className="font-semibold text-gray-800">{blogs.author}</span>
          </div>

          <div className="flex items-center gap-3 flex-wrap">
            <span className="capitalize bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-xs md:text-sm font-medium">
              {blogs.category}
            </span>
            <span className="hidden sm:inline text-gray-400">•</span>
            <span className="text-gray-500">
              {new Date(blogs.createdAt).toLocaleDateString()}
            </span>
          </div>
        </div>

        <div className="prose max-w-none prose-lg text-gray-800 leading-relaxed">
          <h3 className="text-xl font-semibold text-gray-800 mb-3">
            Description:
          </h3>
          <p className="whitespace-pre-line">{blogs.content}</p>
        </div>
      </div>
    </>
  );
}
