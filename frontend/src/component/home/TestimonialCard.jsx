import React from "react";
import { FaStar } from "react-icons/fa";
import TranslatedText from "../TranslatedText";

export default function TestimonialCard({ testimonial }) {
  return (
    <div className="border border-gray-200 rounded-lg p-6">
      <div className="flex mb-4">
        {[...Array(5)].map((_, i) => (
          <FaStar
            key={i}
            className={`${
              i < testimonial.rating ? "text-yellow-400" : "text-gray-300"
            }`}
          />
        ))}
      </div>
      <p className="text-gray-700 italic mb-6">
        <TranslatedText>"{testimonial.quote}"</TranslatedText>
      </p>
      <div>
        <p className="font-bold">
          <TranslatedText>{testimonial.name}</TranslatedText>
        </p>
        <p className="text-gray-600">
          <TranslatedText>{testimonial.role}</TranslatedText>
        </p>
      </div>
    </div>
  );
}
