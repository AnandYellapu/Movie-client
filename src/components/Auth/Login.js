
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate input before making the API call
    if (!formData.username || !formData.password) {
      setMessage('Both fields are required');
      setIsError(true);
      return;
    }

    try {
      const response = await axios.post('https://movie-server-7ora.onrender.com/api/auth/login', formData);

      // Store token in local storage or session storage
      localStorage.setItem('token', response.data.token);

      setMessage('Login successful! Redirecting...');
      setIsError(false);

      setTimeout(() => navigate('/home'), 1500); // Navigate to dashboard after 1.5 seconds
    } catch (error) {
      console.error('Login error:', error);
      
      // Determine the error message
      const errorMessage =
        error.response?.data?.message || // Server-provided message
        (error.response?.status === 401 ? 'Invalid credentials' : '') || // Unauthorized access
        'An error occurred while logging in. Please try again.'; // Fallback message

      setMessage(errorMessage);
      setIsError(true);
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
        <button className="login-button" type="submit">
          Login
        </button>
      </form>
      {message && (
        <p className={`login-message ${isError ? 'error' : 'success'}`}>
          {message}
        </p>
      )}
      <p className="not-registered">
        Have not registered? <a href="/register">Register here</a>
      </p>
    </div>
  );
};

export default Login;
