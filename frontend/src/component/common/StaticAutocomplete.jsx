import React, { useState, useEffect, useRef } from "react";

const StaticAutocomplete = ({ 
  name, 
  register, 
  errors, 
  setValue, 
  options = [], 
  defaultValue = "", 
  placeholder = "Start typing...",
  validation = {}
}) => {
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

  const handleInputChange = (e) => {
    const val = e.target.value;
    setQuery(val);
    setValue(name, val);

    if (val.length > 0) {
      const filtered = options.filter(opt => 
        opt.toLowerCase().includes(val.toLowerCase())
      ).slice(0, 5);
      setSuggestions(filtered);
      setShowDropdown(filtered.length > 0);
    } else {
      setSuggestions([]);
      setShowDropdown(false);
    }
  };

  const handleSelect = (option) => {
    setQuery(option);
    setValue(name, option);
    setShowDropdown(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <input
        type="text"
        {...register(name, validation)}
        value={query}
        onChange={handleInputChange}
        placeholder={placeholder}
        className={`w-full border px-4 py-2.5 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all ${
          errors[name] ? "border-red-500" : "border-gray-300"
        }`}
        autoComplete="off"
      />
      {showDropdown && (
        <ul className="absolute z-50 w-full bg-white border border-gray-200 rounded-lg mt-1 shadow-xl max-h-60 overflow-y-auto animate-fade-in">
          {suggestions.map((option, index) => (
            <li
              key={index}
              onClick={() => handleSelect(option)}
              className="px-4 py-2.5 hover:bg-blue-50 cursor-pointer text-sm text-gray-700 transition-colors border-b last:border-b-0 border-gray-50"
            >
              {option}
            </li>
          ))}
        </ul>
      )}
      {errors[name] && (
        <p className="text-red-500 text-xs mt-1 italic">{errors[name].message}</p>
      )}
    </div>
  );
};

export default StaticAutocomplete;
