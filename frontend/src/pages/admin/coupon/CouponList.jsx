import "./Coupon.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteCoupon, getCoupons } from "../../../redux/features/coupon/couponSlice";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import ReactPaginate from "react-paginate";
import Loader from "../../../components/loader/Loader";

function CouponList() {
  const dispatch = useDispatch();
  const { coupons, isLoading } = useSelector((state) => state.coupon);

  // Get all coupons
  useEffect(() => {
    dispatch(getCoupons());
  }, [dispatch]);

  // Delete coupon
  const handleDelete = async (id) => {
    await dispatch(deleteCoupon(id));
    await dispatch(getCoupons());
  };

  // Confirm delete
  const confirmDelete = (id, couponName) => {
    confirmAlert({
      title: "Delete Coupon",
      message: `Are you sure you want to delete this coupon(${couponName})?`,
      buttons: [
        { label: "Yes", onClick: () => handleDelete(id) },
        { label: "Cancel", onClick: () => {} },
      ],
    });
  };

  // Pagination
  const itemsPerPage = 5;
  const [itemOffset, setItemOffset] = useState(0);
  const endOffset = itemOffset + itemsPerPage;
  const currentItems = coupons.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(coupons.length / itemsPerPage);

  // Handle page click for pagination
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % coupons.length;
    setItemOffset(newOffset);
  };

  return (
    <>
      {isLoading && <Loader />}
      <div className="coupon-list">
        <h1 className="section-title">Coupon List</h1>
        {coupons.length === 0 ? (
          <p className="not-found">No Coupon found.</p>
        ) : (
          <table className="coupon-table">
            <thead>
              <tr>
                <th>No.</th>
                <th>Coupon</th>
                <th>Discount (%)</th>
                <th>Expiry Date</th>
                <th>Remove</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((coupon, index) => (
                <tr key={coupon._id}>
                  <td>{index + 1 + itemOffset}</td>
                  <td>{coupon.name}</td>
                  <td>{coupon.discount}</td>
                  <td>{coupon.expiry.slice(0, 10)}</td>
                  <td>
                    <span>
                      <i className="fa-solid fa-trash table-trash trash-icon" onClick={() => confirmDelete(coupon._id, coupon.name)}></i>
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

export default CouponList;
