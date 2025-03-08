import React, { useContext, useEffect, useState } from 'react';
import './Dashboard.css';
import Card from './Card.js';
import { useNavigate } from 'react-router-dom';
import { getDashBoard } from '../UtilityFunctions/script.js';
import { UserDetailsContext } from '../Context/UserDetailsContext.js';
const Dashboard = () => {
  const { user } = useContext(UserDetailsContext);
  const navigate = useNavigate();
  const [dashboard, setDashboard] = useState({
    statistics: {
      queriesPosted: 0,
      repliesCount: 0,
      followers: 0,
    },
    recentActivities: {
      queries: [],
      repliedTo: [],
    },
  });

  useEffect(() => {
    const loadDashBoardData = async () => {
      try {

        const data = await getDashBoard();
        setDashboard(data);
      } catch (error) {
        console.error(error);
      }
    };
    loadDashBoardData();
  }, []);

  return (dashboard &&
    <div className="dashboard">
      <header className="dashboard-header">
        <h1>Welcome {user.username} !</h1>
        <p>Manage your activities and keep track of updates.</p>
      </header>
      <div className="dashboard-content">
        <Card title="Statistics" content="Quick overview of your progress.">
          <ul>
            <li>Queries Posted: {dashboard.statistics?.queriesPosted || 0}</li>
            <li>Replies Given: {dashboard.statistics?.repliesCount || 0 }</li>
            <li>Followers: {dashboard.statistics?.followers || 0}</li>
          </ul>
        </Card>
        <Card title="Recent Activities" content="Stay updated with your recent actions.">
          <ul>
            <li>Replied to "{dashboard.recentActivities?.repliedTo[0]?.title || 'None'}"</li>
            <li>Posted "{dashboard.recentActivities?.queries[0]?.title || 'None'}"</li>
          </ul>
        </Card>
        <Card title="Quick Actions">
          <button className="action-btn" onClick={() => navigate("/post-query")}>Post a Query</button>
          <button className="action-btn">View Notifications</button>
          <button className="action-btn">Explore Tags</button>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;