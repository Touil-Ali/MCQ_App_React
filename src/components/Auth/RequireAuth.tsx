import { useEffect } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";

import { useAuth } from "../../AuthContext";

export const RequireAuth = ({ children }: { children: JSX.Element }) => {
  const { authState } = useAuth();
  const navigate = useNavigate();
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
      } else {
        navigate("/login");
      }
      if (!authState.token) {
        return <Navigate to="/login" state={{ from: location }} />;
      }

      console.log("Authentication state:", authState);
    };
    initializeAuth();
  }, [authState.token]);
  return <>{children}</>;
};
