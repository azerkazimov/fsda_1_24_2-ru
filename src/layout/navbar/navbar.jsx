import { useEffect, useState } from "react";
import "./navbar.css";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate()
  const [scrolled, setScrolled] = useState(false);
  const [loggedIn, setLoggedIn] = useState(null);
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
    const storredData = localStorage.getItem("logindata");
    try {
      const userData = JSON.parse(storredData);
      setLoggedIn(userData?.isLoggedIn || false);
    } catch (error) {
      setLoggedIn(false);
    }
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
    setDropdownOpen(!dropdownOpen)
  };

  const handleLogout = () => {
    localStorage.removeItem("logindata")
    setLoggedIn(false)
    setDropdownOpen(false)
    navigate("/auth/login")
  };

  return (
    <nav className={`navbar ${scrolled ? "scrolled" : ""}`}>
      <div className="container">
        <div className="navbar-menu">
          <a href="/" className="nav-logo">
            StarBucks
          </a>
          <ul className="nav-links">
            <li className="nav-item">
              <a href="/">Home</a>
            </li>
            <li className="nav-item">
              <a href="/users">Users</a>
            </li>
            <li className="nav-item">
              <a href="/about">About</a>
            </li>
            <li className="nav-item">
              <a href="/todo-list">Todo</a>
            </li>
          </ul>
          {loggedIn ? (
            <div className="avatar-container">
              <div className="avatar" onClick={toggleDropdown}></div>
              {dropdownOpen && (
                <div className="dropdown-menu" >
                  <button className="dropdown-item" onClick={handleLogout}>
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="last">
              <span className="nav-item ">
                <a href="/auth/login">Login</a>
              </span>
              <span className="nav-item ">
                <a href="/auth/register">Register</a>
              </span>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
