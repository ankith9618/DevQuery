import React, { useState } from "react";
import "./Settings.css";

export default function Settings() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [emailVerified, setEmailVerified] = useState(false);
    const [phoneNumber, setPhoneNumber] = useState("");
    const [emailNotifications, setEmailNotifications] = useState(true);
    const [profileVisibility, setProfileVisibility] = useState("public");
    const [theme, setTheme] = useState("light");

    const handleSaveChanges = () => {
        alert("Settings Saved!");
    };

    const handleDeleteAccount = () => {
        const confirmDelete = window.confirm("Are you sure you want to delete your account? This action is irreversible.");
        if (confirmDelete) {
            alert("Account Deleted!");
        }
    };

    return (
        <div className="settings-container">
            <h2>⚙️ Settings</h2>

            {/* Account Settings */}
            <div className="settings-section">
                <h3>👤 Account Settings</h3>
                <label>
                    Username:
                    <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
                </label>
                <label>
                    Password:
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </label>
                <label>
                    Phone Number:
                    <input type="tel" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
                </label>
                <label>
                    Email Verified: {emailVerified ? "✅ Verified" : "❌ Not Verified"}
                    <button onClick={() => setEmailVerified(true)}>Verify</button>
                </label>
            </div>

            {/* Notification Settings */}
            <div className="settings-section">
                <h3>🔔 Notification Settings</h3>
                <label>
                    <input
                        type="checkbox"
                        checked={emailNotifications}
                        onChange={() => setEmailNotifications(!emailNotifications)}
                    />
                    Receive Email Notifications
                </label>
            </div>

            {/* Privacy Settings */}
            <div className="settings-section">
                <h3>🔒 Privacy Settings</h3>
                <label>
                    Profile Visibility:
                    <select value={profileVisibility} onChange={(e) => setProfileVisibility(e.target.value)}>
                        <option value="public">Public</option>
                        <option value="private">Private</option>
                    </select>
                </label>
            </div>

            {/* Theme Settings */}
            <div className="settings-section">
                <h3>🎨 Theme Settings</h3>
                <label>
                    Select Theme:
                    <select value={theme} onChange={(e) => setTheme(e.target.value)}>
                        <option value="light">Light Mode</option>
                        <option value="dark">Dark Mode</option>
                    </select>
                </label>
            </div>

            {/* Delete Account */}
            <div className="settings-section delete-account">
                <h3>⚠️ Delete Account</h3>
                <button className="delete-button" onClick={handleDeleteAccount}>Delete My Account</button>
            </div>

            {/* Save Changes Button */}
            <button className="save-button" onClick={handleSaveChanges}>Save Changes</button>
        </div>
    );
}
