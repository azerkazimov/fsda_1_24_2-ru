import "./navbar.css";

export default function Navbar() {
  return (
    <nav className="navbar">
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
        </div>
      </div>
    </nav>
  );
}
