import { useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";

import { useAuth } from "../../AuthContext";

export const RequireAuth = ({ children }: { children: JSX.Element }) => {
  const { authState } = useAuth();
  const { setAuth } = useAuth();
  const location = useLocation();
  useEffect(() => {
    const initializeAuth = () => {
      // Check if a token exists in localStorage
      const storedToken = localStorage.getItem("authToken");
      const storedUsername = localStorage.getItem("username");
      console.log("iniziled token", storedToken);

      if (storedToken && storedUsername) {
        setAuth(storedToken, storedUsername);
      }
      console.log("Authentication state:", authState);
      if (!authState.token) {
        return <Navigate to="/login" state={{ from: location }} />;
      }
    };
    initializeAuth();
  }, [authState.token]);

  return <>{children}</>;
};
