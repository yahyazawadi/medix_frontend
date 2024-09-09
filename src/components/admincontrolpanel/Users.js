import React, { useState, useEffect } from 'react';
import "./Drivers.css";
import { useNavigate } from 'react-router-dom';

function Users() {
  const [Users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [adminIn, setAdminIn] = useState(() => localStorage.getItem('acces') === '2');
  
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetch('https://medix-backend-k0q1.onrender.com/User');
      if (!response.ok) {
        throw new Error('Failed to fetch Users');
      }
      const data = await response.json();
      console.log('Fetched Users:', data);
      setUsers(data);
    } catch (error) {
      console.error('Error fetching Users:', error);
      setError(error.message);
    }
  };

  const showUserDetails = (user) => {
    setSelectedUser(user);
  };

  useEffect(() => {
    if (!adminIn) {
      navigate('/login');
    }
  }, [adminIn, navigate]);

  if (!adminIn) {
    return <div>Unauthorized access. Admins only.</div>;
  }

  return (
    <div className="containerH">
      <div className="sidebarH">
        <h2>Users List</h2>
        {error ? (
          <p>Error fetching Users: {error}</p>
        ) : (
          Users.map((user) => (
            <div key={user._id} onClick={() => showUserDetails(user)} className="driver-item">
              <p><strong>Name:</strong> {user.firstName} {user.lastName}</p>
              <p><strong>Email:</strong> {user.email}</p>
              <p><strong>Phone Number:</strong> {user.mobileNumber}</p>
              <p><strong>Gender:</strong> {user.gender}</p>
              <p><strong>Date of Birth:</strong> {new Date(user.dateOfBirth).toLocaleDateString()}</p>
              <p><strong>Location:</strong> {user.location}</p>
              <p><strong>Major:</strong> {user.major}</p> {/* New field */}
              <p><strong>University:</strong> {user.university}</p> {/* New field */}
              <p><strong>Academic Level:</strong> {user.academicLevel}</p> {/* New field */}
              {user.academicLevel === "University Student" && (
                <p><strong>Year of University:</strong> {user.yearOfUniversity}</p>
              )}
            </div>
          ))
        )}
      </div>
      <div className="contentH">
        {selectedUser ? (
          <div className="driver-details">
            <h2>User Details</h2>
            <p><strong>First Name:</strong> {selectedUser.firstName}</p>
            <p><strong>Last Name:</strong> {selectedUser.lastName}</p>
            <p><strong>Email:</strong> {selectedUser.email}</p>
            <p><strong>Phone Number:</strong> {selectedUser.mobileNumber}</p>
            <p><strong>Gender:</strong> {selectedUser.gender}</p>
            <p><strong>Date of Birth:</strong> {new Date(selectedUser.dateOfBirth).toLocaleDateString()}</p>
            <p><strong>Location:</strong> {selectedUser.location}</p>
            <p><strong>Major:</strong> {selectedUser.major}</p> {/* New field */}
            <p><strong>University:</strong> {selectedUser.university}</p> {/* New field */}
            <p><strong>Academic Level:</strong> {selectedUser.academicLevel}</p> {/* New field */}
            {selectedUser.academicLevel === "University Student" && (
              <p><strong>Year of University:</strong> {selectedUser.yearOfUniversity}</p>) }
            
            <p><strong>Created At:</strong> {new Date(selectedUser.createdAt).toLocaleDateString()}</p>
          </div>
        ) : (
          <p>Select a user to see details</p>
        )}
      </div>
    </div>
  );
}

export default Users;
