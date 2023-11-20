import axios from "axios";

// Create Brand
const createBrand = async (formData) => {
  const response = await axios.post(`${import.meta.env.VITE_BACKEND_API_URL}/brands/`, formData);
  return response.data.message;
};

// Get Brands
const getBrands = async () => {
  const response = await axios.get(`${import.meta.env.VITE_BACKEND_API_URL}/brands/`);
  return response.data.brands;
};

// Delete Brand
const deleteBrand = async (slug) => {
  const response = await axios.delete(`${import.meta.env.VITE_BACKEND_API_URL}/brands/${slug}`);
  return response.data.message;
};

const brandService = { createBrand, getBrands, deleteBrand };

export default brandService;
