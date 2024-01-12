// src/components/Login.js
import React from "react";

const Login = () => {
  return (
    <div className="min-h-screen flex bg-gray-900 text-white">
      {/* Background Image for Large Screens */}
      <div className="hidden lg:block w-1/2 bg-cover bg-center">
        {/* Set background image using inline style */}
        <div
          style={{ backgroundImage: "url('../../../well5.jpeg')" }}
          className="h-full"
        ></div>
      </div>

      {/* Login Form */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center p-8">
        <h2 className="text-2xl mb-4 text-center">Login</h2>
        <form className="bg-gray-800 p-6 rounded-lg shadow-md">
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="w-full p-2 rounded-md bg-gray-700 focus:outline-none focus:ring focus:border-blue-300"
              placeholder="Enter your email"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-sm font-medium mb-2"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              className="w-full p-2 rounded-md bg-gray-700 focus:outline-none focus:ring focus:border-blue-300"
              placeholder="Enter your password"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
          >
            Login
          </button>
        </form>
      </div>
    </div>
    // </div>
  );
};

export default Login;