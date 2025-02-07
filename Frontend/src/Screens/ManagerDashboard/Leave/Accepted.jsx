import React from 'react';
import '../../../css/ManagerDash/Accepted.css';

const acceptedLeaves = [
  {
    id: 1,
    profilePic: 'https://randomuser.me/api/portraits/men/32.jpg',
    name: 'John Doe',
    email: 'john.doe@example.com',
    leaveType: 'Sick Leave',
    leaveDuration: 5, // in days
    status: 'Approved'
  },
  {
    id: 2,
    profilePic: 'https://randomuser.me/api/portraits/women/44.jpg',
    name: 'Jane Smith',
    email: 'jane.smith@example.com',
    leaveType: 'Casual Leave',
    leaveDuration: 3, // in days
    status: 'Approved'
  },
  {
    id: 3,
    profilePic: 'https://randomuser.me/api/portraits/men/56.jpg',
    name: 'Mike Johnson',
    email: 'mike.johnson@example.com',
    leaveType: 'Annual Leave',
    leaveDuration: 10, // in days
    status: 'Approved'
  }
];

const Accepted = () => {
  return (
    <div className="accepted-container">
      <h2>Accepted Leave Requests</h2>
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
          {acceptedLeaves.map((leave) => (
            <tr key={leave.id}>
              <td data-label="Profile">
                <img src={leave.profilePic} alt={leave.name} className="profile-pic" />
              </td>
              <td data-label="Name">{leave.name}</td>
              <td data-label="Email">{leave.email}</td>
              <td data-label="Leave Type">{leave.leaveType}</td>
              <td data-label="Leave Duration">{leave.leaveDuration}</td>
              <td data-label="Status" className="MngAcceptedStatus">{leave.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Accepted;
