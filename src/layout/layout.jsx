import { Outlet } from "react-router-dom";
import Navbar from "./navbar/navbar";

export function MainLayout() {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}

export function AuthLayout() {
  return (
    <div className="auth-layout">
      <Outlet />
    </div>
  );
}

export function Layout({ shownavbar = true, children }) {
  return (
    <>
      {shownavbar && <Navbar />}
      {children || <Outlet />}
    </>
  );
}
