import React, { useEffect, useState } from "react";
import "../../../css/EmployeeDash/LeaveAccepted.css";
import axios from "../../../config/axiosConfig";

const calculateTotalDays = (start, end) => {
  const startDate = new Date(start);
  const endDate = new Date(end);
  const timeDiff = endDate - startDate;
  return Math.max(Math.ceil(timeDiff / (1000 * 60 * 60 * 24)) + 1, 1); // Ensure at least 1 day
};

const EmpAccepted = () => {
  const [leaveRequests, setLeaveRequests] = useState([]);

  useEffect(() => {
    axios
      .get("/api/leave/status/approved")
      .then((res) => {
        setLeaveRequests(res.data);
      })
      .catch((err) => {
        console.error("Error fetching accepted leave requests:", err);
      });
  }, []);

  return (
    <div className="emp-accepted-container">
      <h2 className="emp-accepted-title">Accepted Leave Requests</h2>
      <div className="emp-accepted-cards">
        {leaveRequests.length > 0 ? (
          leaveRequests.map((leave, index) => (
            <div key={index} className="emp-accepted-leave-card">
              <div className="emp-accepted-card-content">
                <div className="emp-accepted-header">
                  <h3 className="emp-accepted-leave-type">{leave.leaveType}</h3>
                  <span className="emp-accepted-status accepted">{leave.status}</span>
                </div>
                <p className="emp-accepted-description">{leave.leaveDescription}</p>
                <div className="emp-accepted-date-container">
                  <div className="emp-accepted-date">
                    <span className="emp-accepted-to-text">From:</span>
                    <span>{new Date(leave.startDate).toISOString().split("T")[0]}</span>
                  </div>
                  <div className="emp-accepted-date">
                    <span className="emp-accepted-to-text">To:</span>
                    <span>{new Date(leave.endDate).toISOString().split("T")[0]}</span>
                  </div>
                  <div className="emp-accepted-total-days">
                    <span>Total Days:</span>
                    <span>{calculateTotalDays(leave.startDate, leave.endDate)}</span>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No accepted leave requests.</p>
        )}
      </div>
    </div>
  );
};

export default EmpAccepted;
