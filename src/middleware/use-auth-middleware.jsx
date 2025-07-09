import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export function useAuthMiddleware() {
  const [isAutentificated, setIsAutentificated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    chechAuthStatus();
  }, [location.pathname]);

  const chechAuthStatus = () => {
    try {
      const loginData = localStorage.getItem("logindata");
      const userData = localStorage.getItem("userdata");

      if (loginData && userData) {
        const parseLoginData = JSON.parse(loginData);
        const parseUserData = JSON.parse(userData);

        if (parseLoginData.isLoggedIn) {
          setIsAutentificated(true);
          setUser({
            name: parseLoginData.name,
            email: parseLoginData.email,
            loginTime: parseLoginData.loginTime,
          });
        } else {
          clearAuthData();
        }
      } else {
        clearAuthData();
      }
    } catch (error) {
      console.error("Auth check error: ", error);
      clearAuthData();
    } finally {
      setLoading(false);
    }
  };

  const clearAuthData = () => {
    setIsAutentificated(false);
    setUser(null);
    localStorage.removeItem("logindata");
  };

  const logout = () => {
    clearAuthData();
    navigate("/auth/login");
  };

  return {
    isAutentificated,
    user,
    loading,
    logout,
    chechAuthStatus,
  };
}

export function useRouterProtection(
  requireAuth = false,
  redirectTo = "/auth/login"
) {
  const { isAutentificated, loading } = useAuthMiddleware();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!loading) {
      if (requireAuth && !isAutentificated) {
        navigate(redirectTo, {
          state: { from: location },
          replace: true,
        });
      }
    }
  }, [isAutentificated, requireAuth, loading, redirectTo, navigate, location]);

  return { isAutentificated, loading };
}
