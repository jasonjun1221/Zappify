import { Link } from "react-router-dom";
import "./Footer.css";
import logoSVG from "../../assets/logo.svg";
import paymentPNG from "../../assets/payment.png";

const contacts = [
  { title: "Address", description: "#01-91, 5026 Ang Mo Kio Industrial Park 2" },
  { title: "Phone no", description: "+65 2222 7898 / +65 2345 6789" },
  { title: "Postal code", description: "569529" },
  { title: "Country", description: "Singapore" },
];

const socialLinks = [
  { link: "https://www.facebook.com/", icon: "fa-brands fa-facebook", color: "#1877F2" },
  { link: "https://www.youtube.com/", icon: "fa-brands fa-youtube", color: "#c4302b" },
  { link: "https://www.instagram.com/", icon: "fa-brands fa-square-instagram", color: "#E4405F" },
];

const companys = ["About Us", "Delivery Information", "Privacy Policy", "Terms & Conditions", "Contact Us", "Support Center"];

function Footer() {
  return (
    <footer className="container">
      <div className="footer-container grid">
        <div className="footer__content">
          <Link to="/">
            <img src={logoSVG} alt="" className="footer-logo" />
          </Link>
          <h2 className="footer-title">Contact</h2>

          {contacts.map((item, index) => (
            <p key={index} className="footer-description">
              <span>{item.title}: </span>
              {item.description}
            </p>
          ))}
        </div>

        <div>
          <h2 className="footer-title">Company</h2>
          {companys.map((item, index) => (
            <ul key={index}>
              <li>
                <Link to="/" className="footer-link">
                  {item}
                </Link>
              </li>
            </ul>
          ))}
        </div>

        <div>
          <h2 className="footer-title">Secured Payment Gateways</h2>

          <img src={paymentPNG} alt="payment" className="payment-img" />

          <div className="footer-social">
            <h2 className="footer-title">Follow us</h2>
            <div className="footer-social-links">
              {socialLinks.map((item, index) => (
                <Link to="/" key={index}>
                  <i className={item.icon} style={{ color: item.color }}></i>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; 2023 Zappify. All rights reserved</p>
        <p>Designed by Chong Wei Jun</p>
      </div>
    </footer>
  );
}
export default Footer;
