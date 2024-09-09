import React, { useEffect, useState } from 'react';
import backgroundImage from '../../assets/home_pic.png';
import './CreateProfile.css';
import Background from '../BackGroundLong/BackGround';
import { useNavigate } from 'react-router-dom';

function RegisterForm() {
  const [Data, setFormData] = useState({
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

  const handleSubmit = (event) => {
    event.preventDefault();

    // Log the data being sent
    console.log('Data being sent:', Data);

    fetch('https://medix-backend-k0q1.onrender.com//user', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(Data),
    })
      .then(response => {
        if (!response.ok) {
          return response.json().then(errorData => {
            throw new Error(errorData.message || 'Failed to register user');
          });
        }
        return response.json();
      })
      .then(data => {
        alert('Registered successfully!');
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
      })
      .catch(error => {
        console.error('Error :', error.message);
        alert(`Failed to register : ${error.message}`);
      });
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  const navigate = useNavigate();
  const [adminIn, setAdminIn] = useState(() => localStorage.getItem('acces') === '2');

  useEffect(() => {
    if (!adminIn) {
      navigate('/login');
    }
  }, [adminIn, navigate]);

  if (!adminIn) {
    return <div>Unauthorized access. Admins only.</div>;
  }

  return (
    <Background>
      <header className="ContactPage__masthead vh-100 d-flex align-items-center text-center">
        <div className="ContactPage__container">
          <div className="row justify-content-center">
            <div className="col-12">
              <div className="ContactPage__yellow-box">

                <h2>Create Profile</h2>

                <form id="register" onSubmit={handleSubmit}>
                  <label htmlFor="firstName">First Name:</label>
                  <input type="text" id="firstName" name="firstName" value={Data.firstName} onChange={handleChange} required />

                  <label htmlFor="lastName">Last Name:</label>
                  <input type="text" id="lastName" name="lastName" value={Data.lastName} onChange={handleChange} required />

                  <label htmlFor="email">Email:</label>
                  <input type="email" id="email" name="email" value={Data.email} onChange={handleChange} required />

                  <label htmlFor="password">Password:</label>
                  <input type="password" id="password" name="password" value={Data.password} onChange={handleChange} required />

                  <label htmlFor="mobileNumber">Mobile Number:</label>
                  <input type="tel" id="mobileNumber" name="mobileNumber" value={Data.mobileNumber} onChange={handleChange} required />

                  <label htmlFor="dateOfBirth">Date of Birth:</label>
                  <input type="date" id="dateOfBirth" name="dateOfBirth" value={Data.dateOfBirth} onChange={handleChange} required />

                  <label htmlFor="gender">Gender:</label>
                  <select id="gender" name="gender" value={Data.gender} onChange={handleChange} required>
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>

                  <label htmlFor="location">Location:</label>
                  <input type="text" id="location" name="location" value={Data.location} onChange={handleChange} />

                  <label htmlFor="major">Major:</label>
                  <input type="text" id="major" name="major" value={Data.major} onChange={handleChange} required />

                  <label htmlFor="university">University:</label>
                  <input type="text" id="university" name="university" value={Data.university} onChange={handleChange} required />

                  <label htmlFor="academicLevel">Academic Level:</label>
                  <select id="academicLevel" name="academicLevel" value={Data.academicLevel} onChange={handleChange} required>
                    <option value="">Select Academic Level</option>
                    <option value="High School">High School</option>
                    <option value="University Student">University Student</option>
                  </select>

                  {/* Conditionally render year of university */}
                  {Data.academicLevel === 'University Student' && (
                    <>
                      <label htmlFor="yearOfUniversity">Year of University:</label>
                      <input type="text" id="yearOfUniversity" name="yearOfUniversity" value={Data.yearOfUniversity} onChange={handleChange} />
                    </>
                  )}

                  <button type="submit">Submit</button>
                </form>

              </div>
            </div>
          </div>
        </div>
      </header>
    </Background>
  );
}

export default RegisterForm;
