import React from 'react';
import { Navbar, Nav, Container, Dropdown } from 'react-bootstrap';
import { useNavigate, useLocation } from 'react-router-dom';
import './Navigation.css';

const NavigationBar = () => {
  const username = localStorage.getItem('username'); // Retrieve username
  const role = localStorage.getItem('role'); // Retrieve role
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to log out?')) {
      localStorage.clear(); // Clear all data from localStorage
      navigate('/login'); // Redirect to login page
    }
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="navbar-custom">
      <Container>
        <Navbar.Brand href="#" className="navbar-brand-custom">CodeCraft</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbar-nav" />
        <Navbar.Collapse id="navbar-nav">
          <Nav className="mx-auto navbar-custom">
            <Nav.Link href="#home" className={`nav-link-custom ${isActive('/home') ? 'active' : ''}`}>Home</Nav.Link>
            <Nav.Link href="#courses" className={`nav-link-custom ${isActive('/courses') ? 'active' : ''}`}>Courses</Nav.Link>
            <Nav.Link href="#contacts" className={`nav-link-custom ${isActive('/contacts') ? 'active' : ''}`}>Contacts</Nav.Link>
            <Nav.Link href="#aboutus" className={`nav-link-custom ${isActive('/aboutus') ? 'active' : ''}`}>About Us</Nav.Link>
            <Nav.Link href="#articles" className={`nav-link-custom ${isActive('/articles') ? 'active' : ''}`}>Articles</Nav.Link>
          </Nav>
          {username ? (
            <Dropdown>
              <Dropdown.Toggle variant="outline-light" id="dropdown-basic">
                {username}
              </Dropdown.Toggle>
              <Dropdown.Menu>
                {role === 'Admin' && <Dropdown.Item href="#admin-dashboard">Admin Dashboard</Dropdown.Item>}
                {role === 'Instructor' && <Dropdown.Item href="#manage-courses">Manage Courses</Dropdown.Item>}
                <Dropdown.Item href="#profile">Profile</Dropdown.Item>
                <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          ) : (
            <Nav.Link href="/login" className="btn btn-outline-light">Login</Nav.Link>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavigationBar;
