import React from 'react';
import { NavLink } from 'react-router-dom';  
import { FaHome, FaUser, FaCog, FaSignOutAlt, FaClipboardList, FaPen } from 'react-icons/fa';
import './Sidebar.css';

const Sidebar = ({ onLogout }) => {
  return (
    <div className="sidebar">
      <ul className="sidebar-links">
        <li>
          <NavLink
            to="/"
            className={({ isActive }) => `sidebar-link ${isActive ? "active" : ""}`}
          >
            <FaHome className="sidebar-icon" />
            Home
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/dashboard"
            className={({ isActive }) => `sidebar-link ${isActive ? "active" : ""}`}
          >
            <FaClipboardList className="sidebar-icon" />
            Dashboard
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/profile"
            className={({ isActive }) => `sidebar-link ${isActive ? "active" : ""}`}
          >
            <FaUser className="sidebar-icon" />
            Profile
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/post-query"
            className={({ isActive }) => `sidebar-link ${isActive ? "active" : ""}`}
          >
            <FaPen className="sidebar-icon" />
            Post a Query
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/my-queries"
            className={({ isActive }) => `sidebar-link ${isActive ? "active" : ""}`}
          >
            <FaClipboardList className="sidebar-icon" />
            My Queries
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/view-queries"
            className={({ isActive }) => `sidebar-link ${isActive ? "active" : ""}`}
          >
            <FaClipboardList className="sidebar-icon" />
            View Queries
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/settings"
            className={({ isActive }) => `sidebar-link ${isActive ? "active" : ""}`}
          >
            <FaCog className="sidebar-icon" />
            Settings
          </NavLink>
        </li>
        <li>
          <button className="sidebar-link logout" onClick={onLogout}>
            <FaSignOutAlt className="sidebar-icon" />
            Log Out
          </button>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
