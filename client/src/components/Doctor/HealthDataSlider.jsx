import axios from "axios";
import React, { useEffect, useState } from "react";

const HealthDataSlider = ({ id }) => {
  const [healthData, setHealthData] = useState([]);

  async function fetchData() {
    try {
      // Fetch health data
      await axios.get(`/doctor/getPatienthealhData/${id}`).then((response) => {
        setHealthData(response.data?.user);
      });
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    fetchData();
  });

  function formatDate(isoString) {
    const date = new Date(isoString);
    const formattedDate = `${date.getFullYear()}-${String(
      date.getMonth() + 1
    ).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
    return formattedDate;
  }

  if (healthData.length === 0) {
    return <></>;
  }
  return (
    <div className="health-data-slider-container">
      <h2 className="slider-title">Health Data</h2>
      <div className="health-data-card">
        <h3>{formatDate(healthData?.createdAt)}</h3>
        <p className="data-item">
          Blood Pressure: {healthData?.bloodPressure?.systolic}/
          {healthData?.bloodPressure?.diastolic}
        </p>
        <p className="data-item">Heart Rate: {healthData?.heartRate}</p>
        <p className="data-item">
          Sleep Duration: {healthData?.sleepPattern?.duration} hours
        </p>
        <p className="data-item">Steps A Day: {healthData?.StepsADay}</p>
        <p className="data-item">Weight: {healthData?.weight} kg</p>
      </div>
    </div>
  );
};

export default HealthDataSlider;
