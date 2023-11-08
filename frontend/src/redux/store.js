import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/auth/authSlice";
import categoryReducer from "./features/category/categorySlice";
import brandReducer from "./features/brand/brandSlice";
import productReducer from "./features/product/productSlice";
import filterReducer from "./features/product/filterSlice";
import cartReducer from "./features/cart/cartSlice";
import couponReducer from "./features/coupon/couponSlice";
import orderReducer from "./features/order/orderSlice";
import reviewReducer from "./features/review/reviewSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    category: categoryReducer,
    brand: brandReducer,
    product: productReducer,
    filter: filterReducer,
    cart: cartReducer,
    coupon: couponReducer,
    order: orderReducer,
    review: reviewReducer,
  },
});

export default store;
