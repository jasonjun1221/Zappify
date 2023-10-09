import { Link } from "react-router-dom";
import "./Cart.css";
import productPNG from "../../assets/product.jpg";

const products = [
  {
    id: 1,
    name: "Lenovo IdeaPad 3 82RM002SSB",
    description: "8GB RAM, 512GB SSD, Integrated AMD Radeon™ Graphics, Windows 11 Home 64",
    price: 110,
    image: productPNG,
    quantity: 1,
  },
  {
    id: 2,
    name: "Lenovo IdeaPad 3 82RM002SSB",
    description: "8GB RAM, 512GB SSD, Integrated AMD Radeon™ Graphics, Windows 11 Home 64",
    price: 110,
    image: productPNG,
    quantity: 1,
  },
  {
    id: 3,
    name: "Lenovo IdeaPad 3 82RM002SSB",
    description: "8GB RAM, 512GB SSD, Integrated AMD Radeon™ Graphics, Windows 11 Home 64",
    price: 110,
    image: productPNG,
    quantity: 1,
  },
];

function Cart() {
  return (
    <section className="section container">
      <h1 className="section-title">Shopping Cart</h1>
      <div className="table-container">
        <table className="table">
          <tr>
            <th>Image</th>
            <th>Name</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Subtotal</th>
            <th>Remove</th>
          </tr>

          {products.map((product, index) => (
            <tr key={index}>
              <td>
                <img src={product.image} alt={product.name} className="table-img" />
              </td>

              <td>
                <h3 className="table-title">{product.name}</h3>
                <p className="table-description">{product.description}</p>
              </td>

              <td>
                <span className="table-price">${product.price}</span>
              </td>

              <td>
                <input type="number" value={product.quantity} min="1" max="99" className="quantity" />
              </td>

              <td>
                <span className="table-subtotal">$220</span>
              </td>

              <td>
                <i className="fa-solid fa-trash table-trash"></i>
              </td>
            </tr>
          ))}
        </table>
      </div>

      <div className="cart-group grid">
        <div className="cart-shipping"></div>

        <div className="cart-total">
          <h3 className="section-title">Cart Totals</h3>

          <table className="cart-total-table">
            <tr>
              <td>
                <span className="cart-total-title">Cart Subtotal</span>
              </td>
              <td>
                <span className="cart-total-price">$240.00</span>
              </td>
            </tr>

            <tr>
              <td>
                <span className="cart-total-title">Shipping</span>
              </td>
              <td>
                <span className="cart-total-price">$10.00</span>
              </td>
            </tr>

            <tr>
              <td>
                <span className="cart-total-title">Total</span>
              </td>
              <td>
                <span className="cart-total-price">$250.00</span>
              </td>
            </tr>
          </table>

          <Link to="/checkout" class="btn">
            Proceed to Checkout
          </Link>
        </div>
      </div>
    </section>
  );
}
export default Cart;
