import "./Category.css";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { createCategory, getCategories } from "../../../redux/features/category/categorySlice";
import CategoryList from "./CategoryList";

function Category() {
  const dispatch = useDispatch();
  const [name, setName] = useState("");

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (name === "") return toast.error("Category name is required.");
    if (name.length < 3) return toast.error("Category name must be at least 3 characters long.");
    await dispatch(createCategory({ name }));
    await dispatch(getCategories());
    setName("");
  };

  return (
    <>
      <div className="category-form">
        <h1 className="section-title">Add New Category</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="categoryName">Category:</label>
            <input
              type="text"
              id="categoryName"
              placeholder="Category"
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

      <CategoryList />
    </>
  );
}

export default Category;
