import "./Newsletter.css";
import emailSVG from "../../assets/email.svg";

function Newsletter() {
  return (
    <section className="newsletter">
      <div className="newsletter-container container grid">
        <img src={emailSVG} alt="email" className="newsletter-icon" />
        <h1 className="newsletter-title">Sign up to Newsletter</h1>
        <p className="newsletter-description">...and receive 50% discount coupon for shopping.</p>
        <form action="" className="newsletter-form">
          <input type="text" placeholder="Enter your email" className="newsletter-input" />
          <button type="submit" className="newsletter-btn">
            Subscribe
          </button>
        </form>
      </div>
    </section>
  );
}
export default Newsletter;
