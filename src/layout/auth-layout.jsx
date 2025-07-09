import { Outlet, useNavigate } from "react-router-dom";
import { useAuthMiddleware } from "../middleware/use-auth-middleware";
import { useEffect } from "react";
import Loading from "../components/loading/loading";

export function AuthLayout() {
  const { isAutentificated, loading } = useAuthMiddleware();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && isAutentificated) {
      navigate("/dashboard", { replace: true });
    }
  }, [isAutentificated, loading, navigate]);

  if (loading) {
    <Loading />;
  }

  if (isAutentificated) {
    return null;
  }

  return (
    <div className="auth-layout">
      <Outlet />
    </div>
  );
}