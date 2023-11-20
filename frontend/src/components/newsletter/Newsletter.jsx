import "./Newsletter.css";
import emailSVG from "../../assets/email.svg";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { sendEmail } from "../../redux/features/coupon/couponSlice";
import { validateEmail } from "../../utils/utils";
import { toast } from "react-toastify";

function Newsletter() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (email === "") return toast.error("Please enter your email address.");
    if (validateEmail(email) === false) return toast.error("Please enter a valid email address.");
    await dispatch(sendEmail({ email }));
    setEmail("");
  };

  return (
    <section className="newsletter">
      <div className="newsletter-container container grid">
        <img src={emailSVG} alt="email" className="newsletter-icon" />
        <h1 className="newsletter-title">Sign up to Newsletter</h1>
        <p className="newsletter-description">...and receive 50% discount coupon for shopping.</p>
        <form className="newsletter-form" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Enter your email"
            className="newsletter-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button type="submit" className="newsletter-btn">
            Subscribe
          </button>
        </form>
      </div>
    </section>
  );
}
export default Newsletter;
