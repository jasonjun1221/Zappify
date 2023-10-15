import { RouterProvider, createBrowserRouter } from "react-router-dom";
import axios from "axios";
import Layout from "./layout/Layout";
import Error from "./pages/error/Error";
import Home from "./pages/home/Home";
import Shop from "./pages/shop/Shop";
import About from "./pages/about/About";
import Login from "./pages/auth/Login";
import Cart from "./pages/cart/Cart";
import Checkout from "./pages/checkout/Checkout";
import Register from "./pages/auth/Register";
import Product from "./pages/product/Product";
import MyAccount from "./pages/myaccount/MyAccount";
import DashboardTab from "./pages/myaccount/DashboardTab";
import OrdersTab from "./pages/myaccount/OrdersTab";
import UpdateProfileTab from "./pages/myaccount/UpdateProfileTab";
import AddressTab from "./pages/myaccount/AddressTab";
import UpdatePasswordTab from "./pages/myaccount/UpdatePasswordTab";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getProfile, loginStatus } from "./redux/features/auth/authSlice";
import Admin from "./pages/admin/Admin";
import AdminDashboard from "./pages/admin/dashboard/AdminDashboard";
import AddProduct from "./pages/admin/product/AddProduct";
import AddCategory from "./pages/admin/category/AddCategory";
import AddBrand from "./pages/admin/brand/AddBrand";
import ProductList from "./pages/admin/product/ProductList";

function App() {
  axios.defaults.withCredentials = true;
  const dispatch = useDispatch();
  const { isLoggedIn, user } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(loginStatus());
  }, [dispatch]);

  useEffect(() => {
    if (isLoggedIn && user === null) {
      dispatch(getProfile());
    }
  }, [dispatch, isLoggedIn, user]);

  const router = createBrowserRouter([
    {
      element: <Layout />,
      errorElement: <Error />,
      children: [
        { index: true, element: <Home /> },
        { path: "shop", element: <Shop /> },
        { path: "about", element: <About /> },
        { path: "login", element: <Login /> },
        { path: "cart", element: <Cart /> },
        { path: "checkout", element: <Checkout /> },
        { path: "register", element: <Register /> },
        { path: "product", element: <Product /> },
        {
          path: "myaccount",
          element: <MyAccount />,
          children: [
            { path: "dashboard", element: <DashboardTab /> },
            { path: "orders", element: <OrdersTab /> },
            { path: "address", element: <AddressTab /> },
            { path: "update-profile", element: <UpdateProfileTab /> },
            { path: "update-password", element: <UpdatePasswordTab /> },
          ],
        },
        {
          path: "admin",
          // element: user?.isAdmin && <Admin />,
          element: <Admin />,
          children: [
            { path: "dashboard", element: <AdminDashboard /> },
            { path: "products", element: <ProductList /> },
            { path: "add-product", element: <AddProduct /> },
            { path: "add-category", element: <AddCategory /> },
            { path: "add-brand", element: <AddBrand /> },
          ],
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
