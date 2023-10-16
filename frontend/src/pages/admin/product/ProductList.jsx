import "./ProductList.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { deleteProduct, getProduct, getProducts } from "../../../redux/features/product/productSlice";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import Loader from "../../../components/loader/Loader";
import ReactPaginate from "react-paginate";
import { useNavigate } from "react-router-dom";

function ProductList() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLoading, products } = useSelector((state) => state.product);

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  const handleDelete = async (id) => {
    await dispatch(deleteProduct(id));
    await dispatch(getProducts());
  };

  const confirmDelete = (id) => {
    confirmAlert({
      title: "Delete Product",
      message: "Are you sure you want to delete this product?",
      buttons: [
        { label: "Yes", onClick: () => handleDelete(id) },
        { label: "Cancel", onClick: () => {} },
      ],
    });
  };

  const handleEdit = (id) => {
    navigate(`/admin/edit-product/${id}`);
  };

  // Pagination
  const itemsPerPage = 11;
  const [itemOffset, setItemOffset] = useState(0);
  const endOffset = itemOffset + itemsPerPage;
  const currentItems = products.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(products.length / itemsPerPage);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % products.length;
    setItemOffset(newOffset);
  };

  return (
    <>
      {isLoading && <Loader />}
      <div className="product-list">
        <h1 className="section-title">Product List</h1>
        {products.length === 0 ? (
          <p>No Product found.</p>
        ) : (
          <table className="product-table">
            <thead>
              <tr>
                <th>No.</th>
                <th>Name</th>
                <th>Category</th>
                <th>Brand</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Edit</th>
                <th>Remove</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((prod, index) => (
                <tr key={prod._id}>
                  <td>{index + 1}</td>
                  <td>{prod.name}</td>
                  <td>{prod.category}</td>
                  <td>{prod.brand}</td>
                  <td>{prod.price}</td>
                  <td>{prod.countInStock}</td>
                  <td>
                    <span>
                      <i className="fa-solid fa-pen-to-square" onClick={() => handleEdit(prod._id)}></i>
                    </span>
                  </td>
                  <td>
                    <span>
                      <i className="fa-solid fa-trash table-trash" onClick={() => confirmDelete(prod._id)}></i>
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
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
export default ProductList;
