import React from "react";
import Navbar from "../../components/Navbar";
import DoctorDashboard from "../../components/Doctor/DoctorDashboard";
const DoctorHome = () => {
  return (
    <div className="bg-gray-900 text-white min-h-screen">
      <Navbar />
      <DoctorDashboard />
    </div>
  );
};

export default DoctorHome;
