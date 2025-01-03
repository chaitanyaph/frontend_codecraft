import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterationPage';
import AdminPage from './components/AdminPage';
import InstructorPage from './components/InstructorPage';
import HomePage from './components/Home';

function App() {
  const role = localStorage.getItem('role'); // Get the user's role from localStorage

  return (
    <Router>
      <Routes>
        {/* Default Home Page */}
        <Route
          path="/"
          element={<HomePage />}
        />

        {/* Login Page */}
        <Route path="/login" element={<LoginPage />} />

        {/* Register Page */}
        <Route path="/register" element={<RegisterPage />} />

        {/* Admin Dashboard */}
        <Route
          path="/admin"
          element={role === 'Admin' ? <AdminPage /> : <Navigate to="/login" />}
        />

        {/* Instructor Dashboard */}
        <Route
          path="/instructor"
          element={role === 'Instructor' ? <InstructorPage /> : <Navigate to="/login" />}
        />

        {/* Catch-all: Redirect unknown routes to home */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
