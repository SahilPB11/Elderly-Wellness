import React from "react";

const UserInfoCard = ({ user }) => {
  return (
    <div className="bg-gray-800 rounded-lg overflow-hidden shadow-md">
      <div className="p-4">
        <h2 className="text-xl mb-2 text-white">{user.name}</h2>
        <p className="text-gray-400">Email: {user.email}</p>
        <p className="text-gray-400">Age: {user.age}</p>
        <p className="text-gray-400">Gender: {user.gender}</p>
        <p className="text-gray-400">Location: {user.location}</p>
        {/* Add more details as needed */}
        <button
          onClick={() => {
            // Navigate to detailed view when a user is clicked
            // You can use react-router-dom for this
          }}
          className="mt-4 bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
        >
          View Details
        </button>
      </div>
    </div>
  );
};

export default UserInfoCard;
