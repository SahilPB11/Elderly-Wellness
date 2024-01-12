import express from "express";
import { config } from "dotenv";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import { errorMiddleware } from "./middlewares/error.js";
import userRouter from "./routes/User.js";
import patientRouter from "./routes/Patient.js";
import doctorRouter from "./routes/Doctor.js";
import cors from "cors";

// here i am exporting app to server.js file
export const app = express();
config({
  path: "./.env",
});

// const link = process.env.Cors_Link;
const url = process.env.cors_Url;
console.log(url);
app.use(
  cors({
    credentials: true,
    origin: url,
  })
);

// middlewares
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

// all routes
app.use("/", userRouter);
app.use("/patient", patientRouter);
app.use("/doctor", doctorRouter);

// error handler middleware
app.use(errorMiddleware);
