import { Link } from "react-router-dom";
import "./Cart.css";
import { useDispatch, useSelector } from "react-redux";
import { calculateTotalPrice, decreaseQuantity, increaseQuantity, removeFromCart } from "../../redux/features/cart/cartSlice";
import { useEffect } from "react";
import { shortenText } from "../../utils/utils";

function Cart() {
  const dispatch = useDispatch();
  const { cartItems, totalPrice } = useSelector((state) => state.cart);

  // Calculate total price when cart items change
  useEffect(() => {
    dispatch(calculateTotalPrice());
  }, [cartItems, dispatch]);

  return (
    <section className="section container">
      {cartItems.length === 0 ? (
        <div className="cart-empty-container">
          <h1 className="cart-empty-title">Your Cart is Empty</h1>
          <p className="cart-empty-message">Oops! It looks like your shopping cart is empty.</p>
          <div className="cart-empty-actions">
            <Link to="/shop" class="btn btn-primary">
              Continue Shopping
            </Link>
          </div>
        </div>
      ) : (
        <>
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

              {cartItems.map((product, index) => (
                <tr key={index}>
                  <td>
                    <img src={product?.image} alt={product?.name} className="table-img" />
                  </td>

                  <td>
                    <h3 className="table-title">{product?.name}</h3>
                    <p className="table-description">{shortenText(product?.description, 145)}</p>
                  </td>

                  <td>
                    <span className="table-price">${product?.price.toFixed(2)}</span>
                  </td>

                  <td>
                    <div className="cart-actions">
                      <button className="cart-action-btn" onClick={() => dispatch(decreaseQuantity(product))}>
                        -
                      </button>
                      <input type="text" className="cart-quantity" value={product?.cartQuantity} disabled />
                      <button className="cart-action-btn" onClick={() => dispatch(increaseQuantity(product))}>
                        +
                      </button>
                    </div>
                  </td>

                  <td>
                    <span className="table-subtotal">${(product?.price * product?.cartQuantity).toFixed(2)}</span>
                  </td>

                  <td>
                    <i className="fa-solid fa-trash table-trash trash-icon" onClick={() => dispatch(removeFromCart(product))}></i>
                  </td>
                </tr>
              ))}
            </table>
          </div>

          <div className="cart-group grid">
            <div className="cart-coupon">
              <h3 className="section-title">Apply Coupon</h3>
              <form>
                <div className="form-group apply-coupon">
                  <label htmlFor="couponName">Coupon name:</label>
                  <input type="text" id="couponName" placeholder="Coupon" className="form-input" />
                  <button type="submit" className="btn">
                    Apply
                  </button>
                </div>
              </form>
            </div>

            <div className="cart-total">
              <h3 className="section-title">Cart Total</h3>

              <table className="cart-total-table">
                <tr>
                  <td>
                    <span className="cart-total-title">Cart Subtotal</span>
                  </td>
                  <td>
                    <span className="cart-total-price">${totalPrice.toFixed(2)}</span>
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
                    <span className="cart-total-price">${(totalPrice + 10).toFixed(2)}</span>
                  </td>
                </tr>
              </table>

              <Link to="/checkout" class="btn">
                Proceed to Checkout
              </Link>
            </div>
          </div>
        </>
      )}
    </section>
  );
}
export default Cart;
