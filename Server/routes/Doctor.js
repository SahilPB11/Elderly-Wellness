import express from "express"
import isAuthenticated from "../middlewares/Authenticated";
const router = express();

// here i will see all the patients
router.get("/allPatients", isAuthenticated, getAllPatients);