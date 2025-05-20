import React, { useState, useEffect } from 'react';
import '../../../css/ManagerDash/Rejected.css';
import axios from '../../../config/axiosConfig';

const Rejected = () => {
  const [rejectedData, setRejectedData] = useState([]);

  const fetchRejectedLeaves = () => {
    axios.get("/api/leave/status/rejected")
      .then((res) => {
        setRejectedData(res.data);
      })
      .catch((err) => {
        console.error("Error fetching rejected leaves:", err);
      });
  };

  useEffect(() => {
    fetchRejectedLeaves();
  }, []);

  return (
    <div className="rejected-container">
      <h2>Rejected List</h2>
      <button onClick={fetchRejectedLeaves} className="refresh-btn">Refresh</button>
      <table className="rejected-table">
        <thead>
          <tr>
            <th>Profile</th>
            <th>Name</th>
            <th>Email</th>
            <th>Leave Type</th>
            <th>Leave Duration (Days)</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {rejectedData.length > 0 ? (
            rejectedData.map((entry) => (
              <tr key={entry._id}>
                <td data-label="Profile">
                  <img
                    src={entry.profilePic || "https://via.placeholder.com/150"}
                    alt={entry.name}
                    className="profile-pic"
                  />
                </td>
                <td data-label="Name">{entry.name}</td>
                <td data-label="Email">{entry.email}</td>
                <td data-label="Leave Type">{entry.leaveType}</td>
                <td data-label="Leave Duration">
                  {Math.ceil((new Date(entry.endDate) - new Date(entry.startDate)) / (1000 * 60 * 60 * 24)) + 1}
                </td>
                <td data-label="Status">
                  <span className="RejectedStatus">{entry.status}</span>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" style={{ textAlign: "center" }}>
                No Data Available
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Rejected;
