import React from 'react';
import './footer.css';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section about-us">
          <h4 className="footer-title">About us</h4>
          <div className="social-icons">
            <a href="#"><img src={require('../../assets/facebook.png')} alt="Facebook" className="logon" /></a>
            <a href="#"><img src={require('../../assets/insta.png')} alt="Instagram" className="logon" /></a>
          </div>
        </div>

        <div className="footer-section links">
          <h4 className="footer-title">hyperlink</h4>
          <ul className="footer-list">
            <li><a href="#">Home</a></li>
            <li><a href="#">Courses</a></li>
            <li><a href="#">Programs</a></li>
            <li><a href="#">Medix plus</a></li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <h6>&copy; ClimaMedix. All rights reserved</h6>
      </div>
    </footer>
  );
}

export default Footer;
