import { NavLink } from "react-router-dom";
import "./Categories.css";

function Categories({ categories }) {
  return (
    <div className="categories-container">
      {categories.map((cat) => (
        <NavLink className="category-item" key={cat._id}>
          <h3 className="category-title">{cat.name}</h3>
        </NavLink>
      ))}
    </div>
  );
}
export default Categories;
