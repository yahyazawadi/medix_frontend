import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import logo from '../../assets/climalogo2.png';
import 'bootstrap/dist/css/bootstrap.min.css';
import './NavigationBar.css'; // Import custom CSS

const navBarStyle = {
  background: 'linear-gradient(to bottom, rgb(144, 183, 180), rgb(207, 231, 241))',
  borderBottom: 'none',
  boxShadow: 'none',
  color: '#000',
  padding: '10px 0',
  fontFamily: "'Cairo', sans-serif",
};

const mainStyle = {
  color: '#000',
  fontWeight: 'bold',
  fontSize: '1.6em',
  padding: '10px 15px',
  fontFamily: "'Cairo', 'Almarai', 'Aref Ruqaa', 'Reem Kufi', 'Amiri', 'Lateef', 'Scheherazade', sans-serif",
};

const linkStyle = {
  color: '#000',
  fontSize: '1.2em',
  padding: '10px 15px',
  fontFamily: 'Amiri',
  marginTop: '-45px',
  fontSize: '21.6px',
  fontWeight: '400',
  lineHeight: '32.4px' 
};
const Linkstyl = {
  color: '#000',
  TextDecoder:'#000',
  fontSize: '1.2em',
  padding: '10px 15px',
  fontFamily: 'Amiri',
  marginTop: '-45px',
  fontSize: '21.6px',
  fontWeight: '400',
  lineHeight: '32.4px' 
};

function NavigationBar({ showSidebar, hideSidebar, isSidebarVisible }) {
  return (
    <Navbar expand="lg" style={navBarStyle}>
      <div className="navbar-header">
        <Navbar.Brand as={Link} to="/" style={mainStyle}>
        <img src={logo} alt="ClimaMedix Logo" style={{
  width: '21.5vw',
  marginTop: '-13px',
  marginRight: '20px',
  ...(window.innerWidth <= 800 && { width: '45vw' })
}} />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarNavDropdown" onClick={showSidebar} />
      </div>
      <Navbar.Collapse id="navbarNavDropdown">
        <Nav className="ml-auto">
          <Nav.Link as={Link} to="/" style={linkStyle}>Home</Nav.Link>
          <Nav.Link as={Link} to="/services" style={linkStyle}>About us</Nav.Link>
          <Nav.Link as={Link} to="/courses" style={linkStyle}>Courses</Nav.Link>
          <NavDropdown
  title={<span title='inkstyl'>Programs</span>}
  id="navbarScrollingDropdown"
  className="custom-dropdown" // Apply the custom-dropdown class
>

            <NavDropdown.Item href="#">Scientific Research</NavDropdown.Item>
            <NavDropdown.Item href="#">Entrepreneurship</NavDropdown.Item>
            <NavDropdown.Item href="#">Green Opportunity</NavDropdown.Item>
          </NavDropdown>
          <Nav.Link as={Link} to="/" style={linkStyle}>MedixPlus</Nav.Link>
          <Nav.Link as={Link} to="/" style={linkStyle}>Contact Us</Nav.Link>
          <Nav.Link as={Link} to="/login" style={linkStyle}>Sign Up</Nav.Link>
        </Nav>
      </Navbar.Collapse>

      {/* Mobile Sidebar */}
      {isSidebarVisible && (
        <div className="mobile-sidebar">
          <ul className="sidebar-links">
            <li><Link to="/" onClick={hideSidebar}>Home</Link></li>
            <li><Link to="/services" onClick={hideSidebar}>Services</Link></li>
            <li><Link to="/courses" onClick={hideSidebar}>Courses</Link></li>
            <li><Link to="/login" onClick={hideSidebar}>Login</Link></li>
            <li className="dropdown">
              <a href="#" className="dropdown-toggle" onClick={hideSidebar}>Programs</a>
              <ul className="dropdown-content">
                <li><Link to="/link1" onClick={hideSidebar}>Link 1</Link></li>
                <li><Link to="/link2" onClick={hideSidebar}>Link 2</Link></li>
                <li><Link to="/link3" onClick={hideSidebar}>Link 3</Link></li>
              </ul>
            </li>
          </ul>
        </div>
      )}
    </Navbar>
  );
}
function AppNavbar() {
  const location = useLocation();
  const { acces: locationAcces } = location.state || {};
  const [userIn, setUserIn] = useState(() => localStorage.getItem('acces') === '1');
  const [adminIn, setAdminIn] = useState(() => localStorage.getItem('acces') === '2');
  const [isSidebarVisible, setSidebarVisible] = useState(false);

  useEffect(() => {
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
    setSidebarVisible(false);
  };

  const showSidebar = () => setSidebarVisible(true);
  const hideSidebar = () => setSidebarVisible(false);

  if (userIn) {
    return <UserNavbar onLogout={handleLogout} showSidebar={showSidebar} hideSidebar={hideSidebar} isSidebarVisible={isSidebarVisible} />;
  } else if (adminIn) {
    return <AdminNavbar onLogout={handleLogout} showSidebar={showSidebar} hideSidebar={hideSidebar} isSidebarVisible={isSidebarVisible} />;
  } else {
    return <NavigationBar showSidebar={showSidebar} hideSidebar={hideSidebar} isSidebarVisible={isSidebarVisible} />;
  }
}
function AdminNavbar({ onLogout }) {
  return (
    <Navbar expand="lg" style={navBarStyle}>
      <Navbar.Brand as={Link} to="/" style={mainStyle}>
        <img src={logo} alt="ClimaMedix Logo" style={{ width: '320px', marginTop: '-13px', marginRight: '20px' }} />
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="navbarNavDropdown" />
      <Navbar.Collapse id="navbarNavDropdown">
        <Nav className="ml-auto">
          <Nav.Link as={Link} to="/" style={linkStyle}>Home</Nav.Link>
          <Nav.Link as={Link} to="/create-profile" style={linkStyle}>Create profiles</Nav.Link>
          <Nav.Link as={Link} to="/adminpanel/adminlinks" style={linkStyle}>Links</Nav.Link>
          <Nav.Link as={Link} to="/users" style={linkStyle}>Users</Nav.Link>
          <Nav.Link as={Link} to="/registries" style={linkStyle}>Registries</Nav.Link>
          <Nav.Link as={Link} to="/login" onClick={onLogout} style={linkStyle}>Logout</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

function UserNavbar({ onLogout }) {
  return (
    <Navbar expand="lg" style={navBarStyle}>
      <Navbar.Brand as={Link} to="/" style={mainStyle}>
        <img src={logo} alt="ClimaMedix Logo" style={{ width: '320px', marginTop: '-13px', marginRight: '20px' }} />
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="navbarNavDropdown" />
      <Navbar.Collapse id="navbarNavDropdown">
        <Nav className="ml-auto">
          <Nav.Link as={Link} to="/" style={linkStyle}>الصفحة الرئيسة</Nav.Link>
          <Nav.Link as={Link} to="/userlink" style={linkStyle}>روابط المحاضرات</Nav.Link>
          <Nav.Link as={Link} to="/login" onClick={onLogout} style={linkStyle}>تسجيل الخروج</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}



export default AppNavbar;