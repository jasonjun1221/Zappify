import "./MyAccount.css";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { updateProfile } from "../../redux/features/auth/authSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Loader from "../../components/loader/Loader";

function UpdateProfileTab() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isLoading } = useSelector((state) => state.auth);
  const [name, setName] = useState(user?.name || "");

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (name === user.name) return toast.error("Please enter a new name.");
    if (name === "") return toast.error("Please enter a name.");
    await dispatch(updateProfile({ name }));
    navigate("/myaccount");
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
