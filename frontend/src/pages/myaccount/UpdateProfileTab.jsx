import "./MyAccount.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { updateProfile } from "../../redux/features/auth/authSlice";
import { toast } from "react-toastify";
import Loader from "../../components/loader/Loader";

function UpdateProfileTab() {
  const dispatch = useDispatch();
  const { user, isLoading } = useSelector((state) => state.auth);
  const [name, setName] = useState(user?.name || JSON.parse(localStorage.getItem("user"))?.name || "");
  const [phone, setPhone] = useState(user?.phone || JSON.parse(localStorage.getItem("user"))?.phone || "");

  // update local storage when name or phone changes
  useEffect(() => {
    localStorage.setItem("user", JSON.stringify({ ...user, name, phone }));
  }, [name, phone, user]);

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (name === user.name && phone === user.phone) return toast.error("Please enter a new name or phone no.");
    if (name === "" || phone === "") return toast.error("Please enter all fields.");
    await dispatch(updateProfile({ name, phone }));
  };

  return (
    <>
      {isLoading && <Loader />}
      <div className="tab-content">
        <h3 className="tab-header">Update Profile</h3>
        <div className="tab-body">
          <form onSubmit={handleSubmit}>
            <div className="content">
              <label htmlFor="newPassword">Username: </label>
              <input type="text" placeholder="Username" className="form-input" value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div className="content">
              <label htmlFor="phone">Phone No: </label>
              <input type="text" placeholder="Phone no." className="form-input" value={phone} onChange={(e) => setPhone(e.target.value)} />
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

export default UpdateProfileTab;
