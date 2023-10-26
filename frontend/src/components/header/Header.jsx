import { NavLink, Link } from "react-router-dom";
import "./Header.css";
import logoSVG from "../../assets/logo.svg";
import { useSelector } from "react-redux";

const navigations = [
  { name: "Home", link: "/" },
  { name: "Shop", link: "/shop" },
  { name: "About Us", link: "/about" },
];

function Header() {
  const { isLoggedIn, user } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.cart);

  return (
    <>
      <header>
        <nav className="nav container">
          <Link to="/">
            <img src={logoSVG} alt="logo" className="nav-logo" />
          </Link>

          <div className="nav-menu">
            <ul className="nav-list">
              {navigations.map((item, index) => (
                <li className="nav-item" key={index}>
                  <NavLink to={item.link} className="nav-link">
                    {item.name}
                  </NavLink>
                </li>
              ))}

              {isLoggedIn && user?.isAdmin && (
                <li className="nav-item">
                  <NavLink to="/admin" className="nav-link">
                    Admin
                  </NavLink>
                </li>
              )}

              {!isLoggedIn ? (
                <li className="nav-item">
                  <NavLink to="/login" className="nav-link">
                    Login
                  </NavLink>
                </li>
              ) : (
                <li className="nav-item"></li>
              )}
            </ul>

            <NavLink to="/myaccount" className="nav-link myaccount">
              My Account
            </NavLink>
          </div>

          <div className="header-cart">
            <Link to="/cart" className="cart-btn">
              <i className="fa-solid fa-cart-shopping"></i>
              <span className="cart-count">{cartItems?.length}</span>
            </Link>
          </div>
        </nav>
      </header>
    </>
  );
}
export default Header;
