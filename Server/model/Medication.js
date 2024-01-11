import mongoose from "mongoose";

const medicationSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
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
  createdAt: { type: Date, default: Date.now },
});

const Medication = mongoose.model("Medication", medicationSchema);
export default Medication;