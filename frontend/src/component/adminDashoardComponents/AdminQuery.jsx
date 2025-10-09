import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import {
  FiMessageSquare,
  FiUser,
  FiMail,
  FiCalendar,
  FiSearch,
  FiEye,
  FiTrash2,
  FiMessageCircle,
} from "react-icons/fi";

const AdminQueries = () => {
  const [queries, setQueries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedQuery, setSelectedQuery] = useState(null);
  const [showQueryModal, setShowQueryModal] = useState(false);
  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    fetchAllQueries();
  }, []);

  const fetchAllQueries = async () => {
    try {
      setLoading(true);
      const response = await axios.post(
        "http://localhost:8000/contactget",
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.data.success) {
        setQueries(response.data.messa);
      }
    } catch (error) {
      console.error("Error fetching queries:", error);
      alert("Failed to fetch contact queries");
    } finally {
      setLoading(false);
    }
  };

  const filteredQueries = queries.filter((query) => {
    const matchesSearch =
      query.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      query.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      query.message?.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesSearch;
  });

  const viewQueryDetails = (query) => {
    setSelectedQuery(query);
    setShowQueryModal(true);
  };

  const deleteQuery = async (queryId) => {
    if (window.confirm("Are you sure you want to delete this query?")) {
      try {
        console.log(`Deleting query ${queryId}`);
        await axios.delete(`http://localhost:8000/contact/${queryId}`);

        fetchAllQueries();
      } catch (error) {
        console.error("Error deleting query:", error);
      }
    }
  };

  const formatMessage = (message) => {
    if (message.length > 100) {
      return message.substring(0, 100) + "...";
    }
    return message;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600 text-lg">Loading queries...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold  bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
            Contact Queries
          </h1>
          <p className="text-gray-600 mt-3 text-lg">
            Manage and respond to customer inquiries
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-shadow duration-300">
            <div className="flex items-center">
              <div className="p-3 bg-blue-100 rounded-xl">
                <FiMessageSquare className="text-blue-600 text-2xl" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">
                  Total Queries
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {queries.length}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-shadow duration-300">
            <div className="flex items-center">
              <div className="p-3 bg-green-100 rounded-xl">
                <FiUser className="text-green-600 text-2xl" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">
                  Unique Contacts
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {new Set(queries.map((query) => query.email)).size}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 border border-gray-100">
          <div className="flex flex-col lg:flex-row gap-4 items-center">
            <div className="flex-1 w-full">
              <div className="relative">
                <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl" />
                <input
                  type="text"
                  placeholder="Search by name, email, or message content..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-300 text-gray-800 placeholder-gray-400"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">
          {filteredQueries.length === 0 ? (
            <div className="text-center py-16">
              <FiMessageSquare className="mx-auto text-gray-300 text-6xl mb-4" />
              <p className="text-gray-500 text-lg mb-2">No queries found</p>
              <p className="text-gray-400">
                Try adjusting your search or check back later
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Contact
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Message
                    </th>

                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredQueries.map((query) => (
                    <tr
                      key={query._id}
                      className="hover:bg-gray-50 transition-colors duration-200"
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <p className="text-sm font-semibold text-gray-900 flex items-center">
                            <FiUser className="mr-2 text-gray-400" />
                            {query.name}
                          </p>
                          <p className="text-sm text-gray-500 flex items-center mt-1">
                            <FiMail className="mr-2 text-gray-400" />
                            {query.email}
                          </p>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="max-w-md">
                          <p className="text-sm text-gray-800 line-clamp-2">
                            {formatMessage(query.message)}
                          </p>
                        </div>
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {new Date(query.createdAt).toLocaleDateString()}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => viewQueryDetails(query)}
                            className="inline-flex items-center px-3 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
                            title="View Details"
                          >
                            <FiEye className="w-4 h-4" />
                          </button>

                          <button
                            onClick={() => deleteQuery(query._id)}
                            className="inline-flex items-center px-3 py-2 bg-red-600 text-white text-sm font-medium rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors duration-200"
                            title="Delete Query"
                          >
                            <FiTrash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {filteredQueries.length > 0 && (
          <div className="mt-6 text-center">
            <p className="text-gray-600">
              Showing{" "}
              <span className="font-semibold text-gray-900">
                {filteredQueries.length}
              </span>{" "}
              of{" "}
              <span className="font-semibold text-gray-900">
                {queries.length}
              </span>{" "}
              queries
            </p>
          </div>
        )}
      </div>

      {showQueryModal && selectedQuery && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-cyan-50">
              <div className="flex justify-between items-center">
                <h3 className="text-2xl font-bold text-gray-900 flex items-center">
                  <FiMessageCircle className="mr-3 text-blue-600" />
                  Query Details
                </h3>
                <button
                  onClick={() => setShowQueryModal(false)}
                  className="text-gray-400 hover:text-gray-600 text-2xl bg-white rounded-full p-1"
                >
                  &times;
                </button>
              </div>
            </div>

            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">
                      Contact Information
                    </h4>
                    <div className="space-y-2">
                      <div className="flex items-center">
                        <FiUser className="text-gray-400 mr-3" />
                        <div>
                          <p className="text-sm text-gray-500">Full Name</p>{" "}
                          <p className="font-medium text-gray-900">
                            {selectedQuery.name}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <FiMail className="text-gray-400 mr-3" />
                        <div>
                          <p className="text-sm text-gray-500">Email Address</p>{" "}
                          <p className="font-medium text-gray-900">
                            {selectedQuery.email}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">
                      Query Information
                    </h4>
                    <div className="space-y-2">
                      <div className="flex items-center">
                        <FiCalendar className="text-gray-400 mr-3" />
                        <div>
                          {" "}
                          <p className="text-sm text-gray-500">
                            Submitted Date
                          </p>
                          <p className="font-medium text-gray-900">
                            {new Date(selectedQuery.createdAt).toLocaleString()}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">
                    Message
                  </h4>
                  <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                    <p className="text-gray-800 leading-relaxed whitespace-pre-wrap">
                      {selectedQuery.message}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminQueries;
