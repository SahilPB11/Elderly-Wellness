import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: "user", // Default value for all new users
    default: "user",
  },
  password: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  age: { type: Number }, // Add age field
  gender: { type: String }, // Add gender field
  location: { type: String }, // Add location field
});

const User = mongoose.model("User", userSchema);

export default User;
