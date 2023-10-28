const express = require("express");
const router = express.Router();
const { protect } = require("../middlewares/authMiddleware");
const {
  register,
  login,
  logout,
  getProfile,
  updateProfile,
  loginStatus,
  updatePassword,
  saveCartItems,
  getCartItems,
} = require("../controllers/userController");

router.post("/register", register);
router.post("/login", login);

router.get("/logout", logout);
router.get("/status", loginStatus);

router.get("/profile", protect, getProfile);
router.put("/profile", protect, updateProfile);
router.put("/password", protect, updatePassword);

router.post("/save-cart", protect, saveCartItems);
router.get("/get-cart", protect, getCartItems);

module.exports = router;
