import React, { useState, useEffect } from 'react';
import './UserLink.css';
import backgroundImage from '../../assets/home_pic.png';

function UserLinks() {
  const [links, setLinks] = useState([]);
  const [error, setError] = useState(null);
  const token = localStorage.getItem('token');

  useEffect(() => {
    fetchLinks();
  }, []);

  const fetchLinks = async () => {
    try {
      const response = await fetch('http://localhost:5001/links', {
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

  return (
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

      <div className="background-overlay"></div>
            
            <div className="background-image" style={{ backgroundImage: `url(${backgroundImage})` }}></div>
    </header>
    );
}

export default UserLinks;
