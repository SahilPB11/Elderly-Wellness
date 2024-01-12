import axios from "axios";
import React, { useEffect, useState } from "react";

const MedicationSlider = ({ id }) => {
  const [medications, setMedications] = useState([]);

  async function fetchData() {
    try {
      // Fetch medication details based on userId
      await axios.get(`/doctor/getPatientMedication/${id}`).then((response) => {
        setMedications(response?.data?.user?.medications);
      });
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  // Check if medications array is empty
  if (medications.length === 0) {
    return null; // Or display a message like "No medications found"
  }

  return (
    <div className="medication-slider-container">
      <h2 className="slider-title">Medications</h2>
      <div className="medication-slider">
        {medications.map((medication) => (
          <div key={medication._id} className="medication-card">
            <h3>{medication.medicationName}</h3>
            <p>Dosage: {medication.dosage}</p>
            <p>Days to Take: {medication.daysToTake.join(", ")}</p>
            <p>
              Times to Take:{" "}
              {medication.timesToTake.map((time) => time.time).join(", ")}
            </p>
            <p>WorkOut Plan: {medication.WorkOutPlan}</p>
            <p>Diet Plan: {medication.DietPlan}</p>
            <p>Sleep Time: {medication.SleepTime} hours</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MedicationSlider;
