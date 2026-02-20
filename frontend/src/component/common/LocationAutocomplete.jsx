import React, { useState, useEffect, useRef } from "react";
import axios from "axios";

const LocationAutocomplete = ({ name, register, errors, setValue, defaultValue, placeholder = "e.g. Lahore, Pakistan" }) => {
  const [query, setQuery] = useState(defaultValue || "");
  const [suggestions, setSuggestions] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    if (defaultValue) {
      setQuery(defaultValue);
    }
  }, [defaultValue]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const fetchSuggestions = async (val) => {
    if (val.length < 2) {
      setSuggestions([]);
      setShowDropdown(false);
      return;
    }

    try {
      const response = await axios.get(`https://photon.komoot.io/api/?q=${val}&limit=5`);
      const results = response.data.features.map((feature) => {
        const { name, city, state, country } = feature.properties;
        const parts = [name, city, state, country].filter(p => p && p !== name);
        const description = parts.length > 0 ? parts.join(", ") : "";
        return {
          id: feature.properties.osm_id,
          label: description ? `${name}, ${description}` : name,
        };
      });
      setSuggestions(results);
      setShowDropdown(results.length > 0);
    } catch (error) {
      console.error("Error fetching location suggestions:", error);
    }
  };

  const handleInputChange = (e) => {
    const val = e.target.value;
    setQuery(val);
    setValue(name, val);
    fetchSuggestions(val);
  };

  const handleSelect = (suggestion) => {
    setQuery(suggestion.label);
    setValue(name, suggestion.label);
    setShowDropdown(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <input
        type="text"
        {...register(name, { required: "Location is required" })}
        value={query}
        onChange={handleInputChange}
        placeholder={placeholder}
        className="w-full border rounded-lg px-3 py-2 focus:ring focus:ring-blue-300 transition-all duration-200"
        autoComplete="off"
      />
      {showDropdown && (
        <ul className="absolute z-50 w-full bg-white border rounded-lg mt-1 shadow-lg max-h-60 overflow-y-auto">
          {suggestions.map((suggestion, index) => (
            <li
              key={index}
              onClick={() => handleSelect(suggestion)}
              className="px-4 py-2 hover:bg-blue-50 cursor-pointer text-sm text-gray-700 border-b last:border-b-0"
            >
              {suggestion.label}
            </li>
          ))}
        </ul>
      )}
      {errors[name] && (
        <p className="text-red-500 text-sm mt-1">{errors[name].message}</p>
      )}
    </div>
  );
};

export default LocationAutocomplete;
