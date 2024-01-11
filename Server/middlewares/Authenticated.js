import User from "../model/User.js";
import jwt from "jsonwebtoken";

// if this function for check that user is authenticated or not we are matching its cookes with our
const isAuthenticated = async (req, res, next) => {
  const { token } = req.cookies;
  if (!token)
    return res.status(404).json({
      success: false,
      message: "Login First",
    });

  const decodedData = jwt.verify(token, process.env.jwt_Secret);
  req.user = await User.findById(decodedData._id);
  next();
};

export default isAuthenticated;
