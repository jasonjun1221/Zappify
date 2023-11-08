import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import orderService from "./orderService";
import { toast } from "react-toastify";

const initialState = {
  order: null,
  orders: [],
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: "",
};

// Create Order
export const createOrder = createAsyncThunk("order/createOrder", async (formData, thunkAPI) => {
  try {
    return await orderService.createOrder(formData);
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

// Get Orders
export const getOrders = createAsyncThunk("order/getOrders", async (_, thunkAPI) => {
  try {
    return await orderService.getOrders();
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

// Get My Orders
export const getMyOrders = createAsyncThunk("order/getMyOrders", async (_, thunkAPI) => {
  try {
    return await orderService.getMyOrders();
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

// Get Order By Id
export const getOrderById = createAsyncThunk("order/getOrderById", async (id, thunkAPI) => {
  try {
    return await orderService.getOrderById(id);
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

// Update Order Status
export const updateOrderStatus = createAsyncThunk("order/updateOrderStatus", async ({ id, orderStatus }, thunkAPI) => {
  try {
    return await orderService.updateOrderStatus(id, orderStatus);
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    resetOrder: (state) => {
      state.order = null;
      state.orders = [];
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      // Create Order
      .addCase(createOrder.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createOrder.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.message = payload;
        toast.success(payload);
      })
      .addCase(createOrder.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = payload;
        toast.error(payload);
      })
      // Get Orders
      .addCase(getOrders.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getOrders.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.orders = payload;
      })
      .addCase(getOrders.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = payload;
        toast.error(payload);
      })
      // Get My Orders
      .addCase(getMyOrders.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getMyOrders.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.orders = payload;
      })
      .addCase(getMyOrders.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = payload;
        toast.error(payload);
      })
      // Get Order By Id
      .addCase(getOrderById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getOrderById.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.order = payload;
      })
      .addCase(getOrderById.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = payload;
        toast.error(payload);
      })
      // Update Order Status
      .addCase(updateOrderStatus.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateOrderStatus.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.message = payload;
        toast.success(payload);
      })
      .addCase(updateOrderStatus.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = payload;
        toast.error(payload);
      });
  },
});

export const { resetOrder } = orderSlice.actions;

export default orderSlice.reducer;
