import React, { createContext, useState, useEffect } from "react";

// Create a user context
export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  // State to hold user data

  useEffect(() => {
    // Check if token exists in local storage when component mounts
    const token = localStorage.getItem("token");
    if (token) {
      // Set the user or perform any necessary action
      // Here, you can decode the token if needed and set the user
    }
  }, []);

  const loginUser = (token) => {
    // Save token to local storage
    localStorage.setItem("token", token);

    // Decode the token if needed and set the user
    // setUser(decodedUser);
  };

  const logoutUser = () => {
    // Remove the token from localStorage or wherever you're storing it
    localStorage.removeItem("token");
    // Clear the user context
    setUser(null);
    // Redirect to the login page or any other route you want after logout
    window.location.href = "/";
  };

  const [user, setUser] = useState(null);
  return (
    <UserContext.Provider value={{ user, setUser, loginUser, logoutUser }}>
      {children}
    </UserContext.Provider>
  );
};
