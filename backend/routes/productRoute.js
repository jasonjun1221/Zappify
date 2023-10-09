const express = require("express");
const router = express.Router();
const {
  createProduct,
  getProducts,
  updateProduct,
  getProductById,
  deleteProduct,
  createProductReview,
  deleteProductReview,
} = require("../controllers/productController.js");
const { protect, admin } = require("../middlewares/authMiddleware.js");

router.post("/", protect, admin, createProduct);
router.get("/", getProducts);
router.get("/:id", getProductById);
router.put("/:id", protect, admin, updateProduct);
router.delete("/:id", protect, admin, deleteProduct);

router.post("/reviews/:id", protect, createProductReview);
router.delete("/reviews/:id", protect, deleteProductReview);

module.exports = router;
