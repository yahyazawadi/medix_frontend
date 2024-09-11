import React, { useState, useEffect } from 'react';
import "./panel.css";
import { useNavigate } from 'react-router-dom';

function Users() {
  const [Users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);  // To store filtered users
  const [searchQuery, setSearchQuery] = useState('');  // State for search query
  const [selectedUser, setSelectedUser] = useState(null);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);  // State to toggle edit mode
  const [updatedUser, setUpdatedUser] = useState(null); // State to hold updated user data
  const navigate = useNavigate();
  const [adminIn, setAdminIn] = useState(() => localStorage.getItem('acces') === '2');

  useEffect(() => {
    fetchUsers();

    // Add event listener for `Esc` key press
    const handleEsc = (event) => {
      if (event.key === "Escape") {
        setSelectedUser(null);  // Reset selectedUser on `Esc` key press
        setIsEditing(false);  // Ensure edit mode is disabled
      }
    };

    window.addEventListener('keydown', handleEsc);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, []);

  const fetchUsers = async () => {
  try {
    const response = await fetch('https://medix-backend-k0q1.onrender.com/user');
    if (!response.ok) {
      throw new Error('Failed to fetch Users');
    }
    const data = await response.json();
    
    // Sort the users by `createdAt` field in descending order (newest first)
    const sortedUsers = data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    
    setUsers(sortedUsers);
    setFilteredUsers(sortedUsers);  // Initially, all users are displayed
  } catch (error) {
    setError(error.message);
  }
};


  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    const filtered = Users.filter(user =>
      (user.firstName?.toLowerCase() || '').includes(query) ||
      (user.lastName?.toLowerCase() || '').includes(query) ||
      (user.email?.toLowerCase() || '').includes(query) ||
      (user.mobileNumber?.toLowerCase() || '').includes(query) ||
      (user.location?.toLowerCase() || '').includes(query)
    );
    setFilteredUsers(filtered);
  };

  const showUserDetails = (user) => {
    setSelectedUser(user);
    setUpdatedUser(user);  // Initialize updatedUser with selectedUser
    setIsEditing(false);  // Exit edit mode when switching users
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`https://medix-backend-k0q1.onrender.com/user/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete user');
      }
      setSelectedUser(null);  // Clear selected user after deletion
      fetchUsers();  // Refresh the user list
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const handleEdit = () => {
    setIsEditing(true);  // Enable edit mode
  };

  const handleInputChange = (e) => {
    setUpdatedUser({ ...updatedUser, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    try {
      const userPayload = { ...updatedUser };
      delete userPayload.password;  // Ensure the password is not sent

      const response = await fetch(`https://medix-backend-k0q1.onrender.com/user/${updatedUser._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userPayload),
      });

      if (!response.ok) {
        throw new Error('Failed to update user');
      }

      const updatedData = await response.json();
      setSelectedUser(updatedData.user);  // Update selected user with new data
      setIsEditing(false);  // Exit edit mode after saving
      fetchUsers();  // Refresh the user list
    } catch (error) {
      console.error('Error updating user:', error);
    }
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
        {/* Search box */}
        <input
          type="text"
          placeholder="Search users..."
          value={searchQuery}
          onChange={handleSearch}
        />
        {error ? (
          <p>Error fetching Users: {error}</p>
        ) : (
          filteredUsers.map((user) => (
            <div key={user._id} onClick={() => showUserDetails(user)} className="driver-item">
              <p><strong>Name:</strong> {user.firstName} {user.lastName}</p>
              <p><strong>Email:</strong> {user.email}</p>
              <p><strong>Phone Number:</strong> {user.mobileNumber}</p>
              <p><strong>Location:</strong> {user.location}</p>
            </div>
          ))
        )}
      </div>
      <div className="contentH">
        {selectedUser ? (
          <div className="driver-details">
            {isEditing ? (
              <div>
                <h2>Edit User</h2>
                {/* Editable fields */}
                  
    <label>
      First Name
      <input
        type="text"
        name="firstName"
        value={updatedUser.firstName}
        onChange={handleInputChange}
        placeholder="First Name"
      />
    </label>
    
    <label>
      Last Name
      <input
        type="text"
        name="lastName"
        value={updatedUser.lastName}
        onChange={handleInputChange}
        placeholder="Last Name"
      />
    </label>
    
    <label>
      Email
      <input
        type="text"
        name="email"
        value={updatedUser.email}
        onChange={handleInputChange}
        placeholder="Email"
      />
    </label>
    
    <label>
      Phone Number
      <input
        type="text"
        name="mobileNumber"
        value={updatedUser.mobileNumber}
        onChange={handleInputChange}
        placeholder="Phone Number"
      />
    </label>
    
    <label>
      Date of Birth
      <input
        type="date"
        name="dateOfBirth"
        value={updatedUser.dateOfBirth.split('T')[0]}
        onChange={handleInputChange}
        placeholder="Date of Birth"
      />
    </label>
    
    <label>
      Gender
      <input
        type="text"
        name="gender"
        value={updatedUser.gender}
        onChange={handleInputChange}
        placeholder="Gender"
      />
    </label>
    
    <label>
      Location
      <input
        type="text"
        name="location"
        value={updatedUser.location}
        onChange={handleInputChange}
        placeholder="Location"
      />
    </label>
    
    <label>
      Major
      <input
        type="text"
        name="major"
        value={updatedUser.major}
        onChange={handleInputChange}
        placeholder="Major"
      />
    </label>
    
    <label>
      University
      <input
        type="text"
        name="university"
        value={updatedUser.university}
        onChange={handleInputChange}
        placeholder="University"
      />
    </label>
    
    <label>
      Academic Level
      <input
        type="text"
        name="academicLevel"
        value={updatedUser.academicLevel}
        onChange={handleInputChange}
        placeholder="Academic Level"
      />
    </label>
    
    {updatedUser.academicLevel === "University Student" && (
      <label>
        Year of University
        <input
          type="text"
          name="yearOfUniversity"
          value={updatedUser.yearOfUniversity}
          onChange={handleInputChange}
          placeholder="Year of University"
        />
      </label>
    )}
                <button onClick={handleUpdate}>Save</button>
              </div>
            ) : (
              <div>
                <h2>User Details</h2>
                <p><strong>First Name:</strong> {selectedUser.firstName}</p>
                <p><strong>Last Name:</strong> {selectedUser.lastName}</p>
                <p><strong>Email:</strong> {selectedUser.email}</p>
                <p><strong>Phone Number:</strong> {selectedUser.mobileNumber}</p>
                <p><strong>Gender:</strong> {selectedUser.gender}</p>
                <p><strong>Date of Birth:</strong> {new Date(selectedUser.dateOfBirth).toLocaleDateString()}</p>
                <p><strong>Location:</strong> {selectedUser.location}</p>
                <p><strong>Major:</strong> {selectedUser.major}</p>
                <p><strong>University:</strong> {selectedUser.university}</p>
                <p><strong>Academic Level:</strong> {selectedUser.academicLevel}</p>
                {selectedUser.academicLevel === "University Student" && (
                  <p><strong>Year of University:</strong> {selectedUser.yearOfUniversity}</p>
                )}
                <p><strong>Created At:</strong> {new Date(selectedUser.createdAt).toLocaleDateString()}</p>
                <button onClick={handleEdit}>Edit</button> {/* Edit Button */}
                <button onClick={() => handleDelete(selectedUser._id)}>Delete</button> {/* Delete Button */}
              </div>
            )}
          </div>
        ) : (
          <p>Select a user to see details</p>
        )}
      </div>
    </div>
  );
}

export default Users;
