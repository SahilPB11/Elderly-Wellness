// Importing necessary modules and models
import User from "../model/User.js"; // Importing User model
import nodemailer from "nodemailer"; // Importing nodemailer for email functionality
import Medication from "../model/medication.js"; // Importing Medication model

// Initialize Nodemailer transporter using Gmail service
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER, // Fetching email user from environment variable
    pass: process.env.EMAIL_PASS, // Fetching email password from environment variable
  },
});

/**
 * Helper function to create a new user in the database.
 * @param {string} name - User's name
 * @param {string} email - User's email address
 * @param {string} hashPassword - Hashed password for the user
 * @param {number} age - User's age
 * @param {string} gender - User's gender
 * @param {string} location - User's location
 * @returns {Promise<Object>} - Returns the newly created user object
 */
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

/**
 * Helper function to construct a user response object.
 * @param {Object} user - User object from database
 * @returns {Object} - Returns a formatted user response object
 */
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

/**
 * Helper function to send a response with status code and message.
 * @param {Object} res - Express response object
 * @param {number} statusCode - HTTP status code
 * @param {string} message - Message to send in response
 * @param {Object} user - User object to include in response
 */
export const sendResponse = (res, statusCode, message, user) => {
  res.status(statusCode).json({ success: true, message, user });
};

/**
 * Function to fetch medications for a specific user on a given day.
 * @param {string} userId - User's ID
 * @param {string} day - Day of the week (e.g., 'Monday', 'Tuesday')
 * @returns {Promise<Array>} - Returns an array of medication objects
 */
export const getUserMedicationForDay = async (userId, day) => {
  return await Medication.find({
    userId,
    daysToTake: day,
  }).select("medicationName dosage timesToTake");
};

/**
 * Function to send an email notification using Nodemailer.
 * @param {string} email - Recipient's email address
 * @param {string} subject - Email subject
 * @param {string} text - Email content
 */
export const sendEmailNotification = async (email, subject, text) => {
  const mailOptions = {
    from: process.env.EMAIL_USER, // Sender's email address
    to: email, // Recipient's email address
    subject: subject, // Email subject
    text: text, // Email content
  };

  try {
    await transporter.sendMail(mailOptions); // Sending email
    console.log("Email sent successfully");
  } catch (error) {
    console.error("Error sending email:", error); // Logging error if email sending fails
  }
};
