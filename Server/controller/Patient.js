import HealthData from "../model/Health.js";
import { sendResponse } from "../utils/helperfun.js";
import Medication from "../model/medication.js";
// Function to fetch the medication schedule for a specific day
const getUserMedicationForDay = async (userId, day) => {
  // Find medications for the user that need to be taken on the specified day
  return await Medication.find({
    userId,
    daysToTake: day,
  }).select("medicationName dosage timesToTake");
};

// Add or update daily routine by patient for the current date
export const addOrUpdatePatientRoutine = async (req, res, next) => {
  try {
    const user = req.user;

    // Check if the authenticated user is a doctor
    if (user.type === "doctor") {
      return res.status(403).json({
        success: false,
        message: "Doctors are not authorized to add or update health data.",
      });
    }

    const { bloodPressure, heartRate, sleepPattern, weight, StepsADay } =
      req.body;
    // Get current date and time
    const currentDate = new Date();
    const startOfToday = new Date(currentDate.setHours(0, 0, 0, 0));
    const endOfToday = new Date(currentDate.setHours(23, 59, 59, 999));

    // Check if health record exists for the current user and date
    let healthRecord = await HealthData.findOneAndUpdate(
      {
        userId: user._id,
        createdAt: { $gte: startOfToday, $lte: endOfToday },
      },
      {
        userId: user._id,
        bloodPressure,
        heartRate,
        sleepPattern,
        weight,
        StepsADay,
      },
      {
        new: true, // Return updated document if found
        upsert: true, // Create new document if not found
        setDefaultsOnInsert: true, // Sets default values on insert
      }
    );
    // Send success response
    sendResponse(
      res,
      200,
      "Health data added or updated successfully",
      healthRecord
    );
  } catch (error) {
    next(error);
  }
};

// Function to determine the current day and fetch the user's medication for that day
export const getCurrentUserMedicationSchedule = async (req, res, next) => {
  try {
    // Get the user ID from req.user
    const userId = req.user._id;

    // Get the current day of the week (e.g., "Sunday", "Monday", etc.)
    const currentDay = new Date().toLocaleString("en-US", { weekday: "long" });

    // Fetch the user's medication schedule for the current day
    const medicationForToday = await getUserMedicationForDay(
      userId,
      currentDay
    );

    // Check if medications are found for today
    if (medicationForToday && medicationForToday.length > 0) {
      // Send the medication schedule for today in the response
      res.status(200).json({
        success: true,
        message: `Medication schedule for ${currentDay}`,
        data: medicationForToday,
      });
    } else {
      // Send a custom message if no medications are found for today
      res.status(200).json({
        success: true,
        message: "Enjoy today, no medications for today.",
      });
    }
  } catch (error) {
    // Handle any errors and pass them to the error-handling middleware
    next(error);
  }
};
