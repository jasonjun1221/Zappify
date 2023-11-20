import axios from "axios";

// Create Order
const createOrder = async (formData) => {
  const response = await axios.post(`${import.meta.env.VITE_BACKEND_API_URL}/orders/`, formData);
  return response.data.message;
};

// Get Orders
const getOrders = async () => {
  const response = await axios.get(`${import.meta.env.VITE_BACKEND_API_URL}/orders/`);
  return response.data.orders;
};

// Get My Orders
const getMyOrders = async () => {
  const response = await axios.get(`${import.meta.env.VITE_BACKEND_API_URL}/orders/myorders`);
  return response.data.orders;
};

// Get Order By Id
const getOrderById = async (id) => {
  const response = await axios.get(`${import.meta.env.VITE_BACKEND_API_URL}/orders/${id}`);
  return response.data.order;
};

// Update Order Status
const updateOrderStatus = async (id, orderStatus) => {
  const response = await axios.put(`${import.meta.env.VITE_BACKEND_API_URL}/orders/${id}`, { orderStatus });
  return response.data.message;
};

const orderService = { createOrder, getOrders, getMyOrders, getOrderById, updateOrderStatus };

export default orderService;
