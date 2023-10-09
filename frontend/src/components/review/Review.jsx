import "./Review.css";
import userReviewPNG from "../../assets/user-review.png";

const reviews = [
  {
    id: 1,
    name: "Jacky Chan",
    rating: 5,
    description: "Thank you very fast shipping from Poland only 3days.",
    date: "December 4, 2020 at 3:12 pm",
  },
  {
    id: 2,
    name: "Jacky Chan",
    rating: 5,
    description: "Great low price and works well.",
    date: "December 4, 2020 at 3:12 pm",
  },
  {
    id: 3,
    name: "Jacky Chan",
    rating: 5,
    description: "Authentic and Beautiful, Love these way more than ever expected They are Great earphones",
    date: "December 4, 2020 at 3:12 pm",
  },
];

function Review() {
  return (
    <section className="container">
      <h1 className="section-title">Reviews (3)</h1>

      <div className="reviews-container">
        {reviews.map((review) => (
          <div className="review-single" key={review.id}>
            <div>
              <img src={userReviewPNG} alt={review.name} className="review-img" />
              <p className="review-title">{review.name}</p>
            </div>

            <div>
              <div className="review-rating">
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star"></i>
              </div>

              <p className="review-description">{review.description}</p>
              <span>{review.date}</span>
            </div>
          </div>
        ))}

        <div className="review-form">
          <h2 className="review-form-title">Add a review</h2>

          <form action="" className="form grid">
            <div className="rate-product">
              <i className="fa-solid fa-star"></i>
              <i className="fa-solid fa-star"></i>
              <i className="fa-solid fa-star"></i>
              <i className="fa-solid fa-star"></i>
              <i className="fa-solid fa-star"></i>
            </div>

            <textarea className="form-input textarea" placeholder="Write Comment"></textarea>

            <div className="form-group grid">
              <input type="text" placeholder="Name" className="form-input" />
              <input type="email" placeholder="Email" className="form-input" />
            </div>

            <button className="btn review-btn">Submit Review</button>
          </form>
        </div>
      </div>
    </section>
  );
}
export default Review;
