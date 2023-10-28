import { NavLink, Link } from "react-router-dom";
import "./Header.css";
import logoSVG from "../../assets/logo.svg";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { calculateTotalQuantity } from "../../redux/features/cart/cartSlice";

const navigations = [
  { name: "Home", link: "/" },
  { name: "Shop", link: "/shop" },
  { name: "About Us", link: "/about" },
];

function Header() {
  const dispatch = useDispatch();
  const { isLoggedIn, user } = useSelector((state) => state.auth);
  const { cartItems, totalQuantity } = useSelector((state) => state.cart);

  // Calculate total quantity of cart items
  useEffect(() => {
    dispatch(calculateTotalQuantity());
  }, [dispatch, cartItems]);

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

              {isLoggedIn && user?.isAdmin ? (
                <li className="nav-item">
                  <NavLink to="/admin" className="nav-link">
                    Admin
                  </NavLink>
                </li>
              ) : null}

              {!isLoggedIn ? (
                <li className="nav-item">
                  <NavLink to="/login" className="nav-link">
                    Login
                  </NavLink>
                </li>
              ) : null}
            </ul>

            {isLoggedIn ? (
              <NavLink to="/myaccount" className="nav-link myaccount">
                My Account
              </NavLink>
            ) : null}
          </div>

          <div className="header-cart">
            <Link to="/cart" className="cart-btn">
              {totalQuantity && totalQuantity > 0 ? (
                <>
                  <i className="fa-solid fa-cart-shopping"></i>
                  <span className="cart-count">{totalQuantity}</span>
                </>
              ) : (
                <i className="fa-solid fa-cart-shopping"></i>
              )}
            </Link>
          </div>
        </nav>
      </header>
    </>
  );
}
export default Header;
