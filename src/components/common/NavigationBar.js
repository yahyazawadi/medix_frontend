import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import logo from '../../assets/climalogo2.png';

const navBarStyle = {
  background: 'linear-gradient(to bottom, rgb(144, 183, 180), rgb(207, 231, 241))',
  borderBottom: 'none',
  boxShadow: 'none',
  color: '#000',
  padding: '10px 0',
  fontFamily: "'Cairo', sans-serif",
  //marginBottom: "20px"
};

const mainStyle = {
  color: '#000',
  fontWeight: 'bold',
  fontSize: '1.6em', // Larger font size for the main brand
  padding: '10px 15px',
  fontFamily: "'Cairo', 'Almarai', 'Aref Ruqaa', 'Reem Kufi', 'Amiri', 'Lateef', 'Scheherazade', sans-serif",
};

const linkStyle = {
  color: '#000',
  fontSize: '1.2em', // Increased font size
  padding: '10px 15px',
  fontFamily: "Amiri",
  marginTop: '-55px', // Adjust this value to raise the links
};

function NavigationBar() {
  return (
    <nav className="navbar navbar-expand-lg" style={navBarStyle}>
      <Link className="navbar-brand" to="/" style={mainStyle}>
        <img src={logo} alt="ClimaMedix Logo" style={{ width: '320px',marginTop: '-13px', marginRight: '20px' }} />
        
      </Link>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNavDropdown">
        <ul className="navbar-nav ml-auto">
          <li className="nav-item">
            <Link className="nav-link" to="/" style={linkStyle}>الصفحة الرئيسة</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/services" style={linkStyle}>من نحن؟</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/courses" style={linkStyle}>دوراتنا</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/green" style={linkStyle}>مستقبل أخضر</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/login" style={linkStyle}>تسجيل الدخول</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

function AdminNavbar({ onLogout }) {
  return (
    <nav className="navbar navbar-expand-lg" style={navBarStyle}>
      <Link className="navbar-brand" to="/" style={mainStyle}>
      <img src={logo} alt="ClimaMedix Logo" style={{ width: '320px',marginTop: '-13px', marginRight: '20px' }} />
        
      </Link>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNavDropdown">
        <ul className="navbar-nav ml-auto">
          <li className="nav-item active">
            <Link className="nav-link" to="/" style={linkStyle}>Home</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/create-profile" style={linkStyle}>Create profiles</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/adminpanel/adminlinks" style={linkStyle}>Links</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/users" style={linkStyle}>Users</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/registries" style={linkStyle}>Registries</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/login" onClick={onLogout} style={linkStyle}>Logout</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

function UserNavbar({ onLogout }) {
  return (
    <nav className="navbar navbar-expand-lg" style={navBarStyle}>
      <Link className="navbar-brand" to="/" style={mainStyle}>
      <img src={logo} alt="ClimaMedix Logo" style={{ width: '320px',marginTop: '-13px', marginRight: '20px' }} />
        
      </Link>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNavDropdown">
        <ul className="navbar-nav ml-auto">
          <li className="nav-item active">
            <Link className="nav-link" to="/" style={linkStyle}>الصفحة الرئيسة</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/userlink" style={linkStyle}>روابط المحاضرات</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/login" onClick={onLogout} style={linkStyle}>تسجيل الخروج</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

function AppNavbar() {
  const location = useLocation();
  const { acces: locationAcces } = location.state || {};
  const [userIn, setUserIn] = useState(() => {
    const savedAcces = localStorage.getItem('acces');
    return savedAcces === '1';
  });
  const [adminIn, setAdminIn] = useState(() => {
    const savedAcces = localStorage.getItem('acces');
    return savedAcces === '2';
  });

  useEffect(() => {
    console.log("Location Acces: ", locationAcces);
    console.log("Local Storage Acces: ", localStorage.getItem('acces'));

    if (locationAcces) {
      localStorage.setItem('acces', locationAcces);
      if (locationAcces === 1) {
        setUserIn(true);
        setAdminIn(false);
      } else if (locationAcces === 2) {
        setAdminIn(true);
        setUserIn(false);
      }
    }
  }, [locationAcces]);

  const handleLogout = () => {
    localStorage.removeItem('acces');
    setUserIn(false);
    setAdminIn(false);
  };

  if (userIn) {
    return <UserNavbar onLogout={handleLogout} />;
  } else if (adminIn) {
    return <AdminNavbar onLogout={handleLogout} />;
  } else {
    return <NavigationBar />;
  }
}

export default AppNavbar;
