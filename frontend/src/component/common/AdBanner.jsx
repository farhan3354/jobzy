import React, { useState, useEffect } from "react";

// Mock ad data
const headerAds = [
  {
    id: 1,
    title: "Special Offer!",
    description: "Get 50% off on all premium plans. Limited time only!",
    cta: "Learn More",
    color: "from-purple-500 to-pink-500",
  },
  {
    id: 2,
    title: "New Feature Released",
    description: "Check out our latest update with enhanced security features.",
    cta: "Try Now",
    color: "from-green-400 to-blue-500",
  },
  {
    id: 3,
    title: "Summer Sale",
    description: "Don't miss our biggest sale of the year. Up to 70% off!",
    cta: "Shop Now",
    color: "from-yellow-400 to-red-500",
  },
];

// Header Ad Component
const HeaderAd = () => {
  const [currentAd, setCurrentAd] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  // Rotate ads every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentAd((prev) => (prev + 1) % headerAds.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const closeAd = () => {
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div
      className={`bg-gradient-to-r ${headerAds[currentAd].color} text-white p-3`}
    >
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <div className="flex-1 text-center">
          <span className="font-bold mr-2">{headerAds[currentAd].title}</span>
          <span className="text-sm">{headerAds[currentAd].description}</span>
          <button className="ml-3 bg-white text-gray-800 px-3 py-1 rounded text-sm font-medium hover:bg-gray-100 transition-colors">
            {headerAds[currentAd].cta}
          </button>
        </div>
        <button
          onClick={closeAd}
          className="text-white hover:bg-white hover:bg-opacity-20 rounded-full w-6 h-6 flex items-center justify-center ml-2"
          aria-label="Close ad"
        >
          ×
        </button>
      </div>
    </div>
  );
};

export default HeaderAd;
