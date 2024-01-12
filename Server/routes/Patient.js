import express from "express";
import isAuthenticated from "../middlewares/Authenticated.js";
import {
  addOrUpdatePatientRoutine,
  getCurrentUserMedicationSchedule,
} from "../controller/Patient.js";

const router = express();

// patient can add its daily routine
router.post("/patientRoutine", isAuthenticated, addOrUpdatePatientRoutine);

// fetch the user's medication for today
router.get(
  "/getMediceneToSchedule",
  isAuthenticated,
  getCurrentUserMedicationSchedule
);

export default router;
