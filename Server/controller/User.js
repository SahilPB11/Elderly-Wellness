// Import required modules and utilities
import User from "../model/User.js";
import bcrypt from "bcrypt";
import sendCookie from "../utils/sendCookie.js";
import ErrorHandler from "../utils/ErrorHandler.js";
import {
  constructUserResponse,
  createUser,
  sendResponse,
} from "../utils/helperfun.js";

// Sign up a new user
export const signUp = async (req, res, next) => {
  try {
    // Extract user details from request body
    const { name, email, password, age, gender, location } = req.body;

    // Ensure all required fields are provided
    if (!name || !email || !password || !age || !gender || !location) {
      return next(new ErrorHandler("All fields are required", 400));
    }

    // Check if user with the provided email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) return next(new ErrorHandler("User already exists", 401));

    // Hash the provided password
    const hashPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = await createUser(
      name,
      email,
      hashPassword,
      age,
      gender,
      location
    );

    // Prepare and send the user response
    const userResponse = constructUserResponse(newUser);
    sendResponse(res, 201, "Registered Successfully", userResponse);
  } catch (error) {
    next(error);
  }
};

// Log in an existing user
export const login = async (req, res, next) => {
  try {
    // Extract email and password from request body
    const { email, password } = req.body;

    // Find user by email
    let user = await User.findOne({ email });
    if (!user) return next(new ErrorHandler("Invalid email", 400));

    // Verify the provided password against the stored hash
    const isMatchPassword = await bcrypt.compare(password, user.password);
    if (!isMatchPassword)
      return next(new ErrorHandler("Invalid Password", 400));

    // Prepare and send the user response with cookie
    const userResponse = constructUserResponse(user);
    sendCookie(res, userResponse, 200, `Welcome back ${userResponse.name}`);
  } catch (error) {
    next(error);
  }
};

// Log out the currently logged-in user
export const logout = async (req, res, next) => {
  try {
    // Clear the token cookie and send a success message
    res
      .status(200)
      .cookie("token", "", {
        expires: new Date(Date.now()),
        sameSite: process.env.NODE_ENV === "development" ? "lax" : "none",
        secure: process.env.NODE_ENV === "development" ? false : true,
      })
      .json({
        success: true,
        message: "Session finished / Logout successful",
      });
  } catch (error) {
    next(error);
  }
};
