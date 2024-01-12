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
    // Remove token from local storage
    localStorage.removeItem("token");

    // Clear user from state or perform any necessary action
    setUser(null);
  };

  const [user, setUser] = useState(null);
  return (
    <UserContext.Provider value={{ user, setUser, loginUser, logoutUser }}>
      {children}
    </UserContext.Provider>
  );
};
