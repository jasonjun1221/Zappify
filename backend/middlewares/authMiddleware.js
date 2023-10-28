const asyncHandler = require("../utils/asyncHandler.js");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel.js");

// Protect routes
const protect = asyncHandler(async (req, res, next) => {
  try {
    // Check if token exists
    const token = req.cookies.token;
    if (!token) {
      res.status(401);
      throw new Error("Not authorized, please login.");
    }

    // Verify token
    const verified = jwt.verify(token, process.env.JWT_SECRETKEY);

    // Check if user exists
    const user = await User.findById(verified.id).select("-password");
    if (!user) {
      res.status(404);
      throw new Error("User not found.");
    }

    // Grant access to protected route
    req.user = user;
    next();
  } catch (error) {
    console.log(error);
    next(error);
  }
});

// Admin routes
const admin = asyncHandler(async (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401);
    throw new Error("Not authorized as an admin.");
  }
});

module.exports = { protect, admin };
