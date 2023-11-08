import "./Order.css";
import { useEffect } from "react";
import "react-confirm-alert/src/react-confirm-alert.css";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { shortenText } from "../../../utils/utils";
import { getOrders } from "../../../redux/features/order/orderSlice";

function OrderList({ orders, currentItems, itemOffset }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Get orders
  useEffect(() => {
    dispatch(getOrders());
  }, [dispatch]);

  return (
    <>
      {orders.length === 0 ? (
        <p className="not-found">No order found.</p>
      ) : (
        <table className="order-table">
          <thead>
            <tr>
              <th>No.</th>
              <th>Recipient Name</th>
              <th>Recipient Email</th>
              <th>Recipient Phone</th>
              <th>Order Status</th>
              <th>Order Amount</th>
              <th>Order Date</th>
              <th>Edit</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((order, index) => (
              <tr key={order._id}>
                <td>{index + 1 + itemOffset}</td>
                <td>{shortenText(order?.user?.name, 12)}</td>
                <td>{shortenText(order?.user?.email, 20)}</td>
                <td>{order?.user?.phone}</td>
                <td>{order?.orderStatus}</td>
                <td>{order?.orderAmount.toFixed(2)}</td>
                <td>{order?.createdAt.substring(0, 10)}</td>
                <td>
                  <span>
                    <i className="fa-solid fa-pen-to-square edit-icon" onClick={() => navigate(`/admin/edit-order/${order._id}`)}></i>
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
}
export default OrderList;
