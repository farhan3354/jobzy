import React from "react";
import {
  MdSend,
  MdWork,
  MdBookmark,
  MdOutlineWorkOutline,
} from "react-icons/md";
import { IoHome } from "react-icons/io5";
import { useState } from "react";
import { CgMenu } from "react-icons/cg";
import { RxCross2 } from "react-icons/rx";
import { Link } from "react-router-dom";
import { IoIosContact } from "react-icons/io";
import { menuItems } from "../../../data/data";

export default function UserSidebar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const iconsComponent = {
    IoHome: IoHome,
    MdSend: MdSend,
    MdWork: MdWork,
    MdBookmark: MdBookmark,
    MdOutlineWorkOutline: MdOutlineWorkOutline,
    IoIosContact: IoIosContact,
  };

  return (
    <>
      {/* Mobile Menu Button */}
      <div className="lg:hidden">
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? (
            <RxCross2 className="h-6 w-6" />
          ) : (
            <div className="flex flex-col max-h-full">
              {menuItems.map((item, index) => {
                const IconsComponent = iconsComponent[item.icon];
                return (
                  <div key={index}>
                    <Link
                      to={item.to}
                      className="flex items-center gap-3 p-3 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition-all duration-200"
                    >
                      {IconsComponent ? <IconsComponent size={23} /> : null}
                    </Link>
                  </div>
                );
              })}
            </div>
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

              {menuItems.map((item, index) => {
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

// import React from "react";
// import {
//   MdSend,
//   MdWork,
//   MdBookmark,
//   MdOutlineWorkOutline,
// } from "react-icons/md";
// import { IoHome } from "react-icons/io5";
// import { useState } from "react";
// import { CgMenu } from "react-icons/cg";
// import { RxCross2 } from "react-icons/rx";
// import { Link } from "react-router-dom";
// import { IoIosContact } from "react-icons/io";
// import { menuItems } from "../../../data/data";

// export default function UserSidebar() {
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
//   const iconsComponent = {
//     IoHome: IoHome,
//     MdSend: MdSend,
//     MdWork: MdWork,
//     MdBookmark: MdBookmark,
//     MdOutlineWorkOutline: MdOutlineWorkOutline,
//     IoIosContact: IoIosContact,
//   };

//   return (
//     <>
//       {/* Mobile Bottom Navigation Bar (Icons only) */}
//       <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-50">
//         <div className="flex justify-around items-center py-3">
//           {menuItems.map((item, index) => {
//             const IconsComponent = iconsComponent[item.icon];
//             return (
//               <Link
//                 key={index}
//                 to={item.to}
//                 className="flex flex-col items-center p-2 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition-all duration-200"
//                 onClick={() => setIsMobileMenuOpen(false)}
//               >
//                 {IconsComponent ? <IconsComponent className="text-2xl" /> : null}
//               </Link>
//             );
//           })}

//           {/* Mobile Menu Toggle Button */}
//           <button
//             onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
//             aria-label="Toggle menu"
//             className="flex flex-col items-center p-2 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition-all duration-200"
//           >
//             {isMobileMenuOpen ? (
//               <RxCross2 className="text-2xl" />
//             ) : (
//               <CgMenu className="text-2xl" />
//             )}
//           </button>
//         </div>
//       </div>

//       {/* Mobile Menu Overlay */}
//       {isMobileMenuOpen && (
//         <div
//           className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
//           onClick={() => setIsMobileMenuOpen(false)}
//         ></div>
//       )}

//       {/* Sidebar - Mobile & Desktop */}
//       <div
//         className={`fixed top-0 left-0 h-full bg-white border-r border-gray-200 shadow-lg text-gray-800 transition-all duration-300 ease-in-out z-50
//           ${isMobileMenuOpen ? "translate-x-0 w-64" : "-translate-x-full"}
//           lg:translate-x-0 lg:w-64 lg:relative lg:shadow-none`}
//       >
//         <div className="p-6 h-full overflow-y-auto">
//           <nav className="flex flex-col space-y-4">
//             <div>
//               <h2 className="text-2xl font-semibold text-gray-900 mb-8 tracking-tight">
//                 Dashboard
//               </h2>

//               {menuItems.map((item, index) => {
//                 const IconsComponent = iconsComponent[item.icon];
//                 return (
//                   <div key={index}>
//                     <Link
//                       to={item.to}
//                       className="flex items-center gap-4 p-3 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition-all duration-200"
//                       onClick={() => setIsMobileMenuOpen(false)}
//                     >
//                       {IconsComponent ? <IconsComponent className="text-xl" /> : null}
//                       <span className="text-sm font-medium">{item.title}</span>
//                     </Link>
//                   </div>
//                 );
//               })}
//             </div>
//           </nav>
//         </div>
//       </div>
//     </>
//   );
// }
