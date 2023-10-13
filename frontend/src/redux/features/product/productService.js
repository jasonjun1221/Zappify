import axios from "axios";

export const API_URL = `http://localhost:5000/api`;

// Create Product
const createProduct = async (formData) => {
  const response = await axios.post(`${API_URL}/products/`, formData);
  return response.data;
};

// Get Products
const getProducts = async () => {
  const response = await axios.get(`${API_URL}/products/`);
  return response.data.products;
};

// Delete Product
const deleteProduct = async (id) => {
  const response = await axios.delete(`${API_URL}/products/${id}`);
  return response.data;
};

const productService = { createProduct, getProducts, deleteProduct };

export default productService;
