import cron from "node-cron";
import Medication from "../model/medication.js";
import User from "../model/User.js"; // Import the User model
import { sendEmailNotification } from "../utils/helperfun.js"; // Import the sendEmailNotification function

// Method to set up the cron job for sending medication notifications
export const setupMedicationNotifications = () => {
  // Schedule the task to run every hour (adjust the cron expression as needed)
  cron.schedule("0 */4 * * *", async () => {
    try {
      // Get the current hour (e.g., 'Morning', 'Afternoon', 'Evening', 'Night')
      const currentHour = new Date().getHours();
      let timeOfDay;

      if (currentHour >= 6 && currentHour < 12) {
        timeOfDay = "Morning";
      } else if (currentHour >= 12 && currentHour < 17) {
        timeOfDay = "Afternoon";
      } else if (currentHour >= 17 && currentHour < 21) {
        timeOfDay = "Evening";
      } else {
        timeOfDay = "Night";
      }

      // Fetch medications that need to be taken at the current time of day
      const medications = await Medication.find({
        "timesToTake.time": timeOfDay,
      }).populate("userId");

      // Send email notifications for medications that need to be taken at the current time of day
      for (const medication of medications) {
        // Fetch user details using userId to get the email
        const user = await User.findById(medication.userId);

        if (user && user.email) {
          const subject = `Medication Reminder - ${medication.medicationName}`;
          const text = `It's time to take your medication: ${medication.medicationName} - ${medication.dosage}`;

          await sendEmailNotification(user.email, subject, text); // Send email to user's email address
        }
      }
    } catch (error) {
      console.error("Error scheduling medication notifications:", error);
    }
  });
};

// Initialize cron job for medication notifications when your application starts
setupMedicationNotifications();
