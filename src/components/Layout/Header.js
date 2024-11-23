import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Header = () => {
  // Get the token from localStorage
  const token = localStorage.getItem('token');

  // Log the token to the console (for debugging purposes)
//   console.log('Token:', token);

  // Check if the user is logged in
  const isLoggedIn = token ? true : false;

  // Use the navigate hook to redirect after logout
  const navigate = useNavigate();

  // Logout function to remove the token and redirect
  const handleLogout = () => {
    localStorage.removeItem('token'); // Remove the token
    navigate('/'); // Redirect to the login page after logout
  };

  return (
    <header className="header">
      <div className="logo">
        <h1 className="title">MovieDB</h1> {/* Random title on the left */}
      </div>
      <nav className="navbar">
        <ul className="nav-list">
          {/* Show Home and Favorites links only if the user is logged in */}
          {isLoggedIn && (
            <>
              <li className="nav-item">
                <Link to="/home" className="nav-link">Home</Link>
              </li>
              <li className="nav-item">
                <Link to="/favorites" className="nav-link">Favorites</Link>
              </li>
            </>
          )}
          {/* Show Login link if the user is not logged in */}
          {!isLoggedIn && (
            <li className="nav-item">
              <Link to="/" className="nav-link">Login</Link>
            </li>
          )}
          {/* Show Logout link if the user is logged in */}
          {isLoggedIn && (
            <li className="nav-item">
              <button onClick={handleLogout} className="nav-link logout-button">Logout</button>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
