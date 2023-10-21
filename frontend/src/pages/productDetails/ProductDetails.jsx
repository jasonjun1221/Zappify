import "./ProductDetails.css";
import ProductJPG from "../../assets/product.jpg";
import Review from "../../components/review/Review";

function ProductDetails() {
  return (
    <>
      <section className="section">
        <div className="details-container container grid">
          <img src={ProductJPG} alt="" className="details-img" />

          <div className="details-group">
            <h3 className="details-title">Henley Shirt</h3>
            <p className="details-brand">
              Brand: <span>addidas</span>
            </p>
            <p className="details-price">$116</p>
            <p className="details-description">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aliquam rem officia, corrupti reiciendis minima nisi modi, quasi,
              odio minus dolore impedit fuga eum eligendi? Officia doloremque facere quia. Voluptatum, accusantium!loremque facere quia.
              Voluptatum, accusantium!
            </p>

            <ul className="details-list">
              <li>SKU: FWM15VKT</li>
              <li>Tags: Cloth, Women, Dress</li>
              <li>
                Availability: <span>8</span> Items In Stock
              </li>
            </ul>

            <div className="details-action">
              <input type="number" className="quantity" value="3" />
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
