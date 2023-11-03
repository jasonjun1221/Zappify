import "./Product.css";
import { useEffect } from "react";
import { deleteProduct, getProducts } from "../../../redux/features/product/productSlice";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { shortenText } from "../../../utils/utils";

function ProductList({ products, currentItems }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Get products
  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  // Delete product
  const handleDelete = async (id) => {
    await dispatch(deleteProduct(id));
    await dispatch(getProducts());
  };

  // Confirm delete
  const confirmDelete = (id, productName) => {
    confirmAlert({
      title: "Delete Product",
      message: `Are you sure you want to delete this product(${productName})?`,
      buttons: [
        { label: "Yes", onClick: () => handleDelete(id) },
        { label: "Cancel", onClick: () => {} },
      ],
    });
  };

  return (
    <>
      {products.length === 0 ? (
        <p className="not-found">No Product found.</p>
      ) : (
        <table className="product-table">
          <thead>
            <tr>
              <th>No.</th>
              <th>Name</th>
              <th>Category</th>
              <th>Brand</th>
              <th>Price (SGD)</th>
              <th>Quantity</th>
              <th>Edit</th>
              <th>Remove</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((prod, index) => (
              <tr key={prod._id}>
                <td>{index + 1}</td>
                <td>{shortenText(prod?.name, 20)}</td>
                <td>{prod?.category}</td>
                <td>{prod?.brand}</td>
                <td>{prod?.price.toFixed(2)}</td>
                <td>{prod?.quantity}</td>
                <td>
                  <span>
                    <i className="fa-solid fa-pen-to-square edit-icon" onClick={() => navigate(`/admin/edit-product/${prod._id}`)}></i>
                  </span>
                </td>
                <td>
                  <span>
                    <i className="fa-solid fa-trash table-trash trash-icon" onClick={() => confirmDelete(prod._id, prod.name)}></i>
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
}
export default ProductList;
