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

// Get Coupon
export const getCoupon = createAsyncThunk("coupon/getCoupon", async (couponName, thunkAPI) => {
  try {
    return await couponService.getCoupon(couponName);
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
  reducers: {
    resetCoupon: (state) => {
      state.coupon = null;
      state.coupons = [];
      state.isError = false;
      state.isLoading = false;
      state.isSuccess = false;
      state.message = "";
      localStorage.removeItem("coupon");
    },
  },
  extraReducers: (builder) =>
    builder
      // Create Coupon
      .addCase(createCoupon.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createCoupon.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.message = payload;
        toast.success(payload);
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
      // Get Coupon
      .addCase(getCoupon.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCoupon.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.coupon = payload;
        console.log(payload);
        toast.success("Coupon applied successfully.");
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
      .addCase(deleteCoupon.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = payload;
        toast.success(payload);
      })
      .addCase(deleteCoupon.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.isError = true;
        state.message = payload;
        toast.error(payload);
      }),
});

export const { resetCoupon } = couponSlice.actions;

export default couponSlice.reducer;
