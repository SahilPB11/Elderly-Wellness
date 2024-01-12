// Import necessary models and utility functions
import HealthData from "../model/Health.js";
import {
  sendResponse,
  getUserMedicationForDay,
  constructUserResponse,
} from "../utils/helperfun.js";
import User from "../model/User.js";

// Add or update daily health routine for a patient
export const addOrUpdatePatientRoutine = async (req, res, next) => {
  try {
    const user = req.user;

    // Only allow patients to add or update their health data
    if (user.type === "doctor") {
      return res.status(403).json({
        success: false,
        message: "Doctors cannot add or update health data.",
      });
    }

    // Extract health metrics from request body
    const { bloodPressure, heartRate, sleepPattern, weight, StepsADay } =
      req.body;

    // Set today's date range
    const currentDate = new Date();
    const startOfToday = new Date(currentDate.setHours(0, 0, 0, 0));
    const endOfToday = new Date(currentDate.setHours(23, 59, 59, 999));

    // Update or insert health data for the current day
    let healthRecord = await HealthData.findOneAndUpdate(
      { userId: user._id, createdAt: { $gte: startOfToday, $lte: endOfToday } },
      {
        userId: user._id,
        bloodPressure,
        heartRate,
        sleepPattern,
        weight,
        StepsADay,
      },
      { new: true, upsert: true, setDefaultsOnInsert: true }
    );

    // Send a success response
    sendResponse(res, 200, "Health data updated successfully", healthRecord);
  } catch (error) {
    next(error);
  }
};

// Fetch medication schedule for the current day
export const getCurrentUserMedicationSchedule = async (req, res, next) => {
  try {
    const userId = req.user._id; // Get user ID

    // Determine the current day of the week
    const currentDay = new Date().toLocaleString("en-US", { weekday: "long" });

    // Get medication schedule for the current day
    const medicationForToday = await getUserMedicationForDay(
      userId,
      currentDay
    );

    // Return medication schedule if available
    if (medicationForToday && medicationForToday.length > 0) {
      res.status(200).json({
        success: true,
        message: `Today's medication schedule for ${currentDay}`,
        data: medicationForToday,
      });
    } else {
      res.status(200).json({
        success: true,
        message: "No medications scheduled for today.",
      });
    }
  } catch (error) {
    next(error);
  }
};

// Fetch patient details by ID
export const getPatientById = async (req, res, next) => {
  try {
    const { id } = req.params; // Extract user ID

    // Find user by ID
    const user = await User.findById(id);

    // Return error if user not found
    if (!user) {
      return sendResponse(res, 404, "User not found");
    }

    // Ensure the user type is 'user'
    if (user.type !== "user") {
      return sendResponse(res, 400, "Invalid user type");
    }

    // Construct and send user details response
    const userResponse = constructUserResponse(user);
    sendResponse(
      res,
      200,
      "Patient details fetched successfully",
      userResponse
    );
  } catch (error) {
    next(error);
  }
};
