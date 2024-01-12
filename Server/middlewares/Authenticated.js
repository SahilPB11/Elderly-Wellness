// Import required modules and utilities
import User from "../model/User.js";
import jwt from "jsonwebtoken";

// Middleware to check if a user is authenticated
const isAuthenticated = async (req, res, next) => {
  // Extract token from cookies
  const { token } = req.cookies;

  // If no token is found, send a 404 response indicating login is required
  if (!token) {
    return res.status(404).json({
      success: false,
      message: "Login First",
    });
  }

  // Verify the token using the JWT secret key
  const decodedData = jwt.verify(token, process.env.jwt_Secret);

  // Find the user associated with the decoded token ID and attach to request object
  req.user = await User.findById(decodedData._id);

  // Move to the next middleware or route handler
  next();
};

// Export the isAuthenticated middleware for use in other parts of the application
export default isAuthenticated;
