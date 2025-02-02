import React, { useState, useEffect } from "react";
import "../../../css/ManagerDash/Pending.css";

const Pending = () => {
  // Example JSON data (will be replaced with backend data via Axios)
  const [leaveRequests, setLeaveRequests] = useState([]);

  useEffect(() => {
    // Example JSON data
    const exampleData = [
      {
        id: 1,
        profilePic: "https://randomuser.me/api/portraits/men/1.jpg",
        name: "John Doe",
        leaveType: "Sick Leave",
        description: "Feeling unwell due to fever and cold.",
        days: 3,
        date: "2025-02-05",
      },
      {
        id: 2,
        profilePic: "https://randomuser.me/api/portraits/women/2.jpg",
        name: "Jane Smith",
        leaveType: "Casual Leave",
        description: "Family emergency, need urgent leave.",
        days: 2,
        date: "2025-02-10",
      },
    ];
    
    setLeaveRequests(exampleData);
  }, []);

  return (
    <div className="pending-container">
      {leaveRequests.map((request) => (
        <div key={request.id} className="leave-card">
          <div className="employee-info">
            <img src={request.profilePic} alt="Employee" className="profile-pic" />
            <div className="employee-details">
              <h3>{request.name}</h3>
              <p className="leave-type">{request.leaveType}</p>
            </div>
          </div>
          <div className="leave-details">
            <p className="leave-description">{request.description}</p>
            <p><strong>Days:</strong> {request.days}</p>
            <p><strong>Upto:</strong> {request.date}</p>
          </div>
          <div className="action-buttons">
            <button className="accept-btn">Accept</button>
            <button className="reject-btn">Reject</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Pending;
