import React from "react";
import { FaSearch, FaMapMarkerAlt } from "react-icons/fa";
import SearchBar from "./SearchBar";
import TranslatedText from "../TranslatedText";

export default function HeroSection() {
  return (
    <div className="bg-blue-600 text-white py-20 px-4">
      <div className="max-w-6xl mx-auto text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">
         <TranslatedText>
          Find Your Dream Job Today
         </TranslatedText> 
        </h1>
        <p className="text-xl mb-8 max-w-2xl mx-auto">
          <TranslatedText>
            Thousands of jobs in technology, business, and more. Start your career
          journey with us.  
         </TranslatedText>
        </p>
        {/* <SearchBar /> */}
      </div>
    </div>
  );
}
