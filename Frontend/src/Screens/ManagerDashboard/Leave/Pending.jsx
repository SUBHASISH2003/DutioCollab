import React, { useState, useEffect } from "react";
import "../../../css/ManagerDash/Pending.css";
import axios from '../../../config/axiosConfig';

const Pending = () => {
  const [leaveRequests, setLeaveRequests] = useState([]);
  const [accpetStatus, setAccpetStatus] = useState("Accept");
  const [rejectStatus, setRejectStatus] = useState("Reject");
  
  const LeaveAccept = (e)=>{
    const ApproveId = e.target.value;
    console.log(ApproveId)
    axios.patch(`/api/leave/status/update/${ApproveId}`,{
      status:"approved"
    })
    .then((res)=>{
      console.log(res)
      setAccpetStatus("Accepted")
    })
    .catch((err)=>{
      console.log(err)
    })
  }
  const LeaveReject = (e)=>{
    const RejectId = e.target.value
    console.log(RejectId)
    axios.patch(`/api/leave/status/update/${RejectId}`,{
      status:"rejected"
    })
    .then((res)=>{
      console.log(res)
      setRejectStatus("Rejected")
    })
    .catch((err)=>{
      console.log(err)
    })
  }
  useEffect(() => {
    axios.get("/api/leave/status/pending")
      .then((res) => {
        setLeaveRequests(res.data);
      })
      .catch((err) => {
        console.error("Error fetching leave requests:", err);
      });
  },[]);

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
              <button className="manager-accept-btn" value={request._id} onClick={LeaveAccept}>{accpetStatus}</button>
              <button className="manager-reject-btn" value={request._id} onClick={LeaveReject}>{rejectStatus}</button>
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
