import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './RegisterPage.css';
import { useForm } from 'react-hook-form'; //for validation
import { Navbar } from 'react-bootstrap';
import NavigationBar from './Navbar';

const RegisterPage = () => {
  const [roles, setRoles] = useState([]);
  // const [selectedRole, setSelectedRole] = useState('');
  // const [formData, setFormData] = useState({
  //   fname: '',
  //   lname: '',
  //   email: '',
  //   contact: '',
  //   uname: '',
  //   password: '',
  //   qualification: '',
  //   experience: '',
  //   expertise: '',
  // });

  // Initialize useForm hook
  const {
    register, // For registering fields
    handleSubmit, // For form submission
    formState: { errors }, // To handle validation errors
    watch,
    setValue,
  } = useForm();

  const selectedRole = watch('role');


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

  const onSubmit = async (data) => {
    // event.preventDefault();

    const payload = {
      fname: data.fname,
      lname: data.lname,
      username: data.uname,
      password: data.password,
      email: data.email,
      contact: data.contact,
      role: data.role,
    };

    if (data.role === 'Instructor') {
      payload.instructor = {
        qualification: data.qualification,
        experience: data.experience,
        expertise: data.expertise,
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
        <form onSubmit={handleSubmit(onSubmit)}>
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
                // value={formData.fname}
                // onChange={handleInputChange}
                // required
                name="fname" {...register("fname" ,{
                  required: 'First name is required',
                  minLength: {value:4,message:"First name must be at least 4 characters long."},
                  // maxLength:{value:8 ,message:"First name is not more than 8 characters long."}
                })} />
                {errors.fname && <p className="text-danger">{errors.fname.message}</p>}
            </div>

            {/* last name  */}
            <div className="col-md-6 mb-3">
              <label htmlFor="lname" className="form-label">
                Last Name
              </label>
              <input
                type="text"
                id="lname"
                className="form-control"
                placeholder="Enter your Last Name"
                // value={formData.lname}
                // onChange={handleInputChange}
                // required
                {...register('lname', { required: 'Last Name is required' ,
                minLength: {value:4,message:"Last name must be at least 4 characters long."},
                  // maxLength:{value:6 ,message:"Last name is not more than 3 characters long."}
              
              
              })}
              />
              {errors.lname && <p className="text-danger">{errors.lname.message}</p>}
            </div>
          </div>
 
              {/* Email  */}
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
                // value={formData.email}
                // onChange={handleInputChange}
                // required
                 {...register("email",{
                  required:'Email is required',
                  pattern: {
                    value: /^[A-Za-z0-9_.-]{5,10}@gmail.com$/,
                    message: 'Email must be between 5 to 10 characters long and should end with @gmail.com ',
                  },
              })}
              />
                 {errors.email && <p className="text-danger">{errors.email.message}</p>}
            </div>

            {/* Contact */}
            <div className="col-md-6 mb-3">
              <label htmlFor="contact" className="form-label">
                Contact
              </label>
              <input
                type="text"
                id="contact"
                className="form-control"
                placeholder="Enter your Contact"
                // value={formData.contact}
                // onChange={handleInputChange}
                // required
                {...register('contact', {
                  required: 'Contact is required',
                  pattern: {
                    value: /^\d{10}$/,
                    message:'Contact number must be a valid 10-digit number.',
                  },
                })}
              />
                {errors.contact && <p className="text-danger">{errors.contact.message}</p>}
            </div>
          </div>

               {/* Username */}
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
                // value={formData.uname}
                // onChange={handleInputChange}
                // required
                {...register('uname', { required: 'Username is required',
                minLength: {value:3,message:"Username name must be at least 3 characters long."},
                // maxLength:{value:6 ,message:"Username name is not more than 3 characters long."}
              
              
              })}
              />
              {errors.uname && <p className="text-danger">{errors.uname.message}</p>}
            </div>

            {/* Password filed */}

            <div className="col-md-6 mb-3">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type="password"
                id="password"
                className="form-control"
                placeholder="Create a Password"
                // value={formData.password}
                // onChange={handleInputChange}
                // required
                {...register('password', {
                  required: 'Password is required',
                  minLength: {
                    value: 6,
                    message: 'Password must be at least 6 characters',
                  },
                })}
              />
              {errors.password && <p className="text-danger">{errors.password.message}</p>}
            </div>
          </div>


          <div className="mb-3">
            <label htmlFor="role" className="form-label">
              Select Role
            </label>
            <select
              id="role"
              className="form-control"
              // value={selectedRole}
              // onChange={handleRoleChange}
              // required
              {...register('role', { required: 'Please select a role.' })}
            >
              <option value="">Choose a role</option>
              {roles.map((role) => (
                <option key={role.rid} value={role.rname}>
                  {role.rname}
                </option>
              ))}
            </select>
            {errors.role && <p className="text-danger">{errors.role.message}</p>}
          </div>

          {selectedRole === 'Instructor' && (
            <>
            {/* <div> */}
              <div className="mb-3">
                <label htmlFor="qualification" className="form-label">
                  Qualification
                </label>
                <input
                  type="text"
                  id="qualification"
                  className="form-control"
                  // placeholder="Enter your Qualification"
                  // value={formData.qualification}
                  // onChange={handleInputChange}
                  // required
                  {...register('qualification', { required: 'Qualification is required for instructors.' })}
                />
                {errors.qualification && <p className="text-danger">{errors.qualification.message}</p>}
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
                   {...register('experience', {
                    required: 'Experience is required for instructors.',
                    valueAsNumber: true,
                  })}
                />
                {errors.experience && <p className="text-danger">{errors.experience.message}</p>}
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
                  {...register('expertise', { required: 'Expertise is required for instructors.' })}
                />
                {errors.expertise && <p className="text-danger">{errors.expertise.message}</p>}
              </div>
            {/* </div> */}
            </>
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
