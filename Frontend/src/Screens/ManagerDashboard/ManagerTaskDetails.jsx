import React, { useEffect, useState } from "react";
import '../../css/ManagerDash/ManagerTaskDetails.css'
import { useNavigate } from "react-router-dom";
import axios from '../../config/axiosConfig.jsx'


const ManagerTaskDetails = () => {
  const navigate = useNavigate()
  const HandleDetails = ()=>{
    navigate('/manager/task/details')
  }
  const [tasks, setTasks] = useState([])
  useEffect(() => {
    axios.get('/api/task/get')
    .then((res)=>{
      setTasks(res.data)
    })
    .catch((error)=>{
      console.log(error)
    })
  }, [tasks])
  
  return (
    <div className="task-container">
      <h2 className="task-title">Recent Manager Tasks</h2>
      <table className="task-table">
        <thead>
          <tr>
            <th>Task Name</th>
            <th>Creation Time</th>
            <th>Total Employees Assigned</th>
            <th>Details</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => (
            <tr key={task._id}>
              <td>{task.taskType}</td>
              <td>{task.createdAt}</td>
              <td>{task.assignedEmployees.length}</td>
              <td>
                <button className="details-button" onClick={HandleDetails}>view details</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManagerTaskDetails;
