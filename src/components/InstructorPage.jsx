import React from 'react';
import { Link } from 'react-router-dom';
import './InstructorPage.css';  // Import the CSS file for styling

const InstructorPage = () => {
  const username = localStorage.getItem('username'); // Retrieve username from localStorage

  return (
    <div className="instructor-page">
      {/* Navbar */}
      <div className="navbar">
        <h1>CodeCraft</h1>
        <div className="navbar-links">
          <span>Welcome, {username}</span>
          <Link to="/login" className="logout-link">Logout</Link>
        </div>
      </div>

      {/* Main Content */}
      <div className="content">
        <h2 className="dashboard-title">Instructor Dashboard</h2>
        <p className="dashboard-description">
          Welcome to your instructor dashboard. Here you can manage your courses, 
          track student progress, and view your teaching materials.
        </p>

        <div className="actions">
          <div className="action-card">
            <h3>Manage Courses</h3>
            <p>View and manage the courses you are teaching.</p>
            <Link to="/courses" className="action-link">Go to Courses</Link>
          </div>
          <div className="action-card">
            <h3>Student Progress</h3>
            <p>Track the progress of your students and provide feedback.</p>
            <Link to="/student-progress" className="action-link">View Progress</Link>
          </div>
          <div className="action-card">
            <h3>Teaching Materials</h3>
            <p>Upload and manage the materials for your courses.</p>
            <Link to="/materials" className="action-link">View Materials</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InstructorPage;
