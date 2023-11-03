import { useDispatch, useSelector } from "react-redux";
import "./Checkout.css";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Loader from "../../components/loader/Loader";
import { CountryDropdown } from "react-country-region-selector";
import { calculateTotalPrice, resetCart} from "../../redux/features/cart/cartSlice";
import { createOrder } from "../../redux/features/order/orderSlice";
import { resetCoupon } from "../../redux/features/coupon/couponSlice";

function Checkout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cartItems, totalPrice, discountedPrice } = useSelector((state) => state.cart);
  const { user, isLoading } = useSelector((state) => state.auth);
  const { coupon } = useSelector((state) => state.coupon);

  const initialState = {
    name: user?.name || JSON.parse(localStorage.getItem("user"))?.name || "",
    phone: user?.phone || JSON.parse(localStorage.getItem("user"))?.phone || "",
    street: user?.address?.street || JSON.parse(localStorage.getItem("user"))?.address?.street || "",
    postalCode: user?.address?.postalCode || JSON.parse(localStorage.getItem("user"))?.address?.postalCode || "",
    country: user?.address?.country || JSON.parse(localStorage.getItem("user"))?.address?.country || "",
    email: user?.email || JSON.parse(localStorage.getItem("user"))?.email || "",
    orderNote: "",
  };
  const [checkoutInfo, setUserInfo] = useState(initialState);
  const [paymentMethod, setPaymentMethod] = useState("cash-on-delivery");

  // update local storage when userInfo changes
  useEffect(() => {
    localStorage.setItem("user", JSON.stringify({ ...user, checkoutInfo }));
  }, [checkoutInfo, user]);

  // Calculate total price
  useEffect(() => {
    dispatch(calculateTotalPrice(JSON.parse(localStorage.getItem("coupon"))));
  }, [dispatch, coupon]);

  // handle input change
  const handleInputChange = (e) => {
    setUserInfo({ ...checkoutInfo, [e.target.name]: e.target.value });
  };

  // handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    await dispatch(createOrder({ cartItems, checkoutInfo, paymentMethod, coupon }));
    dispatch(resetCart());
    dispatch(resetCoupon());
    navigate("/");
  };

  return (
    <>
      {isLoading && <Loader />}
      <section className="container section">
        <form className="checkout-container" onSubmit={handleSubmit}>
          <div className="checkout-group grid">
            <h3 className="section-title checkout-title">Shipping Address</h3>
            <label htmlFor="name">Recipient Name: </label>
            <input
              type="text"
              placeholder="Name"
              className="form-input"
              id="name"
              name="name"
              value={checkoutInfo?.name}
              onChange={handleInputChange}
            />
            <label htmlFor="street">Street Address: </label>
            <input type="text" className="form-input" id="street" name="street" value={checkoutInfo?.street} onChange={handleInputChange} />
            <label htmlFor="postalCode">Postal Code: </label>
            <input
              type="text"
              className="form-input"
              id="postalCode"
              name="postalCode"
              value={checkoutInfo?.postalCode}
              onChange={handleInputChange}
            />
            <label htmlFor="country">Country: </label>
            <CountryDropdown
              className="form-input"
              id="country"
              value={checkoutInfo?.country}
              onChange={(val) => handleInputChange({ target: { name: "country", value: val } })}
            />
            <label htmlFor="country">Phone no.: </label>
            <input
              type="text"
              placeholder="Phone"
              className="form-input"
              id="phone"
              name="phone"
              value={checkoutInfo?.phone}
              onChange={handleInputChange}
            />
            <label htmlFor="email">Email: </label>
            <input
              type="email"
              placeholder="Email"
              className="form-input"
              id="email"
              name="email"
              value={checkoutInfo?.email}
              onChange={handleInputChange}
            />
            <h3>Additional Information</h3>
            <textarea
              placeholder="Order note"
              className="form-input textarea"
              name="orderNote"
              value={checkoutInfo.orderNote}
              onChange={handleInputChange}
            ></textarea>
          </div>

          <div className="checkout-group">
            <h3 className="section-title checkout-title">Cart Totals</h3>

            <table className="order-table">
              <thead>
                <tr>
                  <th>Products</th>
                  <th>Quantity</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item) => (
                  <tr key={item?._id}>
                    <td>{item?.name}</td>
                    <td>{item?.cartQuantity}</td>
                    <td>${(item?.price * item?.cartQuantity).toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>

              <tfoot>
                <tr>
                  <td>Total</td>
                  <td colSpan="2" className="order-grand-total">
                    {discountedPrice > 0 ? (
                      <>
                        <del className="strike-price">${totalPrice.toFixed(2)}</del> ${discountedPrice.toFixed(2)}
                      </>
                    ) : (
                      <>${totalPrice.toFixed(2)}</>
                    )}
                  </td>
                </tr>
              </tfoot>
            </table>

            <div className="payment-methods">
              <h3 className="section-title">Payment</h3>
              <div className="payment-option">
                <input
                  type="radio"
                  id="cash-on-delivery"
                  name="payment"
                  className="payment-input"
                  value="cash-on-delivery"
                  defaultChecked
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
                <label htmlFor="cash-on-delivery">Cash On Delivery</label>
              </div>

              <div className="payment-option">
                <input
                  type="radio"
                  id="stripe"
                  name="payment"
                  className="payment-input"
                  value="stripe"
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
                <label htmlFor="stripe">Stripe</label>
              </div>

              <div className="payment-option">
                <input
                  type="radio"
                  id="paypal"
                  name="payment"
                  className="payment-input"
                  value="paypal"
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
                <label htmlFor="paypal">Paypal</label>
              </div>
              <button type="submit" className="btn">
                {paymentMethod === "cash-on-delivery" ? "Place Order" : "Make Payment"}
              </button>
            </div>
          </div>
        </form>
      </section>
    </>
  );
}
export default Checkout;
