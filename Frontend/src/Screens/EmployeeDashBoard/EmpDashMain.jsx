import React, { useState } from 'react';
import '../../css/EmployeeDash/EmployeeDash.css';
import MainNav from '../../Components/NavBar/MainNav';
import ProfileCard from '../../Components/ProfileCard';
import RecentTask from './RecentTask';
import Pending from './Pending';
import RejectedTask from './RejectedTask';
import FailedTask from './FailedTask';
import CompletedTask from './CompletedTask';
import axios from '../../config/axiosConfig'
import { useEffect } from 'react';
const EmpDashMain = () => {

  const [user, setUser] = useState({})
  useEffect(() => {
   axios.get('/api/user/me')
   .then((res)=>{
      setUser(res.data.user)
   })
   .catch((err)=>{
      console.log(err)
   })
  }, [])
  


  return (
    <div className="EmpDashMainCon">
      <MainNav />
      <div className="EmpContent">
        <ProfileCard />
        <div className="EmployeeDetails">
          <div className="DetailsBox">
            <h3>Task Assigned</h3>
            <p>{user.totalNoOfAssignTask}</p>
          </div>
          <div className="DetailsBox">
            <h3>Task Completed</h3>
            <p>{user.totalCompletedTasks}</p>
          </div>
          <div className="DetailsBox">
            <h3>Overall Performance</h3>
            <p>{user.performance}%</p>
          </div>
        </div>     
      </div>

      <RecentTask/>
      <Pending/>
      {/* <RejectedTask/> */}
      <FailedTask/>
      <CompletedTask/>
    </div>
  );
};

export default EmpDashMain;
