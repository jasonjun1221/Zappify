import "./ProductReview.css";
import userReviewPNG from "../../assets/user-review.png";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import StarRatings from "react-star-ratings";
import { createReview, deleteReview, getReviews } from "../../redux/features/review/reviewSlice";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";

function ProductReview() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const { isLoggedIn, user } = useSelector((state) => state.auth);
  const { reviews } = useSelector((state) => state.review);

  // Get reviews by product id
  useEffect(() => {
    dispatch(getReviews(id));
  }, [dispatch, id]);

  // Handle submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    const reviewData = { rating, comment };

    if (isLoggedIn) {
      await dispatch(createReview({ productId: id, reviewData }));
      dispatch(getReviews(id));
      setRating(0);
      setComment("");
    } else {
      navigate("/login");
    }
  };

  // Delete category
  const handleDelete = async (id, reviewId) => {
    await dispatch(deleteReview({ productId: id, reviewId }));
    await dispatch(getReviews(id));
  };

  // Confirm delete
  const confirmDelete = (id, reviewId) => {
    confirmAlert({
      title: "Delete Review",
      message: `Are you sure you want to delete this review(${reviewId})?`,
      buttons: [
        { label: "Yes", onClick: () => handleDelete(id, reviewId) },
        { label: "Cancel", onClick: () => {} },
      ],
    });
  };

  return (
    <div className="reviews-container">
      <div className="reviews">
        <h1 className="section-title">Reviews ({reviews?.length})</h1>
        {reviews.map((review) => (
          <div className="review-single" key={review?._id}>
            <div>
              <img src={userReviewPNG} alt={review?.name} className="review-img" />
              <p className="review-title">{review?.name}</p>
            </div>

            <div>
              <StarRatings
                rating={review?.rating}
                numberOfStars={5}
                starRatedColor="#FFDF00"
                starDimension="20px"
                starSpacing="1px"
                name="rating"
              />
              <div className="review-comment">{review?.comment}</div>
              <div className="reviews-action">
                <span>{review?.date.substring(0, 10)}</span>
                {user?.isAdmin && (
                  <button className="delete-review" onClick={() => confirmDelete(id, review?._id)}>
                    <i className="fa-solid fa-trash trash-icon"></i>
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="review-form">
        <h1 className="section-title">Add a review</h1>
        <form className="form grid" onSubmit={handleSubmit}>
          <div className="ratings-btn">
            <StarRatings
              rating={rating}
              changeRating={(newRating) => setRating(newRating)}
              numberOfStars={5}
              starRatedColor="#FFDF00"
              starHoverColor="#FFDF00"
              starDimension="40px"
              starSpacing="5px"
              name="rating"
            />
            <button type="submit" className="btn review-btn">
              Submit Review
            </button>
          </div>

          <textarea
            className="form-input textarea"
            placeholder="Write Comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          ></textarea>
        </form>
      </div>
    </div>
  );
}
export default ProductReview;
