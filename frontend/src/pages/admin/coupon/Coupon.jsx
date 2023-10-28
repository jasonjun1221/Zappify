import { useState } from "react";
import "./Coupon.css";
import CouponList from "./CouponList";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { createCoupon, getCoupons } from "../../../redux/features/coupon/couponSlice";

function Coupon() {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [discount, setDiscount] = useState("");
  const [expiry, setExpiry] = useState(new Date());

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (name === "") return toast.error("Coupon name is required.");
    if (discount === "") return toast.error("Discount is required.");
    if (expiry === "") return toast.error("Expiry date is required.");
    if (discount < 1 || discount > 100) return toast.error("Discount must be between 1 and 100.");
    await dispatch(createCoupon({ name, discount, expiry }));
    await dispatch(getCoupons());
    setName("");
    setDiscount("");
    setExpiry(new Date());
  };

  return (
    <>
      <div className="coupon-form">
        <h1 className="section-title">Add New Coupon</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="couponName">Coupon:</label>
            <input
              type="text"
              id="couponName"
              placeholder="Coupon"
              className="form-input"
              value={name}
              onChange={(e) => setName(e.target.value.toUpperCase())}
            />
          </div>
          <div className="form-group">
            <label htmlFor="discount">Discount(%):</label>
            <input
              type="number"
              id="discount"
              min="1"
              max="100"
              placeholder="Discount in %"
              className="form-input"
              value={discount}
              onChange={(e) => setDiscount(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Expiry Date:</label>
            <DatePicker className="form-input" selected={expiry} value={expiry} onChange={(date) => setExpiry(date)} required />
          </div>
          <div className="form-group">
            <button type="submit" className="btn">
              Add
            </button>
          </div>
        </form>
      </div>

      <CouponList />
    </>
  );
}
export default Coupon;
