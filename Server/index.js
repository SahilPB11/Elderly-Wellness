// Import necessary modules and middlewares
import express from "express";
import { config } from "dotenv";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import { errorMiddleware } from "./middlewares/error.js";
import userRouter from "./routes/User.js";
import patientRouter from "./routes/Patient.js";
import doctorRouter from "./routes/Doctor.js";
import cors from "cors";

// Initialize Express application
export const app = express();

// Load environment variables from .env file
config({ path: "./.env" });

// Set CORS configuration based on environment variable
const url = process.env.cors_Url;
app.use(
  cors({
    credentials: true,
    origin: url,
  })
);

// Set up middlewares for request parsing and cookie handling
app.use(bodyParser.json()); // Parse incoming JSON requests
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies
app.use(express.json()); // Parse JSON payloads
app.use(cookieParser()); // Parse cookies

// Set up routes for different functionalities
app.use("/", userRouter); // User-related routes
app.use("/patient", patientRouter); // Patient-related routes
app.use("/doctor", doctorRouter); // Doctor-related routes

// Use error handling middleware to manage and respond to errors
app.use(errorMiddleware);

// Export the configured Express application for use in other modules
export default app;
