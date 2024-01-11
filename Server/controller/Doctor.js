import User from "../model/User.js";
import HealthData from "../model/Health.js";

// Helper function to send response
const sendResponse = (res, statusCode, message, data = null) => {
  res.status(statusCode).json({ success: true, message, data });
};

// get all patients
export const getAllpatients = async (req, res, next) => {
  try {
    let user = req.user;
    if (user && user.type === "user") {
      res
        .status(404)
        .son({
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
