import ReactDOM from "react-dom";
import "./Loader.css";

function Loader() {
  return ReactDOM.createPortal(
    <div className="loader-container">
      <div className="loader"></div>
    </div>,
    document.getElementById("loader")
  );
}

export default Loader;
