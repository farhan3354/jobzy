import React from "react";
import {stats} from "../../data/data";
export default function StatsSection  () {
  return (
    <div className="bg-blue-500 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:max-w-none">
          <div className="text-center space-y-4">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Trusted by job seekers and employers worldwide
            </h2>
            <p className="text-lg leading-8 text-white">
              We connect talent with opportunity, helping both candidates and
              companies grow.
            </p>
          </div>
          <dl className="mt-16 grid grid-cols-1 gap-0.5 overflow-hidden rounded-2xl text-center sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat, index) => (
              <div key={index} className="flex flex-col bg-white/25 p-8">
                <dt className="text-sm font-semibold leading-6 text-white">
                  {stat.label}
                </dt>
                <dd className="order-first text-3xl font-semibold tracking-tight text-white">
                  {stat.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
};

