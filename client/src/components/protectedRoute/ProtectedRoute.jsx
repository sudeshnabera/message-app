import { Navigate, Outlet } from "react-router-dom";
import toast from "react-hot-toast";
import { useEffect } from "react";

const ProtectedRoute = () => {
  const isAuthenticated = !!localStorage.getItem("token"); // or from your auth state
  useEffect(() => {
    if (!isAuthenticated) {
      toast.error("Please login to access this page!");
    }
  }, [isAuthenticated]);
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
