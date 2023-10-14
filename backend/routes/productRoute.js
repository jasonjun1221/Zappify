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
} = require("../controllers/productController.js");
const { protect, admin } = require("../middlewares/authMiddleware.js");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
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
router.delete("/reviews/:id", protect, deleteProductReview);

module.exports = router;
