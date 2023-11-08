import "./Cart.css";
import CartCoupon from "./CartCoupon";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, calculateTotalPrice, decreaseQuantity, removeFromCart } from "../../redux/features/cart/cartSlice";
import { useEffect } from "react";
import { shortenText } from "../../utils/utils";

function Cart() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cartItems, totalPrice, discountedPrice } = useSelector((state) => state.cart);
  const { isLoggedIn } = useSelector((state) => state.auth);
  const { coupon } = useSelector((state) => state.coupon);

  // Calculate total price when cart items change
  useEffect(() => {
    dispatch(calculateTotalPrice(coupon));
  }, [cartItems, dispatch, coupon]);

  // Handle checkout
  const handleCheckout = (e) => {
    e.preventDefault();
    if (isLoggedIn) {
      navigate("/checkout");
    } else {
      navigate("/login?redirect=cart");
    }
  };

  return (
    <section className="section container">
      {cartItems?.length === 0 ? (
        <div className="cart-empty-container">
          <h1 className="cart-empty-title">Your Cart is Empty</h1>
          <p className="cart-empty-message">Oops! It looks like your shopping cart is empty.</p>
          <div className="cart-empty-actions">
            <Link to="/shop" className="btn btn-primary">
              Continue Shopping
            </Link>
          </div>
        </div>
      ) : (
        <>
          <div className="table-container">
            <table className="table">
              <thead>
                <tr>
                  <th>Image</th>
                  <th>Name</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Subtotal</th>
                  <th>Remove</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((product, index) => (
                  <tr key={index}>
                    <td>
                      <img src={product?.image} alt={product?.name} className="table-img" />
                    </td>

                    <td>
                      <h3 className="table-title">{product?.name}</h3>
                      <p className="table-description">{shortenText(product?.description, 140)}</p>
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
                        <button className="cart-action-btn" onClick={() => dispatch(addToCart(product))}>
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
              </tbody>
            </table>
          </div>

          <div className="cart-group grid">
            <CartCoupon />

            <div className="cart-total">
              <h3 className="section-title">Cart Total</h3>

              <table className="cart-total-table">
                <tbody>
                  <tr>
                    <td>
                      <span className="cart-total-title">Cart Subtotal</span>
                    </td>
                    <td>
                      {discountedPrice > 0 ? (
                        <span className="cart-total-price">
                          <del>${totalPrice.toFixed(2)}</del> ${discountedPrice.toFixed(2)}
                        </span>
                      ) : (
                        <span className="cart-total-price">${totalPrice.toFixed(2)}</span>
                      )}
                    </td>
                  </tr>

                  <tr>
                    <td>
                      <span className="cart-total-title">Shipping</span>
                    </td>
                    <td>
                      <span className="cart-total-price">Free Shipping</span>
                    </td>
                  </tr>

                  <tr>
                    <td>
                      <span className="cart-total-title">Total</span>
                    </td>
                    <td>
                      {discountedPrice > 0 ? (
                        <span className="cart-total-price">
                          <del>${totalPrice.toFixed(2)}</del> ${discountedPrice.toFixed(2)}
                        </span>
                      ) : (
                        <span className="cart-total-price">${totalPrice.toFixed(2)}</span>
                      )}
                    </td>
                  </tr>
                </tbody>
              </table>

              <button className="btn" onClick={handleCheckout}>
                Proceed to Checkout
              </button>
            </div>
          </div>
        </>
      )}
    </section>
  );
}
export default Cart;
