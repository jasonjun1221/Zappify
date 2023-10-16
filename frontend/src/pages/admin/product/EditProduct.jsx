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
  console.log(product);
  const { categories } = useSelector((state) => state.category);
  const { brands } = useSelector((state) => state.brand);

  const [editProduct, setEditProduct] = useState({
    name: product?.name || "",
    price: product?.price || 0,
    category: product?.category || "",
    brand: product?.brand || "",
    countInStock: product?.countInStock || 0,
    description: product?.description || "",
  });

  useEffect(() => {
    dispatch(getCategories());
    dispatch(getBrands());
    dispatch(getProduct(id));
  }, [dispatch, id]);

  useEffect(() => {
    setEditProduct(product);

    return () => {
      setEditProduct({});
    };
  }, [product]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditProduct({ ...editProduct, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, category, brand, price, countInStock, description } = editProduct;
    if (!name || !category || !brand || !price || !countInStock || !description) return toast.error("All fields are required.");
    if (name.length < 3) return toast.error("Product name must be at least 3 characters long.");
    await dispatch(updateProduct({ id, editProduct }));
    navigate("/admin/products");
  };

  return (
    <>
      {isLoading && <Loader />}
      {product && (
        <div className="edit-product-form">
          <button className="back-btn" onClick={() => navigate(-1)}>
            <i className="fa-solid fa-chevron-left"></i>
          </button>
          <h1 className="section-title">Edit Product</h1>
          <form onSubmit={handleSubmit}>
            <div>
              <div className="form-group">
                <label htmlFor="name">Name:</label>
                <input
                  type="text"
                  id="name"
                  placeholder="Product name"
                  className="form-input"
                  name="name"
                  value={editProduct?.name}
                  onChange={handleInputChange}
                />
              </div>

              <div className="form-group">
                <label htmlFor="category">Category Name:</label>
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
                <label htmlFor="brand">Brand Name:</label>
                <select className="form-input" id="brand" name="brand" value={editProduct?.brand} onChange={handleInputChange}>
                  <option value="">-- Select Brand --</option>
                  {brands.length > 0 &&
                    brands.map((brand) => (
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
                  value={editProduct?.price}
                  onChange={handleInputChange}
                />
              </div>

              <div className="form-group">
                <label htmlFor="countInStock">Quantity:</label>
                <input
                  type="number"
                  id="countInStock"
                  placeholder="Quantity"
                  className="form-input"
                  name="countInStock"
                  value={editProduct?.countInStock}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="description">Description:</label>
              <textarea
                className="form-input textarea edit-desc"
                id="description"
                placeholder="Write description"
                name="description"
                value={editProduct?.description}
                onChange={handleInputChange}
              ></textarea>
            </div>

            <button type="submit" className="btn update-btn">
              Update
            </button>
          </form>
        </div>
      )}
    </>
  );
}

export default EditProduct;
