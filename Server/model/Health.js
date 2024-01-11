import mongoose from "mongoose";

const healthSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  bloodPressure: {
    systolic: { type: Number, required: true },
    diastolic: { type: Number, required: true },
  },
  heartRate: { type: Number, required: true },
  sleepPattern: {
    duration: { type: Number, required: true },
  },
  weight: { type: Number },
  createdAt: { type: Date, default: Date.now },
});

const HealthData = mongoose.model("HealthData", healthSchema);

export default HealthData;
