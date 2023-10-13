import "./AddBrand.css";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteBrand, getBrands } from "../../../redux/features/brand/brandSlice";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import Loader from "../../../components/loader/Loader";

function BrandList() {
  const dispatch = useDispatch();
  const { isLoading, brands } = useSelector((state) => state.brand);

  useEffect(() => {
    dispatch(getBrands());
  }, [dispatch]);

  const handleDelete = async (slug) => {
    await dispatch(deleteBrand(slug));
    await dispatch(getBrands());
  };

  const confirmDelete = (slug) => {
    confirmAlert({
      title: "Delete Brand",
      message: "Are you sure you want to delete this brand?",
      buttons: [
        { label: "Yes", onClick: () => handleDelete(slug) },
        { label: "Cancel", onClick: () => {} },
      ],
    });
  };

  return (
    <>
      {isLoading && <Loader />}
      <div className="brand-list">
        <h1 className="section-title">Brand List</h1>
        <table className="brand-table">
          <thead>
            <tr>
              <th>No.</th>
              <th>Name</th>
              <th>Category</th>
              <th>Remove</th>
            </tr>
          </thead>
          <tbody>
            {brands.map((brand, index) => (
              <tr key={brand._id}>
                <td>{index + 1}</td>
                <td>{brand.name}</td>
                <td>{brand.category}</td>
                <td>
                  <span>
                    <i className="fa-solid fa-trash table-trash" onClick={() => confirmDelete(brand.slug)}></i>
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
export default BrandList;
