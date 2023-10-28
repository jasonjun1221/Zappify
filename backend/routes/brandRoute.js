const express = require("express");
const router = express.Router();
const { protect, admin } = require("../middlewares/authMiddleware");
const { createBrand, getBrands, deleteBrand } = require("../controllers/brandController");

router.post("/", protect, admin, createBrand);
router.get("/", getBrands);
router.delete("/:slug", protect, admin, deleteBrand);

module.exports = router;
