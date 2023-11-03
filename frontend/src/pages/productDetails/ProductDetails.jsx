import "./ProductDetails.css";
import Review from "../../components/review/Review";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getProduct } from "../../redux/features/product/productSlice";
import Loader from "../../components/loader/Loader";
import { addToCart, decreaseQuantity } from "../../redux/features/cart/cartSlice";

function ProductDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { product, isLoading } = useSelector((state) => state.product);
  const { cartItems } = useSelector((state) => state.cart);

  // Check if item is in cart
  const itemInCart = cartItems.find((item) => item._id === id);

  // Get product details
  useEffect(() => {
    dispatch(getProduct(id));
  }, [dispatch, id]);

  return (
    <>
      {isLoading && <Loader />}
      <section className="section">
        <div className="details-container container grid">
          <img src={product?.image} alt={product?.name} className="details-img" />
          <div className="details-group">
            <h3 className="details-title">{product?.name}</h3>
            <p className="details-brand">
              Brand: <span>{product?.brand}</span>
            </p>
            <p className="details-price">${product?.price}</p>
            <p className="details-description">{product?.description}</p>
            <ul className="details-list">
              <li>Tags: {product?.category + ", " + product?.brand}</li>
              <li>
                Availability: <span>{product?.quantity}</span> Items In Stock
              </li>
            </ul>
            <div className="details-action">
              {itemInCart?.cartQuantity > 0 ? (
                <div className="details-quantity">
                  <button className="details-action-btn" onClick={() => dispatch(decreaseQuantity(product))}>
                    -
                  </button>
                  <input type="text" className="item-quantity" value={itemInCart?.cartQuantity} disabled />
                  <button className="details-action-btn" onClick={() => dispatch(addToCart(product))}>
                    +
                  </button>
                </div>
              ) : null}

              <div className="cart-btn">
                {product?.quantity > 0 ? (
                  <button className="btn" onClick={() => dispatch(addToCart(product))}>
                    Add to Cart
                  </button>
                ) : (
                  <button className="out-of-stock" disabled>
                    Out of Stock
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <Review />
    </>
  );
}
export default ProductDetails;
