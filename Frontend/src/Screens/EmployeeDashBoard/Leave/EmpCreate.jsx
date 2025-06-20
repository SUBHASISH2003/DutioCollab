import React, { useState } from "react";
import "../../../css/EmployeeDash/LeaveCreate.css";
import axios from '../../../config/axiosConfig'
const EmpCreate = () => {
  const [leaveType, setLeaveType] = useState("");
  const [leaveDescription, setLeaveDescription] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [timePeriod, setTimePeriod] = useState("");

  const handleLeaveTypeChange = (e) => setLeaveType(e.target.value);
  const handleDescriptionChange = (e) => setLeaveDescription(e.target.value);
  const handleStartDateChange = (e) => {
    setStartDate(e.target.value);
    calculateDays(e.target.value, endDate);
  };
  const handleEndDateChange = (e) => {
    setEndDate(e.target.value);
    calculateDays(startDate, e.target.value);
  };

  const calculateDays = (start, end) => {
    if (start && end) {
      const startD = new Date(start);
      const endD = new Date(end);
      const diffTime = Math.abs(endD - startD);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      setTimePeriod(diffDays);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('/api/leave/create',{
      leaveType,
      leaveDescription,
      startDate,
      endDate
    })
    .then((res)=>{
      console.log(res)
    })
    .catch((err)=>{
      console.log(err)
    })
    setLeaveType("");
    setLeaveDescription("");
    setStartDate("");
    setEndDate("")
  };

  return (
    <div className="leave-request-container">
      <h2>Request Leave</h2>
      <form onSubmit={handleSubmit} className="leave-request-form">
        <div className="leave-form-group">
          <label>Leave Type</label>
          <select name="leaveType" value={leaveType} onChange={handleLeaveTypeChange} required>
            <option value="">Select Leave Type</option>
            <option value="Sick Leave">Sick Leave</option>
            <option value="Casual Leave">Casual Leave</option>
            <option value="Family Leave">Family Leave</option>
            <option value="Paternity Leave">Paternity Leave</option>
            <option value="Maternity Leave">Maternity Leave</option>
          </select>
        </div>

        <div className="leave-form-group">
          <label>Leave Description</label>
          <textarea name="description" value={leaveDescription} onChange={handleDescriptionChange} required></textarea>
        </div>

        <div className="leave-form-group">
          <label>Start Date</label>
          <input type="date" name="startDate" value={startDate} onChange={handleStartDateChange} required />
        </div>

        <div className="leave-form-group">
          <label>End Date</label>
          <input type="date" name="endDate" value={endDate} onChange={handleEndDateChange} required />
        </div>

        <div className="leave-form-group">
          <label>Time Period (Days)</label>
          <input type="number" name="timePeriod" value={timePeriod} disabled />
        </div>

        <button type="submit" className="leave-submit-btn">Submit</button>
      </form>
    </div>
  );
};

export default EmpCreate;
