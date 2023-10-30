import { useSelector } from "react-redux";
import "./Checkout.css";
import { useEffect, useState } from "react";
import Loader from "../../components/loader/Loader";
import { CountryDropdown } from "react-country-region-selector";

function Checkout() {
  const { cartItems, totalPrice } = useSelector((state) => state.cart);
  const { user, isLoading } = useSelector((state) => state.auth);

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
  const [paymentMethod, setPaymentMethod] = useState("bank-transfer");

  // update local storage when userInfo changes
  useEffect(() => {
    localStorage.setItem("user", JSON.stringify({ ...user, checkoutInfo }));
  }, [checkoutInfo, user]);

  // handle input change
  const handleInputChange = (e) => {
    setUserInfo({ ...checkoutInfo, [e.target.name]: e.target.value });
  };

  // handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();
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
                  <td>Subtotal</td>
                  <td colSpan="2">${totalPrice.toFixed(2)}</td>
                </tr>
                <tr>
                  <td>Shipping</td>
                  <td colSpan="2">Free Shipping</td>
                </tr>
                <tr>
                  <td>Total</td>
                  <td colSpan="2" className="order-grand-total">
                    ${totalPrice.toFixed(2)}
                  </td>
                </tr>
              </tfoot>
            </table>

            <div className="payment-methods">
              <h3 className="section-title">Payment</h3>
              <div className="payment-option">
                <input
                  type="radio"
                  id="bank-transfer"
                  name="payment"
                  className="payment-input"
                  value="bank-transfer"
                  defaultChecked
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
                <label htmlFor="bank-transfer">Bank Transfer</label>
              </div>

              <div className="payment-option">
                <input
                  type="radio"
                  id="credit-card"
                  name="payment"
                  className="payment-input"
                  value="credit-card"
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
                <label htmlFor="credit-card">Credit card</label>
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
                Place Order
              </button>
            </div>
          </div>
        </form>
      </section>
    </>
  );
}
export default Checkout;
