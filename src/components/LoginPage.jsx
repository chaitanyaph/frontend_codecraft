import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './Login.css';
import NavigationBar from './Navbar';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (event) => {
  event.preventDefault();

  try {
    const response = await fetch("http://localhost:8282/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    const data = await response.json();

    if (response.ok) {
      localStorage.setItem("role", data.role);
      localStorage.setItem("username", username);

      if (data.role === "Admin") {
        navigate("/admin");
      } else if (data.role === "Instructor") {
        navigate("/instructor");
      } else if (data.role === "Student") {
        navigate("/");
      } else {
        setErrorMessage("Invalid role");
      }
    } else {
      setErrorMessage(data.error || "Login failed");
    }
  } catch (error) {
    setErrorMessage("An error occurred during login");
  }
};
  return (
    <>
      <NavigationBar />
      <div className="login-container">
        <div className="login-card">
          <h2 className="text-center">Login to CodeCraft</h2>
          <form onSubmit={handleLogin}>
            <div className="mb-3">
              <label htmlFor="username" className="form-label">Username</label>
              <input
                type="text"
                id="username"
                className="form-control"
                placeholder="Enter your Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">Password</label>
              <input
                type="password"
                id="password"
                className="form-control"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary w-100">Login</button>
          </form>
          {errorMessage && <p className="text-danger text-center mt-3">{errorMessage}</p>}
          <p className="text-center mt-3">
            Don't have an account?{' '}
            <Link to="/register" className="text-primary">
              Register here
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
