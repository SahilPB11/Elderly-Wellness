import React, { useState } from "react";
import axios from "axios";

const AddMedicationForm = ({ onClose, id }) => {
  const [medication, setMedication] = useState({
    medicationName: "",
    dosage: "",
    daysToTake: [],
    timesToTake: [],
    WorkOutPlan: "",
    DietPlan: "",
    SleepTime: "",
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMedication((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    const errors = {};

    if (!medication.medicationName.trim()) {
      errors.medicationName = "Medication Name is required";
    }
    if (!medication.dosage.trim()) {
      errors.dosage = "Dosage is required";
    }
    // Add more validations for other fields if needed

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      const res = await axios.post(`/doctor/addPatientMed/${id}`, medication);
      if (res.data.success === true) onClose();
    } catch (error) {
      console.error("Error adding medication:", error);
    }
  };

  const handleCheckboxChange = (e) => {
    const { name, value, checked } = e.target;

    if (name === "daysToTake") {
      if (checked) {
        setMedication((prev) => ({
          ...prev,
          daysToTake: [...prev.daysToTake, value],
        }));
      } else {
        setMedication((prev) => ({
          ...prev,
          daysToTake: prev.daysToTake.filter((day) => day !== value),
        }));
      }
    } else if (name === "timesToTake") {
      if (checked) {
        setMedication((prev) => ({
          ...prev,
          timesToTake: [...prev.timesToTake, { time: value }],
        }));
      } else {
        setMedication((prev) => ({
          ...prev,
          timesToTake: prev.timesToTake.filter((time) => time.time !== value),
        }));
      }
    }
  };

  return (
    <div className="medication-form-container p-6 max-w-md mx-auto bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Add New Medication</h2>
      <form onSubmit={handleSubmit}>
        {/* Medication Name */}
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="medicationName"
          >
            Medication Name
          </label>
          <input
            type="text"
            name="medicationName"
            value={medication.medicationName}
            onChange={handleChange}
            placeholder="Enter Medication Name"
            required
          />
          {errors.medicationName && (
            <p className="text-red-500 text-xs mt-1">{errors.medicationName}</p>
          )}
        </div>

        {/* Dosage */}
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="dosage"
          >
            Dosage
          </label>
          <input
            type="text"
            name="dosage"
            value={medication.dosage}
            onChange={handleChange}
            placeholder="Enter Dosage"
            required
          />
          {errors.dosage && (
            <p className="text-red-500 text-xs mt-1">{errors.dosage}</p>
          )}
        </div>

        {/* Days To Take */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Days To Take
          </label>
          {[
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
            "Sunday",
          ].map((day) => (
            <div key={day} className="mb-2">
              <input
                type="checkbox"
                name="daysToTake"
                value={day}
                onChange={handleCheckboxChange}
              />
              <label className="ml-2">{day}</label>
            </div>
          ))}
        </div>

        {/* Times To Take */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Times To Take
          </label>
          {["Morning", "Afternoon", "Evening", "Night"].map((time) => (
            <div key={time} className="mb-2">
              <input
                type="checkbox"
                name="timesToTake"
                value={time}
                onChange={handleCheckboxChange}
              />
              <label className="ml-2">{time}</label>
            </div>
          ))}
        </div>

        {/* WorkOutPlan */}
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="WorkOutPlan"
          >
            WorkOut Plan
          </label>
          <input
            type="text"
            name="WorkOutPlan"
            value={medication.WorkOutPlan}
            onChange={handleChange}
            placeholder="Enter WorkOut Plan"
            required
          />
        </div>

        {/* DietPlan */}
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="DietPlan"
          >
            Diet Plan
          </label>
          <input
            type="text"
            name="DietPlan"
            value={medication.DietPlan}
            onChange={handleChange}
            placeholder="Enter Diet Plan"
            required
          />
        </div>

        {/* SleepTime */}
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="SleepTime"
          >
            Sleep Time (in hours)
          </label>
          <input
            type="number"
            name="SleepTime"
            value={medication.SleepTime}
            onChange={handleChange}
            placeholder="Enter Sleep Time"
          />
        </div>

        <button
        type="submit"
        className="w-full bg-blue-500 text-white py-2 px-4 rounded-md mt-4 hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue"
      >
        Save
      </button>
      <button
        type="button"
        onClick={onClose}
        className="w-full mt-2 border border-gray-300 py-2 px-4 rounded-md text-gray-700 hover:text-gray-500 focus:outline-none focus:border-blue-500"
      >
        Cancel
      </button>
      </form>
    </div>
  );
};

export default AddMedicationForm;
