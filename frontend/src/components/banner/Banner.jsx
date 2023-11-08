import "./Banner.css";
import BannerPNG from "../../assets/banner.png";
import { Link } from "react-router-dom";

function Banner() {
  return (
    <section className="section">
      <div className="banner-container container grid">
        <div className="banner-content">
          <p className="banner-subtitle">Hot promotions</p>
          <h1 className="banner-title-one">Tech Paradise</h1>
          <h1 className="banner-title-two">Great Collection</h1>
          <p className="banner-description">Get 10% OFF on All Electronics Coupon (PRESALE)</p>
          <Link to="/shop" className="btn">
            Shop Now
          </Link>
        </div>

        <img src={BannerPNG} alt="banner" className="banner-img" />
      </div>
    </section>
  );
}

export default Banner;
