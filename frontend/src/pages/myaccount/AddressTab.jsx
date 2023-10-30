import "./MyAccount.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { updateProfile } from "../../redux/features/auth/authSlice";
import Loader from "../../components/loader/Loader";
import { CountryDropdown } from "react-country-region-selector";

function AddressTab() {
  const dispatch = useDispatch();
  const { user, isLoading } = useSelector((state) => state.auth);
  const initialState = {
    street: user?.address?.street || JSON.parse(localStorage.getItem("user"))?.address?.street || "",
    postalCode: user?.address?.postalCode || JSON.parse(localStorage.getItem("user"))?.address?.postalCode || "",
    country: user?.address?.country || JSON.parse(localStorage.getItem("user"))?.address?.country || "",
  };
  const [address, setAddress] = useState(initialState);

  // update local storage when address changes
  useEffect(() => {
    localStorage.setItem("user", JSON.stringify({ ...user, address }));
  }, [address, user]);

  // handle input change
  const handleInputChange = (e) => {
    setAddress({ ...address, [e.target.name]: e.target.value });
  };

  // handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (address === initialState) return toast.error("Please enter a new address.");
    if (address.street === "" || address.postalCode === "" || address.country === "") return toast.error("Please enter all fields.");
    await dispatch(updateProfile({ address }));
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
              <CountryDropdown
                id="country"
                className="form-input country-dropdown"
                value={address?.country}
                onChange={(val) => handleInputChange({ target: { name: "country", value: val } })}
              />
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
