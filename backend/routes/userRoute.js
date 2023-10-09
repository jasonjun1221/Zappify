const express = require("express");
const router = express.Router();
const { protect } = require("../middlewares/authMiddleware");
const { register, login, logout, getProfile, updateProfile, loginStatus, updatePassword } = require("../controllers/userController");

router.post("/register", register);
router.post("/login", login);

router.get("/logout", logout);
router.get("/status", loginStatus);

router.get("/profile", protect, getProfile);
router.put("/profile", protect, updateProfile);
router.put("/password", protect, updatePassword);

module.exports = router;
