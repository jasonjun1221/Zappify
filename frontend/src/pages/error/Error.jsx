import { useNavigate } from "react-router-dom";
import "./Error.css";

function Error() {
  const navigate = useNavigate();

  return (
    <div className="error-page-container">
      <div className="error-page">
        <h1 className="error-code">404</h1>
        <p className="error-message">Page not found.</p>
        <button className="btn" onClick={() => navigate(-1)}>
          Go Back
        </button>
      </div>
    </div>
  );
}
export default Error;
