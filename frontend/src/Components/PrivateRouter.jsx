import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import AuthService from "../Services/AuthService";
import Navbar from "./Navbar";

const PrivateRoute = () => {
  const isAuthenticated = AuthService.getCurrentUser();

  if (!isAuthenticated) {
    return <Navigate to="/" />;
  }

  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
};

export default PrivateRoute;
