import { NavLink } from "react-router-dom";

// Navbar component – renders the top navigation bar with links
// Uses NavLink from react-router-dom so that the active route is highlighted
function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <span className="navbar-logo">🎓</span>
        <span className="navbar-title">College Management</span>
      </div>
      <ul className="navbar-links">
        <li>
          <NavLink
            to="/dashboard"
            className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}
          >
            📊 Dashboard
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/students"
            className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}
          >
            👨‍🎓 Students
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/courses"
            className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}
          >
            📚 Courses
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
