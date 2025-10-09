import React from "react";

const CareerPage = () => {
  return (
    <div className="bg-gray-50 min-h-screen text-gray-800">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-20 px-6 text-center">
        <h1 className="text-4xl font-bold mb-4">Build Your Future With Us</h1>
        <p className="max-w-2xl mx-auto text-lg">
          At Jobzy, we’re redefining the way people connect with opportunities. 
          Join a passionate team that values innovation, growth, and impact.
        </p>
      </section>

      {/* Why Work With Us */}
      <section className="py-16 px-6 max-w-6xl mx-auto">
        <h2 className="text-2xl font-semibold text-center mb-8">
          Why Work With Us?
        </h2>
        <div className="grid md:grid-cols-3 gap-8 text-center">
          <div className="p-6 bg-white rounded-xl shadow hover:shadow-lg transition">
            <h3 className="text-lg font-bold mb-2">🌍 Impact</h3>
            <p>
              Be part of a mission-driven company helping job seekers and
              employers connect globally.
            </p>
          </div>
          <div className="p-6 bg-white rounded-xl shadow hover:shadow-lg transition">
            <h3 className="text-lg font-bold mb-2">🚀 Growth</h3>
            <p>
              We invest in your personal and professional growth with learning
              opportunities and mentorship.
            </p>
          </div>
          <div className="p-6 bg-white rounded-xl shadow hover:shadow-lg transition">
            <h3 className="text-lg font-bold mb-2">🤝 Culture</h3>
            <p>
              Work in a collaborative, diverse, and inclusive environment where
              your voice matters.
            </p>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-gray-100 px-6">
        <h2 className="text-2xl font-semibold text-center mb-8">
          Perks & Benefits
        </h2>
        <ul className="max-w-3xl mx-auto grid md:grid-cols-2 gap-6 text-lg">
          <li className="bg-white p-4 rounded-lg shadow">Flexible Work Hours</li>
          <li className="bg-white p-4 rounded-lg shadow">Remote-Friendly Culture</li>
          <li className="bg-white p-4 rounded-lg shadow">Learning Budget</li>
          <li className="bg-white p-4 rounded-lg shadow">Health & Wellness Programs</li>
        </ul>
      </section>

      {/* Call to Action */}
      <section className="py-20 px-6 text-center">
        <h2 className="text-3xl font-bold mb-4">Stay Connected</h2>
        <p className="mb-6">
          We’re always looking for talented individuals. Send us your CV and we’ll reach out 
          when a role fits you.
        </p>
        <a
          href="/contact"
          className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium shadow hover:bg-blue-700 transition"
        >
          Send Your CV
        </a>
      </section>
    </div>
  );
};

export default CareerPage;
