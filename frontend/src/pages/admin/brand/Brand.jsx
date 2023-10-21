import "./Brand.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createBrand, getBrands } from "../../../redux/features/brand/brandSlice";
import { getCategories } from "../../../redux/features/category/categorySlice";
import { toast } from "react-toastify";
import Loader from "../../../components/loader/Loader";
import BrandList from "./BrandList";

function Brand() {
  const dispatch = useDispatch();
  const { isLoading, categories } = useSelector((state) => state.category);
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");

  // Get categories
  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (name === "") return toast.error("Please enter a brand name.");
    if (category === "") return toast.error("Please select a category.");
    if (name.length < 3) return toast.error("Brand name must be at least 3 characters long");
    await dispatch(createBrand({ name, category }));
    await dispatch(getBrands());
    setName("");
    setCategory("");
  };

  return (
    <>
      {isLoading && <Loader />}
      <div className="brand-form">
        <h1 className="section-title">Add New Brand</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="categoryName">Category:</label>
            <select className="form-input" id="categoryName" value={category} onChange={(e) => setCategory(e.target.value)}>
              <option value="">-- Select Category --</option>
              {categories.map((cat) => (
                <option key={cat._id} value={cat.name}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="brandName">Brand:</label>
            <input
              type="text"
              id="brandName"
              placeholder="Brand"
              className="form-input"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <button type="submit" className="btn">
              Add
            </button>
          </div>
        </form>
      </div>

      <BrandList />
    </>
  );
}

export default Brand;
