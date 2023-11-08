import "./CartCoupon.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCoupon, resetCoupon } from "../../redux/features/coupon/couponSlice";
import { toast } from "react-toastify";
import { resetDiscountedPrice } from "../../redux/features/cart/cartSlice";

function CartCoupon() {
  const dispatch = useDispatch();
  const { coupon } = useSelector((state) => state.coupon);
  const [couponName, setCouponName] = useState("");

  // update local storage when coupon changes
  useEffect(() => {
    localStorage.setItem("coupon", JSON.stringify(coupon));
  }, [coupon]);

  // handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (couponName === "") return toast.error("Please enter a coupon name");
    await dispatch(getCoupon(couponName));
  };

  // remove coupon
  const removeCoupon = async () => {
    await dispatch(resetCoupon());
    await dispatch(resetDiscountedPrice());
    setCouponName("");
    localStorage.removeItem("coupon");
    toast.success("Coupon removed successfully.");
  };

  return (
    <div className="cart-coupon">
      <h3 className="section-title">Apply Coupon</h3>
      <form onSubmit={handleSubmit}>
        {coupon === null ? (
          <div className="form-group apply-coupon">
            <label htmlFor="couponName">Coupon name:</label>
            <input
              type="text"
              id="couponName"
              placeholder="Coupon"
              className="form-input"
              value={couponName}
              onChange={(e) => setCouponName(e.target.value.toUpperCase())}
            />
            <button type="submit" className="btn">
              Apply
            </button>
          </div>
        ) : (
          <>
            <div className="coupon-details">
              <h3>
                Expiry date:<span className="span-3">{coupon?.expiry.slice(0, 10)}</span>
              </h3>
              <h3>
                Coupon applied:<span className="span-1">{coupon?.name}</span>
              </h3>
              <h3>
                Discount rate:<span className="span-2">{coupon?.discount}%</span>
              </h3>
            </div>
            <button className="btn coupon-btn" onClick={removeCoupon}>
              Remove
            </button>
          </>
        )}
      </form>
    </div>
  );
}
export default CartCoupon;
