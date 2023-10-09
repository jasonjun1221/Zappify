const express = require("express");
const router = express.Router();
const { createCategory, getCategories, deleteCategory } = require("../controllers/categoryController.js");
const { protect, admin } = require("../middlewares/authMiddleware.js");

router.post("/", protect, admin, createCategory);
router.get("/", protect, admin, getCategories);
router.delete("/:slug", protect, admin, deleteCategory);

module.exports = router;
