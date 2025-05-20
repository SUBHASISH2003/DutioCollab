import React, { useEffect, useState } from 'react';
import '../../../css/ManagerDash/Accepted.css';
import axios from '../../../config/axiosConfig';

const Accepted = () => {
  const [acceptedLeaves, setAcceptedLeaves] = useState([]);

  const fetchAcceptedLeaves = () => {
    axios.get("/api/leave/status/approved")
      .then((res) => {
        setAcceptedLeaves(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchAcceptedLeaves();
  }, []);

  return (
    <div className="accepted-container">
      <h2>Accepted Leave Requests</h2>
      <button onClick={fetchAcceptedLeaves} className="refresh-btn">Refresh</button>
      <table className="accepted-table">
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
          {acceptedLeaves.length > 0 ? (
            acceptedLeaves.map((leave) => (
              <tr key={leave._id}>
                <td data-label="Profile">
                  <img src={leave.profilePic || "https://via.placeholder.com/150"} alt={leave.name} className="profile-pic" />
                </td>
                <td data-label="Name">{leave.name}</td>
                <td data-label="Email">{leave.email}</td>
                <td data-label="Leave Type">{leave.leaveType}</td>
                <td data-label="Leave Duration">
                  {Math.ceil((new Date(leave.endDate) - new Date(leave.startDate)) / (1000 * 60 * 60 * 24)) + 1}
                </td>
                <td data-label="Status" className="MngAcceptedStatus">{leave.status}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" style={{ textAlign: 'center' }}>No data Available</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Accepted;
