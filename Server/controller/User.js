import User from "../model/User.js";
import bcrypt from "bcrypt";
import sendCookie from "../utils/sendCookie.js";
import ErrorHandler from "../utils/ErrorHandler.js";

// Helper function to create user
const createUser = async (email, hashPassword, age, gender, location) => {
  return await User.create({
    email,
    password: hashPassword,
    age,
    gender,
    location,
  });
};

// Helper function to construct user response
const constructUserResponse = (user) => {
  return {
    _id: user._id,
    email: user.email,
    age: user.age,
    gender: user.gender,
    location: user.location,
    type: user.type,
  };
};

// Helper function to send response
const sendResponse = (res, statusCode, message, user) => {
  res.status(statusCode).json({ success: true, message, user });
};

// SignUp User
export const signUp = async (req, res, next) => {
  try {
    const { email, password, age, gender, location } = req.body;

    // Validate required fields
    if (!email || !password || !age || !gender || !location) {
      return next(new ErrorHandler("All fields are required", 400));
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) return next(new ErrorHandler("User already exists", 400));

    // Hash the password
    const hashPassword = await bcrypt.hash(password, 10);

    // Create user
    const newUser = await createUser(
      email,
      hashPassword,
      age,
      gender,
      location
    );

    // Construct user response
    const userResponse = constructUserResponse(newUser);

    // Send response to the client
    sendResponse(res, 201, "Registered Successfully", userResponse);
  } catch (error) {
    next(error);
  }
};
