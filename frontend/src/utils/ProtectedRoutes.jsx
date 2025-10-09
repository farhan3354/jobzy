import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const ProtectRoute = ({ role: requiredRole }) => {
  const token = useSelector((state) => state.auth.token);
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    if (!token) {
      setStatus("denied");
      return;
    }

    const verifyUser = async () => {
      try {
        const res = await axios.get("http://localhost:8000/verify", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (requiredRole && res.data.user.role !== requiredRole) {
          setStatus("denied");
        } else {
          setStatus("allowed");
        }
      } catch {
        setStatus("denied");
      }
    };

    verifyUser();
  }, [token, requiredRole]);

  if (status === "loading") {
    return <div className="text-center">Checking access...</div>;
  }

  if (status === "denied") {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default ProtectRoute;

// my code

// import { Navigate, Outlet } from "react-router-dom";
// import { useSelector } from "react-redux";

// const ProtectRoute = ({ role: requiredRole }) => {
//   const user = useSelector((state) => state.auth.user);
//   const role = user?.role;

//   if (!user) {
//     return <Navigate to="/login" replace />;
//   }

//   if (role !== requiredRole) {
//     if (role === "job-seeker") return <Navigate to="/user-dashboard" replace />;
//     if (role === "employer")
//       return <Navigate to="/employer-dashboard" replace />;
//     if (role === "admin") return <Navigate to="/admin-dashboard" replace />;
//   }

//   return <Outlet />;
// };

// export default ProtectRoute;

// juniad

// import { useSelector } from "react-redux";
// import { Navigate } from "react-router-dom";
// import { jwtDecode } from "jwt-decode";
// import { useState, useEffect } from "react";

// const ProtectedRoutes = ({ children, role }) => {
//   const tokenFromStore = useSelector((state) => state.auth.token);
//   const [status, setStatus] = useState("loading");

//   useEffect(() => {
//     if (!tokenFromStore) {
//       setStatus("denied");
//       return;
//     }

//     const token = tokenFromStore.startsWith("Bearer ")
//       ? tokenFromStore.slice(7)
//       : tokenFromStore;

//     try {
//       const payload = jwtDecode(token);

//       if (payload.exp && payload.exp * 1000 < Date.now()) {
//         setStatus("denied");
//       } else if (role && payload.role !== role) {
//         setStatus("denied");
//       } else {
//         setStatus("allowed");
//       }
//     } catch {
//       setStatus("denied");
//     }
//   }, [tokenFromStore, role]);

//   if (status === "loading") {
//     return (
//       <div className="flex items-center justify-center min-h-screen">
//         <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500"></div>
//       </div>
//     );
//   }

//   if (status === "denied") {
//     return <Navigate to="/login" replace />;
//   }

//   return children;
// };

// export default ProtectedRoutes;
