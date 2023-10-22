import "./ProductCard.css";
import { Link } from "react-router-dom";
import { shortenText } from "../../utils/utils";

function ProductCard({ product }) {
  
  return (
    <div className="product-item">
      <div className="product-banner">
        <Link to={`/product-details/${product?._id}`} class="product-images">
          <img src={product?.image} alt={product?.name} className="product-img default" />
        </Link>
      </div>

      <div className="product-content">
        <span className="product-category">{product?.category}</span>
        <Link to="/product">
          <h3 className="product-name">{shortenText(product?.name, 18)}</h3>
        </Link>

        <div className="product-rating">
          <i className="fa-solid fa-star"></i>
          <i className="fa-solid fa-star"></i>
          <i className="fa-solid fa-star"></i>
          <i className="fa-solid fa-star"></i>
          <i className="fa-solid fa-star"></i>
        </div>

        <div className="product-footer">
          <div className="product-price">${product?.price}</div>
          <button className="add-btn">
            <i className="fa-solid fa-plus"></i>
          </button>
        </div>
      </div>
    </div>
  );
}
export default ProductCard;
