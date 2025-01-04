import React from "react";
import "./HomePage.css";
import { Link } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import NavigationBar from "./Navbar";

const HomePage = () => {
  const username = localStorage.getItem("username");
  const userId=localStorage.getItem("userId");
  
  

  return (
    <>
      <NavigationBar />
      <div className="container home-container mt-5">
        <h1>Welcome, {username}!</h1>
        <p>
          This is your personalized dashboard. Explore the courses, articles, and resources 
          designed to help you excel in your learning journey.
        </p>
        <a href="#courses" className="btn btn-custom">
          Explore Courses
        </a>
        <Link to={`/update-profile1/${userId}`} className="logout-link">Update Profile</Link> 
      </div>
    </>
  );
};

export default HomePage;

// hello
