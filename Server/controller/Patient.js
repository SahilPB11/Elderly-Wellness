import HealthData from "../model/Health.js";

// Helper function to send response
const sendResponse = (res, statusCode, message, user) => {
  res.status(statusCode).json({ success: true, message, user });
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
