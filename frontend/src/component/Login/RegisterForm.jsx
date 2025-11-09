import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import PhoneInput from "react-phone-number-input";
import { isValidPhoneNumber } from "react-phone-number-input";
import "react-phone-number-input/style.css";
import api from "../../api/register";

export default function RegisterForm() {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const [role, setRole] = useState("");
  const [phoneValue, setPhoneValue] = useState("");

  const onSubmit = async (data) => {
    try {
      // Validate phone number
      if (!phoneValue || !isValidPhoneNumber(phoneValue)) {
        Swal.fire({
          title: "Error!",
          text: "Please enter a valid phone number",
          icon: "error",
          confirmButtonText: "OK",
          confirmButtonColor: "#d33",
        });
        return;
      }

      const formData = {
        ...data,
        phone: phoneValue,
      };

      const res = await api.post("/register", formData);

      Swal.fire({
        title: "Success!",
        text: "Registration successful! Please verify your email.",
        icon: "success",
        confirmButtonText: "OK",
      });

      navigate(`/verify-otp?email=${encodeURIComponent(data.email)}`);
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Registration failed. Please try again.";

      Swal.fire({
        title: "Error!",
        text: errorMessage,
        icon: "error",
        confirmButtonText: "OK",
        confirmButtonColor: "#d33",
      });
    }
  };

  const handlePhoneChange = (value) => {
    setPhoneValue(value);
    setValue("phone", value, { shouldValidate: true });
  };

  return (
    <div className="p-8 md:p-12 md:w-1/2 flex items-center justify-center">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-lg p-8">
        <div className="mb-8 text-center">
          <p className="mb-1 text-2xl text-blue-500 font-bold">Register</p>
          <p className="text-gray-600 text-xl">
            {role === "employer"
              ? "Create your employer account"
              : "Create your job seeker account"}
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* <div>
            <label className="block text-sm font-medium text-gray-700">
              I am a *
            </label>
            <select
              {...register("role", { required: "Please select a role" })}
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full h-12 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="" disabled>
                Select Role
              </option>
              <option value="job-seeker">Job Seeker</option>
              <option value="employer">Employer</option>
            </select>
            {errors.role && (
              <p className="text-red-500 text-sm mt-1">{errors.role.message}</p>
            )}
          </div> */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              I am a *
            </label>
            <div className="relative">
              <select
                {...register("role", { required: "Please select a role" })}
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full h-12 pl-10 pr-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none bg-white"
              >
                <option value="" disabled>
                  Select Role
                </option>
                <option value="job-seeker">Job Seeker</option>
                <option value="employer">Employer</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center px-2 text-gray-700">
                <svg
                  className="h-5 w-5"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </div>
            {errors.role && (
              <p className="text-red-500 text-sm mt-1">{errors.role.message}</p>
            )}
          </div>

          <input
            {...register("name", {
              required: "Name is required",
              minLength: {
                value: 2,
                message: "Name must be at least 2 characters",
              },
            })}
            type="text"
            placeholder="Full Name"
            className="w-full h-12 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.name && (
            <p className="text-red-500 text-sm">{errors.name.message}</p>
          )}

          <input
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^\S+@\S+\.\S+$/,
                message: "Enter a valid email address",
              },
            })}
            type="email"
            placeholder="Email"
            className="w-full h-12 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email.message}</p>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Phone Number *
            </label>
            <div className="phone-input-wrapper">
              <PhoneInput
                international
                defaultCountry="US"
                value={phoneValue}
                onChange={handlePhoneChange}
                className="w-full"
              />
            </div>
            {errors.phone && (
              <p className="text-red-500 text-sm mt-1">
                {errors.phone.message}
              </p>
            )}
            {phoneValue && !isValidPhoneNumber(phoneValue) && (
              <p className="text-red-500 text-sm mt-1">
                Please enter a valid phone number
              </p>
            )}
          </div>

          <input
            {...register("password", {
              required: "Password is required",
              minLength: { value: 6, message: "Minimum 6 characters" },
              pattern: {
                value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/,
                message: "Must contain uppercase, lowercase & number",
              },
            })}
            type="password"
            placeholder="Password"
            className="w-full h-12 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password.message}</p>
          )}

          <button
            type="submit"
            className="w-full h-12 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-md transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Create Account
          </button>
        </form>

        <div className="text-center mt-6">
          <span className="text-gray-500">Already have an account?</span>{" "}
          <Link
            to="/login"
            className="text-blue-500 font-medium hover:underline"
          >
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
}

