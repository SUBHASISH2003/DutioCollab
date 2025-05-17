import React, { useEffect, useState } from 'react';
import MainNav from '../../../Components/NavBar/MainNav';
import '../../../css/EmployeeDash/Room.css';
import axios from '../../../config/axiosConfig'

const EmployeeRoom = () => {
  const [roomData, setRoomData] = useState(null);  // Initialize with null to prevent accessing undefined

  useEffect(() => {
    const linkedRoom = localStorage.getItem('LinkedRoom');
    console.log(linkedRoom); // Check if linkedRoom exists and is correct

    if (linkedRoom) {
      axios.get(`/api/user/room/details/${linkedRoom}`)
        .then((res) => {
          setRoomData(res.data.data);  // Set the fetched room data
          console.log(res.data.data);  // Log the fetched room data to check its structure
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      console.log('No linked room found.');
    }
  }, []);

  if (!roomData) {
    return <div>Loading...</div>;  // Show loading state if roomData is still null
  }

  return (
    <div className="employee-room">
      <MainNav />

      {/* Manager Section */}
      <div className="manager-section">
        <h2>Manager</h2>
        <div className="manager-card">
          <img src={roomData.manager.profilePic} alt={roomData.manager.name} className="profile-pic" />
          <div className="manager-details">
            <h3>{roomData.manager.name}</h3>
            <p>Email: {roomData.manager.email}</p>
            <p>Age: {roomData.manager.age}</p>
            <p>Organization: {roomData.manager.organizationName}</p>
          </div>
        </div>
      </div>

      {/* Employees Section */}
      <div className="employees-section">
        <h2>Employees</h2>
        <div className="employees-list">
          {roomData.employees.map((employee, index) => (
            <div key={index} className="employee-card">
              <img src={employee.profilePic} alt={employee.name} className="profile-pic" />
              <div className="employee-details">
                <h3>{employee.name}</h3>
                <p>Email: {employee.email}</p>
                <p>Age: {employee.age}</p>
                {/* <p>Organization: {employee.organizationName}</p> */}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EmployeeRoom;
