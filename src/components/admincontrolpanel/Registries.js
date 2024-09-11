import React, { useState, useEffect } from 'react';
import "./Drivers.css";
import { useNavigate } from 'react-router-dom';

function Reports() {
  const [reports, setReports] = useState([]);
  const [selectedReport, setSelectedReport] = useState(null);
  const [error, setError] = useState(null);
  const [adminIn, setAdminIn] = useState(() => localStorage.getItem('acces') === '2');
  const [isEditing, setIsEditing] = useState(false);
  const [updatedReport, setUpdatedReport] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    try {
      const response = await fetch('https://medix-backend-k0q1.onrender.com/contacts');
      if (!response.ok) {
        throw new Error('Failed to fetch reports');
      }
      const data = await response.json();
      setReports(data);
    } catch (error) {
      setError(error.message);
    }
  };

  const showReportDetails = (report) => {
    setSelectedReport(report);
    setUpdatedReport(report);
    setIsEditing(false);
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleInputChange = (e) => {
    setUpdatedReport({ ...updatedReport, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    try {
      const response = await fetch(`https://medix-backend-k0q1.onrender.com/drivers/${updatedReport._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedReport),
      });
      if (!response.ok) {
        throw new Error('Failed to update report');
      }
      const updatedData = await response.json();
      setSelectedReport(updatedData.driver);
      setIsEditing(false);
      fetchReports();
    } catch (error) {
      console.error('Error updating report:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`https://medix-backend-k0q1.onrender.com/drivers/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete report');
      }
      setSelectedReport(null);
      fetchReports();
    } catch (error) {
      console.error('Error deleting report:', error);
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
        {error ? (
          <p>Error fetching reports: {error}</p>
        ) : (
          reports.map((report) => (
            <div key={report._id} className="driver-item">
              <p><strong>Name:</strong> {report.firstName} {report.lastName}</p>
              <p><strong>Email:</strong> {report.email}</p>
              <button onClick={() => showReportDetails(report)}>View Details</button>
              <button onClick={() => handleDelete(report._id)}>Delete</button> {/* Delete Button */}
            </div>
          ))
        )}
      </div>
      <div className="contentH">
        {selectedReport ? (
          <div className="driver-details">
            {isEditing ? (
              <div>
                <h2>Edit Report</h2>
                <input
                  type="text"
                  name="firstName"
                  value={updatedReport.firstName}
                  onChange={handleInputChange}
                  placeholder="First Name"
                />
                <input
                  type="text"
                  name="lastName"
                  value={updatedReport.lastName}
                  onChange={handleInputChange}
                  placeholder="Last Name"
                />
                <input
                  type="text"
                  name="email"
                  value={updatedReport.email}
                  onChange={handleInputChange}
                  placeholder="Email"
                />
                <input
                  type="text"
                  name="mobileNumber"
                  value={updatedReport.mobileNumber}
                  onChange={handleInputChange}
                  placeholder="Mobile Number"
                />
                <input
                  type="text"
                  name="location"
                  value={updatedReport.location}
                  onChange={handleInputChange}
                  placeholder="Location"
                />
                <button onClick={handleUpdate}>Save</button>
              </div>
            ) : (
              <div className='details'>
                
                <h2>بعرن غخع</h2>
                <p><strong>fuck you</strong> {selectedReport.firstName}</p>
                <p><strong>Last Name:</strong> {selectedReport.lastName}</p>
                <p><strong>Email:</strong> {selectedReport.email}</p>
                <p><strong>Phone Number:</strong> {selectedReport.mobileNumber}</p>
                <p><strong>Gender:</strong> {selectedReport.gender}</p>
                <p><strong>Date of Birth:</strong> {selectedReport.dob}</p>
                <p><strong>Location:</strong> {selectedReport.location}</p>
                <p><strong>Major:</strong> {selectedReport.major || 'Unknown'}</p>
                <p><strong>University:</strong> {selectedReport.university || 'Unknown'}</p>
                <p><strong>Academic Level:</strong> {selectedReport.academicLevel || 'Unknown'}</p>
                <button className="button-edit" onClick={handleEdit}>Edit</button>
                <button style={{ marginTop: '20px', padding: '10px', backgroundColor: 'blue', color: 'white', zIndex: 50 }}>Test Button</button>
                

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

export default Reports;