// import React, { useState, useRef, useEffect } from "react";
// import { useForm } from "react-hook-form";
// import { Link, useNavigate } from "react-router-dom";
// import Swal from "sweetalert2";
// import api from "../../api/register";

// export default function RegisterForm() {
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm();
//   const navigate = useNavigate();
//   const [role, setRole] = useState("");
//   const [countryCode, setCountryCode] = useState("+1");
//   const [showDropdown, setShowDropdown] = useState(false);
//   const dropdownRef = useRef(null);

//   const countryCodes = [
//     { code: "+1", country: "US", flag: "🇺🇸" },
//     { code: "+44", country: "UK", flag: "🇬🇧" },
//     { code: "+91", country: "India", flag: "🇮🇳" },
//     { code: "+61", country: "Australia", flag: "🇦🇺" },
//     { code: "+49", country: "Germany", flag: "🇩🇪" },
//     { code: "+33", country: "France", flag: "🇫🇷" },
//     { code: "+81", country: "Japan", flag: "🇯🇵" },
//     { code: "+86", country: "China", flag: "🇨🇳" },
//     { code: "+971", country: "UAE", flag: "🇦🇪" },
//     { code: "+966", country: "Saudi Arabia", flag: "🇸🇦" },
//   ];

//   // Close dropdown when clicking outside
//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
//         setShowDropdown(false);
//       }
//     };

//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   const onSubmit = async (data) => {
//     try {
//       const fullPhoneNumber = `${countryCode}${data.phone}`;
//       const formData = {
//         ...data,
//         phone: fullPhoneNumber,
//       };

//       const res = await api.post("/register", formData);

//       Swal.fire({
//         title: "Success!",
//         text: "Registration successful! Please verify your email.",
//         icon: "success",
//         confirmButtonText: "OK",
//       });

//       navigate(`/verify-otp?email=${encodeURIComponent(data.email)}`);
//     } catch (error) {
//       const errorMessage =
//         error.response?.data?.message ||
//         error.message ||
//         "Registration failed. Please try again.";

//       Swal.fire({
//         title: "Error!",
//         text: errorMessage,
//         icon: "error",
//         confirmButtonText: "OK",
//         confirmButtonColor: "#d33",
//       });
//     }
//   };

//   const selectedCountry = countryCodes.find(
//     (country) => country.code === countryCode
//   );

//   const handleCountrySelect = (code) => {
//     setCountryCode(code);
//     setShowDropdown(false);
//   };

//   return (
//     <div className="p-8 md:p-12 md:w-1/2 flex items-center justify-center">
//       <div className="w-full max-w-md bg-white rounded-3xl shadow-lg p-8">
//         <div className="mb-8 text-center">
//           <p className="mb-1 text-2xl text-blue-500 font-bold">Register</p>
//           <p className="text-gray-600 text-xl">
//             {role === "employer"
//               ? "Create your employer account"
//               : "Create your job seeker account"}
//           </p>
//         </div>

//         <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
//           <div>
//             <label className="block text-sm font-medium text-gray-700">
//               I am a *
//             </label>
//             <select
//               {...register("role", { required: "Please select a role" })}
//               value={role}
//               onChange={(e) => setRole(e.target.value)}
//               className="w-full h-12 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//             >
//               <option value="" disabled>
//                 Select Role
//               </option>
//               <option value="job-seeker">Job Seeker</option>
//               <option value="employer">Employer</option>
//             </select>
//             {errors.role && (
//               <p className="text-red-500 text-sm mt-1">{errors.role.message}</p>
//             )}
//           </div>

