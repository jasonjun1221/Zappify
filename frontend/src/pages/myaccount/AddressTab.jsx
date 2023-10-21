import "./MyAccount.css";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { updateProfile } from "../../redux/features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import Loader from "../../components/loader/Loader";

function AddressTab() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isLoading } = useSelector((state) => state.auth);
  const initialState = {
    street: user?.address?.street || "",
    postalCode: user?.address?.postalCode || "",
    country: user?.address?.country || "",
  };
  const [address, setAddress] = useState(initialState);

  // handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAddress({ ...address, [name]: value });
  };

  // handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (address === initialState) return toast.error("Please enter a new address.");
    if (address.street === "" || address.postalCode === "" || address.country === "") return toast.error("Please enter all fields.");
    await dispatch(updateProfile({ address }));
    navigate("/myaccount");
  };

  return (
    <>
      {isLoading && <Loader />}
      <div className="tab-content">
        <h3 className="tab-header">My Shipping Address</h3>
        <div className="tab-body">
          <form onSubmit={handleSubmit}>
            <div className="content">
              <label htmlFor="street">Street Address: </label>
              <input type="text" className="form-input" id="street" name="street" value={address?.street} onChange={handleInputChange} />
            </div>

            <div className="content">
              <label htmlFor="postalCode">Postal Code: </label>
              <input
                type="text"
                className="form-input"
                id="postalCode"
                name="postalCode"
                value={address?.postalCode}
                onChange={handleInputChange}
              />
            </div>

            <div className="content">
              <label htmlFor="country">Country: </label>
              <input type="text" className="form-input" id="country" name="country" value={address?.country} onChange={handleInputChange} />
            </div>

            <button type="submit" className="btn">
              Save
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default AddressTab;
