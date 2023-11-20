import "./ProductCard.css";
import { Link } from "react-router-dom";
import { shortenText } from "../../utils/utils";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/features/cart/cartSlice";
import StarRatings from "react-star-ratings";

function ProductCard({ product }) {
  const dispatch = useDispatch();

  // Average rating in product card
  const averageRating = product?.reviews.reduce((acc, item) => item.rating + acc, 0) / product?.reviews.length;

  return (
    <div className="product-item">
      <div className="product-banner">
        <Link to={`/product-details/${product?._id}`} className="product-images">
          <img src={product?.image} alt={product?.name} className="product-img default" />
        </Link>
      </div>

      <div className="product-content">
        <span className="product-category">{product?.category}</span>
        <Link to={`/product-details/${product?._id}`}>
          <h3 className="product-name">{shortenText(product?.name, 13)}</h3>
        </Link>

        <StarRatings
          rating={averageRating || 0}
          numberOfStars={5}
          starRatedColor="#FFDF00"
          starDimension="18px"
          starSpacing="0px"
          name="rating"
        />

        <div className="product-footer">
          <div className="product-price">${product?.price.toFixed(2)}</div>

          {product?.quantity > 0 ? (
            <button className="add-btn" onClick={() => dispatch(addToCart(product))}>
              <i className="fa-solid fa-plus"></i>
            </button>
          ) : (
            <button className="no-stock" disabled>
              out of stock
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
export default ProductCard;
