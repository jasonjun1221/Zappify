import "./Order.css";
import { useSelector } from "react-redux";
import { useState } from "react";
import Loader from "../../../components/loader/Loader";
import ReactPaginate from "react-paginate";
import OrderList from "./OrderList";

function Order() {
  const { isLoading, orders } = useSelector((state) => state.order);

  // Pagination
  const itemsPerPage = 9;
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
      <div className="order-list">
        <h1 className="section-title">Order List</h1>
        <OrderList currentItems={currentItems} itemOffset={itemOffset} orders={orders} />
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
export default Order;
