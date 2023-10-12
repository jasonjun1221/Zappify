import { NavLink, Link } from "react-router-dom";
import ReactPaginate from "react-paginate";
import "./Catergories.css";
import productShoe from "../../assets/product-shoe.jpg";
import catergories from "../../assets/categories.jpg";

const categories = [
  { id: 1, name: "Smartphones", image: catergories, link: "/catergories/smartphones" },
  { id: 2, name: "Computers", image: catergories, link: "/catergories/computers" },
  { id: 3, name: "Tablets", image: catergories, link: "/catergories/tablets" },
  { id: 4, name: "Cameras", image: catergories, link: "/catergories/cameras" },
  { id: 5, name: "Home Appliances", image: catergories, link: "/catergories/home-appliances" },
  { id: 6, name: "Headphones", image: catergories, link: "/catergories/headphones" },
];

const products = [
  {
    id: 1,
    name: "Colorful Pattern Shirts Colorful Pattern Shirts",
    image: productShoe,
    price: 238.85,
    category: "Clothing",
    rating: 5,
  },
  {
    id: 2,
    name: "Colorful Pattern Shirts Colorful Pattern Shirts",
    image: productShoe,
    price: 238.85,
    category: "Clothing",
    rating: 5,
  },
  {
    id: 3,
    name: "Colorful Pattern Shirts Colorful Pattern Shirts",
    image: productShoe,
    price: 238.85,
    category: "Clothing",
    rating: 5,
  },
  {
    id: 4,
    name: "Colorful Pattern Shirts Colorful Pattern Shirts",
    image: productShoe,
    price: 238.85,
    category: "Clothing",
    rating: 5,
  },
];

function Catergories() {
  return (
    <section className="container section">
      <div className="categories-container">
        {categories.map((category) => (
          <NavLink to={category.link} className="category-item " key={category.id}>
            <img src={category.image} alt={category.name} className="category-img" />
            <h3 className="category__title">{category.name}</h3>
          </NavLink>
        ))}
      </div>

      <section className="products section container">
        <p className="total-products">
          We found <span>688</span> items for you!
        </p>

        <div className="products-container grid">
          {products.map((product) => (
            <div className="product-item" key={product.id}>
              <div className="product-banner">
                <Link to="/" class="product-images">
                  <img src={product.image} alt={product.name} className="product-img default" />
                </Link>
              </div>

              <div className="product-content">
                <span className="product-category">{product.category}</span>
                <Link to="/product">
                  <h3 className="product-name">{product.name}</h3>
                </Link>

                <div className="product-rating">
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-solid fa-star"></i>
                </div>

                <div className="product-footer">
                  <div className="product-price">${product.price}</div>
                  <button className="add-btn">
                    <i className="fa-solid fa-plus"></i>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <ReactPaginate
          className="pagination"
          pageLinkClassName="pagination-link"
          activeLinkClassName="pagination-link active"
          previousLinkClassName="pagination-link"
          nextLinkClassName="pagination-link"
          previousLabel="<<"
          nextLabel=">>"
          breakLabel="..."
          pageRangeDisplayed={5}
          pageCount={100}
          renderOnZeroPageCount={null}
        />
      </section>
    </section>
  );
}
export default Catergories;
