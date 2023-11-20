import "./User.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import "react-confirm-alert/src/react-confirm-alert.css";
import Loader from "../../../components/loader/Loader";
import { blockUser, getUsers } from "../../../redux/features/auth/authSlice";
import Switch from "react-switch";

function User() {
  const dispatch = useDispatch();
  const { users, isLoading } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  // Handle switch change for each user
  const handleSwitchChange = async (id) => {
    await dispatch(blockUser(id));
    dispatch(getUsers());
  };

  // Pagination
  const itemsPerPage = 5;
  const [itemOffset, setItemOffset] = useState(0);
  const endOffset = itemOffset + itemsPerPage;
  const currentItems = users.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(users.length / itemsPerPage);

  // Handle page click for pagination
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % users.length;
    setItemOffset(newOffset);
  };

  return (
    <>
      {isLoading && <Loader />}
      <div className="user-list">
        <h1 className="section-title">User List</h1>
        {users.length === 0 ? (
          <p className="not-found">No User found.</p>
        ) : (
          <table className="user-table">
            <thead>
              <tr>
                <th>No.</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone no.</th>
                <th>Block/Unblock</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((user, index) => (
                <tr key={user?._id}>
                  <td>{index + 1 + itemOffset}</td>
                  <td>{user?.name}</td>
                  <td>{user?.email}</td>
                  <td>{user?.phone}</td>
                  <td>
                    <span>
                      <Switch onChange={() => handleSwitchChange(user?._id)} checked={user?.isBlocked === true ? true : false} />
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
export default User;
