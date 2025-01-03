import React from 'react';
import { Link } from 'react-router-dom';

const AdminPage = () => {
  const username = localStorage.getItem('username'); // Retrieve username from localStorage

  return (
    <div className="admin-container">
      <div className="navbar">
        <div className="logo">
          <img src="logo.png" alt="CodeCraft Logo" />
        </div>
        <div className="username">
          <span>Welcome, {username}</span>
        </div>
      </div>
      <div className="content">
        <h2>Admin Dashboard</h2>
        {/* Your admin page content goes here */}
      </div>
    </div>
  );
};

export default AdminPage;
