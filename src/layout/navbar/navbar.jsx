import { useEffect, useState } from "react";
import "./navbar.css";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setScrolled(scrollPosition > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
          <div className="last">
            <span className="nav-item ">
              <a href="/login">Login</a>
            </span>
            <span className="nav-item ">
              <a href="/register">Register</a>
            </span>
          </div>
        </div>
      </div>
    </nav>
  );
}
