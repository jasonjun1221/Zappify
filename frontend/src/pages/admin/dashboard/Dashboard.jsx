import { useEffect } from "react";
import "./Dashboard.css";
import { useDispatch, useSelector } from "react-redux";
import { getOrders } from "../../../redux/features/order/orderSlice";
import { getUsers } from "../../../redux/features/auth/authSlice";

function Dashboard() {
  const dispatch = useDispatch();
  const { orders } = useSelector((state) => state.order);
  const { users } = useSelector((state) => state.auth);

  // Get all orders
  useEffect(() => {
    dispatch(getOrders());
  }, [dispatch]);

  // Get all users
  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  // Calculate total sales
  const totalSales = orders.reduce((acc, order) => acc + order.orderAmount, 0).toFixed(2);

  // Get recent orders
  const recentOrders = orders.slice(0, 5);

  return (
    <div className="dashboard">
      <div className="statistic-container">
        <div className="sales-box">
          <p>Total Sales</p>
          <h1>{totalSales || "Loading..."}</h1>
        </div>

        <div className="sales-box">
          <p>Total Users</p>
          <h1>{users.length || "Loading..."}</h1>
        </div>
      </div>

      <div className="dashboard-list">
        <h2 className="section-title">Recent Orders</h2>
        <table className="dashboard-table">
          <thead>
            <tr>
              <th>No.</th>
              <th>Order ID</th>
              <th>Order Amount</th>
              <th>Order Date</th>
              <th>Order Status</th>
            </tr>
          </thead>
          <tbody>
            {recentOrders.map((order, index) => (
              <tr key={order._id}>
                <td>{index + 1}</td>
                <td>{order._id}</td>
                <td>{order.orderAmount}</td>
                <td>{order.createdAt.substring(0, 10)}</td>
                <td>{order.orderStatus}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Dashboard;
