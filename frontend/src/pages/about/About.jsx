import "./About.css"; // Import the CSS

const About = () => {
  return (
    <div className="about-page">
      <header>
        <h1>About Zappify</h1>
        <p>Welcome to Zappify, your one-stop destination for all your electronics needs.</p>
      </header>

      <section className="mission">
        <h2>Our Mission</h2>
        <p>
          At Zappify, our mission is to provide you with high-quality electronics at affordable prices. We are committed to delivering the
          latest technology to your doorstep while ensuring an exceptional shopping experience.
        </p>
      </section>

      <section className="history">
        <h2>Our History</h2>
        <p>
          Zappify was founded in [Year] with a vision to revolutionize the electronics retail industry. Since then, we have been
          consistently delivering innovative products and exceptional customer service.
        </p>
      </section>

      <section className="team">
        <h2>Our Team</h2>
        <p>
          Zappify is powered by a dedicated and passionate team of professionals who are experts in the field of electronics. Our team works
          tirelessly to ensure that you have access to the best products and support.
        </p>
      </section>

      <section className="contact">
        <h2>Contact Us</h2>
        <p>We'd love to hear from you! If you have any questions, feedback, or inquiries, please don't hesitate to get in touch with us.</p>
        <div className="contact-info">
          <p>Email: info@zappify.com</p>
          <p>Phone: [+1 (123) 456-7890]</p>
          <p>Address: [Your Address]</p>
        </div>
      </section>
    </div>
  );
};

export default About;
