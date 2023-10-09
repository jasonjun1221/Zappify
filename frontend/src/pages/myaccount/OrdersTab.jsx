import { Link } from "react-router-dom";
import './MyAccount.css'

const orderDetails = [
  {
    orderNumber: "#1357",
    date: "March 45, 2020",
    status: "Processing",
    total: "$125.00",
  },
  {
    orderNumber: "#1248",
    date: "June 29, 2020",
    status: "Completed",
    total: "$364.00",
  },
  {
    orderNumber: "#1357",
    date: "August 02, 2020",
    status: "Completed",
    total: "$280.00",
  },
];

function OrdersTab() {
  return (
    <div className="tab-content">
      <h3 className="tab-header">Your Orders</h3>

      <div className="tab-body">
        <table className="order-table">
          <thead>
            <tr>
              <th>Orders</th>
              <th>Date</th>
              <th>Status</th>
              <th>Total</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {orderDetails.map((item, index) => (
              <tr key={index}>
                <td>{item.orderNumber}</td>
                <td>{item.date}</td>
                <td>{item.status}</td>
                <td>{item.total}</td>
                <td>
                  <Link to="/" className="view-order">
                    View
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default OrdersTab;
