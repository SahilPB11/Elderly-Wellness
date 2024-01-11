import express from "express";
import { config } from "dotenv";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import { errorMiddleware } from "./middlewares/error.js";
import userRouter from "./routes/User.js";

// here i am exporting app to server.js file
export const app = express();
config({
  path: "./.env",
});

// middlewares
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

// all routes
app.use("/", userRouter);

// error handler middleware
app.use(errorMiddleware);
