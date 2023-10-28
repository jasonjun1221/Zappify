import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Login.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { validateEmail } from "../../utils/utils";
import { login } from "../../redux/features/auth/authSlice";
import Loader from "../../components/loader/Loader";
import { getCartItems } from "../../redux/features/cart/cartSlice";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, isLoggedIn, isSuccess } = useSelector((state) => state.auth);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Handle login
  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) return toast.error("Please fill in all fields.");
    if (!validateEmail(email)) return toast.error("Invalid email address.");
    await dispatch(login({ email, password }));
  };

  // Get cart items when user is logged in and redirect to home page
  useEffect(() => {
    if (isSuccess && isLoggedIn) {
      dispatch(getCartItems());
      navigate("/");
    }
  }, [isSuccess, isLoggedIn, navigate, dispatch]);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="login-container">
          <h1 className="section-title">Login</h1>
          <form onSubmit={handleLogin}>
            <div className="form-group">
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                className="form-input"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password:</label>
              <input
                type="password"
                id="password"
                className="form-input"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button type="submit" className="btn login-btn">
              Login
            </button>
          </form>
          <p className="register-link">
            Don't have an account? <Link to="/register">Register</Link>
          </p>
        </div>
      )}
    </>
  );
}

export default Login;
