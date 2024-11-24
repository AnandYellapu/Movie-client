import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://movie-server-7ora.onrender.com/api/auth/register', formData);
      setMessage(response.data.message);

      if (response.status === 201) {
        setTimeout(() => navigate('/'), 1500); // Redirect to login after 1.5 seconds
      }
    } catch (error) {
      setMessage(error.response?.data?.message || 'Registration failed');
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
        <button className="register-button" type="submit">Register</button>
      </form>
      {message && <p className={`register-message ${message.includes('successful') ? 'success' : 'error'}`}>{message}</p>}
      <p className="already-registered">Already Registered? <a href="/">Login here</a></p>
    </div>
  );
};

export default Register;
