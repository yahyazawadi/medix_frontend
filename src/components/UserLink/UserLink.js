import React, { useState, useEffect } from 'react';
import './UserLink.css';
import backgroundImage from '../../assets/home_pic.png';
import Background from '../BackGround/BackGround';
import { useNavigate } from 'react-router-dom';


function UserLinks() {



  
  const [links, setLinks] = useState([]);
  const [error, setError] = useState(null);
  const token = localStorage.getItem('token');
  const fetchLinks = async () => {
    try {
      const response = await fetch('https://medix-backend-k0q1.onrender.com//links', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error('Failed to fetch links');
      }
      const data = await response.json();
      setLinks(data);
    } catch (error) {
      setError(error.message);
    }
  };
  useEffect(() => {
    fetchLinks();
  }, []);
  const navigate = useNavigate();
  const [userIn, setUserIn] = useState(() => localStorage.getItem('acces') === '1');
  const [adminIn, setAdminIn] = useState(() => localStorage.getItem('acces') === '2');

  useEffect(() => {
      if (!userIn && !adminIn) {
          // Redirect if neither user nor admin is logged in
          navigate('/login'); // Or navigate('/login')
      }
  }, [userIn, adminIn, navigate]);

  if (!userIn && !adminIn) {
      return <div>Unauthorized access. Admins or users only.</div>;
  }
  

  return (
    <Background>
    <header className="masthead">
      <div className="user-container">
        <h2 className="user-header">Useful Links</h2>
        {error && <p>{error}</p>}
        <div className="links-list">
          {links.map((link) => (
            <div key={link._id} className="link-item">
              <h4>{link.title}</h4>
              <p>{link.description}</p>
              <p><a href={link.url} target="_blank" rel="noopener noreferrer">{link.url}</a></p>
              <p>{new Date(link.datePublished).toLocaleDateString()}</p>
            </div>
          ))}
        </div>
      </div>

       
            
             
    </header>
    </Background>
    );
}

export default UserLinks;
