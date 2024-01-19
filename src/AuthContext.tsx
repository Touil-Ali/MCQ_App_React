import React, { createContext, useContext, useState, ReactNode } from "react";

interface AuthContextType {
  authState: { token: string | null; username: string | null };
  setAuth: (token: string, username: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [authState, setAuthState] = useState({
    token: null as string | null,
    username: null as string | null,
  });

  const setAuth = (token: string, username: string) => {
    setAuthState({
      token,
      username,
    });
  };

  const logout = () => {
    setAuthState({
      token: null,
      username: null,
    });
    localStorage.removeItem("authToken");
    localStorage.removeItem("username");
    console.log("clicked");
    window.location.href = "/login";
  };

  return (
    <AuthContext.Provider value={{ authState, setAuth, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error(" use Auth must be used within an AuthProvider");
  }
  return context;
};
