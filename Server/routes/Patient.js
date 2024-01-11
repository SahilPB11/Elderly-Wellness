import express from "express";
import isAuthenticated from "../middlewares/Authenticated";

const router = express();

// patient can add its daily routine
router.post("/patientRoutine", isAuthenticated, addpatientRoutine);

export default router;
