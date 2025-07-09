import { Navigate, useLocation } from "react-router-dom";
import { useAuthMiddleware } from "../../middleware/use-auth-middleware";
import Loading from "../../components/loading/loading";

export default function ProtectedRoute({
  children,
  redirectTo = "/auth/login",
}) {
  const { isAutentificated, loading } = useAuthMiddleware();
  const location = useLocation();

  if (loading) {
   return <Loading />;
  }

  if (!isAutentificated) {
    return <Navigate to={redirectTo} state={{ from: location }} replace />;
  }

  return children
}
