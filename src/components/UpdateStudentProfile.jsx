import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './UpdateProfile.css';  // Importing CSS file

const UpdateStudentProfile = () => {
    const { userId } = useParams(); // Get studentId from URL parameters
    const [student, setStudent] = useState({
        fname: '',
        lname: '',
        username: '',
        email: '',
        contact: ''
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    console.log("Fetching userId:", userId);

    // Fetch student data when the component mounts
    useEffect(() => {
        const fetchStudentData = async () => {
            try {
                const response = await fetch(`http://localhost:8282/api/users/${userId}`);
                if (!response.ok) throw new Error('Failed to fetch student data');
                const data = await response.json();
                setStudent(data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }

        };

        fetchStudentData();
    }, [userId]);

    // Handle input change
    const handleChange = (e) => {
        const { name, value } = e.target;
        setStudent((prevStudent) => ({
            ...prevStudent,
            [name]: value,
        }));
    };

    // Handle profile update
    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`http://localhost:8282/api/users/${userId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(student),
            });

            if (!response.ok) throw new Error('Failed to update profile');
            alert('Profile updated successfully!');
        } catch (error) {
            console.error(error);
            alert('Error updating profile: ' + error.message);
        }
    };

    if (loading) return <div className="loading">Loading...</div>;
    if (error) return <div className="error-message">Error: {error}</div>;

    return (
        <div className="update-profile-container">
            <div className="update-profile-card">
                <h1>Update Student Profile</h1>
                <form onSubmit={handleUpdate}>
                    {/* First Name and Last Name Side by Side */}
                    <div className="row">
                        <div className="col-md-6">
                            <label>First Name:</label>
                            <input
                                type="text"
                                name="fname"
                                value={student.fname}
                                onChange={handleChange}
                                className="form-control"
                                required
                            />
                        </div>
                        <div className="col-md-6">
                            <label>Last Name:</label>
                            <input
                                type="text"
                                name="lname"
                                value={student.lname}
                                onChange={handleChange}
                                className="form-control"
                                required
                            />
                        </div>
                    </div>

                    {/* Username */}
                    <div>
                        <label>Username:</label>
                        <input
                            type="text"
                            name="username"
                            value={student.username}
                            onChange={handleChange}
                            className="form-control"
                            required
                        />
                    </div>

                    {/* Email and Contact Side by Side */}
                    <div className="row">
                        <div className="col-md-6">
                            <label>Email:</label>
                            <input
                                type="email"
                                name="email"
                                value={student.email}
                                onChange={handleChange}
                                className="form-control"
                                required
                            />
                        </div>
                        <div className="col-md-6">
                            <label>Contact:</label>
                            <input
                                type="text"
                                name="contact"
                                value={student.contact}
                                onChange={handleChange}
                                className="form-control"
                                required
                            />
                        </div>
                    </div>

                    {/* Submit Button */}
                    <button type="submit" className="btn-primary">Update Profile</button>
                </form>
            </div>
        </div>
    );
};

export default UpdateStudentProfile;
