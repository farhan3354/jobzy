import { useState } from "react";
import {
  FaClock,
  FaUser,
  FaCalendarAlt,
  FaShare,
  FaArrowRight,
  FaEye,
  FaEdit,
  FaTrash,
} from "react-icons/fa";

import { Link, useNavigate } from "react-router-dom";

const BlogCard = ({ post }) => {
  const [imageError, setImageError] = useState(false);
  const navigate = useNavigate();

  const handleCardClick = () => {
    console.log("Navigating to blog:", post._id);
  };

  const defaultImage =
    "https://images.unsplash.com/photo-1499750310107-5fef28a66643?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80";

  const handleEdit = (id) => {
    navigate(`/admin-dashboard/edit-blog/${id}`);
  };

  return (
    <>
      <article
        className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden cursor-pointer transform hover:-translate-y-1"
        onClick={handleCardClick}
      >
        <div className="relative overflow-hidden">
          <img
            src={imageError ? defaultImage : post.image}
            alt={post.title}
            onError={() => setImageError(true)}
            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors duration-300" />

          <div className="absolute bottom-4 left-4">
            <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium capitalize">
              {post.category?.replace("-", " ") || "Uncategorized"}
            </span>
          </div>

          {/* 👇 Edit/Delete buttons at top-right corner */}
          <div className="absolute top-2 right-2 flex space-x-2 z-10">
            <button
              onClick={(e) => {
                e.stopPropagation(); // prevent card click
                handleEdit(post._id);
              }}
              className="p-1 bg-white text-blue-600 rounded hover:bg-blue-50 shadow"
              title="Edit"
            >
              <FaEdit size={14} />
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation(); // prevent card click
                // handleDelete(post._id);
              }}
              className="p-1 bg-white text-red-600 rounded hover:bg-red-50 shadow"
              title="Delete"
            >
              <FaTrash size={14} />
            </button>
          </div>
        </div>

        <div className="p-6">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-4 text-sm text-gray-500">
              <div className="flex items-center space-x-1">
                <FaUser size={12} />
                <span>{post.author || "Unknown Author"}</span>
              </div>
              <div className="flex items-center space-x-1">
                <FaCalendarAlt size={12} />
                <span>{new Date(post.createdAt).toLocaleDateString()}</span>
              </div>
            </div>
            <div className="flex items-center space-x-1 text-gray-500">
              <FaClock size={12} />
              <span>{post.readTime || "5"} min read</span>
            </div>
          </div>

          <h3 className="text-xl font-bold mb-3 text-gray-900 group-hover:text-blue-600 transition-colors duration-200 line-clamp-2">
            {post.title}
          </h3>

          <p className="text-gray-600 mb-4 line-clamp-3 leading-relaxed">
            {post.content.slice(0, 150)}...
          </p>

          <div className="flex items-center justify-between pt-4 border-t border-gray-100">
            <div className="flex items-center space-x-2 text-gray-500">
              <FaEye size={14} />
              <span className="text-sm">{post.views || 0} views</span>
            </div>

            <div className="flex items-center space-x-2">
              <button
                className="p-2 text-gray-400 hover:text-blue-600 transition-colors duration-200 rounded-lg hover:bg-blue-50"
                title="Share article"
              >
                <FaShare size={14} />
              </button>
              <Link
                to={`${post._id}`}
                className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200 group/read"
              >
                <span className="text-sm font-medium">Read More</span>
                <FaArrowRight
                  size={12}
                  className="group-hover/read:translate-x-1 transition-transform duration-200"
                />
              </Link>
            </div>
          </div>
        </div>
      </article>
    </>
  );
};

export default BlogCard;
