import { Link } from "react-router-dom";
import "./MyAccount.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMyOrders } from "../../redux/features/order/orderSlice";
import ReactPaginate from "react-paginate";
import Loader from "../../components/loader/Loader";

function OrdersTab() {
  const dispatch = useDispatch();
  const { orders, isLoading } = useSelector((state) => state.order);

  // Get My Orders
  useEffect(() => {
    dispatch(getMyOrders());
  }, [dispatch]);

  // Pagination
  const itemsPerPage = 6;
  const [itemOffset, setItemOffset] = useState(0);
  const endOffset = itemOffset + itemsPerPage;
  const currentItems = orders.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(orders.length / itemsPerPage);

  // Handle page click for pagination
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % orders.length;
    setItemOffset(newOffset);
  };

  return (
    <>
      {isLoading && <Loader />}
      <div className="tab-content">
        <h3 className="tab-header">My Orders</h3>

        <div className="tab-body">
          <table className="my-order-table">
            <thead>
              <tr>
                <th>No.</th>
                <th>Orders Id</th>
                <th>Date</th>
                <th>Status</th>
                <th>Total (SGD)</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {currentItems.map((order, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{order?._id}</td>
                  <td>{order?.createdAt.slice(0, 10)}</td>
                  <td>{order?.orderStatus}</td>
                  <td>${order?.orderAmount.toFixed(2)}</td>
                  <td>
                    <Link to={`/myaccount/orders/${order?._id}`} className="view-order">
                      View
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

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
      </div>
    </>
  );
}

export default OrdersTab;
