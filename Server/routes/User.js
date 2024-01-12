// Import necessary modules and controllers
import express from "express";
import { login, logout, signUp } from "../controller/User.js";

// Initialize Express router
const router = express();

// Route for user registration (Sign Up)
router.post("/signUp", signUp);

// Route for user login (Sign In)
router.post("/login", login);

// Route for user logout
router.get("/logout", logout);

// Export the router for use in other parts of the application
export default router;
