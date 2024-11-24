import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://movie-server-7ora.onrender.com/api/auth/login', formData);

      // Store token in local storage or session storage
      localStorage.setItem('token', response.data.token);

      setMessage('Login successful! Redirecting...');
      setTimeout(() => navigate('/home'), 1500); // Navigate to dashboard after 1.5 seconds
    } catch (error) {
      setMessage(error.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="login-container">
      <h2 className="login-title">Login</h2>
      <form className="login-form" onSubmit={handleSubmit}>
        <input
          className="login-input"
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
          required
        />
        <input
          className="login-input"
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <button className="login-button" type="submit">Login</button>
      </form>
      {message && <p className={`login-message ${message.includes('successful') ? 'success' : 'error'}`}>{message}</p>}
      <p className="not-registered">Have not registered? <a href="/register">Register here</a></p>
    </div>
  );
};

export default Login;