//           <input
//             {...register("name", {
//               required: "Name is required",
//               minLength: {
//                 value: 2,
//                 message: "Name must be at least 2 characters",
//               },
//             })}
//             type="text"
//             placeholder="Full Name"
//             className="w-full h-12 px-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
//           />
//           {errors.name && (
//             <p className="text-red-500 text-sm">{errors.name.message}</p>
//           )}

//           <input
//             {...register("email", {
//               required: "Email is required",
//               pattern: {
//                 value: /^\S+@\S+\.\S+$/,
//                 message: "Enter a valid email address",
//               },
//             })}
//             type="email"
//             placeholder="Email"
//             className="w-full h-12 px-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
//           />
//           {errors.email && (
//             <p className="text-red-500 text-sm">{errors.email.message}</p>
//           )}

//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">
//               Phone Number *
//             </label>
//             <div className="flex space-x-2">
//               {/* Custom Country Code Dropdown */}
//               <div className="w-1/3 relative" ref={dropdownRef}>
//                 <button
//                   type="button"
//                   onClick={() => setShowDropdown(!showDropdown)}
//                   className="w-full h-12 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 flex items-center justify-between bg-white"
//                 >
//                   <div className="flex items-center space-x-2">
//                     <span className="text-lg">{selectedCountry?.flag}</span>
//                     <span className="text-sm">{selectedCountry?.code}</span>
//                   </div>
//                   <svg
//                     className={`w-4 h-4 text-gray-400 transition-transform ${
//                       showDropdown ? "rotate-180" : ""
//                     }`}
//                     fill="none"
//                     stroke="currentColor"
//                     viewBox="0 0 24 24"
//                   >
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       strokeWidth="2"
//                       d="M19 9l-7 7-7-7"
//                     />
//                   </svg>
//                 </button>

//                 {showDropdown && (
//                   <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-y-auto">
//                     {countryCodes.map((country) => (
//                       <button
//                         key={country.code}
//                         type="button"
//                         onClick={() => handleCountrySelect(country.code)}
//                         className={`w-full px-3 py-2 text-left hover:bg-gray-50 flex items-center space-x-2 ${
//                           countryCode === country.code ? "bg-blue-50" : ""
//                         }`}
//                       >
//                         <span className="text-lg">{country.flag}</span>
//                         <span className="text-sm">{country.code}</span>
//                         <span className="text-xs text-gray-500 ml-auto">
//                           {country.country}
//                         </span>
//                       </button>
//                     ))}
//                   </div>
//                 )}
//               </div>

//               <div className="w-2/3">
//                 <input
//                   {...register("phone", {
//                     required: "Phone number is required",
//                     pattern: {
//                       value: /^[0-9]{7,15}$/,
//                       message: "Enter a valid phone number (7-15 digits)",
//                     },
//                   })}
//                   type="tel"
//                   placeholder="1234567890"
//                   className="w-full h-12 px-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
//                 />
//               </div>
//             </div>
//             {errors.phone && (
//               <p className="text-red-500 text-sm mt-1">
//                 {errors.phone.message}
//               </p>
//             )}
//             <p className="text-xs text-gray-500 mt-1">
//               Format: {countryCode} XXX XXX XXXX
//             </p>
//           </div>

//           <input
//             {...register("password", {
//               required: "Password is required",
//               minLength: { value: 6, message: "Minimum 6 characters" },
//               pattern: {
//                 value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/,
//                 message: "Must contain uppercase, lowercase & number",
//               },
//             })}
//             type="password"
//             placeholder="Password"
//             className="w-full h-12 px-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
//           />
//           {errors.password && (
//             <p className="text-red-500 text-sm">{errors.password.message}</p>
//           )}

//           <button
//             type="submit"
//             className="w-full h-12 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-md transition duration-200"
//           >
//             Create Account
//           </button>
//         </form>

//         <div className="text-center mt-6">
//           <span className="text-gray-500">Already have an account?</span>{" "}
//           <Link
//             to="/login"
//             className="text-blue-500 font-medium hover:underline"
//           >
//             Sign In
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// }

