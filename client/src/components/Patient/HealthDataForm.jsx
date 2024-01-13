import React, { useState } from "react";
import axios from "axios";

const HealthDataForm = ({ userId }) => {
  const [formData, setFormData] = useState({
    bloodPressure: {
      systolic: "",
      diastolic: "",
    },
    heartRate: "",
    sleepPattern: {
      duration: "",
    },
    weight: "",
    StepsADay: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Handle nested properties
    if (name.includes(".")) {
      const [parent, child] = name.split(".");
      setFormData((prevData) => ({
        ...prevData,
        [parent]: {
          ...prevData[parent],
          [child]: value,
        },
      }));
    } else {
      // Handle non-nested properties
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("/patient/patientRoutine", {
        ...formData,
        userId,
      });

      // Reset the form data after successful submission
      setFormData({
        bloodPressure: {
          systolic: "",
          diastolic: "",
        },
        heartRate: "",
        sleepPattern: {
          duration: "",
        },
        weight: "",
        StepsADay: "",
      });

      // Handle success scenario, e.g., show a success message
    } catch (error) {
      console.error("Error saving health data:", error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-gray-800 text-white p-8 rounded-lg shadow-lg"
    >
      <h2 className="text-2xl mb-4">Enter Health Data</h2>

      {/* Blood Pressure */}
      <div className="mb-4">
        <label className="block mb-2 text-gray-300">
          Systolic Blood Pressure:
        </label>
        <input
          type="number"
          name="bloodPressure.systolic"
          value={formData.bloodPressure.systolic}
          onChange={handleChange}
          required
          className="bg-gray-700 text-white p-2 rounded-md w-full"
          placeholder="Systolic"
        />
        <input
          type="number"
          name="bloodPressure.diastolic"
          value={formData.bloodPressure.diastolic}
          onChange={handleChange}
          required
          className="mt-2 bg-gray-700 text-white p-2 rounded-md w-full"
          placeholder="Diastolic"
        />
      </div>

      {/* Heart Rate */}
      <div className="mb-4">
        <label className="block mb-2 text-gray-300">Heart Rate:</label>
        <input
          type="number"
          name="heartRate"
          value={formData.heartRate}
          onChange={handleChange}
          required
          className="bg-gray-700 text-white p-2 rounded-md w-full"
          placeholder="Heart Rate"
        />
      </div>

      {/* Sleep Pattern */}
      <div className="mb-4">
        <label className="block mb-2 text-gray-300">
          Sleep Duration (in hours):
        </label>
        <input
          type="number"
          name="sleepPattern.duration"
          value={formData.sleepPattern.duration}
          onChange={handleChange}
          required
          className="bg-gray-700 text-white p-2 rounded-md w-full"
          placeholder="Sleep Duration"
        />
      </div>

      {/* Weight */}
      <div className="mb-4">
        <label className="block mb-2 text-gray-300">Weight (in kg):</label>
        <input
          type="number"
          name="weight"
          value={formData.weight}
          onChange={handleChange}
          className="bg-gray-700 text-white p-2 rounded-md w-full"
          placeholder="Weight"
        />
      </div>

      {/* Steps a Day */}
      <div className="mb-4">
        <label className="block mb-2 text-gray-300">Steps a Day:</label>
        <input
          type="number"
          name="StepsADay"
          value={formData.StepsADay}
          onChange={handleChange}
          className="bg-gray-700 text-white p-2 rounded-md w-full"
          placeholder="Steps a Day"
        />
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md w-full"
      >
        Submit
      </button>
    </form>
  );
};

export default HealthDataForm;
