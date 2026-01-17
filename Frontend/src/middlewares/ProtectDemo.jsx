import React from "react";
import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { Navigate } from "react-router-dom";

const ProtectDemo = ({ children }) => {
  const { isAuthenticated } = useContext(AppContext);
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  else return children;
};

export default ProtectDemo;
