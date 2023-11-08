import axios from "axios";

export const API_URL = `http://localhost:5000/api`;

// Create Review
const createReview = async (productId, reviewData) => {
  const response = await axios.post(`${API_URL}/products/reviews/${productId}`, reviewData);
  return response.data.message;
};

// Get Reviews of a Product
const getReviews = async (productId) => {
  const response = await axios.get(`${API_URL}/products/reviews/${productId}`);
  return response.data.reviews;
};

// Delete Review
const deleteReview = async (productId, reviewId) => {
  const response = await axios.delete(`${API_URL}/products/reviews/${productId}/${reviewId}`);
  return response.data.message;
};

const reviewService = { createReview, getReviews, deleteReview };

export default reviewService;
