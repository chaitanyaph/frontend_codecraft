import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterationPage';
import AdminPage from './components/AdminPage';
import InstructorPage from './components/InstructorPage';
import HomePage from './components/Home';
import UpdateProfile from './components/UpdateProfile';
import UpdateProfile1 from './components/UpdateProfile1';
import UpdateStudentProfile from './components/UpdateStudentProfile';

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
          element={<AdminPage></AdminPage>}
        />

        {/* Instructor Dashboard */}
        <Route
          path="/instructor"
          element={<InstructorPage></InstructorPage>}
        />
                {/* Define the route with a dynamic parameter for instructorId */}
          <Route path="/update-profile/:instructorId" element={<UpdateProfile></UpdateProfile>} />
  
          {/* <Route path="/update-profile/:userId" element={<UpdateProfile1 />} /> */}
          <Route path='/update-profile1/:userId' element={<UpdateStudentProfile></UpdateStudentProfile>} />
  

        {/* Catch-all: Redirect unknown routes to home */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
