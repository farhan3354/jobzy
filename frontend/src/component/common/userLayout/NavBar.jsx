import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import img from "./../../../assets/music.svg";
import { logout } from "./../../../redux/slices/authslices/userslice";

export default function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const handleLogout = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You will be logged out of your account.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, Logout",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(logout());
        navigate("/login");
      }
    });
  };

  let profilePath = "/";
  if (user?.role === "employer") {
    profilePath = "/employer-dashboard/profile";
  } else if (user?.role === "job-seeker") {
    profilePath = "/user-dashboard/profile";
  } else if (user?.role === "admin") {
    profilePath = "/admin-dashboard/profile";
  }

  return (
    <nav className="bg-white border-b border-gray-200 dark:bg-gray-900 dark:border-gray-700">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center">
            <img src={img} className="h-8 w-8" alt="Logo" />
            <span className="ml-2 text-xl font-semibold dark:text-white">
              Jobzy
            </span>
          </Link>

          <div className="flex items-center space-x-4">
            <>
              <Link to={profilePath}>
                <img
                  src={
                    user?.profilePic ||
                    "https://randomuser.me/api/portraits/men/1.jpg"
                  }
                  alt="Profile"
                  className="w-10 h-10 object-cover rounded-full border"
                />
              </Link>
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm font-medium cursor-pointer"
              >
                Logout
              </button>
            </>
          </div>
        </div>
      </div>
    </nav>
  );
}
