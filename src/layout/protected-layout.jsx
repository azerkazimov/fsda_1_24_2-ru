import { Outlet } from "react-router-dom";
import Loading from "../components/loading/loading";
import { useAuthMiddleware } from "../middleware/use-auth-middleware";
import Navbar from "./navbar/navbar";

export function ProtechtedLayout({
  requiredAuth = true,
  fallbackComponent = null,
}) {
  const { isAutentificated, loading, user, logout } = useAuthMiddleware();

  if (loading) {
    <Loading />;
  }

  if (!isAutentificated && requiredAuth) {
    return (
      fallbackComponent || (
        <div className="access">
          <h2>Access Denied</h2>
          <span>
            Please <a href="/auth/login">log in</a> to access this page
          </span>
        </div>
      )
    );
  }

  return (
    <>
      <Navbar isAutentificated={isAutentificated} user={user} onLogout={logout} />
      <Outlet />
    </>
  );
}