import axios from "axios";

export const API_URL = `http://localhost:5000/api`;

// Create Category
const createCategory = async (formData) => {
  const response = await axios.post(`${API_URL}/categories/`, formData);
  return response.data;
};

// Get Categories
const getCategories = async () => {
  const response = await axios.get(`${API_URL}/categories/`);
  return response.data.categories;
};

// Delete Category
const deleteCategory = async (slug) => {
  const response = await axios.delete(`${API_URL}/categories/${slug}`);
  return response.data;
};

const categoryService = { createCategory, getCategories, deleteCategory };

export default categoryService;
