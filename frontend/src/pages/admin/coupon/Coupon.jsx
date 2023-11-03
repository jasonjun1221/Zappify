import "./Coupon.css";
import { useState } from "react";
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

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (name === "") return toast.error("Please enter a coupon name.");
    if (discount === "") return toast.error("Please enter a discount.");
    if (expiry === "") return toast.error("Please select an expiry date.");
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
              placeholder="Discount in %"
              className="form-input"
              min="1"
              max="100"
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
