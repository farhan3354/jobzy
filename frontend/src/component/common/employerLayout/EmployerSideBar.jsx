import React, { useState } from "react";
import { RxDashboard } from "react-icons/rx";
import { MdWorkOutline } from "react-icons/md";
import { BsCardChecklist } from "react-icons/bs";
import { FaUsers } from "react-icons/fa";
import { MdWork } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { Link } from "react-router-dom";
import { employersidebarmenu } from "../../../data/data";
import { CgMenu } from "react-icons/cg";
import { RxCross2 } from "react-icons/rx";

export default function EmployerSideBar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const iconsComponent = {
    RxDashboard: RxDashboard,
    MdWorkOutline: MdWorkOutline,
    BsCardChecklist: BsCardChecklist,
    FaUsers: FaUsers,
    // HiOutlineMail: HiOutlineMail,
    CgProfile: CgProfile,
    MdWork: MdWork,
  };

  return (
    <>
      {/* Mobile Menu Button */}
      <div className="lg:hidden">
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="inline-flex items-center justify-center p-2 rounded-md bg-white shadow-md text-gray-700 hover:text-purple-600 focus:outline-none"
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? (
            <RxCross2 className="h-6 w-6" />
          ) : (
            <CgMenu className="h-6 w-6" />
          )}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setIsMobileMenuOpen(false)}
        ></div>
      )}

      {/* Sidebar - Mobile & Desktop */}
      <div
        className={`fixed top-0 left-0 h-full bg-white border-r border-gray-200 shadow-lg text-gray-800 transition-all duration-300 ease-in-out z-50
          ${isMobileMenuOpen ? "translate-x-0 w-64" : "-translate-x-full"} 
          lg:translate-x-0 lg:w-64 lg:relative lg:shadow-none`}
      >
        <div className="p-6 h-full overflow-y-auto">
          <nav className="flex flex-col space-y-4">
            <div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-8 tracking-tight">
                Dashboard
              </h2>

              {employersidebarmenu.map((item, index) => {
                const IconsComponent = iconsComponent[item.icon];
                return (
                  <div key={index}>
                    <Link
                      to={item.to}
                      className="flex items-center gap-3 p-3 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition-all duration-200"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {IconsComponent ? <IconsComponent /> : null}
                      {/* <IoHome className="text-gray-800 text-2xl" /> */}
                      <span className="text-sm font-medium">{item.title}</span>
                    </Link>
                  </div>
                );
              })}
            </div>
          </nav>
        </div>
      </div>
    </>
  );
}
