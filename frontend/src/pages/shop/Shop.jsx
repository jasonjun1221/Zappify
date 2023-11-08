import "./Shop.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import Loader from "../../components/loader/Loader";
import { getProducts } from "../../redux/features/product/productSlice";
import { getCategories } from "../../redux/features/category/categorySlice";
import { filterByCategory, filterBySearch, filterBySort } from "../../redux/features/product/filterSlice";
import ProductCard from "./ProductCard";

function Shop() {
  const dispatch = useDispatch();
  const { isLoading, products } = useSelector((state) => state.product);
  const { filteredProducts } = useSelector((state) => state.filter);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");

  const uniqueCategories = ["All", ...new Set(products.map((product) => product.category))];

  // Get categories & products
  useEffect(() => {
    dispatch(getCategories());
    dispatch(getProducts());
  }, [dispatch]);

  // Filter products by search
  useEffect(() => {
    dispatch(filterBySearch({ search, products }));
  }, [search, products, dispatch]);

  // Filter products by sort
  useEffect(() => {
    dispatch(filterBySort({ sort, products, selectedCategory }));
  }, [sort, products, dispatch, selectedCategory]);

  // Handle category click
  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    dispatch(filterByCategory({ category, products }));
  };

  // Pagination
  const itemsPerPage = 10;
  const [itemOffset, setItemOffset] = useState(0);
  const endOffset = itemOffset + itemsPerPage;
  const currentItems = filteredProducts.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(filteredProducts.length / itemsPerPage);

  // Handle page click
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % filteredProducts.length;
    setItemOffset(newOffset);
  };

  return (
    <>
      {isLoading && <Loader />}
      <section className="container shop">
        <div className="filters-container">
          <div className="search">
            <input
              type="text"
              placeholder="Search for products..."
              className="form-input"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button className="search-btn">
              <i className="fa-solid fa-magnifying-glass"></i>
            </button>
          </div>

          <div className="categories-container">
            {uniqueCategories.map((cat, index) => (
              <button
                className={`categories-item ${selectedCategory === cat ? "active" : ""}`}
                key={index}
                onClick={() => handleCategoryClick(cat)}
              >
                <h4 className="categories-title">{cat}</h4>
              </button>
            ))}
          </div>

          <div className="sort-container">
            <div className="sorting">
              <span>Sort by: </span>
              <select className="form-input" value={sort} onChange={(e) => setSort(e.target.value)}>
                <option value="">Default</option>
                <option value="newest">Newest</option>
                <option value="lowest-price">Lowest Price</option>
                <option value="highest-price">Highest Price</option>
              </select>
            </div>
          </div>

          <div className={`items-container ${filteredProducts.length === 0 ? `none-items` : ``}`}>
            <p className="total-items">
              We found <span>{filteredProducts?.length}</span> items for you!
            </p>
          </div>
        </div>

        <div className="products-container">
          <div className="products-details grid">
            {currentItems.map((product, index) => (
              <ProductCard product={product} key={index} />
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
