import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../context/UserContext";

const Navbar = () => {
  const { user, logoutUser } = useContext(UserContext);
  const [isOpen, setIsOpen] = useState(false); // State for mobile menu

  // Toggle mobile menu
  const toggleMobileMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-gray-900 shadow-md">
      <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Brand Logo or Name */}
          <div className="flex items-center">
            <span className="text-white text-xl font-bold">My App</span>
          </div>

          {/* Navbar Links */}
          <div className="flex space-x-4">
            {/* Mobile Menu Button */}
            <div className="sm:hidden flex items-center">
              <button
                onClick={toggleMobileMenu}
                className="text-gray-300 hover:text-white"
              >
                {/* Hamburger menu icon */}☰
              </button>
            </div>

            <div
              className={`sm:flex ${isOpen ? "flex" : "hidden"} items-center`}
            >
              {user?.type === "user" ? (
                <Link
                  to="/UserdashBoard/home"
                  className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                >
                  Home
                </Link>
              ) : (
                <Link
                  to="/dashboard/home"
                  className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                >
                  Home
                </Link>
              )}
              {user?.type === "user" && (
                <Link
                  to="/UserdashBoard/medication"
                  className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                >
                  Medication
                </Link>
              )}
            </div>

            {/* Logout Button */}
            <div className="flex items-center">
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
