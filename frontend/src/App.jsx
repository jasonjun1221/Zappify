import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getProfile, loginStatus } from "./redux/features/auth/authSlice";
import axios from "axios";

// Pages & Layouts
import Layout from "./layout/Layout";
import PageNotFound from "./pages/error/PageNotFound";
import Home from "./pages/home/Home";
import Register from "./pages/auth/Register";
import Login from "./pages/auth/Login";
import Shop from "./pages/shop/Shop";
import About from "./pages/about/About";
import Cart from "./pages/cart/Cart";
import Checkout from "./pages/checkout/Checkout";
import ProductDetails from "./pages/productDetails/ProductDetails";

// My Account Pages
import MyAccount from "./pages/myaccount/MyAccount";
import DashboardTab from "./pages/myaccount/DashboardTab";
import OrdersTab from "./pages/myaccount/OrdersTab";
import UpdateProfileTab from "./pages/myaccount/UpdateProfileTab";
import AddressTab from "./pages/myaccount/AddressTab";
import UpdatePasswordTab from "./pages/myaccount/UpdatePasswordTab";

// Admin Panel
import Admin from "./pages/admin/Admin";
import Dashboard from "./pages/admin/dashboard/Dashboard";
import Category from "./pages/admin/category/Category";
import Brand from "./pages/admin/brand/Brand";
import Product from "./pages/admin/product/Product";
import AddProduct from "./pages/admin/product/AddProduct";
import EditProduct from "./pages/admin/product/EditProduct";
import Coupon from "./pages/admin/coupon/Coupon";

function App() {
  axios.defaults.withCredentials = true;
  const dispatch = useDispatch();
  const { isLoggedIn, user } = useSelector((state) => state.auth);


  // Check if user is logged in
  useEffect(() => {
    dispatch(loginStatus());
  }, [dispatch]);

  // Get user profile
  useEffect(() => {
    if (isLoggedIn && user === null) {
      dispatch(getProfile());
    }
  }, [dispatch, isLoggedIn, user]);

  // Create routes
  const router = createBrowserRouter([
    {
      element: <Layout />,
      errorElement: <PageNotFound />,
      children: [
        { index: true, element: <Home /> },
        { path: "shop", element: <Shop /> },
        { path: "about", element: <About /> },
        { path: "login", element: <Login /> },
        { path: "cart", element: <Cart /> },
        { path: "checkout", element: <Checkout /> },
        { path: "register", element: <Register /> },
        { path: "product-details/:id", element: <ProductDetails /> },
        {
          path: "myaccount",
          element: <MyAccount />,
          children: [
            { index: true, element: <DashboardTab /> },
            { path: "orders", element: <OrdersTab /> },
            { path: "address", element: <AddressTab /> },
            { path: "update-profile", element: <UpdateProfileTab /> },
            { path: "update-password", element: <UpdatePasswordTab /> },
          ],
        },
        {
          path: "admin",
          element: user?.isAdmin && <Admin />,
          children: [
            { index: true, element: <Dashboard /> },
            { path: "category", element: <Category /> },
            { path: "brand", element: <Brand /> },
            { path: "product", element: <Product /> },
            { path: "add-product", element: <AddProduct /> },
            { path: "edit-product/:id", element: <EditProduct /> },
            { path: "coupon", element: <Coupon /> },
          ],
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
