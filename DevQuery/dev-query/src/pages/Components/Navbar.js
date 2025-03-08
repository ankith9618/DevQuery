import React, { useContext, useState } from 'react';
import './Navbar.css';
import { Context } from '../Context/LogInContext.js';
import { UserDetailsContext } from '../Context/UserDetailsContext.js';
import userIcon from './user.svg';

export default function Navbar() {
  const { setShowLogin, setShowSignup } = useContext(Context);
  const { user } = useContext(UserDetailsContext);
  const [showDropdown, setShowDropdown] = useState(false);

  const OpenSignUp = (e) => {
    e.preventDefault();
    setShowLogin(false);
    setShowSignup(true);
  };  

  const OpenLogIn = (e) => {
    e.preventDefault();
    setShowLogin(true);
    setShowSignup(false);
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <h2>DevQuery</h2>
      </div>
      <ul className="navbar-links">
        <li><a href="/" className="link">Home</a></li>
        <li><a href="/view-queries" className="link">Queries</a></li>
        <li><a href="/about" className="link">About</a></li>
        <li><a href="/contact" className="link">Contact</a></li>

        {!user ? (
          <>
            <div className="link login" onClick={OpenLogIn}>Log In</div>
            <div className="link signup" onClick={OpenSignUp}>Sign Up</div>
          </>
        ) : (
          <div className="user-container">
            <div className="user-details" onClick={() => setShowDropdown(!showDropdown)}>
              <span>{user.username}</span>
              <img src={userIcon} alt="User" className="user-icon" />
            </div>

          </div>
        )}
      </ul>
    </nav>
  );
}
