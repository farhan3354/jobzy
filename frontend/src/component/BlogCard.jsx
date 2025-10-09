import { useState } from "react";
import {
  FaClock,
  FaUser,
  FaCalendarAlt,
  FaShare,
  FaArrowRight,
  FaEye,
} from "react-icons/fa";
import { Link } from "react-router-dom";

const BlogCard = ({ post }) => {
  const [imageError, setImageError] = useState(false);

  const handleCardClick = () => {
    console.log("Navigating to blog:", post._id);
  };

  const defaultImage =
    "https://images.unsplash.com/photo-1499750310107-5fef28a66643?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80";

  return (
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
              to={`/blog/${post._id}`}
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
  );
};

export default BlogCard;

// import {
//   FaBookmark,
//   FaRegBookmark,
//   FaClock,
//   FaUser,
//   FaCalendarAlt,
//   FaShare,
//   FaArrowRight,
// } from "react-icons/fa";

// const BlogCard = ({ post }) => {
//   return (
//     <>
//       <article className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden">
//         <div className="relative">
//           <img
//             src={post.image}
//             alt={post.title}
//             className="w-full h-48 object-cover"
//           />
//         </div>

//         <div className="p-6">
//           <div className="flex items-center justify-between mb-3">
//             <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm font-medium">
//               {post.category?.replace("-", " ")}
//             </span>
//             <div className="flex items-center space-x-1 text-gray-500">
//               <FaClock size={12} />
//               <span className="text-sm">{post.readTime || "5 min read"}</span>
//             </div>
//           </div>

//           <h3 className="text-xl font-bold mb-3 text-gray-900 hover:text-blue-600 transition-colors cursor-pointer">
//             {post.title}
//           </h3>

//           <p className="text-gray-600 mb-4 line-clamp-2">
//             {post.content.slice(0, 120)}...
//           </p>

//           <div className="flex items-center justify-between pt-4 border-t border-gray-100">
//             <div className="flex items-center space-x-3">
//               <div className="flex items-center space-x-1 text-gray-500">
//                 <FaUser size={12} />
//                 <span className="text-sm">{post.author}</span>
//               </div>
//               <div className="flex items-center space-x-1 text-gray-500">
//                 <FaCalendarAlt size={12} />
//                 <span className="text-sm">
//                   {new Date(post.createdAt).toLocaleDateString()}
//                 </span>
//               </div>
//             </div>

//             <div className="flex items-center space-x-2">
//               <button className="p-2 text-gray-400 hover:text-blue-600 transition-colors">
//                 <FaShare size={14} />
//               </button>
//               <button className="bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 transition-colors">
//                 <FaArrowRight size={14} />
//               </button>
//             </div>
//           </div>
//         </div>
//       </article>
//     </>
//   );
// };

// export default BlogCard;
