import axios from "axios";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";

export default function GetData() {
  const [form, setForm] = useState([]);

  const fetchData = async () => {
    try {
      const res = await axios.get("http://localhost:8000/api/get");

      if (res.data?.dataform?.length > 0) {
        setForm(res.data.dataform);
      } else {
        Swal.fire({
          title: "No Data",
          text: "No form data found.",
          icon: "info",
        });
      }
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: error.response?.data?.message || "Something went wrong",
        icon: "error",
      });
    }
  };
  
  //   async function handleedit(id) {
  //      try {
  //       const dele = await axios.delete(`http://localhost:8000/api/del/${id}`);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   }

  async function handledelete(id) {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    });

    if (result.isConfirmed) {
      try {
        await axios.delete(`http://localhost:8000/api/del/${id}`);
        setForm((prevForm) => prevForm.filter((item) => item._id !== id));

        Swal.fire({
          title: "Deleted!",
          text: "The record has been deleted.",
          icon: "success",
        });
      } catch (error) {
        Swal.fire({
          title: "Error",
          text: error.response?.data?.message || "Failed to delete item.",
          icon: "error",
        });
        console.error(error);
      }
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-center mb-6 text-blue-700">
        Submitted Form Data
      </h1>

      {form.length === 0 ? (
        <p className="text-center text-gray-500">No data available.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {form.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow p-5 hover:shadow-lg transition"
            >
              <h2 className="text-xl font-semibold text-blue-600 mb-2">
                {item.name}
              </h2>
              <p className="text-gray-600">
                <strong>Email:</strong> {item.email}
              </p>
              <p className="text-gray-600">
                <strong>Phone:</strong> {item.phone}
              </p>
              <p className="text-gray-600">
                <strong>Message:</strong> {item.message}
              </p>
              {/* <button onClick={() => handleedit(form.id)}> Edit</button> */}
              <button
                onClick={() => handledelete(item._id)}
                className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
              >
                Delete
              </button>{" "}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
