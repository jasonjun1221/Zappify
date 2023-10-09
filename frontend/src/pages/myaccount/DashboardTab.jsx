import "./MyAccount.css";
import { useSelector } from "react-redux";

function DashboardTab() {
  const { user } = useSelector((state) => state.auth);

  return (
    <div className="tab-content">
      <h3 className="tab-header">Hello, {user?.name || "Loading..."}</h3>
      <p className="tab-body">
        From your account dashboard. you can easily check & view your recent orders, manage your shipping and billing addresses and edit
        your password and account details.
      </p>
    </div>
  );
}

export default DashboardTab;
