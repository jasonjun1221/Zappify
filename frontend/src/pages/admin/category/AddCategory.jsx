import "./AddCategory.css";

function AddCategory() {
  return (
    <>
      <div className="category-form">
        <h1 className="section-title">Add Category</h1>
        <form>
          <div className="form-group">
            <label htmlFor="categoryName">Category Name:</label>
            <input type="text" id="categoryName" placeholder="Category name" className="form-input" />
            <button type="submit" className="btn">
              Add
            </button>
          </div>
        </form>
      </div>

      <div className="category-list">
        <h1 className="section-title">Category List</h1>
        <table className="category-table">
          <thead>
            <tr>
              <th>No.</th>
              <th>Name</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>phone</td>
              <td>
                <span>
                  <i className="fa-solid fa-trash table-trash"></i>
                </span>
              </td>
            </tr>
            <tr>
              <td>1</td>
              <td>phone</td>
              <td>
                <span>
                  <i className="fa-solid fa-trash table-trash"></i>
                </span>
              </td>
            </tr>
            <tr>
              <td>1</td>
              <td>phone</td>
              <td>
                <span>
                  <i className="fa-solid fa-trash table-trash"></i>
                </span>
              </td>
            </tr>
            <tr>
              <td>1</td>
              <td>phone</td>
              <td>
                <span>
                  <i className="fa-solid fa-trash table-trash"></i>
                </span>
              </td>
            </tr>
            <tr>
              <td>1</td>
              <td>phone</td>
              <td>
                <span>
                  <i className="fa-solid fa-trash table-trash"></i>
                </span>
              </td>
            </tr>
            <tr>
              <td>1</td>
              <td>phone</td>
              <td>
                <span>
                  <i className="fa-solid fa-trash table-trash"></i>
                </span>
              </td>
            </tr>
            <tr>
              <td>1</td>
              <td>phone</td>
              <td>
                <span>
                  <i className="fa-solid fa-trash table-trash"></i>
                </span>
              </td>
            </tr>
            <tr>
              <td>1</td>
              <td>phone</td>
              <td>
                <span>
                  <i className="fa-solid fa-trash table-trash"></i>
                </span>
              </td>
            </tr>
            <tr>
              <td>1</td>
              <td>phone</td>
              <td>
                <span>
                  <i className="fa-solid fa-trash table-trash"></i>
                </span>
              </td>
            </tr>
            <tr>
              <td>1</td>
              <td>phone</td>
              <td>
                <span>
                  <i className="fa-solid fa-trash table-trash"></i>
                </span>
              </td>
            </tr>
            <tr>
              <td>1</td>
              <td>phone</td>
              <td>
                <span>
                  <i className="fa-solid fa-trash table-trash"></i>
                </span>
              </td>
            </tr>
            <tr>
              <td>1</td>
              <td>phone</td>
              <td>
                <span>
                  <i className="fa-solid fa-trash table-trash"></i>
                </span>
              </td>
            </tr>
            <tr>
              <td>1</td>
              <td>phone</td>
              <td>
                <span>
                  <i className="fa-solid fa-trash table-trash"></i>
                </span>
              </td>
            </tr>
            <tr>
              <td>1</td>
              <td>phone</td>
              <td>
                <span>
                  <i className="fa-solid fa-trash table-trash"></i>
                </span>
              </td>
            </tr>
            <tr>
              <td>1</td>
              <td>phone</td>
              <td>
                <span>
                  <i className="fa-solid fa-trash table-trash"></i>
                </span>
              </td>
            </tr>
            <tr>
              <td>1</td>
              <td>phone</td>
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

export default AddCategory;
