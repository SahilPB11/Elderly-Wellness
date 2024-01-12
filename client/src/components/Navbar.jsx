// src/components/Navbar.js

import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../context/UserContext";

const Navbar = () => {
  const { user, logoutUser } = useContext(UserContext);

  return (
    <nav className="bg-gray-800 shadow-lg">
      <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Brand Logo or Name */}
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <span className="text-white text-xl">My App</span>
            </div>
          </div>

          {/* Navbar Links */}
          <div className="flex">
            <div className="hidden sm:block sm:ml-6">
              <div className="flex space-x-4">
                <Link
                  to="/home"
                  className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                >
                  Home
                </Link>
                <Link
                  to="/dashboard/medication"
                  className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                >
                  Medication
                </Link>
              </div>
            </div>

            {/* Logout Button */}
            <div className="ml-4 flex items-center sm:ml-6">
              <button
                onClick={logoutUser}
                className="bg-red-600 hover:bg-red-700 px-3 py-2 rounded-md text-white font-medium"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
