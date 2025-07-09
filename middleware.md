``` js

// middleware/authMiddleware.js
import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

// Authentication middleware hook
export function useAuthMiddleware() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    checkAuthStatus();
  }, [location.pathname]);

  const checkAuthStatus = () => {
    try {
      const loginData = localStorage.getItem('logindata');
      const userData = localStorage.getItem('userdata');

      if (loginData && userData) {
        const parsedLoginData = JSON.parse(loginData);
        const parsedUserData = JSON.parse(userData);

        if (parsedLoginData.isLoggedIn) {
          setIsAuthenticated(true);
          setUser({
            name: parsedLoginData.name,
            email: parsedLoginData.email,
            loginTime: parsedLoginData.loginTime,
          });
        } else {
          clearAuthData();
        }
      } else {
        clearAuthData();
      }
    } catch (error) {
      console.error('Auth check error:', error);
      clearAuthData();
    } finally {
      setLoading(false);
    }
  };

  const clearAuthData = () => {
    setIsAuthenticated(false);
    setUser(null);
    localStorage.removeItem('logindata');
  };

  const logout = () => {
    clearAuthData();
    navigate('/auth/login');
  };

  return {
    isAuthenticated,
    user,
    loading,
    logout,
    checkAuthStatus
  };
}

// Route protection middleware
export function useRouteProtection(requiredAuth = false, redirectTo = '/auth/login') {
  const { isAuthenticated, loading } = useAuthMiddleware();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!loading) {
      if (requiredAuth && !isAuthenticated) {
        navigate(redirectTo, { 
          state: { from: location },
          replace: true 
        });
      }
    }
  }, [isAuthenticated, loading, requiredAuth, redirectTo, navigate, location]);

  return { isAuthenticated, loading };
}

// ========================================
// layout/Layout.js - Updated with middleware
// ========================================
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { useAuthMiddleware } from '../middleware/authMiddleware';
import { Loader } from 'lucide-react';

// Main Layout with Navbar and Auth Middleware
export function MainLayout() {
  const { isAuthenticated, user, loading, logout } = useAuthMiddleware();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="flex flex-col items-center">
          <Loader className="animate-spin h-8 w-8 text-blue-600 mb-2" />
          <span className="text-gray-600">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar 
        isAuthenticated={isAuthenticated} 
        user={user} 
        onLogout={logout} 
      />
      <main className="container mx-auto px-4 py-8">
        <Outlet />
      </main>
    </div>
  );
}

// Auth Layout without Navbar
export function AuthLayout() {
  const { isAuthenticated, loading } = useAuthMiddleware();
  const navigate = useNavigate();

  // Redirect authenticated users away from auth pages
  useEffect(() => {
    if (!loading && isAuthenticated) {
      navigate('/', { replace: true });
    }
  }, [isAuthenticated, loading, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="flex flex-col items-center">
          <Loader className="animate-spin h-8 w-8 text-blue-600 mb-2" />
          <span className="text-gray-600">Loading...</span>
        </div>
      </div>
    );
  }

  if (isAuthenticated) {
    return null; // Will redirect in useEffect
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Outlet />
    </div>
  );
}

// Protected Layout for authenticated routes only
export function ProtectedLayout({ requiredAuth = true, fallbackComponent = null }) {
  const { isAuthenticated, user, loading, logout } = useAuthMiddleware();
  const { loading: routeLoading } = useRouteProtection(requiredAuth);

  if (loading || routeLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="flex flex-col items-center">
          <Loader className="animate-spin h-8 w-8 text-blue-600 mb-2" />
          <span className="text-gray-600">Checking authentication...</span>
        </div>
      </div>
    );
  }

  if (!isAuthenticated && requiredAuth) {
    return fallbackComponent || (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Access Denied
          </h2>
          <p className="text-gray-600">
            Please log in to access this page.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar 
        isAuthenticated={isAuthenticated} 
        user={user} 
        onLogout={logout} 
      />
      <main className="container mx-auto px-4 py-8">
        <Outlet />
      </main>
    </div>
  );
}

// ========================================
// components/Navbar.js - Updated with auth integration
// ========================================
import { Link, useLocation } from 'react-router-dom';
import { User, LogOut, Home, Users, Info, CheckSquare } from 'lucide-react';

export default function Navbar({ isAuthenticated, user, onLogout }) {
  const location = useLocation();

  const navigation = [
    { name: 'Home', href: '/', icon: Home },
    { name: 'Users', href: '/users', icon: Users },
    { name: 'About', href: '/about', icon: Info },
    { name: 'Todo List', href: '/todo-list', icon: CheckSquare },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="bg-white shadow-lg border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0">
              <h1 className="text-xl font-bold text-gray-900">MyApp</h1>
            </Link>
          </div>

          {/* Navigation Links */}
          <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
            {navigation.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                    isActive(item.href)
                      ? 'border-blue-500 text-gray-900'
                      : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                  }`}
                >
                  <Icon size={16} className="mr-2" />
                  {item.name}
                </Link>
              );
            })}
          </div>

          {/* User Menu */}
          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <User size={20} className="text-gray-500" />
                  <span className="text-sm font-medium text-gray-700">
                    {user?.name}
                  </span>
                </div>
                <button
                  onClick={onLogout}
                  className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                >
                  <LogOut size={16} className="mr-2" />
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Link
                  to="/auth/login"
                  className="text-gray-500 hover:text-gray-700 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Login
                </Link>
                <Link
                  to="/auth/register"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-md text-sm font-medium"
                >
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className="sm:hidden">
        <div className="pt-2 pb-3 space-y-1">
          {navigation.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.name}
                to={item.href}
                className={`block pl-3 pr-4 py-2 border-l-4 text-base font-medium ${
                  isActive(item.href)
                    ? 'bg-blue-50 border-blue-500 text-blue-700'
                    : 'border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700'
                }`}
              >
                <div className="flex items-center">
                  <Icon size={16} className="mr-3" />
                  {item.name}
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}

