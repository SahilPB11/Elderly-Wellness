import React, { useContext, useEffect } from "react";
import { UserContext } from "../../../context/UserContext.jsx";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const Login = () => {
  const navigate = useNavigate();
  const { setUser, loginUser } = useContext(UserContext);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      email: e.target.email.value,
      password: e.target.password.value,
    };

    try {
      // Send login request using Axios
      const response = await axios.post("/login", formData);
      if (response?.data?.success) {
        // Set user data to context
        loginUser(response?.data?.token);
        setUser(response?.data);
        response.data.type === "doctor"
          ? navigate("/dashboard/home")
          : navigate("/UserdashBoard/home");

        // Redirect to dashboard or any other route
        // history.push('/dashboard');
      } else {
        // Handle error scenario
        console.error("Login failed:", response.data.message);
      }
    } catch (error) {
      // Handle error scenario
      console.error("Error during login:", error);
    }
  };

  // Function to handle redirection to the sign-up page
  const redirectToSignUp = () => {
    navigate("/signup"); // Replace "/signup" with the actual route for your sign-up page
  };

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
        <form
          className="bg-gray-800 p-6 rounded-lg shadow-md"
          onSubmit={handleSubmit}
        >
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
        <div className="mt-4 text-center">
          <button
            type="button"
            onClick={redirectToSignUp} // Attach onClick event to redirect to sign-up page
            className="text-blue-500"
          >
            Don't have an account?{" "}
            <span className="text-white hover:underline">Sign Up</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
