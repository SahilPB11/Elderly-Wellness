// components/MedicationPage.js
import React, { useContext } from "react";
import Navbar from "../Navbar"; // Assuming you have a Navbar component
import MedicationSlider from "../Doctor/MedicationSlider"; // Your MedicationSlider component
import { UserContext } from "../../../context/UserContext";

const Medication = () => {
  const { user } = useContext(UserContext);
  const id = user._id;

  return (
    <div className="medication-page-container">
      <Navbar />
      <div className="medication-content">
        <MedicationSlider id={id} />
        {/* Add more components or sections as required */}
      </div>
      <style jsx>{`
        .medication-page-container {
          background-color: #000; /* Black background */
          min-height: 100vh;
        }
        .medication-content {
          padding: 20px;
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 20px;
          max-width: 1200px;
          margin: 0 auto;
        }
      `}</style>
    </div>
  );
};

export default Medication;
