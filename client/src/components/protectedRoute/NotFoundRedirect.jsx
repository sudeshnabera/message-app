import { useEffect } from "react";          
import { Navigate } from "react-router-dom";
import toast from "react-hot-toast";

const NotFoundRedirect = () => {
  const isAuthenticated = !!localStorage.getItem("token");

  useEffect(() => {
    toast.error(
      isAuthenticated ? "Page not found! 🚫" : "Please login first! 🔒",
    );
  }, []);

  // ✅ smart redirect based on auth
  return isAuthenticated ? (
    <Navigate to="/home" replace />
  ) : (
    <Navigate to="/login" replace />
  );
};

export default NotFoundRedirect;
