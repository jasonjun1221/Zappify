import { RouterProvider, createBrowserRouter } from "react-router-dom";
import axios from "axios";
import Layout from "./layout/Layout";
import Error from "./pages/error/Error";
import Home from "./pages/home/Home";
import Catergories from "./pages/categories/Catergories";
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
import ChangePasswordTab from "./pages/myaccount/ChangePasswordTab";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getProfile, loginStatus } from "./redux/features/auth/authSlice";

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
        { path: "catergories", element: <Catergories /> },
        { path: "login", element: <Login /> },
        { path: "cart", element: <Cart /> },
        { path: "checkout", element: <Checkout /> },
        { path: "register", element: <Register /> },
        { path: "product", element: <Product /> },
        {
          path: "myaccount",
          element: <MyAccount />,
          children: [
            { index: true, element: <DashboardTab /> },
            { path: "orders", element: <OrdersTab /> },
            { path: "update-profile", element: <UpdateProfileTab /> },
            { path: "address", element: <AddressTab /> },
            { path: "change-password", element: <ChangePasswordTab /> },
          ],
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
