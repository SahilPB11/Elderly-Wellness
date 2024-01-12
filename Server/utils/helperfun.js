import User from "../model/User.js";
import nodemailer from 'nodemailer';
import Medication from "../model/medication.js";

// Initialize Nodemailer transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'your-email@gmail.com', // Replace with your email
    pass: 'your-password', // Replace with your password or use environment variables
  },
});
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

// Function to fetch the medication schedule for a specific day
export const getUserMedicationForDay = async (userId, day) => {
  // Find medications for the user that need to be taken on the specified day
  return await Medication.find({
    userId,
    daysToTake: day,
  }).select("medicationName dosage timesToTake");
};

// Function to send email notification
export const sendEmailNotification = async (email, subject, text) => {
  const mailOptions = {
    from: "your-email@gmail.com",
    to: email,
    subject: subject,
    text: text,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Email sent successfully");
  } catch (error) {
    console.error("Error sending email:", error);
  }
};
