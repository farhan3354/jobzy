import React from "react";
import { statsofhome } from "./../../data/data";

export default function StatsSection() {
  return (
    <>
      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {statsofhome.map((stat, index) => (
            <div key={index}>
              <h3 className="text-3xl font-bold text-blue-600">{stat.value}</h3>
              <p className="text-gray-600">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
