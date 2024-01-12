import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../Navbar"; // Assuming this is your Navbar component
import HealthDataSlider from "./HealthDataSlider"; // Your HealthData slider component
import MedicationSlider from "./MedicationSlider"; // Your Medication slider component
import UserInfoCard from "../UserInfoCard"; // Your UserInfoCard component
import { useParams } from "react-router-dom";

const UserDetails = () => {
  const { id } = useParams();
  const [user, setuser] = useState([]);
  // ... other states if needed
  async function getAll() {
    try {
      // fetch user info
      await axios.get(`/doctor/getpatient/${id}`).then((res) => {
        setuser(res?.data?.user);
      });
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    getAll();
  }, []);

  return (
    <div className="bg-black">
      {/* Navbar */}
      <Navbar />

      {/* User Information */}
      <div className="my-8">{user && <UserInfoCard user={user} />}</div>

      {/* Health Data Slider */}
      <div className="lg:flex lg:justify-center lg:my-8">
        <HealthDataSlider id={id} />
      </div>

      {/* Medication Slider */}
      <div className="lg:flex lg:justify-center lg:my-8">
        <MedicationSlider id={id} />
      </div>
    </div>
  );
};

export default UserDetails;
