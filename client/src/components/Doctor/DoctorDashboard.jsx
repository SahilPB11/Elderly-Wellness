import React, { useState, useEffect } from "react";
import axios from "axios";
import UserInfoCard from "../UserInfoCard";

const DoctorDashboard = () => {
  const [users, setUsers] = useState([]);
  async function getUser() {
    try {
      // Fetch users from the API
      await axios.get("/doctor/allPatients").then((response) => {
        setUsers(response.data.user); // Access the 'user' array from the response data
      });
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    getUser();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-center text-2xl mb-4">Doctor Dashboard</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {users.map((user) => (
          <UserInfoCard user={user} key={user._id} />
        ))}
      </div>
    </div>
  );
};

export default DoctorDashboard;
