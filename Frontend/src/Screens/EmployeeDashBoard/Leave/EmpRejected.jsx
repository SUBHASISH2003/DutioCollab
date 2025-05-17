import React, { useEffect, useState } from "react";
import "../../../css/EmployeeDash/LeaveRejected.css";
import axios from "../../../config/axiosConfig";

const calculateTotalDays = (start, end) => {
  const startDate = new Date(start);
  const endDate = new Date(end);
  const timeDiff = endDate - startDate;
  return Math.max(Math.ceil(timeDiff / (1000 * 60 * 60 * 24)) + 1, 1); // Ensure at least 1 day
};

const EmpRejected = () => {
  const [leaveRequests, setLeaveRequests] = useState([]);

  useEffect(() => {
    axios
      .get("/api/leave/status/rejected")
      .then((res) => {
        setLeaveRequests(res.data);
      })
      .catch((err) => {
        console.error("Error fetching rejected leave requests:", err);
      });
  }, []);

  return (
    <div className="emp-rejected-container">
      <h2 className="emp-rejected-title">Rejected Leave Requests</h2>
      <div className="emp-rejected-cards">
        {leaveRequests.length > 0 ? (
          leaveRequests.map((leave, index) => (
            <div key={index} className="emp-rejected-leave-card">
              <div className="emp-rejected-card-content">
                <div className="emp-rejected-header">
                  <h3 className="emp-rejected-leave-type">{leave.leaveType}</h3>
                  <span className="emp-rejected-status rejected">{leave.status}</span>
                </div>
                <p className="emp-rejected-description">{leave.leaveDescription}</p>
                <div className="emp-rejected-date-container">
                  <div className="emp-rejected-date">
                    <span className="emp-rejected-to-text">From:</span>
                    <span>{new Date(leave.startDate).toISOString().split("T")[0]}</span>
                  </div>
                  <div className="emp-rejected-date">
                    <span className="emp-rejected-to-text">To:</span>
                    <span>{new Date(leave.endDate).toISOString().split("T")[0]}</span>
                  </div>
                  <div className="emp-rejected-total-days">
                    <span>Total Days:</span>
                    <span>{calculateTotalDays(leave.startDate, leave.endDate)}</span>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No rejected leave requests.</p>
        )}
      </div>
    </div>
  );
};

export default EmpRejected;
