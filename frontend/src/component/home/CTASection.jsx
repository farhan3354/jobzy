import React from "react";
import { Link } from "react-router-dom";

export default function CTASection() {
  return (
    <div className="bg-blue-600 text-white py-16 px-4">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-6">
          Ready to take the next step in your career?
        </h2>
        <p className="text-xl mb-8">
          Create a free account and get matched with your perfect job today.
        </p>
        <div className="space-x-4">
          <Link
            to={"/chose-register"}
            className="bg-white text-blue-600 hover:bg-gray-100 py-3 px-8 rounded-md font-medium transition-colors"
          >
            Sign Up Now
          </Link>
          <Link className="border border-white text-white hover:bg-blue-700 py-3 px-8 rounded-md font-medium transition-colors">
            Learn More
          </Link>
        </div>
      </div>
    </div>
  );
}
