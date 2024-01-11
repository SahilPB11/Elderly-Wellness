import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: "user", // Default value for all new users
    default: "user",
  },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  email: { type: String, required: true, unique: true },
});

const User = mongoose.model("User", userSchema);

export default User;
