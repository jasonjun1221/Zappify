import "./EditProduct.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getProduct, updateProduct } from "../../../redux/features/product/productSlice";
import { getCategories } from "../../../redux/features/category/categorySlice";
import { getBrands } from "../../../redux/features/brand/brandSlice";
import { toast } from "react-toastify";
import Loader from "../../../components/loader/Loader";

function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { product, isLoading } = useSelector((state) => state.product);
  const { categories } = useSelector((state) => state.category);
  const { brands } = useSelector((state) => state.brand);

  const [editProduct, setEditProduct] = useState({
    name: product?.name || "",
    price: product?.price || 0,
    category: product?.category || "",
    brand: product?.brand || "",
    quantity: product?.quantity || 0,
    description: product?.description || "",
  });

  // Get categories, brands and product details
  useEffect(() => {
    dispatch(getCategories());
    dispatch(getBrands());
    dispatch(getProduct(id));
  }, [dispatch, id]);

  // Filter brands based on category
  const filteredBrands = brands.filter((brand) => brand.category === product?.category);

  // Set edit product
  useEffect(() => {
    setEditProduct(product);
    return () => setEditProduct({});
  }, [product]);

  // Handle input change
  const handleInputChange = (e) => {
    setEditProduct({ ...editProduct, [e.target.name]: e.target.value });
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, category, brand, price, quantity, description } = editProduct;
    if (!name || !category || !brand || !price || !quantity || !description) return toast.error("Please enter all fields.");
    if (name.length < 3) return toast.error("Product name must be at least 3 characters long.");
    if (description.length < 5) return toast.error("Product description must be at least 5 characters long.");
    if (price < 1) return toast.error("Product price must be greater than 0.");
    if (quantity < 1) return toast.error("Product quantity must be greater than 0.");

    const formData = { name, category, brand, price, quantity, description };
    await dispatch(updateProduct({ id, formData }));
    navigate("/admin/product");
  };

  return (
    <>
      {isLoading && <Loader />}
      <form onSubmit={handleSubmit}>
        <div className="edit-product-form">
          <div className="edit-product-header">
            <div className="btn back-btn" onClick={() => navigate(-1)}>
              <i className="fa-solid fa-chevron-left"></i>
            </div>
            <h1 className="section-title">Edit Product</h1>
            <button type="submit" className="btn update-product-btn">
              Update
            </button>
          </div>

          <div className="edit-product-container">
            <div className="form-group edit-product-image">
              <img src={product?.image} alt={product?.name} id="image" />
            </div>
            <div className="edit-form-elements">
              <div className="form-group">
                <label htmlFor="name">Name:</label>
                <input type="text" id="name" className="form-input" name="name" value={editProduct?.name} onChange={handleInputChange} />
              </div>

              <div className="form-group">
                <label htmlFor="category">Category:</label>
                <select className="form-input" id="category" name="category" value={editProduct?.category} onChange={handleInputChange}>
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
                <label htmlFor="brand">Brand:</label>
                <select className="form-input" id="brand" name="brand" value={editProduct?.brand} onChange={handleInputChange}>
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
            <div className="edit-form-elements">
              <div className="form-group">
                <label htmlFor="price">Price (SGD):</label>
                <input
                  type="number"
                  id="price"
                  className="form-input"
                  name="price"
                  value={editProduct?.price}
                  onChange={handleInputChange}
                />
              </div>

              <div className="form-group">
                <label htmlFor="quantity">Quantity:</label>
                <input
                  type="number"
                  id="quantity"
                  className="form-input"
                  name="quantity"
                  value={editProduct?.quantity}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </div>

          <div className="form-group edit-description-container">
            <label htmlFor="description">Description:</label>
            <textarea
              className="form-input textarea edit-description"
              id="description"
              name="description"
              value={editProduct?.description}
              onChange={handleInputChange}
            ></textarea>
          </div>
        </div>
      </form>
    </>
  );
}

export default EditProduct;
