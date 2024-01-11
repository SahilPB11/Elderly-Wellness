import mongoose from "mongoose";

const healthSchema = new mongoose.Schema({
  bloodPressure: {
    systolic: { type: Number, required: true },
    diastolic: { type: Number, required: true },
  },
  heartRate: { type: Number, required: true },
  sleepPattern: {
    duration: { type: Number, required: true },
  },
  weight: { type: Number },
  StepsADay: { type: Number },
  createdAt: { type: Date, default: Date.now },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
});

const HealthData = mongoose.model("HealthData", healthSchema);

export default HealthData;
