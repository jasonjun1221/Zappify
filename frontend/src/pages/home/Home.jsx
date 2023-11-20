import "./Home.css";
import Banner from "../../components/banner/Banner";
import Newsletter from "../../components/newsletter/Newsletter";
import Footer from "../../components/footer/Footer";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getProducts } from "../../redux/features/product/productSlice";
import ProductCard from "../../components/productCard/ProductCard";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function Home() {
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.product);

  // Get All Products
  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  // Get Latest 10 Products
  const latestProducts = products.slice(0, 10);

  // Get Featured 10 Products
  const featuredProducts = products.filter((product) => product.reviews.length >= 2);

  const settings = {
    dots: true,
    speed: 1000,
    slidesToShow: 6,
    slidesToScroll: 1,
    className: "home-product-list",
    autoplay: true,
    autoplaySpeed: 2000,
    cssEase: "linear",
    pauseOnHover: true,
  };

  return (
    <>
      <main className="main">
        <Banner />

        <div className="home-product-container">
          <h2 className="section-title">Latest Products</h2>
          <Slider {...settings}>
            {latestProducts.map((product, index) => (
              <div key={index} className="home-product-card">
                <ProductCard product={product} />
              </div>
            ))}
          </Slider>
        </div>

        <div className="home-product-container">
          <h2 className="section-title">Featured Products</h2>
          <Slider {...settings}>
            {featuredProducts.map((product, index) => (
              <div key={index} className="home-product-card">
                <ProductCard product={product} />
              </div>
            ))}
          </Slider>
        </div>
      </main>

      <Newsletter />
      <Footer />
    </>
  );
}
export default Home;
