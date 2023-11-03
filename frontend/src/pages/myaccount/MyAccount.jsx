import { useDispatch } from "react-redux";
import "./MyAccount.css";
import { NavLink, Outlet } from "react-router-dom";
import { logout } from "../../redux/features/auth/authSlice";
import { resetCart, saveCartItems } from "../../redux/features/cart/cartSlice";
import Newsletter from "../../components/newsletter/Newsletter";
import Footer from "../../components/footer/Footer";

const myAccountNav = [
  { name: "Dashboard", icon: "fa-solid fa-house", link: "/myaccount/" },
  { name: "Orders", icon: "fa-solid fa-bag-shopping", link: "/myaccount/orders" },
  { name: "Update Profile", icon: "fa-solid fa-user", link: "/myaccount/update-profile" },
  { name: "My Address", icon: "fa-solid fa-location-dot", link: "/myaccount/address" },
  { name: "Update Password", icon: "fa-solid fa-lock", link: "/myaccount/update-password" },
];

function MyAccount() {
  const dispatch = useDispatch();

  // Logout user
  const logoutUser = () => {
    if (JSON.parse(localStorage.getItem("cartItems"))) {
      dispatch(saveCartItems(JSON.parse(localStorage.getItem("cartItems"))));
    }
    dispatch(resetCart());
    dispatch(logout());
  };

  return (
    <>
      <section className="section">
        <div className="accounts-container container grid">
          <div className="account-tabs">
            {myAccountNav.map((item, index) => (
              <div className="account-tab" key={index}>
                <NavLink to={item.link}>
                  <i className={item.icon}></i>
                  <span>{item.name}</span>
                </NavLink>
              </div>
            ))}
            <div className="account-tab">
              <NavLink to="/" onClick={() => logoutUser()}>
                <i className="fa-solid fa-right-from-bracket"></i>
                <span>Logout</span>
              </NavLink>
            </div>
          </div>

          <div className="tabs-content">
            <Outlet />
          </div>
        </div>
      </section>
      <Newsletter />
      <Footer />
    </>
  );
}
export default MyAccount;
