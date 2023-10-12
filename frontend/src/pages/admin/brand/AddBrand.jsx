import "./AddBrand.css";

function AddBrand() {
  return (
    <>
      <div className="brand-form">
        <h1 className="section-title">Add Brand</h1>
        <form>
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
            <input type="text" id="brandName" placeholder="Brand name" className="form-input" />
            <button type="submit" className="btn">
              Add
            </button>
          </div>
        </form>
      </div>

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
            <tr>
              <td>1</td>
              <td>Samsung</td>
              <td>Phone</td>
              <td>
                <span>
                  <i className="fa-solid fa-trash table-trash"></i>
                </span>
              </td>
            </tr>
            <tr>
              <td>1</td>
              <td>Samsung</td>
              <td>Phone</td>
              <td>
                <span>
                  <i className="fa-solid fa-trash table-trash"></i>
                </span>
              </td>
            </tr>
            <tr>
              <td>1</td>
              <td>Samsung</td>
              <td>Phone</td>
              <td>
                <span>
                  <i className="fa-solid fa-trash table-trash"></i>
                </span>
              </td>
            </tr>
            <tr>
              <td>1</td>
              <td>Samsung</td>
              <td>Phone</td>
              <td>
                <span>
                  <i className="fa-solid fa-trash table-trash"></i>
                </span>
              </td>
            </tr>
            <tr>
              <td>1</td>
              <td>Samsung</td>
              <td>Phone</td>
              <td>
                <span>
                  <i className="fa-solid fa-trash table-trash"></i>
                </span>
              </td>
            </tr>
            <tr>
              <td>1</td>
              <td>Samsung</td>
              <td>Phone</td>
              <td>
                <span>
                  <i className="fa-solid fa-trash table-trash"></i>
                </span>
              </td>
            </tr>
            <tr>
              <td>1</td>
              <td>Samsung</td>
              <td>Phone</td>
              <td>
                <span>
                  <i className="fa-solid fa-trash table-trash"></i>
                </span>
              </td>
            </tr>
            <tr>
              <td>1</td>
              <td>Samsung</td>
              <td>Phone</td>
              <td>
                <span>
                  <i className="fa-solid fa-trash table-trash"></i>
                </span>
              </td>
            </tr>
            <tr>
              <td>1</td>
              <td>Samsung</td>
              <td>Phone</td>
              <td>
                <span>
                  <i className="fa-solid fa-trash table-trash"></i>
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
}

export default AddBrand;
