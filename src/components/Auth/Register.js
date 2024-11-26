import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
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
      const response = await axios.post('http://localhost:1001/api/auth/register', formData);

      setMessage(response.data.message);
      setIsError(false);

      // Check for successful registration
      if (response.status === 201) {
        setTimeout(() => navigate('/'), 1500); // Redirect to login after 1.5 seconds
      }
    } catch (error) {
      console.error('Registration error:', error);

      // Determine the error message
      const errorMessage =
        error.response?.data?.message || // Server-provided message
        (error.response?.status === 409 ? 'Username already exists' : '') || // Conflict
        'An error occurred while registering. Please try again.'; // Fallback message

      setMessage(errorMessage);
      setIsError(true);
    }
  };

  return (
    <div className="register-container">
      <h2 className="register-title">Register</h2>
      <form className="register-form" onSubmit={handleSubmit}>
        <input
          className="register-input"
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
          required
        />
        <input
          className="register-input"
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <button className="register-button" type="submit">
          Register
        </button>
      </form>
      {message && (
        <p className={`register-message ${isError ? 'error' : 'success'}`}>
          {message}
        </p>
      )}
      <p className="already-registered">
        Already Registered? <a href="/">Login here</a>
      </p>
    </div>
  );
};

export default Register;
