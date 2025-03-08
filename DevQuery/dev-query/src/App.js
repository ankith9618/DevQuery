import './App.css';
import { HashRouter as Router } from 'react-router-dom';
import Navbar from './pages/Components/Navbar.js';
import Login from './pages/Components/Login.js';
import Signup from './pages/Components/Signup.js';
import Content from './pages/Content/Content.js';

import { useContext } from 'react';
import { UserDetailsProvider } from './pages/Context/UserDetailsContext.js';
import { StatusProvider, Context } from './pages/Context/LogInContext.js';
import { UserDetailsContext } from './pages/Context/UserDetailsContext.js';



function ShowAuthStatus() {
  const { showLogin, showSignup } = useContext(Context);
  const {user}  = useContext(UserDetailsContext);
  if(user) return null;
  if (showLogin) return <Login />;
  if (showSignup) return <Signup />;
  
  return null;
}

function App() {
  return (
    <StatusProvider>
      <UserDetailsProvider>
        <Router>
          <div className="App">
            <Navbar />
            <ShowAuthStatus />
            <Content />
          </div>
        </Router>
      </UserDetailsProvider>
    </StatusProvider>
  );
}

export default App;
