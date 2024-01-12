import User from "../model/User.js";

// Helper function to create user
export const createUser = async (
  name,
  email,
  hashPassword,
  age,
  gender,
  location
) => {
  return await User.create({
    name,
    email,
    password: hashPassword,
    age,
    gender,
    location,
  });
};

// Helper function to construct user response
export const constructUserResponse = (user) => {
  return {
    name: user.name,
    _id: user._id,
    email: user.email,
    age: user.age,
    gender: user.gender,
    location: user.location,
    type: user.type,
  };
};

// Helper function to send response
export const sendResponse = (res, statusCode, message, user) => {
  res.status(statusCode).json({ success: true, message, user });
};
