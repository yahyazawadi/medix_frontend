// ContactPage.js
import './ContactPage.css';
import backgroundImage from '../../assets/home_pic.png';
import React, { useState } from 'react';

function ContactPage() {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        mobileNumber: '',
        dateOfBirth: '',
        gender: '',
        location: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:5001/contacts', { 
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                const result = await response.json();
                alert('Form submitted successfully for admin approval');
                setFormData({
                    firstName: '',
                    lastName: '',
                    email: '',
                    password: '',
                    mobileNumber: '',
                    dateOfBirth: '',
                    gender: '',
                    location: ''
                });
            } else {
                const errorData = await response.json();
                console.error('Form submission error:', errorData.message);
            }
        } catch (error) {
            console.error('Error submitting the form:', error);
        }
    };

    return (
        <header className="masthead vh-100 d-flex align-items-center text-center">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-12">
                        <div className="yellow-box">
                            <form onSubmit={handleSubmit}>
                                <div className="form-group">
                                    <label htmlFor="firstName">First Name:</label>
                                    <input type="text" className="form-control" id="firstName" name="firstName" value={formData.firstName} onChange={handleChange} required />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="lastName">Last Name:</label>
                                    <input type="text" className="form-control" id="lastName" name="lastName" value={formData.lastName} onChange={handleChange} required />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="email">Email:</label>
                                    <input type="email" className="form-control" id="email" name="email" value={formData.email} onChange={handleChange} required />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="password">Password:</label>
                                    <input type="password" className="form-control" id="password" name="password" value={formData.password} onChange={handleChange} required />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="mobileNumber">Mobile Number:</label>
                                    <input type="tel" className="form-control" id="mobileNumber" name="mobileNumber" value={formData.mobileNumber} onChange={handleChange} required />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="dateOfBirth">Date of Birth:</label>
                                    <input type="date" className="form-control" id="dateOfBirth" name="dateOfBirth" value={formData.dateOfBirth} onChange={handleChange} required />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="gender">Gender:</label>
                                    <select className="form-control" id="gender" name="gender" value={formData.gender} onChange={handleChange} required>
                                        <option value="">Select Gender</option>
                                        <option value="Male">Male</option>
                                        <option value="Female">Female</option>
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="location">Location:</label>
                                    <input type="text" className="form-control" id="location" name="location" value={formData.location} onChange={handleChange} />
                                </div>
                                <button type="submit" className="btn btn-primary">Submit</button>
                            </form>
                        </div>
                    </div>
                </div>
                <div className="background-overlay"></div>
            </div>
            <div className="background-image" style={{ backgroundImage: `url(${backgroundImage})` }}></div>
        </header>
    );
}

export default ContactPage;
