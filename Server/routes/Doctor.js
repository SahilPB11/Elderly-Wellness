import express from "express";
import isAuthenticated from "../middlewares/Authenticated.js";
import { getAllpatients, getPatientById } from "../controller/Doctor.js";
const router = express();

// here i will see all the patients
router.get("/allPatients", isAuthenticated, getAllpatients);

// here i can find a specific user with id and i can send it to back
router.get("/getPatient/:id", isAuthenticated, getPatientById);

export default router;
