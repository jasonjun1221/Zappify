import "./Category.css";
import { useDispatch, useSelector } from "react-redux";
import { deleteCategory, getCategories } from "../../../redux/features/category/categorySlice";
import { useEffect, useState } from "react";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import ReactPaginate from "react-paginate";
import Loader from "../../../components/loader/Loader";

function CategoryList() {
  const dispatch = useDispatch();
  const { isLoading, categories } = useSelector((state) => state.category);

  // Get categories
  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  // Delete category
  const handleDelete = async (slug) => {
    await dispatch(deleteCategory(slug));
    await dispatch(getCategories());
  };

  // Confirm delete
  const confirmDelete = (slug) => {
    confirmAlert({
      title: "Delete Category",
      message: `Are you sure you want to delete this category(${slug})?`,
      buttons: [
        { label: "Yes", onClick: () => handleDelete(slug) },
        { label: "Cancel", onClick: () => {} },
      ],
    });
  };

  // Pagination
  const itemsPerPage = 5;
  const [itemOffset, setItemOffset] = useState(0);
  const endOffset = itemOffset + itemsPerPage;
  const currentItems = categories.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(categories.length / itemsPerPage);

  // Handle page click for pagination
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % categories.length;
    setItemOffset(newOffset);
  };

  return (
    <>
      {isLoading && <Loader />}
      <div className="category-list">
        <h1 className="section-title">Category List</h1>
        {categories.length === 0 ? (
          <p className="not-found">No Catergory found.</p>
        ) : (
          <table className="category-table">
            <thead>
              <tr>
                <th>No.</th>
                <th>Category</th>
                <th>Remove</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((cat, index) => (
                <tr key={cat._id}>
                  <td>{index + 1 + itemOffset}</td>
                  <td>{cat.name}</td>
                  <td>
                    <span>
                      <i className="fa-solid fa-trash table-trash trash-icon" onClick={() => confirmDelete(cat.slug)}></i>
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
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
        pageRangeDisplayed={5}
        pageCount={pageCount}
        renderOnZeroPageCount={null}
      />
    </>
  );
}
export default CategoryList;
