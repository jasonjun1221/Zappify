import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Register.css";
import { validateEmail } from "../../utils/utils";
import { register } from "../../redux/features/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import Loader from "../../components/loader/Loader";
import Newsletter from "../../components/newsletter/Newsletter";
import Footer from "../../components/footer/Footer";

const initialState = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
};

function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, isLoggedIn, isSuccess } = useSelector((state) => state.auth);
  const [formData, setFormData] = useState(initialState);
  const { name, email, password, confirmPassword } = formData;

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle register
  const handleRegister = async (e) => {
    e.preventDefault();
    if (!name || !email || !password || !confirmPassword) return toast.error("Please fill in all fields.");
    if (password.length < 6) return toast.error("Password must be at least 6 characters long.");
    if (!validateEmail(email)) return toast.error("Invalid email address.");
    if (password !== confirmPassword) return toast.error("Passwords do not match.");
    const userData = { name, email, password };
    await dispatch(register(userData));
  };

  // Redirect to home page when user is logged in
  useEffect(() => {
    if (isSuccess && isLoggedIn) navigate("/");
  }, [isSuccess, isLoggedIn, navigate]);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="register-container" data-testid="register-component">
          <h1 className="section-title">Register</h1>
          <form onSubmit={handleRegister} data-testid="register-form">
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              className="form-input"
              placeholder="Name"
              id="name"
              name="name"
              value={name}
              onChange={handleInputChange}
              data-testid="name-input"
            />
            <label htmlFor="email">Email Address:</label>
            <input
              type="email"
              className="form-input"
              placeholder="Email Address"
              id="email"
              name="email"
              value={email}
              onChange={handleInputChange}
              data-testid="email-input"
            />
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              className="form-input"
              placeholder="Password"
              id="password"
              name="password"
              value={password}
              onChange={handleInputChange}
              data-testid="password-input"
            />
            <label htmlFor="confirmPassword">Confirm password:</label>
            <input
              type="password"
              className="form-input"
              placeholder="Confirm Password"
              id="confirmPassword"
              name="confirmPassword"
              value={confirmPassword}
              onChange={handleInputChange}
              data-testid="confirm-password-input"
            />
            <button type="submit" className="btn register-btn" data-testid="submit-button">
              Register
            </button>
          </form>
          <p className="login-link">
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </div>
      )}
      <Newsletter />
      <Footer />
    </>
  );
}

export default Register;
