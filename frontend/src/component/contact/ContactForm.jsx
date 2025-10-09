import React from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";

export default function ContactForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      console.log("Submitting data:", data);

      const response = await axios.post("http://localhost:8000/contact", data);

      console.log("Server response:", response);

      Swal.fire({
        icon: "success",
        title: "Message Sent!",
        text: "Your contact form has been submitted successfully.",
      });
    } catch (error) {
      if (error.response) {
        console.error("Server error response:", error.response.data);
      } else if (error.request) {
        console.error("No response received from server:", error.request);
      } else {
        console.error("Error in request setup:", error.message);
      }

      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong while submitting the form!",
      });
    }
  };

  return (
    <>
      <div>
        <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
          Let's Connect!
        </h2>
        <p className="text-gray-600 mb-10">
          Have a question, suggestion, or job inquiry? We'd love to hear from
          you. Fill out the form and our team will get back to you shortly.
        </p>

        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label
              htmlFor="name"
              className="block text-gray-700 font-medium mb-1"
            >
              Full Name
            </label>
            <input
              type="text"
              id="name"
              {...register("name", {
                required: "The Name is required",
              })}
              placeholder="Enter your name"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none"
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-gray-700 font-medium mb-1"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              {...register("email", {
                required: "Email Address is required",
              })}
              aria-invalid={errors.email ? "true" : "false"}
              placeholder="Enter your email"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="messages"
              className="block text-gray-700 font-medium mb-1"
            >
              Message
            </label>
            <textarea
              id="messages"
              {...register("message", { required: "The message is required" })}
              placeholder="Write your message here..."
              rows="4"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none resize-none"
            ></textarea>
            {errors.messages && (
              <p className="text-red-500 text-sm mt-1">
                {errors.messages.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-300 shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Send Message
          </button>
        </form>
      </div>
    </>
  );
}
