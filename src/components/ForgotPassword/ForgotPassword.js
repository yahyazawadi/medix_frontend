import React, { useState } from 'react';
import '../ForgotPassword/ForgotPassword.css';
import backgroundImage from '../../assets/home_pic.png'; 
import Background from '../BackGround/BackGround';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!email) {
      setError('Please enter your email address');
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address');
      return;
    }
    setError(null);

    try {
      const response = await fetch('https://medix-backend-k0q1.onrender.com//User/request-reset-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });
      const data = await response.text();
      setMessage(data);
    } catch (error) {
      console.error('Error:', error);
      setError('An error occurred');
    }
  };

  return (
    <Background>
    <header className="masthead">
      <div className="Forgot-Container">
        <h2>Forgot Password</h2>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        {message && <p style={{ color: 'green' }}>{message}</p>}
        <form onSubmit={handleSubmit}>
          <div>
            <label>Email:</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <button type="submit">Reset Password</button>
        </form>
      </div>
       
       
    </header>
    </Background>
  );
};

export default ForgotPassword;