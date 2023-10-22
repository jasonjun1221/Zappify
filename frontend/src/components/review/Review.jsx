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
      <div className="reviews-container">
        <div className="reviews">
          <h1 className="section-title">Reviews ({reviews?.length})</h1>
          {reviews.map((review) => (
            <div className="review-single" key={review?.id}>
              <div>
                <img src={userReviewPNG} alt={review?.name} className="review-img" />
                <p className="review-title">{review?.name}</p>
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
        </div>

        <div className="review-form">
          <h1 className="section-title">Add a review</h1>
          <form className="form grid">
            <div className="rate-product">
              <i className="fa-solid fa-star"></i>
              <i className="fa-solid fa-star"></i>
              <i className="fa-solid fa-star"></i>
              <i className="fa-solid fa-star"></i>
              <i className="fa-solid fa-star"></i>
            </div>
            <textarea className="form-input textarea" placeholder="Write Comment"></textarea>
            <button className="btn review-btn">Submit Review</button>
          </form>
        </div>
      </div>
    </section>
  );
}
export default Review;
