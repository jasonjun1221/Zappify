import "./MyAccount.css";
import { useSelector } from "react-redux";
import Loader from "../../components/loader/Loader";

function DashboardTab() {
  const { isLoading, user } = useSelector((state) => state.auth);

  return (
    <>
      {isLoading && <Loader />}
      <div className="tab-content">
        <h3 className="tab-header">Hello, {user?.name}</h3>
        <p className="tab-body">
          From your account dashboard. you can easily check & view your recent orders, manage your shipping and billing addresses and edit
          your password and account details.
        </p>
      </div>
    </>
  );
}

export default DashboardTab;
