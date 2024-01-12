import React from "react";
import { useNavigate } from "react-router-dom";
const UserInfoCard = ({ user, show = true }) => {
  if (user.length == 0) {
    return <></>;
  }
  // Function to generate a random background color
  const navigate = useNavigate();
  const getRandomColor = () => {
    const colors = [
      "#FF6633",
      "#FFB399",
      "#FF33FF",
      "#FFFF99",
      "#00B3E6",
      "#E6B333",
      "#3366E6",
      "#999966",
      "#99E6E6",
      "#669900",
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  // Get the first letter of the user's name for the avatar
  const firstLetter = user.name.charAt(0).toUpperCase();

  // Function to handle navigation to UserDetails page
  const handleViewDetails = () => {
    navigate(`/dashboard/user-details/${user._id}`);
  };

  return (
    <div className="bg-gray-800 rounded-lg overflow-hidden shadow-md p-4 sm:p-6 md:p-8">
      <div className="flex flex-col md:flex-row items-start">
        {/* Avatar with random background color */}
        <div
          className="rounded-full h-16 w-16 flex items-center justify-center mb-4 md:mr-4"
          style={{ backgroundColor: getRandomColor() }}
        >
          <span className="text-white text-xl">{firstLetter}</span>
        </div>

        {/* User Information */}
        <div className="flex flex-col">
          <h2 className="text-xl mb-2 text-white">{user.name}</h2>
          <p className="text-gray-400">Email: {user.email}</p>
          <p className="text-gray-400">Age: {user.age}</p>
          <p className="text-gray-400">Gender: {user.gender}</p>
          <p className="text-gray-400">Location: {user.location}</p>

          {/* View Details Button */}
          {show && (
            <button
              onClick={handleViewDetails}
              className="mt-4 bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 md:mt-0"
            >
              View Details
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserInfoCard;
