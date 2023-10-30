import { useSelector } from "react-redux";
import userPNG from "../../assets/user-review.png";
import "./Admin.css";
import { NavLink, Outlet } from "react-router-dom";

const adminNav = [
  { name: "Dashboard", link: "/admin/" },
  { name: "Product", link: "/admin/product" },
  { name: "Category", link: "/admin/category" },
  { name: "Brand", link: "/admin/brand" },
  { name: "Coupon", link: "/admin/coupon" },
  { name: "Order", link: "/admin/" },
  { name: "User", link: "/admin/" },
  { name: "Review", link: "/admin/" },
];

function Admin() {
  const { user } = useSelector((state) => state.auth);

  return (
    <div className="admin-container grid">
      <div className="admin-details">
        <img src={userPNG} alt="admin" className="admin-photo" />
        <h3>{user?.name}</h3>
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
