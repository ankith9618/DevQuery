
import React from 'react'
import { useContext } from 'react';

import Sidebar from '../Components/Sidebar.js';
import { Route, Routes } from 'react-router-dom';

import Dashboard from '../Dashboard/Dashboard.js';
import Profile from '../Profile/Profile.js';
import Home from '../Home/Home.js';
import Settings from '../Settings/Settings.js';
import PostQueries from '../PostQueries/PostQueries.js';
import MyQueries from '../MyQueries/MyQueries.js';
import ViewQueries from '../ViewQueries/ViewQueries.js';
import { UserDetailsContext } from '../Context/UserDetailsContext.js';

import { Context } from '../Context/LogInContext.js';
import Cookies from 'js-cookie';

export default function Content() {
    let { user, setUser } = useContext(UserDetailsContext);
    let { setShowLogin, setShowSignup } = useContext(Context);

    const logOut = () => {
        Cookies.remove("DevQuery");
        setUser((user) => null);
        setShowLogin(true);
        setShowSignup(false);
    }
    return <>{user &&
        <div className="main">
            <div className="sidebar">
                <Sidebar onLogout={logOut} />
            </div>
            <div className="content ">

                <Routes>
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/" element={<Home />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/my-queries" element={<MyQueries />} />
                    <Route path='/post-query' element={<PostQueries />} />
                    <Route path='/settings' element={<Settings />} />
                    <Route path='/view-queries' element={<ViewQueries />} />
                </Routes>
            </div>
        </div>

    }</>;
}
