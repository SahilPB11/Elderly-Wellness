// Import required modules and middlewares
import express from "express";
import isAuthenticated from "../middlewares/Authenticated.js";
import {
  getAllpatients,
  getPatientById,
  getPatientHealthDataById,
  addPatientMedication,
  getPatientMedicationById
} from "../controller/Doctor.js";

// Initialize Express router
const router = express();

// Route to fetch all patients (accessible only if authenticated)
router.get("/allPatients", isAuthenticated, getAllpatients);

// Route to fetch a specific patient by ID (accessible only if authenticated)
router.get("/getPatient/:id", isAuthenticated, getPatientById);

// Route to fetch health data for a specific patient by ID (accessible only if authenticated)
router.get("/getPatienthealhData/:id", isAuthenticated, getPatientHealthDataById);

// Route to fetch medication data for a specific patient by ID (accessible only if authenticated)
router.get("/getPatientMedication/:id", isAuthenticated, getPatientMedicationById);

// Route to add medication for a specific patient by ID (accessible only if authenticated)
router.post("/addPatientMed/:id", isAuthenticated, addPatientMedication);

// Export the router for use in the main application file
export default router;
