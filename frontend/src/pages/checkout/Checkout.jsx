import "./Checkout.css";

const orderProducts = [
  {
    id: 1,
    name: "Yidarton Women Summer Blue",
    price: 180.0,
    quantity: 2,
  },
  {
    id: 2,
    name: "Yidarton Women Summer Blue",
    price: 180.0,
    quantity: 2,
  },
  {
    id: 3,
    name: "Yidarton Women Summer Blue",
    price: 180.0,
    quantity: 2,
  },
  {
    id: 3,
    name: "Yidarton Women Summer Blue",
    price: 180.0,
    quantity: 2,
  },
  {
    id: 3,
    name: "Yidarton Women Summer Blue",
    price: 180.0,
    quantity: 2,
  },
];

function Checkout() {
  return (
    <section className="container section">
      <h1 className="section-title">Checkout</h1>
      <form className="checkout-container">
        <div className="checkout-group grid">
          <h3>Billing Details</h3>
          <input type="text" placeholder="Name" className="form-input" />
          <input type="text" placeholder="Address" className="form-input" />
          <input type="text" placeholder="Country" className="form-input" />
          <input type="text" placeholder="Postcode" className="form-input" />
          <input type="text" placeholder="Phone" className="form-input" />
          <input type="email" placeholder="Email" className="form-input" />
          <h3>Additional Information</h3>
          <textarea placeholder="Order note" className="form-input textarea"></textarea>
        </div>

        <div className="checkout-group grid">
          <h3>Cart Totals</h3>

          <table className="order-table">
            <tr>
              <th>Products</th>
              <th>Quantity</th>
              <th>Total</th>
            </tr>

            {orderProducts.map((product) => (
              <tr key={product.id}>
                <td className="">{product.name}</td>
                <td>{product.quantity}</td>
                <td>${product.price}</td>
              </tr>
            ))}

            <tr>
              <td>SubTotal</td>
              <td colSpan="2">$280.00</td>
            </tr>
            <tr>
              <td>Shipping</td>
              <td colSpan="2">Free Shipping</td>
            </tr>
            <tr>
              <td>Total</td>
              <td colSpan="2" className="order-grand-total">
                $280.00
              </td>
            </tr>
          </table>

          <div className="payment-methods">
            <h3>Payment</h3>

            <div className="payment-option">
              <input type="radio" id="bank-transfer" name="payment" className="payment-input" />
              <label htmlFor="bank-transfer">Bank Transfer</label>
            </div>

            <div className="payment-option">
              <input type="radio" id="credit-card" name="payment" className="payment-input" />
              <label htmlFor="credit-card">Credit card</label>
            </div>

            <div className="payment-option">
              <input type="radio" id="paypal" name="payment" className="payment-input" />
              <label htmlFor="paypal">Paypal</label>
            </div>
          </div>

          <button className="btn">Place Order</button>
        </div>
      </form>
    </section>
  );
}
export default Checkout;
