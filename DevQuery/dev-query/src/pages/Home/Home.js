import QuoteScroller from './QuoteScroller.js';
import { NavLink } from 'react-router-dom';
import './Home.css';

const Home = () => {
  const getButtonClass = ({ isActive }) => `cta-button ${isActive ? "active" : ""}`;

  return (
    <>
      <div className="home">
        <div className="home-banner">
          <h1>Welcome to Developer Query</h1>
          <div className="quote-section">
            <QuoteScroller />
          </div>
          <NavLink to="/post-query" className={getButtonClass}>
            Get Started
          </NavLink>
        </div>
        <div className="home-guide">
          <h2>How to Use the App</h2>
          <ol>
            {[
              { title: "Sign Up", desc: "Create an account by providing your details and selecting your skills and interests." },
              { title: "Log In", desc: "Access the app using your registered email and password." },
              { title: "Post a Query", desc: "Submit your questions with tags so others can find and answer them." },
              { title: "Answer Queries", desc: "Browse queries matching your expertise and help others by providing answers." },
              { title: "Get Notifications", desc: "Receive alerts when a query matches your selected tags." }
            ].map(({ title, desc }, index) => (
              <li key={index}>
                <strong>{title}:</strong> {desc}
              </li>
            ))}
          </ol>
        </div>
      </div>
    </>
  );
};

export default Home;
