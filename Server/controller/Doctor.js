// Importing necessary models and utility functions
import User from "../model/User.js";
import HealthData from "../model/Health.js";
import Medication from "../model/medication.js";
import { constructUserResponse, sendResponse } from "../utils/helperfun.js";

/**
 * Fetch all patients with user type 'user'.
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 */
export const getAllpatients = async (req, res, next) => {
  try {
    let user = req.user;
    // Check if the authenticated user is not a regular user
    if (user && user.type === "user") {
      return res.status(404).json({
        success: false,
        message: "Invalid request. Access denied.",
      });
    }
    // Fetch all users with type 'user'
    const users = await User.find({ type: "user" });
    // Handle case where no users are found
    if (!users || users.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "No users found." });
    }
    // Send success response with user details
    sendResponse(res, 200, "Successfully fetched all Patients", users);
  } catch (error) {
    // Pass any errors to the error-handling middleware
    next(error);
  }
};

/**
 * Fetch a specific patient by their ID.
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 */
export const getPatientById = async (req, res, next) => {
  try {
    const { id } = req.params; // Extract user ID from request parameters
    // Find the user by ID
    const user = await User.findById(id);
    // Handle case where user is not found
    if (!user) {
      return sendResponse(res, 404, "User not found");
    }
    // Fetch latest health data for the user, if available
    const latestHealthData = await HealthData.findOne({ userId: id }).sort({
      createdAt: -1,
    });
    // Construct user response and include health data if available
    const userResponse = constructUserResponse(user);
    userResponse.latestHealthData = latestHealthData || null;
    // Send success response with user details
    sendResponse(
      res,
      200,
      "Successfully fetched patient details",
      userResponse
    );
  } catch (error) {
    next(error);
  }
};

/**
 * Fetch all health data records for a specific patient by their ID.
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 */
export const getPatientHealthDataById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    if (!user) {
      return sendResponse(res, 404, "User not found");
    }
    const latestHealthData = await HealthData.findOne({ userId: id }).sort({
      createdAt: -1,
    });
    sendResponse(
      res,
      200,
      "Successfully fetched all health data",
      latestHealthData
    );
  } catch (error) {
    next(error);
  }
};

/**
 * Fetch all medication records for a specific patient by their ID.
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 */
export const getPatientMedicationById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    if (!user) {
      return sendResponse(res, 404, "User not found");
    }
    const latestMedications = await Medication.find({ userId: id }).sort({
      createdAt: -1,
    });
    const userResponse = constructUserResponse(user);
    userResponse.medications = latestMedications || [];
    sendResponse(
      res,
      200,
      "Successfully fetched all medication data",
      userResponse
    );
  } catch (error) {
    next(error);
  }
};

/**
 * Add medication details for a specific patient by their ID.
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 */
export const addPatientMedication = async (req, res, next) => {
  try {
    // Ensure the authenticated user is a doctor
    if (req.user.type !== "doctor") {
      return res.status(403).json({
        success: false,
        message: "Only doctors can add patient medications.",
      });
    }
    const userId = req.params.id; // Extract user ID from request parameters
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }
    if (user.type === "doctor") {
      return res.status(403).json({
        success: false,
        message: "Doctors cannot add medications for themselves.",
      });
    }
    // Extract medication details from request body and create a new medication instance
    const medication = new Medication(req.body);
    medication.userId = userId;
    const savedMedication = await medication.save(); // Save medication details to database
    // Send success response with saved medication details
    res.status(201).json({
      success: true,
      message: "Patient medication added successfully",
      data: savedMedication,
    });
  } catch (error) {
    // Pass any errors to the error-handling middleware
    next(error);
  }
};
