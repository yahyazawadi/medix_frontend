import Background from '../BackGroundLong/BackGround';
import AppNavbar from '../common/NavigationBar';
import './ContactPage.css';
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
        location: '',
        major: '',
        university: '',
        academicLevel: '',
        yearOfUniversity: ''
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
            const response = await fetch('https://medix-backend-k0q1.onrender.com/contacts', { 
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
                    location: '',
                    major: '',
                    university: '',
                    academicLevel: '',
                    yearOfUniversity: ''
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
        <div>
        <Background>
            <header className="ContactPage__masthead vh-100 d-flex align-items-center text-center">
                <div className="ContactPage__container">
                    <div className="row justify-content-center">
                        <div className="col-12">
                            <div className="ContactPage__yellow-box">
                                <form onSubmit={handleSubmit}>
                                    <div className="ContactPage__form-group">
                                        <label htmlFor="firstName">First Name:</label>
                                        <input type="text" className="ContactPage__form-control" id="firstName" name="firstName" value={formData.firstName} onChange={handleChange} required />
                                    </div>
                                    <div className="ContactPage__form-group">
                                        <label htmlFor="lastName">Last Name:</label>
                                        <input type="text" className="ContactPage__form-control" id="lastName" name="lastName" value={formData.lastName} onChange={handleChange} required />
                                    </div>
                                    <div className="ContactPage__form-group">
                                        <label htmlFor="email">Email:</label>
                                        <input type="email" className="ContactPage__form-control" id="email" name="email" value={formData.email} onChange={handleChange} required />
                                    </div>
                                    <div className="ContactPage__form-group">
                                        <label htmlFor="password">Password:</label>
                                        <input type="password" className="ContactPage__form-control" id="password" name="password" value={formData.password} onChange={handleChange} required />
                                    </div>
                                    <div className="ContactPage__form-group">
                                        <label htmlFor="mobileNumber">Mobile Number:</label>
                                        <input type="tel" className="ContactPage__form-control" id="mobileNumber" name="mobileNumber" value={formData.mobileNumber} onChange={handleChange} required />
                                    </div>
                                    <div className="ContactPage__form-group">
                                        <label htmlFor="dateOfBirth">Date of Birth:</label>
                                        <input type="date" className="ContactPage__form-control" id="dateOfBirth" name="dateOfBirth" value={formData.dateOfBirth} onChange={handleChange} required />
                                    </div>
                                    <div className="ContactPage__form-group">
                                        <label htmlFor="gender">Gender:</label>
                                        <select className="ContactPage__form-control" id="gender" name="gender" value={formData.gender} onChange={handleChange} required>
                                            <option value="">Select Gender</option>
                                            <option value="Male">Male</option>
                                            <option value="Female">Female</option>
                                        </select>
                                    </div>
                                    <div className="ContactPage__form-group">
                                        <label htmlFor="location">Location:</label>
                                        <input type="text" className="ContactPage__form-control" id="location" name="location" value={formData.location} onChange={handleChange} />
                                    </div>
                                    <div className="ContactPage__form-group">
                                        <label htmlFor="major">Major:</label>
                                        <input type="text" className="ContactPage__form-control" id="major" name="major" value={formData.major} onChange={handleChange} />
                                    </div>
                                    <div className="ContactPage__form-group">
                                        <label htmlFor="university">University:</label>
                                        <input type="text" className="ContactPage__form-control" id="university" name="university" value={formData.university} onChange={handleChange} />
                                    </div>
                                    <div className="ContactPage__form-group">
                                        <label htmlFor="academicLevel">Academic Level:</label>
                                        <select className="ContactPage__form-control" id="academicLevel" name="academicLevel" value={formData.academicLevel} onChange={handleChange}>
                                            <option value="">Select Academic Level</option>
                                            <option value="University Student">University Student</option>
                                            <option value="Other">Other</option>
                                        </select>
                                    </div>
                                    {formData.academicLevel === 'University Student' && (
                                        <div className="ContactPage__form-group">
                                            <label htmlFor="yearOfUniversity">Year of University:</label>
                                            <input type="number" className="ContactPage__form-control" id="yearOfUniversity" name="yearOfUniversity" value={formData.yearOfUniversity} onChange={handleChange} />
                                        </div>
                                    )}
                                    <button type="submit" className="ContactPage__btn">Submit</button>
                                </form>
                            </div>
                            <div className="ContactPage__spacer"></div>
                        </div>
                    </div>
                </div>
            </header>
        
       </Background>
        </div>
    );
}

export default ContactPage;
