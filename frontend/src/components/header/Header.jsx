import { NavLink, Link } from "react-router-dom";
import "./Header.css";
import logoSVG from "../../assets/logo.svg";
import { useSelector } from "react-redux";

const navigations = [
  { name: "Home", link: "/" },
  { name: "Categories", link: "/catergories" },
  { name: "About Us", link: "/" },
];

function Header() {
  const { isLoggedIn, user } = useSelector((state) => state.auth);

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
                <li className="nav-item">
                  <NavLink to="/myaccount" className="nav-link">
                    My Account
                  </NavLink>
                </li>
              )}
            </ul>

            <div className="header-search">
              <input type="text" placeholder="Search for items..." className="form-input" />
              <button className="search-btn">
                <i className="fa-solid fa-magnifying-glass"></i>
              </button>
            </div>
          </div>

          <div className="header-cart">
            <Link to="/cart" className="cart-btn">
              <i className="fa-solid fa-cart-shopping"></i>
              <span className="cart-count">3</span>
            </Link>
          </div>
        </nav>
      </header>
    </>
  );
}
export default Header;