// ========================================
// components/ProtectedRoute.js - Updated component
// ========================================
import { Navigate, useLocation } from 'react-router-dom';
import { useAuthMiddleware } from '../middleware/authMiddleware';
import { Loader } from 'lucide-react';

export function ProtectedRoute({ children, redirectTo = '/auth/login' }) {
  const { isAuthenticated, loading } = useAuthMiddleware();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="flex flex-col items-center">
          <Loader className="animate-spin h-8 w-8 text-blue-600 mb-2" />
          <span className="text-gray-600">Checking authentication...</span>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to={redirectTo} state={{ from: location }} replace />;
  }

  return children;
}

export function PublicRoute({ children, redirectTo = '/' }) {
  const { isAuthenticated, loading } = useAuthMiddleware();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="flex flex-col items-center">
          <Loader className="animate-spin h-8 w-8 text-blue-600 mb-2" />
          <span className="text-gray-600">Loading...</span>
        </div>
      </div>
    );
  }

  if (isAuthenticated) {
    const from = location.state?.from?.pathname || redirectTo;
    return <Navigate to={from} replace />;
  }

  return children;
}

// ========================================
// App.js - Updated with middleware integration
// ========================================
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { MainLayout, AuthLayout, ProtectedLayout } from "./layout/Layout";
import { ProtectedRoute, PublicRoute } from "./components/ProtectedRoute";

// Pages
import Main from "./pages/main/main";
import UsersApp from "./pages/users/users-app";
import UserDetail from "./pages/users/user-detail";
import About from "./pages/about/about";
import TodoApp from "./pages/todo-list/todo-app";
import Login from "./pages/auth/login/login";
import Register from "./pages/auth/register/register";

// Dashboard for authenticated users
function Dashboard() {
  const { user } = useAuthMiddleware();
  
  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Dashboard</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-blue-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-blue-900 mb-2">Welcome!</h3>
            <p className="text-blue-700">Hello, {user?.name}!</p>
            <p className="text-blue-600 text-sm">Email: {user?.email}</p>
          </div>
          
          <div className="bg-green-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-green-900 mb-2">Status</h3>
            <p className="text-green-700">You are logged in</p>
            <p className="text-green-600 text-sm">
              Since: {user?.loginTime ? new Date(user.loginTime).toLocaleString() : 'Unknown'}
            </p>
          </div>
          
          <div className="bg-purple-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-purple-900 mb-2">Quick Actions</h3>
            <div className="space-y-2">
              <Link to="/users" className="block text-purple-700 hover:underline">
                Manage Users
              </Link>
              <Link to="/todo-list" className="block text-purple-700 hover:underline">
                View Todo List
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <Routes>
        {/* Public routes with Navbar */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<Main />} />
          <Route path="/users" element={<UsersApp />} />
          <Route path="/users/:id" element={<UserDetail />} />
          <Route path="/about" element={<About user="Mussolini" />} />
          <Route path="/todo-list" element={<TodoApp />} />
        </Route>

        {/* Protected routes with Navbar */}
        <Route element={<ProtectedLayout />}>
          <Route 
            path="/dashboard" 
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } 
          />
        </Route>

        {/* Auth routes without Navbar */}
        <Route element={<AuthLayout />}>
          <Route 
            path="/auth/login" 
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            } 
          />
          <Route 
            path="/auth/register" 
            element={
              <PublicRoute>
                <Register />
              </PublicRoute>
            } 
          />
        </Route>

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}
