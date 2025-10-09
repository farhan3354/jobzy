import {
  FaUserTie,
  FaLaptopCode,
  FaChartLine,
  FaShieldAlt,
} from "react-icons/fa";

export default function Categories() {
  const categories = [
    {
      icon: <FaUserTie className="text-blue-500 text-2xl" />,
      name: "Business",
      // jobs: 1243,
    },
    {
      icon: <FaLaptopCode className="text-blue-500 text-2xl" />,
      name: "Technology",
      // jobs: 3562,
    },
    {
      icon: <FaChartLine className="text-blue-500 text-2xl" />,
      name: "Marketing",
      // jobs: 892,
    },
    {
      icon: <FaShieldAlt className="text-blue-500 text-2xl" />,
      name: "Security",
      // jobs: 567,
    },
  ];

  return (
    <div className="bg-gray-50 py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-4">
          Popular Categories
        </h2>
        <p className="text-gray-600 text-center max-w-2xl mx-auto mb-10">
          Browse jobs by category to find the perfect match for your skills and
          interests
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow text-center"
            >
              <div className="flex justify-center mb-4">{category.icon}</div>
              <h3 className="font-bold text-lg mb-2">{category.name}</h3>
              {/* <p className="text-gray-500">{category.jobs} jobs available</p> */}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
