import React from "react";
import "./navbar.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="nav-container">
        <div className="nav-logo">
          <span>Prison Manager</span>
        </div>

        <ul className="nav-links">
          <li><a href="/">Home</a></li>
          <li><a href="/">Prisoners</a></li>
          <li><a href="/">Reports</a></li>
          <li><a href="/">About</a></li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
