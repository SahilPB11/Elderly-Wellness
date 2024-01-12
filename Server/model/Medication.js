import mongoose from "mongoose";

const medicationSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  medicationName: { type: String, required: true },
  dosage: { type: String, required: true },
  daysToTake: [{ type: String, required: true }], // e.g., ["Monday", "Wednesday", "Friday"]
  timesToTake: [
    {
      time: {
        type: String,
        enum: ["Morning", "Afternoon", "Evening", "Night"],
        required: true,
      },
    },
  ],
  WorkOutPlan: { type: String, required: true },
  DietPlan: { type: String, required: true },
  SleepTime: { type: Number },
  createdAt: { type: Date, default: Date.now },
});

const Medication = mongoose.model("Medication", medicationSchema);
export default Medication;
