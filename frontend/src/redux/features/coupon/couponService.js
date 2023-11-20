import axios from "axios";

// Create Coupon
const createCoupon = async (formData) => {
  const response = await axios.post(`${import.meta.env.VITE_BACKEND_API_URL}/coupons/`, formData);
  return response.data.message;
};

// Get Coupons
const getCoupons = async () => {
  const response = await axios.get(`${import.meta.env.VITE_BACKEND_API_URL}/coupons/`);
  return response.data.coupons;
};

// Get Coupon
const getCoupon = async (couponName) => {
  const response = await axios.get(`${import.meta.env.VITE_BACKEND_API_URL}/coupons/${couponName}`);
  return response.data.coupon;
};

// Delete Coupon
const deleteCoupon = async (id) => {
  const response = await axios.delete(`${import.meta.env.VITE_BACKEND_API_URL}/coupons/${id}`);
  return response.data.message;
};

// Send Email
const sendEmail = async (formData) => {
  const response = await axios.post(`${import.meta.env.VITE_BACKEND_API_URL}/coupons/send-email`, formData);
  return response.data.message;
};

const couponService = { createCoupon, getCoupons, getCoupon, deleteCoupon, sendEmail };

export default couponService;
