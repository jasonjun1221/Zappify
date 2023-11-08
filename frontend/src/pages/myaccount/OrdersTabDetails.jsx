import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getOrderById } from "../../redux/features/order/orderSlice";
import Loader from "../../components/loader/Loader";

function OrdersTabDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { order, isLoading } = useSelector((state) => state.order);

  // Get Order By Id
  useEffect(() => {
    dispatch(getOrderById(id));
  }, [dispatch, id]);

  return (
    <>
      {isLoading && <Loader />}
      <div className="tab-content">
        <h3 className="tab-header">Order Details</h3>

        <div className="my-order-details">
          <div className="myorder-group">
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

          <div className="myorder-table-container">
            <table className="myorder-details-table">
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

          <div className="myorder-actions">
            <div className="form-group">
              <label htmlFor="payment">Payment method:</label>
              <input type="text" id="payment" className="form-input" name="payment" value={order?.paymentMethod} disabled />
            </div>

            <div className="form-group">
              <label htmlFor="orderStatus">
                <span className="order-status-title">Order Status:</span>
              </label>
              <input type="text" id="orderStatus" className="form-input" name="orderStatus" value={order?.orderStatus} disabled />
            </div>
          </div>

          <div className="form-group myorder-shipping">
            <label htmlFor="shippingAddress">Shipping address:</label>
            <input type="text" id="payment" className="form-input" name="payment" value={order?.shippingAddress} disabled />
          </div>
        </div>
      </div>
    </>
  );
}
export default OrdersTabDetails;
