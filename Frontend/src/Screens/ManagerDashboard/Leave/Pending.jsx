import React, { useState, useEffect } from "react";
import "../../../css/ManagerDash/Pending.css";
import axios from '../../../config/axiosConfig';

const Pending = () => {
  const [leaveRequests, setLeaveRequests] = useState([]);

  const updateStatus = (id, status) => {
    axios.patch(`/api/leave/status/update/${id}`, { status })
      .then((res) => {
        setLeaveRequests(prev =>
          prev.map(req =>
            req._id === id ? { ...req, status } : req
          )
        );
      })
      .catch((err) => {
        console.error(`Error updating status:`, err);
      });
  };

  const handleAccept = (id) => updateStatus(id, "approved");
  const handleReject = (id) => updateStatus(id, "rejected");

  useEffect(() => {
    axios.get("/api/leave/status/pending")
      .then((res) => {
        setLeaveRequests(res.data);
      })
      .catch((err) => {
        console.error("Error fetching leave requests:", err);
      });
  }, []);

  return (
    <div className="manager-pending-container">
      {leaveRequests.length > 0 ? (
        leaveRequests.map((request) => (
          <div key={request._id} className="manager-leave-card">
            <div className="manager-employee-info">
              <img 
                src={request.profilePic || "https://via.placeholder.com/150"} 
                alt="Employee" 
                className="manager-profile-pic" 
              />
              <div className="manager-employee-details">
                <h3>{request.name}</h3>
                <p className="manager-leave-type">{request.leaveType}</p>
              </div>
            </div>
            <div className="manager-leave-details">
              <p className="manager-leave-description">{request.leaveDescription}</p>
              <p><strong>Start Date:</strong> {new Date(request.startDate).toLocaleDateString()}</p>
              <p><strong>End Date:</strong> {new Date(request.endDate).toLocaleDateString()}</p>
              <p>
                Total days: <strong>{Math.ceil((new Date(request.endDate) - new Date(request.startDate)) / (1000 * 60 * 60 * 24))}</strong>
              </p>
            </div>
            <div className="manager-action-buttons">
              <button
                className="manager-accept-btn"
                onClick={() => handleAccept(request._id)}
                disabled={request.status === "approved"}
              >
                {request.status === "approved" ? "Accepted" : "Accept"}
              </button>
              <button
                className="manager-reject-btn"
                onClick={() => handleReject(request._id)}
                disabled={request.status === "rejected"}
              >
                {request.status === "rejected" ? "Rejected" : "Reject"}
              </button>
            </div>
          </div>
        ))
      ) : (
        <p className="no-pending-requests">No pending leave requests.</p>
      )}
    </div>
  );
};

export default Pending;
