import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import reviewService from "./reviewService";
import { toast } from "react-toastify";

const initialState = {
  reviews: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};

// Create Review
export const createReview = createAsyncThunk("review/createReview", async ({ productId, reviewData }, thunkAPI) => {
  try {
    return await reviewService.createReview(productId, reviewData);
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

// Get Reviews of a Product
export const getReviews = createAsyncThunk("review/getReviews", async (productId, thunkAPI) => {
  try {
    return await reviewService.getReviews(productId);
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

// Delete Review
export const deleteReview = createAsyncThunk("review/deleteReview", async ({ productId, reviewId }, thunkAPI) => {
  try {
    return await reviewService.deleteReview(productId, reviewId);
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

const reviewSlice = createSlice({
  name: "review",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Create Review
      .addCase(createReview.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createReview.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.message = payload;
        toast.success(payload);
      })
      .addCase(createReview.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.isError = true;
        state.message = payload;
        toast.error(payload);
      })
      // Get Reviews
      .addCase(getReviews.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getReviews.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.reviews = payload;
      })
      .addCase(getReviews.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.isError = true;
        state.message = payload;
        toast.error(payload);
      })
      // Delete Review
      .addCase(deleteReview.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteReview.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.message = payload;
        toast.success(payload);
      })
      .addCase(deleteReview.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.isError = true;
        state.message = payload;
        toast.error(payload);
      });
  },
});

export const {} = reviewSlice.actions;

export default reviewSlice.reducer;
