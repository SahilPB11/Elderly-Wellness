// src/components/Signup.js
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
const Signup = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    age: "",
    gender: "",
    location: "",
  });



  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("/signup", formData);
      console.log(response.data); // Log the response data

      // Check if the status code is 201 and redirect to login page
      if (response.status === 201 || response.status === 401) {
        // Redirect to login page using React Router or window.location
        navigate("/login"); // Redirecting to login page
      }
    } catch (error) {
      // Handle error for status code 400
      if (error.response && error.response.status === 400) {
        console.error("Signup failed. Please check your data.");
        // You can also handle other errors or display a message to the user.
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-gray-900 text-white">
      {/* Background Image for Large Screens */}
      <div className="hidden lg:block w-1/2 bg-cover bg-center">
        <div
          style={{ backgroundImage: "url('../../../well4.jpeg')" }}
          className="h-full"
        ></div>
      </div>

      {/* Signup Form */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center p-8">
        <h2 className="text-2xl mb-4 text-center">Sign Up</h2>
        <form
          onSubmit={handleSubmit}
          className="bg-gray-800 p-6 rounded-lg shadow-md"
        >
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium mb-2">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full p-2 rounded-md bg-gray-700 focus:outline-none focus:ring focus:border-blue-300"
              placeholder="Enter your name"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full p-2 rounded-md bg-gray-700 focus:outline-none focus:ring focus:border-blue-300"
              placeholder="Enter your email"
            />
          </div>
          <div className="mb-4 relative">
            <label
              htmlFor="password"
              className="block text-sm font-medium mb-2"
            >
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full p-2 rounded-md bg-gray-700 focus:outline-none focus:ring focus:border-blue-300 pr-10"
              placeholder="Enter your password"
            />
            {/* Toggle Button */}
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-transparent border-none focus:outline-none"
              style={{ marginTop: "-0.5rem" }} // Adjust this value as needed
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>

          <div className="mb-4">
            <label htmlFor="age" className="block text-sm font-medium mb-2">
              Age
            </label>
            <input
              type="number"
              id="age"
              name="age"
              value={formData.age}
              onChange={handleChange}
              className="w-full p-2 rounded-md bg-gray-700 focus:outline-none focus:ring focus:border-blue-300"
              placeholder="Enter your age"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="gender" className="block text-sm font-medium mb-2">
              Gender
            </label>
            <select
              id="gender"
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="w-full p-2 rounded-md bg-gray-700 focus:outline-none focus:ring focus:border-blue-300"
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div className="mb-4">
            <label
              htmlFor="location"
              className="block text-sm font-medium mb-2"
            >
              Location
            </label>
            <input
              type="text"
              id="location"
              name="location"
              value={formData.location}
              onChange={handleChange}
              className="w-full p-2 rounded-md bg-gray-700 focus:outline-none focus:ring focus:border-blue-300"
              placeholder="Enter your location"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
