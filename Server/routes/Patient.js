// Import necessary modules and middlewares
import express from "express";
import isAuthenticated from "../middlewares/Authenticated.js";
import {
  addOrUpdatePatientRoutine,
  getCurrentUserMedicationSchedule,
  getPatientById,
} from "../controller/Patient.js";

// Initialize Express router
const router = express();

// Route for patients to add or update their daily routines (requires authentication)
router.post("/patientRoutine", isAuthenticated, addOrUpdatePatientRoutine);

// Route to fetch medication schedule for the current user (requires authentication)
router.get(
  "/getMediceneToSchedule",
  isAuthenticated,
  getCurrentUserMedicationSchedule
);

// Route to fetch patient details by ID (requires authentication)
router.get("/getPatient/:id", isAuthenticated, getPatientById);

// Export the router for use in other parts of the application
export default router;
