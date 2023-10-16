import userPNG from "../../assets/user-review.png";
import "./Admin.css";
import { NavLink, Outlet } from "react-router-dom";

const adminNav = [
  { name: "Dashboard", link: "/admin/" },
  { name: "Product List", link: "/admin/products" },
  { name: "Add Product", link: "/admin/add-product" },
  { name: "Add Category", link: "/admin/add-category" },
  { name: "Add Brand", link: "/admin/add-brand" },
  { name: "Order List", link: "/admin/" },
  { name: "Coupon", link: "/admin/" },
];

function Admin() {
  
  return (
    <div className="admin-container grid">
      <div className="admin-details">
        <img src={userPNG} alt="admin" className="admin-photo" />
        <h3>admin</h3>
      </div>
      <div className="admin-tabs">
        {adminNav.map((item, index) => (
          <div className="admin-tab" key={index}>
            <NavLink to={item.link}>
              <span>{item.name}</span>
            </NavLink>
          </div>
        ))}
      </div>

      <div className="admin-content">
        <Outlet />
      </div>
    </div>
  );
}

export default Admin;
