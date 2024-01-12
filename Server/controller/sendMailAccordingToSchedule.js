// Import necessary modules and models
import cron from "node-cron";
import Medication from "../model/medication.js";
import User from "../model/User.js";
import { sendEmailNotification } from "../utils/helperfun.js";

// Set up cron job for sending medication reminders
export const setupMedicationNotifications = () => {
  // Schedule the cron job to run every 4 hours
  cron.schedule("0 */4 * * *", async () => {
    try {
      // Determine the time of day based on the current hour
      const currentHour = new Date().getHours();
      let timeOfDay;

      // Assign time of day based on current hour
      if (currentHour >= 6 && currentHour < 12) {
        timeOfDay = "Morning";
      } else if (currentHour >= 12 && currentHour < 17) {
        timeOfDay = "Afternoon";
      } else if (currentHour >= 17 && currentHour < 21) {
        timeOfDay = "Evening";
      } else {
        timeOfDay = "Night";
      }

      // Fetch medications to remind based on the time of day
      const medications = await Medication.find({
        "timesToTake.time": timeOfDay,
      }).populate("userId");

      // Send email notifications for the fetched medications
      for (const medication of medications) {
        // Retrieve user details for sending notifications
        const user = await User.findById(medication.userId);

        // Check if user details and email are available
        if (user && user.email) {
          // Prepare email details
          const subject = `Medication Reminder: ${medication.medicationName}`;
          const text = `Please take your medication: ${medication.medicationName} - ${medication.dosage}`;

          // Send email notification
          await sendEmailNotification(user.email, subject, text);
        }
      }
    } catch (error) {
      // Log any errors encountered during the process
      console.error("Error scheduling medication notifications:", error);
    }
  });
};

// Initialize the medication notifications cron job upon application start
setupMedicationNotifications();
