import React, { useState } from 'react';
import backgroundImage from '../../assets/home_pic.png';
import './CreateProfile.css';
import Background from '../BackGroundLong/BackGround';

function RegisterForm() {
  const [Data, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    mobileNumber: '',
    dateOfBirth: '',
    gender: '',
    location: ''
  });

  const handleSubmit = (event) => {
    event.preventDefault();

    fetch('https://medix-backend-k0q1.onrender.com/user', {
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
          location: ''
        });
      })
      .catch(error => {
        console.error('Error :', error.message);
        alert(`Failed to register : ${error.message}`);
      });
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevState) => {
      const newFormData = {
        ...prevState,
        firstName: prevState.firstName,
        lastName: prevState.lastName,
        email: prevState.email,
        password: prevState.password,
        mobileNumber: prevState.mobileNumber,
        dateOfBirth: prevState.dateOfBirth,
        gender: prevState.gender,
        location: prevState.location,
      };

       newFormData[name] = value;

      return newFormData;
    });
  };

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