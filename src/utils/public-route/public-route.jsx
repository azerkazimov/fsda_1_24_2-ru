import { Navigate, useLocation } from "react-router-dom";
import { useAuthMiddleware } from "../../middleware/use-auth-middleware";
import Loading from "../../components/loading/loading";

export default function PublicRoute({ children, redirectTo = "/" }) {
  const { isAutentificated, loading } = useAuthMiddleware();
  const location = useLocation();

  if (loading) {
    <Loading />;
  }

  if (isAutentificated) {
    const from = location.state?.from?.pathname || redirectTo;
    return <Navigate to={from} replace />;
  }

  return children;
}
