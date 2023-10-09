import { useState } from "react";
import "./MyAccount.css";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { updateProfile } from "../../redux/features/auth/authSlice";
import Loader from "../../components/loader/Loader";

function AddressTab() {
  const dispatch = useDispatch();
  const { user, isLoading } = useSelector((state) => state.auth);
  const initialState = {
    street: user?.address?.street || "",
    postalCode: user?.address?.postalCode || "",
    country: user?.address?.country || "",
  };
  const [address, setAddress] = useState(initialState);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAddress({ ...address, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (address === initialState) return toast.error("Please enter a new address.");
    if (address.street === "" || address.postalCode === "" || address.country === "") return toast.error("Please enter all fields.");
    await dispatch(updateProfile({ address }));
  };

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="tab-content">
          <h3 className="tab-header">My Shipping Address</h3>
          <div className="tab-body">
            <form onSubmit={handleSubmit}>
              <div className="address">
                <label htmlFor="Street Address">Street Address: </label>
                <input type="text" className="form-input" name="street" value={address.street} onChange={handleInputChange} />
              </div>

              <div className="address">
                <label htmlFor="Street Address">Postal Code: </label>
                <input type="text" className="form-input" name="postalCode" value={address.postalCode} onChange={handleInputChange} />
              </div>

              <div className="address">
                <label htmlFor="Street Address">Country: </label>
                <input type="text" className="form-input" name="country" value={address.country} onChange={handleInputChange} />
              </div>

              <button type="submit" className="btn">
                Save
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default AddressTab;
