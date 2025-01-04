import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './UpdateProfile.css';  // Importing CSS file

const UpdateProfile = () => {
    const { instructorId } = useParams(); // Get instructorId from URL parameters
    const [instructor, setInstructor] = useState({
        qualification: '',
        experience: '',
        expertise: '',
        user: {
            fname: '',
            lname: '',
            username: '',
            email: '',
            contact: ''
        }
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch instructor data when the component mounts
    useEffect(() => {
        const fetchInstructorData = async () => {
            try {
                const response = await fetch(`http://localhost:8282/api/instructors/${instructorId}`);
                if (!response.ok) throw new Error('Failed to fetch instructor data');
                const data = await response.json();
                setInstructor(data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchInstructorData();
    }, [instructorId]);

    // Handle input change
    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name in instructor.user) {
            setInstructor((prevInstructor) => ({
                ...prevInstructor,
                user: {
                    ...prevInstructor.user,
                    [name]: value
                }
            }));
        } else {
            setInstructor((prevInstructor) => ({
                ...prevInstructor,
                [name]: value
            }));
        }
    };

    // Handle profile update
    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`http://localhost:8282/api/instructors/${instructorId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(instructor),
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
                <h1>Update Profile</h1>
                <form onSubmit={handleUpdate}>

                    {/* Username */}
                    <div>
                        <label>Username:</label>
                        <input
                            type="text"
                            name="username"
                            value={instructor.user.username}
                            onChange={handleChange}
                            className="form-control"
                            required
                        />
                    </div>

                    {/* First Name and Last Name Side by Side */}
                    <div className="row">
                        <div className="col-md-6">
                            <label>First Name:</label>
                            <input
                                type="text"
                                name="fname"
                                value={instructor.user.fname}
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
                                value={instructor.user.lname}
                                onChange={handleChange}
                                className="form-control"
                                required
                            />
                        </div>
                    </div>

                    {/* Email and Contact Side by Side */}
                    <div className="row">
                        <div className="col-md-6">
                            <label>Email:</label>
                            <input
                                type="email"
                                name="email"
                                value={instructor.user.email}
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
                                value={instructor.user.contact}
                                onChange={handleChange}
                                className="form-control"
                                required
                            />
                        </div>
                    </div>

                    {/* Qualification */}
                    <div>
                        <label>Qualification:</label>
                        <input
                            type="text"
                            name="qualification"
                            value={instructor.qualification}
                            onChange={handleChange}
                            className="form-control"
                            required
                        />
                    </div>

                    {/* Experience and Expertise Side by Side */}
                    <div className="row">
                        <div className="col-md-6">
                            <label>Experience:</label>
                            <input
                                type="number"
                                name="experience"
                                value={instructor.experience}
                                onChange={handleChange}
                                className="form-control"
                                required
                            />
                        </div>
                        <div className="col-md-6">
                            <label>Expertise:</label>
                            <input
                                type="text"
                                name="expertise"
                                value={instructor.expertise}
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

export default UpdateProfile;
