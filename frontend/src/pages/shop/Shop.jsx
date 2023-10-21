import "./Shop.css";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import Categories from "../../components/categories/Categories";
import Loader from "../../components/loader/Loader";
import { getProducts } from "../../redux/features/product/productSlice";
import { getCategories } from "../../redux/features/category/categorySlice";
import { shortenText } from "../../utils/utils";

function Shop() {
  const dispatch = useDispatch();
  const { isLoading, products } = useSelector((state) => state.product);
  const { categories } = useSelector((state) => state.category);

  // Get categories & products
  useEffect(() => {
    dispatch(getCategories());
    dispatch(getProducts());
  }, [dispatch]);

  // Pagination
  const itemsPerPage = 8;
  const [itemOffset, setItemOffset] = useState(0);
  const endOffset = itemOffset + itemsPerPage;
  const currentItems = products.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(products.length / itemsPerPage);

  // Handle page click 
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % products.length;
    setItemOffset(newOffset);
  };

  return (
    <>
      {isLoading && <Loader />}
      <section className="container section shop">
        <Categories categories={categories} />

        <div className="products-container">
          <div className="sort-container">
            <div className="sorting">
              <span>Sort By: </span>
              <select className="form-input">
                <option value="">Default</option>
                <option value="lowest-price">Lowest Price</option>
                <option value="highest-price">Highest Price</option>
                <option value="rating">Rating</option>
              </select>
            </div>

            <p className="total-products">
              We found <span>{products.length || 0}</span> items for you!
            </p>
          </div>

          <div className="products-details grid">
            {currentItems.map((prod) => (
              <div className="product-item" key={prod?._id}>
                <div className="product-banner">
                  <Link to="/" class="product-images">
                    <img src={prod?.image} alt={prod?.name} className="product-img default" />
                  </Link>
                </div>

                <div className="product-content">
                  <span className="product-category">{prod?.category}</span>
                  <Link to="/product">
                    <h3 className="product-name">{shortenText(prod?.name, 18)}</h3>
                  </Link>

                  <div className="product-rating">
                    <i className="fa-solid fa-star"></i>
                    <i className="fa-solid fa-star"></i>
                    <i className="fa-solid fa-star"></i>
                    <i className="fa-solid fa-star"></i>
                    <i className="fa-solid fa-star"></i>
                  </div>

                  <div className="product-footer">
                    <div className="product-price">${prod?.price}</div>
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
            onPageChange={handlePageClick}
            pageRangeDisplayed={3}
            pageCount={pageCount}
            renderOnZeroPageCount={null}
          />
        </div>
      </section>
    </>
  );
}
export default Shop;
