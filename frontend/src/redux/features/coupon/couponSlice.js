import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import couponService from "./couponService";
import { toast } from "react-toastify";

const initialState = {
  coupon: null,
  coupons: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};

// Create Coupon
export const createCoupon = createAsyncThunk("coupon/createCoupon", async (formData, thunkAPI) => {
  try {
    return await couponService.createCoupon(formData);
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

// Get Coupons
export const getCoupons = createAsyncThunk("coupon/getCoupons", async (_, thunkAPI) => {
  try {
    return await couponService.getCoupons();
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

// Get Coupon by ID
export const getCoupon = createAsyncThunk("coupon/getCoupon", async (id, thunkAPI) => {
  try {
    return await couponService.getCouponById(id);
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

// Delete Coupon
export const deleteCoupon = createAsyncThunk("coupon/deleteCoupon", async (id, thunkAPI) => {
  try {
    return await couponService.deleteCoupon(id);
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

const couponSlice = createSlice({
  name: "coupon",
  initialState,
  reducers: {},
  extraReducers: (builder) =>
    builder
      // Create Coupon
      .addCase(createCoupon.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createCoupon.fulfilled, (state) => {
        state.isLoading = false;
        state.isSuccess = true;
        toast.success("Coupon created successfully");
      })
      .addCase(createCoupon.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.isError = true;
        state.message = payload;
        toast.error(payload);
      })
      // Get Coupons
      .addCase(getCoupons.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCoupons.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.coupons = payload;
      })
      .addCase(getCoupons.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.isError = true;
        state.message = payload;
      })
      // Get Coupon by ID
      .addCase(getCoupon.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCoupon.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.coupon = payload;
      })
      .addCase(getCoupon.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.isError = true;
        state.message = payload;
        toast.error(payload);
      })
      // Delete Coupon
      .addCase(deleteCoupon.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteCoupon.fulfilled, (state) => {
        state.isLoading = false;
        state.isSuccess = true;
        toast.success("Coupon deleted successfully.");
      })
      .addCase(deleteCoupon.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.isError = true;
        state.message = payload;
        toast.error(payload);
      }),
});

export const {} = couponSlice.actions;

export default couponSlice.reducer;
