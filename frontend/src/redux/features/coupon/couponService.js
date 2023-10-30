import axios from "axios";

export const API_URL = `http://localhost:5000/api`;

// Create Coupon
const createCoupon = async (formData) => {
  const response = await axios.post(`${API_URL}/coupons/`, formData);
  return response.data;
};

// Get Coupons
const getCoupons = async () => {
  const response = await axios.get(`${API_URL}/coupons/`);
  return response.data.coupons;
};

// Get Coupon
const getCoupon = async (couponName) => {
  const response = await axios.get(`${API_URL}/coupons/${couponName}`);
  return response.data.coupon;
};

// Delete Coupon
const deleteCoupon = async (id) => {
  const response = await axios.delete(`${API_URL}/coupons/${id}`);
  return response.data;
};

const couponService = { createCoupon, getCoupons, getCoupon, deleteCoupon };

export default couponService;
