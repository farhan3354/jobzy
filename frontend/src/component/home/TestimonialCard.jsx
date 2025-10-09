import React from "react";
import { FaStar } from "react-icons/fa";

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
      <p className="text-gray-700 italic mb-6">"{testimonial.quote}"</p>
      <div>
        <p className="font-bold">{testimonial.name}</p>
        <p className="text-gray-600">{testimonial.role}</p>
      </div>
    </div>
  );
}
