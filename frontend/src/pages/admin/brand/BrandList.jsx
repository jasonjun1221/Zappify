import "./Brand.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteBrand, getBrands } from "../../../redux/features/brand/brandSlice";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import ReactPaginate from "react-paginate";
import Loader from "../../../components/loader/Loader";


function BrandList() {
  const dispatch = useDispatch();
  const { isLoading, brands } = useSelector((state) => state.brand);

  // Get brands
  useEffect(() => {
    dispatch(getBrands());
  }, [dispatch]);

  // Delete brand
  const handleDelete = async (slug) => {
    await dispatch(deleteBrand(slug));
    await dispatch(getBrands());
  };

  // Confirm delete
  const confirmDelete = (slug) => {
    confirmAlert({
      title: "Delete Brand",
      message: `Are you sure you want to delete this brand(${slug})?`,
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
  const currentItems = brands.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(brands.length / itemsPerPage);

  // Handle page click for pagination
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % brands.length;
    setItemOffset(newOffset);
  };

  return (
    <>
      {isLoading && <Loader />}
      <div className="brand-list">
        <h1 className="section-title">Brand List</h1>
        {brands.length === 0 ? (
          <p className="not-found">No Brand found.</p>
        ) : (
          <table className="brand-table">
            <thead>
              <tr>
                <th>No.</th>
                <th>Brand</th>
                <th>Category</th>
                <th>Remove</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((brand, index) => (
                <tr key={brand._id}>
                  <td>{index + 1 + itemOffset}</td>
                  <td>{brand.name}</td>
                  <td>{brand.category}</td>
                  <td>
                    <span>
                      <i className="fa-solid fa-trash table-trash trash-icon" onClick={() => confirmDelete(brand.slug)}></i>
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
export default BrandList;
