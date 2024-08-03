import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AdminLinks.css';

function AdminLinks() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [url, setUrl] = useState('');
  const [links, setLinks] = useState([]);
  const [error, setError] = useState('');
  const [editingLinkId, setEditingLinkId] = useState(null);

  useEffect(() => {
    fetchLinks();
  }, []);

  const fetchLinks = async () => {
    try {
      const response = await axios.get('http://localhost:5001/links');
      setLinks(response.data);
    } catch (error) {
      setError('Failed to fetch links');
    }
  };

  const saveLink = async () => {
    if (editingLinkId) {
      try {
        const response = await axios.put(`http://localhost:5001/links/${editingLinkId}`, {
          title,
          description,
          url
        });
        setLinks(links.map(link => (link._id === editingLinkId ? response.data : link)));
        setEditingLinkId(null);
      } catch (error) {
        setError('Failed to update link');
      }
    } else {
      try {
        const response = await axios.post('http://localhost:5001/links', {
          title,
          description,
          url
        });
        setLinks([...links, response.data]);
      } catch (error) {
        setError('Failed to save link');
      }
    }
    setTitle('');
    setDescription('');
    setUrl('');
    setError('');
  };

  const deleteLink = async (id) => {
    try {
      await axios.delete(`http://localhost:5001/links/${id}`);
      setLinks(links.filter(link => link._id !== id));
    } catch (error) {
      setError('Failed to delete link');
    }
  };

  const startEditing = (link) => {
    setTitle(link.title);
    setDescription(link.description);
    setUrl(link.url);
    setEditingLinkId(link._id);
  };

  return (
    <div className="admin-container">
      <h2 className="admin-header">Admin Links Management</h2>
      {error && <p className="error">{error}</p>}
      <div className="admin-form">
        <label>Title</label>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <label>Description</label>
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
        <label>URL</label>
        <input
          type="text"
          placeholder="URL"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
        <button onClick={saveLink}>{editingLinkId ? 'Update Link' : 'Save Link'}</button>
      </div>
      <div className="links-list">
        {links.map(link => (
          <div key={link._id} className="link-item">
            <div className="link-info">
              <h4>{link.title}</h4>
              <p>{link.description}</p>
              <a href={link.url} target="_blank" rel="noopener noreferrer">{link.url}</a>
            </div>
            <div className="link-actions">
              <button onClick={() => deleteLink(link._id)}>Delete</button>
              <button className="edit" onClick={() => startEditing(link)}>Edit</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdminLinks;
