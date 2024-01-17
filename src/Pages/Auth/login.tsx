import React, { useState } from "react";
import { TextField, Button } from "@mui/material";
import Alert, { AlertColor } from "@mui/material/Alert";
import "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../AuthContext";
const Login: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [alert, setAlert] = useState<{
    type: AlertColor | null;
    message: string | null;
  }>({ type: null, message: null });
  const navigate = useNavigate();

  const { setAuth } = useAuth();
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Perform login API request
      const response = await fetch("http://localhost:8080/teachers/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        const token = await response.text();
        setAuth(token, username);
        setAlert({ type: "success", message: "Login successful" });

        navigate("/teacher");
        // You can store the token in local storage or a state management tool
        // for future requests or redirect the user to the dashboard.
      } else {
        setAlert({
          type: "error",
          message: "Login failed. Please check your credentials.",
        });
      }
    } catch (error) {
      console.error("Error during login:", error);
      setAlert({ type: "error", message: "An error occurred during login." });
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <div className="grid place-items-center mx-2 my-20 sm:my-auto">
        <div className="w-11/12 p-12 sm:w-8/12 md:w-6/12 lg:w-5/12 2xl:w-4/12 px-6 py-10 sm:px-10 sm:py-6 bg-white rounded-lg shadow-md lg:shadow-lg">
          <h2 className="text-center font-semibold text-3xl lg:text-4xl text-gray-800">
            Login
          </h2>

          {alert.type && <Alert severity={alert.type}>{alert.message}</Alert>}

          <form className="mt-10" onSubmit={handleLogin}>
            <div>
              <TextField
                label="Username"
                id="username"
                type="text"
                name="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="block w-full py-3 px-1 mt-2 text-gray-800 appearance-none border-b-2 border-gray-100 focus:text-gray-500 focus:outline-none focus:border-gray-200"
                required
              />
            </div>
            <div className="mt-10">
              <TextField
                label="Password"
                id="password"
                type="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="block mt-10 w-full py-3 px-1  mb-4 text-gray-800 appearance-none border-b-2 border-gray-100 focus:text-gray-500 focus:outline-none focus:border-gray-200"
                required
              />
            </div>
            <div className="mt-10">
              <Button
                variant="contained"
                type="submit"
                className="w-full py-3 mt-10 bg-gray-800 rounded-sm font-medium text-white uppercase focus:outline-none hover:bg-gray-700 hover:shadow-none"
              >
                Login
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
