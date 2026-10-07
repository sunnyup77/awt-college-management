import { NavLink } from "react-router-dom";
import { GraduationCap, LayoutDashboard, Users, BookOpen } from "lucide-react";

// Navbar component – renders the top navigation bar with links
// Uses NavLink from react-router-dom so that the active route is highlighted
function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <GraduationCap className="navbar-logo" size={24} />
        <span className="navbar-title">College Management</span>
      </div>
      <ul className="navbar-links">
        <li>
          <NavLink
            to="/dashboard"
            className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}
          >
            <LayoutDashboard size={18} /> Dashboard
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/students"
            className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}
          >
            <Users size={18} /> Students
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/courses"
            className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}
          >
            <BookOpen size={18} /> Courses
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
