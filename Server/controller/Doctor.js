import User from "../model/User.js";
import HealthData from "../model/Health.js";
import Medication from "../model/Medication.js";
import {
  constructUserResponse,
  sendResponse,
} from "../utils/constructUserResponse.js";
// get all patients
export const getAllpatients = async (req, res, next) => {
  try {
    let user = req.user;
    if (user && user.type === "user") {
      res.status(404).json({
        success: false,
        message: "No its wrong page u trying to reach",
      });
    }
    const users = await User.find({ type: "user" });

    if (!users || users.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "No users found with type 'user'" });
    }
    sendResponse(res, 200, "Successfully fetched all Patients", users);
  } catch (error) {
    next(error);
  }
};

// Get patient by ID
export const getPatientById = async (req, res, next) => {
  try {
    const { id } = req.params; // Get user ID from parameters

    // Find user by ID
    const user = await User.findById(id);

    // Check if user exists
    if (!user) {
      return sendResponse(res, 404, "User not found");
    }

    // Check if the user type is 'user'
    if (user.type !== "user") {
      return sendResponse(res, 400, "The specified user is not of type 'user'");
    }

    // If the user is of type 'user', you can fetch the associated health data if needed
    // For example, fetching health data associated with the user ID
    const latestHealthData = await HealthData.findOne({ userId: id }).sort({
      createdAt: -1,
    });
    // Construct the user response (excluding password)
    const userResponse = constructUserResponse(user);
    (userResponse.latestHealthData = latestHealthData || null),
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

// Get all health data for a patient by ID with latest records on top
export const getPatientHealthDataById = async (req, res, next) => {
  try {
    const { id } = req.params; // Get user ID from parameters

    // Find user by ID
    const user = await User.findById(id);

    // Check if user exists
    if (!user) {
      return sendResponse(res, 404, "User not found");
    }

    // Check if the user type is 'user'
    if (user.type !== "user") {
      return sendResponse(res, 400, "The specified user is not of type 'user'");
    }

    // Fetch all health data records for the user based on userId, sorted by createdAt in descending order
    let latestHealthData = [];
    try {
      latestHealthData = await HealthData.findOne({ userId: id }).sort({
        createdAt: -1,
      });
      console.log("Latest Health Data:", latestHealthData);
    } catch (error) {
      console.error("Error fetching health data:", error);
    }
    const userResponse = constructUserResponse(user);
    userResponse.healthData = latestHealthData || [];

    // Send success response with user details and all health data records
    sendResponse(
      res,
      200,
      "Successfully fetched all health data for the patient",
      userResponse
    );
  } catch (error) {
    next(error);
  }
};

// add a ptient medication
export const addPatientMedication = async (req, res, next) => {
  try {
    // Check if the authenticated user is a doctor
    if (req.user.type !== "doctor") {
      return res.status(403).json({
        success: false,
        message: "Only doctors are authorized to add patient medications.",
      });
    }

    const userId = req.params.id; // Get user ID from request parameters

    // Find the user by ID
    const user = await User.findById(userId);

    // Check if the user exists
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    if (user.type === "doctor") {
      return res.status(403).json({
        success: false,
        message: "doctors cant authorized medicene to himself.",
      });
    }

    // Extract the medication details from the request body
    const {
      medicationName,
      dosage,
      daysToTake,
      timesToTake,
      WorkOutPlan,
      DietPlan,
      SleepTime,
    } = req.body;

    // Create a new medication instance
    const medication = new Medication({
      userId,
      medicationName,
      dosage,
      daysToTake,
      timesToTake,
      WorkOutPlan,
      DietPlan,
      SleepTime,
    });

    // Save the medication details to the database
    const savedMedication = await medication.save();

    // Send a success response
    res.status(201).json({
      success: true,
      message: "Patient medication added successfully",
      data: savedMedication,
    });
  } catch (error) {
    // Handle any errors and pass them to the error-handling middleware
    next(error);
  }
};
