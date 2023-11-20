import "./EditOrder.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "../../../components/loader/Loader";
import { getOrderById, updateOrderStatus } from "../../../redux/features/order/orderSlice";
import { toast } from "react-toastify";

function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { order, isLoading } = useSelector((state) => state.order);

  const [editOrderStatus, setEditOrderStatus] = useState(order?.orderStatus || "");

  // Get Order details
  useEffect(() => {
    dispatch(getOrderById(id));
  }, [dispatch, id]);

  // Set editOrderStatus
  useEffect(() => {
    setEditOrderStatus(order?.orderStatus);
  }, [order?.orderStatus]);

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!editOrderStatus) return toast.error("Please select order status.");
    await dispatch(updateOrderStatus({ id, orderStatus: editOrderStatus }));
    navigate("/admin/order");
  };

  return (
    <>
      {isLoading && <Loader />}
      <form onSubmit={handleSubmit}>
        <div>
          <div className="edit-order-header">
            <div className="btn back-btn" onClick={() => navigate(-1)}>
              <i className="fa-solid fa-chevron-left"></i>
            </div>
            <h1 className="section-title">Order Details</h1>
            <button type="submit" className="btn update-order-btn">
              Update
            </button>
          </div>

          <div className="order-group">
            <div className="form-group">
              <label htmlFor="name">Recipient name:</label>
              <input type="text" id="name" className="form-input" name="name" value={order?.user?.name} disabled />
            </div>

            <div className="form-group">
              <label htmlFor="email">Recipient email:</label>
              <input type="text" id="email" className="form-input" name="email" value={order?.user?.email} disabled />{" "}
            </div>

            <div className="form-group">
              <label htmlFor="orderDate">Order Date:</label>
              <input type="text" id="orderDate" className="form-input" name="orderDate" value={order?.createdAt.slice(0, 10)} disabled />
            </div>
          </div>

          <div className="order-table-container">
            <table className="order-details-table">
              <thead>
                <tr>
                  <th>Products</th>
                  <th>Quantity</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                {order?.orderItems?.map((item) => (
                  <tr key={item?._id}>
                    <td>{item?.name}</td>
                    <td>{item?.quantity}</td>
                    <td>${(item?.price * item?.quantity).toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>

              <tfoot>
                <tr>
                  <td>Total</td>
                  <td colSpan="2" className="order-details-grand-total">
                    <>${order?.orderAmount.toFixed(2)}</>
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>

          <div className="order-actions">
            <div className="form-group">
              <label htmlFor="payment">Payment method:</label>
              <input type="text" id="payment" className="form-input" name="payment" value={order?.paymentMethod} disabled />
            </div>

            <div className="form-group">
              <label htmlFor="orderStatus">
                <span className="order-status-title">Order Status:</span>
              </label>
              <select
                className="form-input"
                id="orderStatus"
                name="orderStatus"
                value={editOrderStatus}
                onChange={(e) => setEditOrderStatus(e.target.value)}
              >
                <option value="">-- Select Status --</option>
                <option value="Processing">Processing</option>
                <option value="Shipped">Shipped</option>
                <option value="Delivered">Delivered</option>
                <option value="Cancelled">Cancelled</option>
              </select>
            </div>
          </div>

          <div className="form-group order-shipping">
            <label htmlFor="shippingAddress">Shipping address:</label>
            <input type="text" id="payment" className="form-input" name="payment" value={order?.shippingAddress} disabled />
          </div>
        </div>
      </form>
    </>
  );
}

export default EditProduct;
