import React, { useState } from "react";
import { navItems } from "../../data/data";
import { Link, useNavigate } from "react-router-dom";
import { CgMenu } from "react-icons/cg";
import { RxCross2 } from "react-icons/rx";
import img from "./../../assets/music.svg";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { logout } from "../../redux/slices/authslices/userslice";

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const token = useSelector((state) => state.auth.token);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

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

  function getProfilePath() {
    if (user?.role === "employer") return "/employer-dashboard/profile";
    if (user?.role === "job-seeker") return "/user-dashboard/profile";
    if (user?.role === "admin") return "/admin-dashboard/profile";
    return "/";
  }

  return (
    <>
      <nav className="bg-white border-b border-gray-200 dark:bg-gray-900 dark:border-gray-700">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex-shrink-0 flex items-center">
              <Link to="/" className="flex items-center">
                <img src={img} className="h-8 w-8" alt="Logo" />
                <span className="ml-2 text-xl font-semibold dark:text-white">
                  Jobzy
                </span>
              </Link>
            </div>

            <div className="hidden lg:flex lg:items-center lg:space-x-8">
              <ul className="flex space-x-8">
                {navItems.map((item, index) => (
                  <li key={index}>
                    <Link
                      to={item.path}
                      className="text-gray-700 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 px-3 py-2 rounded-md text-sm font-medium"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="hidden lg:flex lg:items-center lg:space-x-4 ml-8">
              {token ? (
                <>
                  <Link
                    to={getProfilePath()}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm font-medium cursor-pointer"
                  >
                    Go to Dashboard
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm font-medium cursor-pointer"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to={"/chose-register"}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm font-medium"
                  >
                    Register
                  </Link>
                  <Link
                    to={"/login"}
                    className="px-4 py-2 border border-blue-600 text-blue-600 dark:text-white rounded-lg hover:bg-blue-50 dark:hover:bg-gray-800 text-sm font-medium"
                  >
                    Login
                  </Link>
                </>
              )}
            </div>

            <div className="lg:hidden flex items-center">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 focus:outline-none"
              >
                {isMobileMenuOpen ? (
                  <RxCross2 className="h-6 w-6" />
                ) : (
                  <CgMenu className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>
        </div>

        <div className={`lg:hidden ${isMobileMenuOpen ? "block" : "hidden"}`}>
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navItems.map((item, index) => (
              <Link
                key={index}
                to={item.path}
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                {item.name}
              </Link>
            ))}
          </div>
          <div className="px-2 pt-2 pb-4 space-y-2">
            {token ? (
              <>
                <Link
                  to={getProfilePath()}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm font-medium cursor-pointer"
                >
                  Logout
                </Link>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm font-medium cursor-pointer"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to={"/chose-register"}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm font-medium"
                >
                  Register
                </Link>
                <Link
                  to={"/login"}
                  className="px-4 py-2 border border-blue-600 text-blue-600 dark:text-white rounded-lg hover:bg-blue-50 dark:hover:bg-gray-800 text-sm font-medium"
                >
                  Login
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>
    </>
  );
}
