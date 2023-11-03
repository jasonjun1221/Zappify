const asyncHandler = require("../utils/asyncHandler.js");
const Category = require("../models/categoryModel.js");
const slugify = require("slugify");

// @desc    Create a new category
// @route   POST /api/categories
// @access  Private/Admin
const createCategory = asyncHandler(async (req, res) => {
  const { name } = req.body;

  // Check if name is filled in
  if (!name) {
    res.status(400);
    throw new Error("Please enter a category name.");
  }

  // Check if category already exists
  if (await Category.findOne({ name })) {
    res.status(400);
    throw new Error("Category already exists.");
  }

  await Category.create({ name, slug: slugify(name) });
  res.status(201).json({ status: "success", message: "Category created successfully." });
});

// @desc    Get all categories
// @route   GET /api/categories
// @access  Public
const getCategories = asyncHandler(async (req, res) => {
  const categories = await Category.find({}).sort({ createdAt: -1 });
  res.json({ status: "success", categories });
});

// @desc    Delete a category
// @route   DELETE /api/categories/:id
// @access  Private/Admin
const deleteCategory = asyncHandler(async (req, res) => {
  const slug = req.params.slug.toLowerCase();

  if (!(await Category.findOne({ slug }))) {
    res.status(404);
    throw new Error("Category not found.");
  }

  await Category.deleteOne({ slug });
  res.json({ status: "success", message: "Category removed successfully." });
});

module.exports = { createCategory, getCategories, deleteCategory };
