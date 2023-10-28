const asyncHandler = require("../utils/asyncHandler.js");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel.js");

// Create and send token in response
const createAndSendToken = (user, statusCode, res) => {
  // create token
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRETKEY, { expiresIn: "10d" });

  // set cookie options
  res.cookie("token", token, {
    path: "/",
    httpOnly: true,
    expires: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000), // 10 days
    secure: process.env.NODE_ENV === "production" ? true : false,
  });

  // remove password from response
  user.password = undefined;

  // send response with token
  res.status(statusCode).json({ status: "success", token, user });
};

// @desc    Register a new user
// @route   POST /api/users/register
// @access  Public
const register = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  // Validate user input
  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Please enter all fields.");
  }

  // Check if user exists
  if (await User.findOne({ email })) {
    res.status(400);
    throw new Error("User already exists.");
  }

  // Create new user
  const newUser = await User.create({ name, email, password });

  // Send token in response
  if (newUser) {
    createAndSendToken(newUser, 201, res);
  } else {
    res.status(400);
    throw new Error("Invalid user data.");
  }
});

// @desc    Login user
// @route   POST /api/users/login
// @access  Public
const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // Validate user input
  if (!email || !password) {
    res.status(400);
    throw new Error("Please enter all fields.");
  }

  // Check if user exists
  const user = await User.findOne({ email });
  if (!user) {
    res.status(400);
    throw new Error("Invalid email or password.");
  }

  // Check if password is correct
  if (!user || !(await user.verifyPassword(password))) {
    res.status(400);
    throw new Error("Invalid email or password.");
  }

  // Send token in response
  createAndSendToken(user, 200, res);
});

// @desc    Logout user
// @route   GET /api/users/logout
// @access  Private
const logout = asyncHandler(async (req, res) => {
  res.cookie("token", "", { path: "/", httpOnly: true, maxAge: new Date(0) });
  res.status(200).json({ status: "success", message: "Logged out successfully." });
});

// @desc    login status
// @route   GET /api/users/status
// @access  Private
const loginStatus = asyncHandler(async (req, res) => {
  const token = req.cookies.token;
  if (!token) {
    return res.json(false);
  }
  const verified = jwt.verify(token, process.env.JWT_SECRETKEY);

  if (verified) {
    res.json(true);
  } else {
    res.json(false);
  }
});

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
const getProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id).select("-password");
  if (!user) {
    res.status(404);
    throw new Error("User not found.");
  }
  res.status(200).json({ status: "success", user });
});

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
const updateProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (!user) {
    res.status(404);
    throw new Error("User not found.");
  }

  user.name = req.body.name || user.name;
  user.phone = req.body.phone || user.phone;
  user.address = req.body.address || user.address;

  const updatedUser = await user.save();
  createAndSendToken(updatedUser, 200, res);
});

// @desc    Update Password
// @route   PUT /api/users/password
// @access  Private
const updatePassword = asyncHandler(async (req, res) => {
  console.log(req.body);
  const user = await User.findById(req.user._id);
  if (!user) {
    res.status(404);
    throw new Error("User not found.");
  }

  if (!(await user.verifyPassword(req.body.currentPassword))) {
    res.status(400);
    throw new Error("Current password is incorrect.");
  }

  user.password = req.body.newPassword;
  const updatedUser = await user.save();
  createAndSendToken(updatedUser, 200, res);
});

// @desc    Save cart items
// @route   POST /api/users/save-cart
// @access  Private
const saveCartItems = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (!user) {
    res.status(404);
    throw new Error("User not found.");
  }

  user.cartItems = req.body;
  await user.save();
  res.status(200).json({ status: "success", message: "Cart items saved." });
});

// @desc    Get cart items
// @route   GET /api/users/get-cart
// @access  Private
const getCartItems = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (!user) {
    res.status(404);
    throw new Error("User not found.");
  }

  res.status(200).json({ status: "success", cartItems: user.cartItems });
});

module.exports = { register, login, logout, loginStatus, getProfile, updateProfile, updatePassword, saveCartItems, getCartItems };
