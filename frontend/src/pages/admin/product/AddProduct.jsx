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
  quantity: "",
  description: "",
};

function AddProduct() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading: categoryLoading, categories } = useSelector((state) => state.category);
  const { isLoading: brandLoading, brands } = useSelector((state) => state.brand);
  const [product, setProduct] = useState(initialState);
  const [image, setImage] = useState(null);
  const { name, category, brand, price, quantity, description } = product;

  // Get categories and brands
  useEffect(() => {
    dispatch(getCategories());
    dispatch(getBrands());
  }, [dispatch]);

  // Filter brands based on category
  const filteredBrands = brands.filter((brand) => brand.category === category);

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (name === "" || category === "" || brand === "" || price === "" || quantity === "" || description === "" || !image)
      return toast.error("Please enter all fields.");
    if (name.length < 3) return toast.error("Product name must be at least 3 characters long.");
    if (description.length < 5) return toast.error("Product description must be at least 5 characters long.");
    if (price < 1) return toast.error("Product price must be greater than 0.");
    if (quantity < 1) return toast.error("Product quantity must be greater than 0.");

    const formData = new FormData();
    for (let key in product) formData.append(key, product[key]);
    formData.append("image", image);

    await dispatch(createProduct(formData));
    navigate("/admin/product");
  };

  return (
    <>
      {(categoryLoading || brandLoading) && <Loader />}
      <form onSubmit={handleSubmit}>
        <div className="add-product-form">
          <div className="add-product-header">
            <div className="btn back-btn" onClick={() => navigate(-1)}>
              <i className="fa-solid fa-chevron-left"></i>
            </div>
            <h1 className="section-title">Add New Product</h1>
            <button type="submit" className="btn add-product-btn">
              Add
            </button>
          </div>

          <div className="product-form-container">
            <div className="form-group">
              <label htmlFor="name">Name:</label>
              <input
                type="text"
                id="name"
                placeholder="Name"
                className="form-input"
                name="name"
                value={product?.name}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="category">Category:</label>
              <select className="form-input" id="category" name="category" value={product?.category} onChange={handleInputChange}>
                <option value="">-- Select Category --</option>
                {categories.length > 0 &&
                  categories.map((cat) => (
                    <option key={cat._id} value={cat.name}>
                      {cat.name}
                    </option>
                  ))}
              </select>
            </div>
          </div>

          <div className="product-form-container">
            <div className="form-group">
              <label htmlFor="brand">Brand:</label>
              <select className="form-input" id="brand" name="brand" value={product?.brand} onChange={handleInputChange}>
                <option value="">-- Select Brand --</option>
                {filteredBrands.length > 0 &&
                  filteredBrands.map((brand) => (
                    <option key={brand._id} value={brand.name}>
                      {brand.name}
                    </option>
                  ))}
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="price">Price (SGD):</label>
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
          </div>

          <div className="product-form-container">
            <div className="form-group">
              <label htmlFor="quantity">Quantity:</label>
              <input
                type="number"
                id="quantity"
                placeholder="Quantity"
                className="form-input"
                name="quantity"
                value={product?.quantity}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="image">Image:</label>
              <input type="file" id="image" accept="image/*" className="form-input" onChange={(e) => setImage(e.target.files[0])} />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="description">Description:</label>
            <textarea
              className="form-input textarea product-description"
              id="description"
              placeholder="Write description"
              name="description"
              value={product?.description}
              onChange={handleInputChange}
            ></textarea>
          </div>
        </div>
      </form>
    </>
  );
}

export default AddProduct;
