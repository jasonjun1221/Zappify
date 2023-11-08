const express = require("express");
const router = express.Router();
const multer = require("multer");
const {
  createProduct,
  getProducts,
  updateProduct,
  getProductById,
  deleteProduct,
  createProductReview,
  deleteProductReview,
  getProductReviews,
} = require("../controllers/productController.js");
const { protect, admin } = require("../middlewares/authMiddleware.js");

const storage = multer.diskStorage({
  destination: (_, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (_, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage });

router.post("/", protect, admin, upload.single("image"), createProduct);
router.get("/", getProducts);
router.get("/:id", getProductById);
router.put("/:id", protect, admin, updateProduct);
router.delete("/:id", protect, admin, deleteProduct);

router.post("/reviews/:id", protect, createProductReview);
router.get("/reviews/:id", getProductReviews);
router.delete("/reviews/:productId/:reviewId", protect, admin, deleteProductReview);

module.exports = router;
