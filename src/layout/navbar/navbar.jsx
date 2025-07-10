import { useEffect, useState } from "react";
import "./navbar.css";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar({ isAutentificated, user, onLogout }) {
  const navigate = useNavigate();
  // const [loggedIn, setLoggedIn] = useState(null);

  const [scrolled, setScrolled] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setScrolled(scrollPosition > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(".avatar-container")) {
        setDropdownOpen(false);
      }
    };

    if (dropdownOpen) {
      document.addEventListener("click", handleClickOutside);
    }

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [dropdownOpen]);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <nav className={`navbar ${scrolled ? "scrolled" : ""}`}>
      <div className="container">
        <div className="navbar-menu">
          <Link to="/" className="nav-logo">
            StarBucks
          </Link>
          <ul className="nav-links">
            <li className="nav-item">
              <Link to="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link to="/users">Users</Link>
            </li>
            <li className="nav-item">
              <Link to="/about">About</Link>
            </li>
            <li className="nav-item">
              <Link to="/todo-list">Todo</Link>
            </li>
          </ul>
          {isAutentificated ? (
            <div className="avatar-container">
              <div className="avatar" onClick={toggleDropdown}></div>
              <span>{user?.name}</span>
              {dropdownOpen && (
                <div className="dropdown-menu">
                  <Link to="/dashboard" className="dropdown-item">
                    Dashboard
                  </Link>

                  <button className="dropdown-item" onClick={onLogout}>
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="last">
              <span className="nav-item ">
                <Link to="/auth/login">Login</Link>
              </span>
              <span className="nav-item ">
                <Link to="/auth/register">Register</Link>
              </span>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
