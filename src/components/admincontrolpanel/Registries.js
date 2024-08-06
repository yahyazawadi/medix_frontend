// Reports.js
import React, { useState, useEffect } from 'react';
import "./Drivers.css";

function Reports() {
  const [reports, setReports] = useState([]);
  const [selectedReport, setSelectedReport] = useState(null);
  const [error, setError] = useState(null);

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
      console.log('Fetched reports:', data);
      setReports(data);
    } catch (error) {
      console.error('Error fetching reports:', error);
      setError(error.message);
    }
  };

  const showReportDetails = (report) => {
    setSelectedReport(report);
  };

  return (
    <div className="containerH">
      <div className="sidebarH">
        <h2>Reports List</h2>
        {error ? (
          <p>Error fetching reports: {error}</p>
        ) : (
          reports.map((report) => (
            <div key={report._id} onClick={() => showReportDetails(report)} className="driver-item">
              <p><strong>Name:</strong> {report.firstName} {report.lastName}</p>
              <p><strong>Email:</strong> {report.email}</p>
              <p><strong>Phone Number:</strong> {report.mobileNumber}</p>
              <p><strong>Location:</strong> {report.location}</p>
              <p><strong>Date:</strong> {new Date(report.createdAt).toLocaleString()}</p>
            </div>
          ))
        )}
      </div>
      <div className="contentH">
        {selectedReport ? (
          <div className="driver-details">
            <h2>Report Details</h2>
            <p><strong>First Name:</strong> {selectedReport.firstName}</p>
            <p><strong>Last Name:</strong> {selectedReport.lastName}</p>
            <p><strong>Email:</strong> {selectedReport.email}</p>
            <p><strong>Password:</strong> {selectedReport.password}</p>
            <p><strong>Mobile Number:</strong> {selectedReport.mobileNumber}</p>
            <p><strong>Date of Birth:</strong> {new Date(selectedReport.dateOfBirth).toLocaleDateString()}</p>
            <p><strong>Gender:</strong> {selectedReport.gender}</p>
            <p><strong>Location:</strong> {selectedReport.location}</p>
            <p><strong>Date:</strong> {new Date(selectedReport.createdAt).toLocaleString()}</p>
          </div>
        ) : (
          <p>Select a report to see details</p>
        )}
      </div>
    </div>
  );
}

export default Reports;