// import React, { useState } from "react";
// import { useForm } from "react-hook-form";
// import { Link, useNavigate } from "react-router-dom";
// import Swal from "sweetalert2";
// import api from "../../api/register";

// export default function RegisterForm() {
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm();
//   const navigate = useNavigate();
//   const [role, setRole] = useState("");

//   const onSubmit = async (data) => {
//     try {
//       const res = await api.post("/register", data);

//       Swal.fire({
//         title: "Success!",
//         text: "Registration successful! Please verify your email.",
//         icon: "success",
//         confirmButtonText: "OK",
//       });

//       navigate(`/verify-otp?email=${encodeURIComponent(data.email)}`);
//     } catch (error) {
//       const errorMessage =
//         error.response?.data?.message ||
//         error.message ||
//         "Registration failed. Please try again.";

//       Swal.fire({
//         title: "Error!",
//         text: errorMessage,
//         icon: "error",
//         confirmButtonText: "OK",
//         confirmButtonColor: "#d33",
//       });
//     }
//   };

//   return (
//     <div className="p-8 md:p-12 md:w-1/2 flex items-center justify-center">
//       <div className="w-full max-w-md bg-white rounded-3xl shadow-lg p-8">
//         <div className="mb-8 text-center">
//           <p className="mb-1 text-2xl text-blue-500 font-bold">Register</p>
//           <p className="text-gray-600 text-xl">
//             {role === "employer"
//               ? "Create your employer account"
//               : "Create your job seeker account"}
//           </p>
//         </div>

//         <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
//           <div>
//             <label className="block text-sm font-medium text-gray-700">
//               I am a *
//             </label>
//             <select
//               {...register("role", { required: "Please select a role" })}
//               value={role}
//               onChange={(e) => setRole(e.target.value)}
//               className="w-full h-12 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//             >
//               <option value="" disabled>
//                 Select Role
//               </option>
//               <option value="job-seeker">Job Seeker</option>
//               <option value="employer">Employer</option>
//             </select>
//             {errors.role && (
//               <p className="text-red-500 text-sm mt-1">{errors.role.message}</p>
//             )}
//           </div>

//           <input
//             {...register("name", {
//               required: "Name is required",
//               minLength: {
//                 value: 2,
//                 message: "Name must be at least 2 characters",
//               },
//             })}
//             type="text"
//             placeholder="Full Name"
//             className="w-full h-12 px-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
//           />
//           {errors.name && (
//             <p className="text-red-500 text-sm">{errors.name.message}</p>
//           )}

//           <input
//             {...register("email", {
//               required: "Email is required",
//               pattern: {
//                 value: /^\S+@\S+\.\S+$/,
//                 message: "Enter a valid email address",
//               },
//             })}
//             type="email"
//             placeholder="Email"
//             className="w-full h-12 px-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
//           />
//           {errors.email && (
//             <p className="text-red-500 text-sm">{errors.email.message}</p>
//           )}

//           <input
//             {...register("phone", {
//               required: "Phone number is required",
//             })}
//             type="tel"
//             placeholder="Phone"
//             className="w-full h-12 px-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
//           />
//           {errors.phone && (
//             <p className="text-red-500 text-sm">{errors.phone.message}</p>
//           )}

//           <input
//             {...register("password", {
//               required: "Password is required",
//               minLength: { value: 6, message: "Minimum 6 characters" },
//               pattern: {
//                 value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/,
//                 message: "Must contain uppercase, lowercase & number",
//               },
//             })}
//             type="password"
//             placeholder="Password"
//             className="w-full h-12 px-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
//           />
//           {errors.password && (
//             <p className="text-red-500 text-sm">{errors.password.message}</p>
//           )}

//           <button
//             type="submit"
//             className="w-full h-12 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-md transition duration-200"
//           >
//             Create Account
//           </button>
//         </form>

//         <div className="text-center mt-6">
//           <span className="text-gray-500">Already have an account?</span>{" "}
//           <Link
//             to="/login"
//             className="text-blue-500 font-medium hover:underline"
//           >
//             Sign In
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// }
