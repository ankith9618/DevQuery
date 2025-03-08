// Profile.js
import React, { useEffect, useContext } from 'react';
import './Profile.css';
import {UserDetailsContext} from '../Context/UserDetailsContext.js';


const Profile = () => {
 const {user} = useContext(UserDetailsContext)
  useEffect(() => {

  }, []);

  return (
    <div className="profile-container">
      <div className="profile-header">
        <h2>Profile</h2>
      </div>
      <div className="profile-details">
        <div className="profile-item">
          <strong>Username </strong>  <span>{user.username}</span>
        </div>
        <div className="profile-item">
          <strong>Email </strong><span>{user.email}</span>
        </div>

      </div>
      <div className="profile-actions">
        <button className="edit-button" >
          Edit Profile
          </button>
      </div>
      
    </div>
  );
};

export default Profile;
