import { AlertCircle, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import "./error.css"

export default function Error({ error }) {
  const navigate = useNavigate();
  return (
    <div className="error-container">
      <AlertCircle size={48} className="error-icon" />
      <h2>Error</h2>
      <p>{error}</p>

      <button onClick={() => navigate("/")}>
        <ArrowLeft />
        Return
      </button>
    </div>
  );
}
