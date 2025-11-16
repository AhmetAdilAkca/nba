import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <h1 className="navbar-logo">NBA</h1>
        <ul className="nav-menu">
          <li className="nav-item">
            <Link to="/teams" className="nav-link">Teams</Link>
          </li>
          <li className="nav-item">
            <Link to="/players" className="nav-link">Players</Link>
          </li>
          <li className="nav-item">
            <Link to="/games" className="nav-link">Games</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
