import "./Product.css";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Loader from "../../../components/loader/Loader";
import ReactPaginate from "react-paginate";
import ProductList from "./ProductList";

function Product() {
  const navigate = useNavigate();
  const { isLoading, products } = useSelector((state) => state.product);

  // Pagination
  const itemsPerPage = 7;
  const [itemOffset, setItemOffset] = useState(0);
  const endOffset = itemOffset + itemsPerPage;
  const currentItems = products.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(products.length / itemsPerPage);

  // Handle page click for pagination
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % products.length;
    setItemOffset(newOffset);
  };

  return (
    <>
      {isLoading && <Loader />}
      <div className="product-list">
        <h1 className="section-title">Product List</h1>

        <div className="product-actions">
          <button className="btn" onClick={() => navigate("/admin/add-product")}>
            Add New Product
          </button>
        </div>

        <ProductList currentItems={currentItems} itemOffSet={itemOffset} products={products} />

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
          pageRangeDisplayed={5}
          pageCount={pageCount}
          renderOnZeroPageCount={null}
        />
      </div>
    </>
  );
}
export default Product;
