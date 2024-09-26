import React from "react";
import { Navigate, Outlet } from "react-router-dom";

function ProtectedRoute({loggedID}) {
  // const loggedID = localStorage.getItem("loggedID");
  return loggedID ? <Outlet/>:<Navigate to="login"/>;
}

export default ProtectedRoute;
