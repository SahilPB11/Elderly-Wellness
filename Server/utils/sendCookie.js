// Import JWT library for token operations
import jwt from "jsonwebtoken";
// Function to send a JWT token in a cookie to the client
const sendCookie = (res, user, statusCode = 201, message) => {
  // Create a JWT token using the user's ID and a secret key from environment variables
  const token = jwt.sign({ _id: user._id }, process.env.jwt_Secret);

  // Set the cookie with the token, along with HTTP settings
  return (
    res
      .status(statusCode)
      .cookie("token", token, {
        httpOnly: true, // Make the cookie accessible only via HTTP(S)
        maxAge: 20 * 60 * 1000, // Set the cookie's max age to 20 minutes
        sameSite: process.env.NODE_ENV === "development" ? "lax" : "none", // Determine same-site attribute based on environment
        secure: process.env.NODE_ENV === "development" ? false : true, // Set secure flag based on environment
      })
      // Respond with success, message, and user details
      .json({
        success: true,
        message: message,
        username: user.username,
        _id: user._id,
        type: user.type,
      })
  );
};

// Export the sendCookie function for use in other parts of the application
export default sendCookie;
