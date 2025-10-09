import React from "react";
import TestimonialCard from "./TestimonialCard";

export default function Testimonials() {
  const testimonials = [
    {
      quote:
        "I found my dream job within a week of using this platform! The matching algorithm is incredible.",
      name: "Sarah Johnson",
      role: "Product Designer at TechCorp",
      rating: 5,
    },
    {
      quote:
        "The application process was so smooth and I got multiple interview calls within days.",
      name: "Michael Chen",
      role: "Senior Developer at CloudSystems",
      rating: 4,
    },
    {
      quote:
        "Best job portal I've used. The saved jobs feature helped me keep track of opportunities.",
      name: "David Wilson",
      role: "Marketing Manager at CreativeCo",
      rating: 5,
    },
  ];

  return (
    <div className="py-16 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-4">Success Stories</h2>
        <p className="text-gray-600 text-center max-w-2xl mx-auto mb-10">
          Hear from people who found their dream jobs through our platform
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard key={index} testimonial={testimonial} />
          ))}
        </div>
      </div>
    </div>
  );
}
