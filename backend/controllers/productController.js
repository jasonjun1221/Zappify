const asyncHandler = require("../utils/asyncHandler.js");
const Product = require("../models/productModel.js");

// @desc    Create a new product
// @route   POST /api/products
// @access  Private/Admin
const createProduct = asyncHandler(async (req, res) => {
  const { name, category, brand, price, description, quantity } = req.body;
  const image = req.file;
  if (!name || !category || !brand || !price || !description || !quantity || !image) {
    res.status(400);
    throw new Error("Please enter all fields.");
  }
  if (await Product.findOne({ name })) {
    res.status(400);
    throw new Error("Product already exists.");
  }
  const imageUrl = `${req.protocol}://${req.get("host")}/uploads/${image.filename}`;
  await Product.create({ name, category, brand, price, description, quantity, image: imageUrl });
  res.status(201).json({ status: "success", message: "Product created successfully." });
});

// @desc    Get all products
// @route   GET /api/products
// @access  Public
const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({}).sort({ createdAt: -1 });
  res.json({ status: "success", products });
});

// @desc    Get a product by id
// @route   GET /api/products/:id
// @access  Public
const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    res.status(404);
    throw new Error("Product not found.");
  }

  res.json({ status: "success", product });
});

// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Private/Admin
const updateProduct = asyncHandler(async (req, res) => {
  const { name, category, brand, price, quantity, description } = req.body;
  if (!name || !category || !brand || !price || !quantity || !description) {
    res.status(400);
    throw new Error("Please enter all fields.");
  }
  if (!(await Product.findById(req.params.id))) {
    res.status(404);
    throw new Error("Product not found.");
  }
  await Product.findByIdAndUpdate(
    req.params.id,
    { name, category, brand, price, description, quantity },
    { new: true, runValidators: true }
  );
  res.json({ status: "success", message: "Product updated successfully." });
});

// @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  Private/Admin
const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    res.status(404);
    throw new Error("Product not found.");
  }
  await Product.deleteOne({ _id: req.params.id });
  res.status(200).json({ status: "success", message: "Product removed successfully." });
});

// @desc    Create a review of a product
// @route   POST /api/products/reviews/:id
// @access  Private
const createProductReview = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body;
  if (!rating || !comment) {
    res.status(400);
    throw new Error("Please enter rating and comment.");
  }
  const product = await Product.findById(req.params.id);
  if (!product) {
    res.status(404);
    throw new Error("Product not found.");
  }

  product.reviews.push({ userID: req.user._id, name: req.user.name, rating, comment, date: new Date(Date.now()) });
  await product.save();

  res.status(201).json({ status: "success", message: "Review added successfully." });
});

// @desc    Get all reviews of a product
// @route   GET /api/products/reviews/:id
// @access  Public
const getProductReviews = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    res.status(404);
    throw new Error("Product not found.");
  }

  res.json({ status: "success", reviews: product.reviews });
});

// @desc    Delete a review of a product
// @route   DELETE /api/products/reviews/:productId/:reviewId
// @access  Private
const deleteProductReview = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.productId);
  if (!product) {
    res.status(404);
    throw new Error("Product not found.");
  }
  product.reviews = product.reviews.filter((review) => review._id.toString() !== req.params.reviewId.toString());
  await product.save();
  res.status(200).json({ status: "success", message: "Review removed successfully." });
});

module.exports = {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  createProductReview,
  getProductReviews,
  deleteProductReview,
};
