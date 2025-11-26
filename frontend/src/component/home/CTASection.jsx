import React from "react";
import { Link } from "react-router-dom";
import TranslatedText from "../TranslatedText";

export default function CTASection() {
  return (
    <div className="bg-blue-600 text-white py-16 px-4">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-6">
          <TranslatedText>
            Ready to take the next step in your career?
          </TranslatedText>
        </h2>
        <p className="text-xl mb-8">
          <TranslatedText>
            Create a free account and get matched with your perfect job today.
          </TranslatedText>
        </p>
        <div className="space-x-4">
          <Link
            to={"/chose-register"}
            className="bg-white text-blue-600 hover:bg-gray-100 py-3 px-8 rounded-md font-medium transition-colors"
          >
            <TranslatedText>Sign Up Now</TranslatedText>
          </Link>
          <Link className="border border-white text-white hover:bg-blue-700 py-3 px-8 rounded-md font-medium transition-colors">
            <TranslatedText>Learn More</TranslatedText>
          </Link>
        </div>
      </div>
    </div>
  );
}
