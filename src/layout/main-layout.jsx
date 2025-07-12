import { Outlet } from "react-router-dom";
import { useAuthMiddleware } from "../middleware/use-auth-middleware";


import Loading from "../components/loading/loading";
import Navbar from "./navbar/navbar";
import Footer from "./footer/footer";

export function MainLayout() {
  const { isAutentificated, user, loading, logout } = useAuthMiddleware();

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <Navbar
        isAutentificated={isAutentificated}
        user={user}
        onLogout={logout}
      />
      <Outlet />
      <Footer/>
    </>
  );
}




