import express from "express";
import isAuthenticated from "../middlewares/Authenticated.js";
import {
  getAllpatients,
  getPatientById,
  getPatientHealthDataById,
  addPatientMedication,
  getPatientMedicationById
} from "../controller/Doctor.js";
const router = express();

// here i will see all the patients
router.get("/allPatients", isAuthenticated, getAllpatients);

// here i can find a specific user with id and i can send it to back
router.get("/getPatient/:id", isAuthenticated, getPatientById);

// here i am getting all healt data for a specific user
router.get(
  "/getPatienthealhData/:id",
  isAuthenticated,
  getPatientHealthDataById
);
// here i am getting all healt data for a specific user
router.get(
  "/getPatientMedication/:id",
  isAuthenticated,
  getPatientMedicationById
);

// add a ptient medication
router.post("/addPatientMed/:id", isAuthenticated, addPatientMedication);

export default router;
