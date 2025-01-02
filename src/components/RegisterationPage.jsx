import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './RegisterPage.css';

const RegisterPage = () => {
  const [roles, setRoles] = useState([]);
  const [selectedRole, setSelectedRole] = useState('');
  const [formData, setFormData] = useState({
    fname: '',
    lname: '',
    email: '',
    contact: '',
    uname: '',
    password: '',
    qualification: '',
    experience: '',
    expertise: '',
  });

  const [submittedData, setSubmittedData] = useState(null); 

  // Fetch roles
  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const response = await axios.get('http://localhost:8282/api/roles/getRoles');
        setRoles(response.data); 
      } catch (error) {
        console.error('Error fetching roles:', error);
      }
    };
    fetchRoles();
  }, []);

  // Handle input changes
  const handleInputChange = (event) => {
    const { id, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  // Handle role selection
  const handleRoleChange = (event) => {
    setSelectedRole(event.target.value);
    setFormData((prevData) => ({
      ...prevData,
      qualification: '',
      experience: '',
      expertise: '',
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const payload = {
      fname: formData.fname,
      lname: formData.lname,
      username: formData.uname,
      password: formData.password,
      email: formData.email,
      contact: formData.contact,
      role: selectedRole,
    };

    if (selectedRole === 'Instructor') {
      payload.instructor = {
        qualification: formData.qualification,
        experience: formData.experience,
        expertise: formData.expertise,
      };
    }

    console.log('Payload:', payload); // Add this line to check the payload

    try {
      const response = await axios.post('http://localhost:8282/api/users/register', payload);

      if (response.status === 201) {
        alert('User registered successfully!');
        setSubmittedData(payload); // Store the submitted data to display
        setFormData({
          fname: '',
          lname: '',
          email: '',
          contact: '',
          uname: '',
          password: '',
          qualification: '',
          experience: '',
          expertise: '',
        });
        setSelectedRole('');
      }
    } catch (error) {
      console.error('Error registering user:', error);
      alert('Failed to register user. Please try again.');
    }
  };

  return (
    <div className="register-container">
      <div className="register-card">
        <h2 className="text-center">Register for CodeCraft</h2>
        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-md-6 mb-3">
              <label htmlFor="fname" className="form-label">
                First Name
              </label>
              <input
                type="text"
                id="fname"
                className="form-control"
                placeholder="Enter your First Name"
                value={formData.fname}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="col-md-6 mb-3">
              <label htmlFor="lname" className="form-label">
                Last Name
              </label>
              <input
                type="text"
                id="lname"
                className="form-control"
                placeholder="Enter your Last Name"
                value={formData.lname}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>

          <div className="row">
            <div className="col-md-6 mb-3">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                type="email"
                id="email"
                className="form-control"
                placeholder="Enter your Email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="col-md-6 mb-3">
              <label htmlFor="contact" className="form-label">
                Contact
              </label>
              <input
                type="text"
                id="contact"
                className="form-control"
                placeholder="Enter your Contact"
                value={formData.contact}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>

          <div className="row">
            <div className="col-md-6 mb-3">
              <label htmlFor="uname" className="form-label">
                Username
              </label>
              <input
                type="text"
                id="uname"
                className="form-control"
                placeholder="Enter your Username"
                value={formData.uname}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="col-md-6 mb-3">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type="password"
                id="password"
                className="form-control"
                placeholder="Create a Password"
                value={formData.password}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>

          <div className="mb-3">
            <label htmlFor="role" className="form-label">
              Select Role
            </label>
            <select
              id="role"
              className="form-control"
              value={selectedRole}
              onChange={handleRoleChange}
              required
            >
              <option value="">Choose a role</option>
              {roles.map((role) => (
                <option key={role.rid} value={role.rname}>
                  {role.rname}
                </option>
              ))}
            </select>
          </div>

          {selectedRole === 'Instructor' && (
            <div>
              <div className="mb-3">
                <label htmlFor="qualification" className="form-label">
                  Qualification
                </label>
                <input
                  type="text"
                  id="qualification"
                  className="form-control"
                  placeholder="Enter your Qualification"
                  value={formData.qualification}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="experience" className="form-label">
                  Experience
                </label>
                <input
                  type="number"
                  id="experience"
                  className="form-control"
                  placeholder="Enter your Experience"
                  value={formData.experience}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="expertise" className="form-label">
                  Expertise
                </label>
                <input
                  type="text"
                  id="expertise"
                  className="form-control"
                  placeholder="Enter your Expertise"
                  value={formData.expertise}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
          )}

          <button type="submit" className="btn btn-success w-100">
            Register
          </button>
        </form>

        {/* Display submitted data */}
        {submittedData && (
          <div className="submitted-data mt-4">
            <h3>Submitted Data:</h3>
            <ul>
              <li><strong>Full Name:</strong> {submittedData.fname} {submittedData.lname}</li>
              <li><strong>Username:</strong> {submittedData.uname}</li>
              <li><strong>Email:</strong> {submittedData.email}</li>
              <li><strong>Contact:</strong> {submittedData.contact}</li>
              <li><strong>Role:</strong> {submittedData.role}</li>
              {submittedData.role === 'Instructor' && (
                <>
                  <li><strong>Qualification:</strong> {submittedData.instructor.qualification}</li>
                  <li><strong>Experience:</strong> {submittedData.instructor.experience}</li>
                  <li><strong>Expertise:</strong> {submittedData.instructor.expertise}</li>
                </>
              )}
            </ul>
          </div>
        )}

        <p className="text-center mt-3">
          Already have an account?{' '}
          <Link to="/login" className="text-primary">
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
