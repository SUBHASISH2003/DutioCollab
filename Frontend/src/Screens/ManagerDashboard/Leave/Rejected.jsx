import React, { useState, useEffect } from 'react';
import '../../../css/ManagerDash/Rejected.css';

const Rejected = () => {
  const [rejectedData, setRejectedData] = useState([]);

  useEffect(() => {
    // Mock API call or fetch from your backend
    const data = [
      {
        id: 1,
        name: "John Doe",
        status: "Rejected",
        profilePic: 'https://randomuser.me/api/portraits/men/56.jpg',
        email: "john.doe@example.com",
        leaveType: "Sick leave",
        leaveDuration: 5
      },
      {
        id: 2,
        name: "Jane Smith",
        status: "Rejected",
        profilePic: 'https://randomuser.me/api/portraits/men/56.jpg',
        email: "jane.smith@example.com",
        leaveType: "Vacation",
        leaveDuration: 10
      },
      {
        id: 3,
        name: "Sam Johnson",
        status: "Rejected",
        profilePic: 'https://randomuser.me/api/portraits/men/56.jpg',
        email: "sam.johnson@example.com",
        leaveType: "Casual leave",
        leaveDuration: 3
      },
      {
        id: 4,
        name: "Alice Brown",
        status: "Rejected",
        profilePic: 'https://randomuser.me/api/portraits/men/56.jpg',
        email: "alice.brown@example.com",
        leaveType: "Maternity leave",
        leaveDuration: 30
      }
    ];
    setRejectedData(data);
  }, []);

  return (
    <div className="rejected-container">
      <h2>Rejected List</h2>
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
          {rejectedData.map((entry) => (
            <tr key={entry.id}>
              <td data-label="Profile">
                <img src={entry.profilePic} alt={entry.name} className="profile-pic" />
              </td>
              <td data-label="Name">{entry.name}</td>
              <td data-label="Email">{entry.email}</td>
              <td data-label="Leave Type">{entry.leaveType}</td>
              <td data-label="Leave Duration">{entry.leaveDuration}</td>
              <td data-label="Status">
                <span className="RejectedStatus">{entry.status}</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Rejected;
