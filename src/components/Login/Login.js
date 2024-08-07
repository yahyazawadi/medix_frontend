import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Login.css';
import { Link, useNavigate } from 'react-router-dom';
import backgroundImage from '../../assets/home_pic.png';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  let acces=0;
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!email || !password) {
      setError('من فضلك أدخل الإيميل وكلمة السر');
      return;
    } else {
      setError(null);
    }
  
    try {
      console.log('Attempting login with:', { email, password });
      const response = await axios.post('https://medix-backend-k0q1.onrender.com/user/login', { email, password });
      console.log('Login response:', response.data);
      if (response.data.success) {
        console.log('تم الدخول');
        acces = 1;
        navigate('/', { state: { acces } });
      } else {
        setError('كلمة السر أو الإيميل غير صحيحتان');
      }
      const responsE = await axios.post('https://medix-backend-k0q1.onrender.com/admin/login', { email, password });
      console.log('Admin login response:', responsE.data);
      if (responsE.data.success) {
        console.log('Login successful');
        acces = 2;
        navigate('/', { state: { acces } });
      } else {
        setError('Invalid email or password');
      }
    } catch (error) {
      console.error('Error logging in:', error);
      setError('An error occurred during login');
    }
  };
  
  
  return (
    <header className="masthead">
      <div className="Connection_Status">
      </div>
      <div className="login-container">
        <div className="Log">
          <h2>تسجيل الدخول</h2>
          {error && <p className="error-message">{error}</p>}
          <form onSubmit={handleSubmit}>
            <div className="form-group">
            <label style={{ direction: 'rtl', textAlign: 'right' }}>:الإيميل</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="form-group">
              
              <label style={{ direction: 'rtl', textAlign: 'right' }}>كلمة السر:</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button type="submit" className="submit-button">
              تسجيل الدخول
            </button>
          </form>
          <p>
          <Link 
  to="/forgot-password" 
  style={{ 
    textAlign: 'center', 
    direction: 'rtl', 
    display: 'block',  // Ensure the link is a block-level element for text alignment to work
    color: '#1a1aa3'
  }}
>
  أنسيت كلمة السر؟
</Link>

          </p>
          <hr />
          <p>
            <Link to="/contact">
              <button className="RegisterForm">!أنشئ حسابًا</button>
            </Link>
          </p>
        </div>
      </div>
      <div
        className="background-image"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      ></div>
    </header>
  );
};

export default Login;
