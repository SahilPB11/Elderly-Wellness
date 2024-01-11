import express from "express";
import isAuthenticated from "../middlewares/Authenticated.js";
import { addOrUpdatePatientRoutine } from "../controller/Patient.js";

const router = express();

// patient can add its daily routine
router.post("/patientRoutine", isAuthenticated, addOrUpdatePatientRoutine);

router.get("/", isAuthenticated);

export default router;
