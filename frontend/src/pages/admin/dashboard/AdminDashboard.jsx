import "./AdminDashboard.css";

function AdminDashboard() {
  return (
    <div className="admin-dashboard">
      <div className="statistic-container">
        <div className="sales-box">
          <h1>230,503</h1>
        </div>
        <div className="sales-box">
          <h1>230,503</h1>
        </div>
        <div className="sales-box">
          <h1>230,503</h1>
        </div>
      </div>
      <div className="graph-container"></div>
      <div className="orders-container"></div>
    </div>
  );
}

export default AdminDashboard;