import React from "react";
import { Navigate } from "react-router-dom";
import { isAdmin } from "../services/fakeApi";

const AdminRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  const admin = isAdmin();

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  if (!admin) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default AdminRoute;

