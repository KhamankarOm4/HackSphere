import React, { useState } from 'react';
import '../styles/designSystem.css';
import './Login.css';

const Login = ({ onLogin }) => {
  const [credentials, setCredentials] = useState({
    username: '',
    password: ''
  });
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (credentials.username === 'admin' && credentials.password === 'admin123') {
      onLogin();
    } else {
      setError('Invalid username or password');
    }
  };

  return (
    <div className="login-container">
      <div className="login-content">
        <div className="login-header">
          <div className="logo-container">
            <span className="logo-icon">💊</span>
            <h1>Med Inventory</h1>
          </div>
          <p className="welcome-text">Welcome back! Please login to your account.</p>
        </div>

        <div className="login-card glass-effect">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>
                <span className="input-icon">👤</span>
                Username
              </label>
              <input
                type="text"
                value={credentials.username}
                onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
                placeholder="Enter your username"
                required
                className="input-field"
              />
            </div>

            <div className="form-group">
              <label>
                <span className="input-icon">🔒</span>
                Password
              </label>
              <input
                type="password"
                value={credentials.password}
                onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                placeholder="Enter your password"
                required
                className="input-field"
              />
            </div>

            {error && (
              <div className="error-message">
                <span className="error-icon">⚠️</span>
                {error}
              </div>
            )}

            <button type="submit" className="login-btn">
              <span className="btn-text">Login</span>
              <span className="btn-icon">→</span>
            </button>
          </form>

          <div className="login-footer">
            <div className="demo-credentials">
              <h3>Demo Credentials</h3>
              <div className="credential-item">
                <span className="credential-label">Username:</span>
                <span className="credential-value">admin</span>
              </div>
              <div className="credential-item">
                <span className="credential-label">Password:</span>
                <span className="credential-value">admin123</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login; 