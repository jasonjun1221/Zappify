import "./ProductDetails.css";
import Review from "../../components/review/Review";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getProduct } from "../../redux/features/product/productSlice";
import Loader from "../../components/loader/Loader";

function ProductDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { product, isLoading } = useSelector((state) => state.product);
  const [quantity, setQuantity] = useState(1);

  // Get product details
  useEffect(() => {
    dispatch(getProduct(id));
  }, [dispatch, id]);

  return (
    <>
      {isLoading && <Loader />}
      <section className="section">
        <button className="btn back-btn shop-back-btn" onClick={() => navigate(-1)}>
          <i className="fa-solid fa-chevron-left"></i>
        </button>
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
              <input type="number" className="quantity" value={quantity} onChange={(e) => setQuantity(e.target.value)} min="1" max="99" />
              <button className="btn">Add to Cart</button>
            </div>
          </div>
        </div>
      </section>

      <Review />
    </>
  );
}
export default ProductDetails;
