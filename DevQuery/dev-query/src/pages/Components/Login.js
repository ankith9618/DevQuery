import React, { useState, useContext, useEffect } from 'react';
import './Login.css';
import { Context } from '../Context/LogInContext.js';
import { UserDetailsContext } from '../Context/UserDetailsContext.js';
import Cookies from 'js-cookie';
import { verifyToken } from '../UtilityFunctions/script.js';
import { toast } from 'react-toastify';
import ToastComponent from './ToastComponent.js';
import 'react-toastify/dist/ReactToastify.css';

const BaseUrl = process.env.REACT_APP_BASE_URL;

const Login = () => {
  let { setShowSignup, setShowLogin } = useContext(Context);
  let { setUser } = useContext(UserDetailsContext);
  const [emailOrUsername, setEmailOrUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const notify = (message, type) => {
    toast(message, { type });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!emailOrUsername || !password) {
      setError('Please fill in both fields');
      notify('Please fill in both fields', 'warning');
      return;
    }

    try {
      const response = await fetch(`${BaseUrl}/api/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ emailOrUsername, password })
      });

      if (!response.ok) {
        throw new Error("Login failed");
      }

      const data = await response.json();
      console.log("Logged In Successfully : ",data);

      Cookies.set("DevQuery", data.token, { expires: 1, secure: true, sameSite: "Strict" });

      notify('Login successful!', 'success');
      setTimeout(() => {
        setUser(data.user);
        setShowSignup(false);
        setShowLogin(false);
      }, 1000);

    } catch (error) {
      setError("Invalid credentials");
      notify('Invalid credentials. Please try again.', 'error');
      console.error("Login error:", error);
    }
  };

  const showSignUpPage = () => {
    setShowSignup(true);
    setShowLogin(false);
  };


  useEffect(() => {
    const verify = async () => {
      if (Cookies.get("DevQuery")) {
        const user = await verifyToken();
        if (user) {
          notify('Welcome back!', 'success');
          console.log("LogeedIn Successfully : ",user);
          setTimeout(() => {
            setUser(user);
            setShowSignup(false);
            setShowLogin(false);
          }, 1000);
        }
      }
    }
    verify();
  }, [setUser,setShowLogin,setShowSignup]);

  return (
    <div className="login-wrapper">
      <div className="login-container">
        <h2>Welcome Back!</h2>
        {error && <p className="error">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="text"
              id="email-username"
              value={emailOrUsername}
              onChange={(e) => setEmailOrUsername(e.target.value)}
              placeholder="Enter your Email or Username"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <div className="password-input-wrapper">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
              />
              <span
                className="toggle-password"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "👁️" : "🔒"}
              </span>
            </div>
          </div>
          <button type="submit">Login</button>
        </form>
        <div className="signup-link">
          Don't have an account?{' '}
          <span className="link" onClick={showSignUpPage}>Sign up</span>
        </div>
      </div>
      <ToastComponent />
    </div>
  );
};

export default Login;