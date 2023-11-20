import axios from "axios";

// Create Product
const createProduct = async (formData) => {
  const response = await axios.post(`${import.meta.env.VITE_BACKEND_API_URL}/products/`, formData);
  return response.data.message;
};

// Get Products
const getProducts = async () => {
  const response = await axios.get(`${import.meta.env.VITE_BACKEND_API_URL}/products/`);
  return response.data.products;
};

// Get Product by ID
const getProduct = async (id) => {
  const response = await axios.get(`${import.meta.env.VITE_BACKEND_API_URL}/products/${id}`);
  return response.data.product;
};

// Update Product
const updateProduct = async (id, formData) => {
  const response = await axios.put(`${import.meta.env.VITE_BACKEND_API_URL}/products/${id}`, formData);
  return response.data.message;
};

// Delete Product
const deleteProduct = async (id) => {
  const response = await axios.delete(`${import.meta.env.VITE_BACKEND_API_URL}/products/${id}`);
  return response.data.message;
};

const productService = { createProduct, getProducts, getProduct, updateProduct, deleteProduct };

export default productService;
