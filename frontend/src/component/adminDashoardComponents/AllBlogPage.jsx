import { useEffect, useState, useMemo } from "react";
import BlogCard from "./BlogCard";
import axios from "axios";
import { FaSearch, FaFilter } from "react-icons/fa";
import BlogLoadingSkeleton from "./../BlogLoadingSkeleton";

export default function BlogPage() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await axios.get("http://localhost:8000/api/blog");
        setBlogs(res.data.blog || []);
      } catch (err) {
        setError(err.message || "Failed to fetch blogs");
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  const categories = useMemo(() => {
    const cats = blogs.map((blog) => blog.category).filter(Boolean);
    return ["all", ...new Set(cats)];
  }, [blogs]);

  const filteredBlogs = useMemo(() => {
    return blogs.filter((blog) => {
      const matchesSearch =
        blog.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        blog.content?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        blog.author?.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesCategory =
        selectedCategory === "all" || blog.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [blogs, searchTerm, selectedCategory]);

  if (loading) return <BlogLoadingSkeleton />;
  if (error) return <ErrorDisplay error={error} />;

  return (
    <div className="min-h-screen  py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold text-blue-600 mb-4 ">
            Career Insights & Tips
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Discover expert advice, industry trends, and career development
            strategies to advance your professional journey.
          </p>
        </div>

        <div className="max-w-4xl mx-auto mb-12 space-y-6">
          <div className="relative">
            <FaSearch
              className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={20}
            />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search articles, topics, or authors..."
              className="w-full pl-12 pr-4 py-4 rounded-2xl border border-gray-200 focus:outline-none focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 shadow-sm transition-all duration-200"
            />
          </div>

          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  selectedCategory === category
                    ? "bg-blue-600 text-white shadow-lg shadow-blue-500/25"
                    : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-200"
                }`}
              >
                {category.replace("-", " ")}
              </button>
            ))}
          </div>
        </div>

        <div className="mb-6 text-center">
          <p className="text-gray-600">
            Showing {filteredBlogs.length} of {blogs.length} articles
          </p>
        </div>

        {filteredBlogs.length === 0 ? (
          <EmptyState searchTerm={searchTerm} />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredBlogs.map((post) => (
              <BlogCard key={post._id} post={post} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

const ErrorDisplay = ({ error }) => (
  <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
    <div className="text-center max-w-md">
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-xl mb-4">
        <p className="font-bold">Error Loading Blogs</p>
        <p>{error}</p>
      </div>
      <button
        onClick={() => window.location.reload()}
        className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
      >
        Try Again
      </button>
    </div>
  </div>
);

const EmptyState = ({ searchTerm }) => (
  <div className="text-center py-16">
    <div className="max-w-md mx-auto">
      <div className="text-6xl mb-4">🔍</div>
      <h3 className="text-2xl font-bold text-gray-900 mb-2">
        No articles found
      </h3>
      <p className="text-gray-600">
        {searchTerm
          ? `No results for "${searchTerm}". Try different keywords.`
          : "No blog posts available."}
      </p>
    </div>
  </div>
);
