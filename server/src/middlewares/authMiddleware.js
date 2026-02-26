import { verifyToken } from "../helpers/jwtHelper.js";

// Middleware to authenticate user using JWT token
export const authenticate = async (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "You must be logged in to access this resource",
      });
    }

    const decoded = verifyToken(token);

    req.user = {
      id: decoded.id,
      role: decoded.role,
    };

    next();
  } catch (error) {
    res.status(401).json({
      success: false,
      message: error.message || "Invalid or expired token",
    });
  }
}
