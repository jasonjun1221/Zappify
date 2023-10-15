import "./MyAccount.css";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { toast } from "react-toastify";
import { updatePassword } from "../../redux/features/auth/authSlice";
import Loader from "../../components/loader/Loader";

function UpdatePasswordTab() {
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.auth);

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (currentPassword === newPassword) return toast.error("Please enter a new password.");
    if (currentPassword === "" || newPassword === "" || confirmPassword === "") return toast.error("Please enter all fields.");
    if (newPassword !== confirmPassword) return toast.error("Passwords do not match.");
    if (newPassword.length < 6) return toast.error("Password must be at least 6 characters long.");
    await dispatch(updatePassword({ currentPassword, newPassword }));
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
  };

  return (
    <>
      {isLoading && <Loader />}
      <div className="tab-content">
        <h3 className="tab-header">Change Password</h3>
        <div className="tab-body">
          <form onSubmit={handleSubmit}>
            <div className="content">
              <label htmlFor="currentPassword">Current Password: </label>
              <input
                type="password"
                placeholder="Current Password"
                id="currentPassword"
                className="form-input"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
              />
            </div>

            <div className="content">
              <label htmlFor="newPassword">New Password: </label>
              <input
                type="password"
                placeholder="New Password"
                id="newPassword"
                className="form-input"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </div>
            <div className="content">
              <label htmlFor="confirmPassword">Confirm Password: </label>
              <input
                type="password"
                placeholder="Confirm Password"
                id="confirmPassword"
                className="form-input"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
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

export default UpdatePasswordTab;
