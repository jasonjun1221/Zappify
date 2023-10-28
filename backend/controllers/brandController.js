const asyncHandler = require("../utils/asyncHandler.js");
const Brand = require("../models/brandModel.js");
const Category = require("../models/categoryModel.js");
const slugify = require("slugify");

// @desc    Create a brand
// @route   POST /api/brands
// @access  Private/Admin
const createBrand = asyncHandler(async (req, res) => {
  const { name, category } = req.body;

  if (!name || !category) {
    res.status(400);
    throw new Error("Please enter all fields.");
  }

  if (await Brand.findOne({ name, category })) {
    res.status(400);
    throw new Error("Brand already exists.");
  }

  if (!(await Category.findOne({ name: category }))) {
    res.status(400);
    throw new Error("Category does not exist.");
  }

  const brand = await Brand.create({ name, slug: slugify(`${name}-${category}`), category });
  res.status(201).json({ status: "success", brand });
});

// @desc    Get all brands
// @route   GET /api/brands
// @access  Public
const getBrands = asyncHandler(async (req, res) => {
  const brands = await Brand.find({}).sort({ createdAt: -1 });
  res.status(200).json({ status: "success", brands });
});

// @desc    Delete a brand
// @route   DELETE /api/brands/:id
// @access  Private/Admin
const deleteBrand = asyncHandler(async (req, res) => {
  const slug = req.params.slug.toLowerCase();

  if (!(await Brand.findOne({ slug }))) {
    res.status(404);
    throw new Error("Brand not found.");
  }

  await Brand.deleteOne({ slug });
  res.status(200).json({ status: "success", message: "Brand removed." });
});

module.exports = { createBrand, getBrands, deleteBrand };
