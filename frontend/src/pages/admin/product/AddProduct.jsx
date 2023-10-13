import "./AddProduct.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getBrands } from "../../../redux/features/brand/brandSlice";
import { getCategories } from "../../../redux/features/category/categorySlice";
import { toast } from "react-toastify";
import { createProduct } from "../../../redux/features/product/productSlice";
import Loader from "../../../components/loader/Loader";

const initialState = {
  name: "",
  category: "",
  brand: "",
  price: "",
  countInStock: "",
  description: "",
};

function AddProduct() {
  const dispatch = useDispatch();
  const naivgate = useNavigate();
  const { isLoading: categoryLoading, categories } = useSelector((state) => state.category);
  const { isLoading: brandLoading, brands } = useSelector((state) => state.brand);
  const [product, setProduct] = useState(initialState);
  const [filteredBrands, setFilteredBrands] = useState([]);
  const { name, category, brand, price, countInStock, description } = product;

  useEffect(() => {
    dispatch(getCategories());
    dispatch(getBrands());
  }, [dispatch]);

  // filter brands based on selected category
  const filterBrands = (selectedCategory) => {
    setFilteredBrands(brands.filter((brand) => brand.category === selectedCategory));
  };

  useEffect(() => {
    filterBrands(category);
  }, [category]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (category === "" || brand === "" || price === "" || countInStock === "" || description === "")
      return toast.error("All fields are required.");
    if (name.length < 3) return toast.error("Product name must be at least 3 characters long.");
    await dispatch(createProduct({ name, category, brand, price: Number(price), countInStock: Number(countInStock), description }));
    naivgate("/admin/products");
  };

  return (
    <>
      {(categoryLoading || brandLoading) && <Loader />}
      <div className="add-product-form">
        <h1 className="section-title">Add Product</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <div className="form-group">
              <label htmlFor="categoryName">Product Name:</label>
              <input
                type="text"
                id="productName"
                placeholder="Product name"
                className="form-input"
                name="name"
                value={product?.name}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="categoryName">Category Name:</label>
              <select className="form-input" id="categoryName" name="category" value={product?.category} onChange={handleInputChange}>
                <option value="">-- Select Category --</option>
                {categories.length > 0 &&
                  categories.map((cat) => (
                    <option key={cat._id} value={cat.name}>
                      {cat.name}
                    </option>
                  ))}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="brandName">Brand Name:</label>
              <select className="form-input" id="categoryName" name="brand" value={product?.brand} onChange={handleInputChange}>
                <option value="">-- Select Brand --</option>
                {filteredBrands.length > 0 &&
                  filteredBrands.map((brand) => (
                    <option key={brand._id} value={brand.name}>
                      {brand.name}
                    </option>
                  ))}
              </select>
            </div>
          </div>

          <div>
            <div className="form-group">
              <label htmlFor="price">Price:</label>
              <input
                type="number"
                id="price"
                placeholder="Price"
                className="form-input"
                name="price"
                value={product?.price}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="quantity">Quantity:</label>
              <input
                type="number"
                id="quantity"
                placeholder="Quantity"
                className="form-input"
                name="countInStock"
                value={product?.countInStock}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="image">Image:</label>
              <input type="file" id="image" accept="image/*" className="form-input" />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="description">Description:</label>
            <textarea
              className="form-input textarea product-desc"
              id="description"
              placeholder="Write description"
              name="description"
              value={product?.description}
              onChange={handleInputChange}
            ></textarea>
          </div>

          <button type="submit" className="btn">
            Add
          </button>
        </form>
      </div>
    </>
  );
}

export default AddProduct;
