import React from "react";
import { TextField, Button } from "@mui/material";

const login: React.FC = () => {
  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <div className="grid place-items-center mx-2 my-20 sm:my-auto">
        <div
          className="w-11/12 p-12 sm:w-8/12 md:w-6/12 lg:w-5/12 2xl:w-4/12 
            px-6 py-10 sm:px-10 sm:py-6 
            bg-white rounded-lg shadow-md lg:shadow-lg"
        >
          <h2 className="text-center font-semibold text-3xl lg:text-4xl text-gray-800">
            Login
          </h2>

          <form className="mt-10" method="POST">
            <div>
              <TextField
                label="Email"
                id="email"
                type="email"
                name="email"
                className="block w-full py-3 px-1 mt-2 
                    text-gray-800 appearance-none 
                    border-b-2 border-gray-100
                    focus:text-gray-500 focus:outline-none focus:border-gray-200"
                required
              />
            </div>
            <div className="mt-10">
              <TextField
                label="Password"
                id="password"
                type="password"
                name="password"
                className="block mt-10 w-full py-3 px-1  mb-4
                    text-gray-800 appearance-none 
                    border-b-2 border-gray-100
                    focus:text-gray-500 focus:outline-none focus:border-gray-200"
                required
              />
            </div>
            <div className="mt-10">
              <Button
                variant="contained"
                type="submit"
                className="w-full py-3 mt-10 bg-gray-800 rounded-sm
                    font-medium text-white uppercase
                    focus:outline-none hover:bg-gray-700 hover:shadow-none"
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

export default login;
