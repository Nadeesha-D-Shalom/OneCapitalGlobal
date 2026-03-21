import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const isAuth = localStorage.getItem("admin_auth");

  return isAuth ? children : <Navigate to="/admin" />;
};

export default ProtectedRoute;