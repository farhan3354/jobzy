import { Outlet } from "react-router-dom";
import EmployerHeader from "./EmployerHeader";
import EmployerSideBar from "./EmployerSideBar";
import { ToastContainer } from "react-toastify";

export default function UserLayout() {
  return (
    <>
      <div className="flex flex-col min-h-screen">
        <EmployerHeader />
        <div className="flex flex-1">
          <EmployerSideBar />
          <main className="flex-1 p-6 bg-gray-50">
            <Outlet />
          </main>
        </div>
        <ToastContainer
          position="top-right"
          autoClose={2000}
          newestOnTop={false}
          closeOnClick={true}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </div>
    </>
  );
}
