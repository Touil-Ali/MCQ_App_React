import React from "react";

import { Navigate, useLocation } from "react-router-dom";

import { useAuth } from "../../AuthContext";

export const RequireAuth = ({ children }: { children: JSX.Element }) => {
  const { authState } = useAuth();
  const location = useLocation();

  console.log("Authentication state:", authState);
  if (!authState.token) {
    return <Navigate to="/login" state={{ from: location }} />;
  }
  return <>{children}</>;
};
