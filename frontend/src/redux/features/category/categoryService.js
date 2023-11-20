import axios from "axios";

// Create Category
const createCategory = async (formData) => {
  const response = await axios.post(`${import.meta.env.VITE_BACKEND_API_URL}/categories/`, formData);
  return response.data.message;
};

// Get Categories
const getCategories = async () => {
  const response = await axios.get(`${import.meta.env.VITE_BACKEND_API_URL}/categories/`);
  return response.data.categories;
};

// Delete Category
const deleteCategory = async (slug) => {
  const response = await axios.delete(`${import.meta.env.VITE_BACKEND_API_URL}/categories/${slug}`);
  return response.data.message;
};

const categoryService = { createCategory, getCategories, deleteCategory };

export default categoryService;
