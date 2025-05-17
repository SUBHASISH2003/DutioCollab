import React, { useEffect, useState } from "react";
import "../../../css/EmployeeDash/EmpPendingLeave.css";
import EmpCreate from "./EmpCreate";
import axios from "../../../config/axiosConfig";

const LeaveCard = ({ leaveType, description, totalDays, startDate, endDate }) => {
  return (
    <div className="leave-card">
      <div className="card-content">
        <div className="header">
          <h2 className="leave-type">{leaveType}</h2>
          <span className="status">Pending</span>
        </div>
        <p className="description">{description}</p>
        <div className="date-container">
          <div className="date">
            <span className="icon">📅</span>
            <span>{startDate}</span>
          </div>
          <span className="to-text">to</span>
          <div className="date">
            <span className="icon">📅</span>
            <span>{endDate}</span>
          </div>
        </div>
        <div className="total-days">
          <span className="icon">⏳</span>
          <span>{totalDays} Days</span>
        </div>
      </div>
    </div>
  );
};

const EmpPending = () => {
  const [leaveData, setLeaveData] = useState([])
useEffect(() => {
  axios.get("/api/leave/status/pending")
  .then((res)=>{
    setLeaveData(res.data)
  })
  .catch((err)=>{
    console.log(err)
  })
},[])
const calculateTotalDays = (start, end) => {
  const startDate = new Date(start);
  const endDate = new Date(end);
  const differenceInTime = endDate - startDate;
  return Math.ceil(differenceInTime / (1000 * 60 * 60 * 24)) + 1; // Including the start day
};

  return (
    <div className="emp-pending-container">
      <EmpCreate/>
      <div className="EmpPendingCardCon">
        
      {leaveData.length > 0 ? (
          leaveData.map((leave, index) => (
            <LeaveCard 
              key={index} 
              leaveType={leave.leaveType} 
              description={leave.leaveDescription} 
              totalDays={calculateTotalDays(leave.startDate, leave.endDate)} 
              startDate={ new Date(leave.startDate).toISOString().split("T")[0]} 
              endDate={new Date(leave.endDate).toISOString().split("T")[0]} 
            />
          ))
        ) : (
          <p>No pending leave requests.</p>
        )}
      </div>
    </div>
  );
};

export default EmpPending;
