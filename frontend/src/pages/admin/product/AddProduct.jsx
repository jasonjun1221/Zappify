import "./AddProduct.css";

function AddProduct() {
  return (
    <div className="add-product-form">
      <h1 className="section-title">Add Product</h1>
      <form>
        <div>
          <div className="form-group">
            <label htmlFor="categoryName">Product Name:</label>
            <input type="text" id="productName" placeholder="Product name" className="form-input" />
          </div>

          <div className="form-group">
            <label htmlFor="categoryName">Category Name:</label>
            <select className="form-input" id="categoryName">
              <option value="">Select Category</option>
              <option value="">Phone</option>
              <option value="">Laptop</option>
              <option value="">Tablet</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="brandName">Brand Name:</label>
            <select className="form-input" id="categoryName">
              <option value="">Select Brand</option>
              <option value="">Apple</option>
              <option value="">Samsung</option>
              <option value="">Google</option>
            </select>
          </div>
        </div>

        <div>
          <div className="form-group">
            <label htmlFor="price">Price:</label>
            <input type="number" id="price" placeholder="Price" className="form-input" />
          </div>

          <div className="form-group">
            <label htmlFor="quantity">Quantity:</label>
            <input type="number" id="quantity" placeholder="Quantity" className="form-input" />
          </div>
          <div className="form-group">
            <label htmlFor="image">Image:</label>
            <input type="file" id="image" accept="image/*" className="form-input" />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="description">Description:</label>
          <textarea className="form-input textarea product-desc" id="description" placeholder="Write description"></textarea>
        </div>

        <button className="btn">Add</button>
      </form>
    </div>
  );
}

export default AddProduct;
