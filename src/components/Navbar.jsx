import React from 'react';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import './Navigation.css'; 

const NavigationBar = () => {
  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="navbar-custom">
      <Container>
        <Navbar.Brand href="#" className="navbar-brand-custom">CodeCraft</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbar-nav" />
        <Navbar.Collapse id="navbar-nav">
          <Nav className="mx-auto navbar-custom">
            <Nav.Link href="#home" className="nav-link-custom">Home</Nav.Link>
            <Nav.Link href="#courses" className="nav-link-custom">Courses</Nav.Link>
            <Nav.Link href="#contacts" className="nav-link-custom">Contacts</Nav.Link>
            <Nav.Link href="#aboutus" className="nav-link-custom">About Us</Nav.Link>
            <Nav.Link href="#articles" className="nav-link-custom">Articles</Nav.Link>
          </Nav>
          <Button variant="outline-light" href="Login" className="button-custom">Login</Button>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavigationBar;
