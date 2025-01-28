import React, { useState } from 'react'
import '../../css/ManagerDash/DashBoard.css'
import MainNav from '../../Components/NavBar/MainNav'
import ProfileCard from './ProfileCard'
import CreateTask from '../../Screens/ManagerDashboard/CreateTask'
const ManagerDashMain = () => {

  return (
    <div className='DashBoardMainScreen'>
      <MainNav/>
      {/* <video src={bgVideo} autoPlay muted loop></video> */}
      <div className="DashContainer">
        <ProfileCard/>
        <div className="ManagerDetails">
          <div className="DetailsBox">
            <h3>Total Task</h3>
            <p>230</p>
          </div>
          <div className="DetailsBox">
            <h3>Room Members</h3>
            <p>12</p>
          </div>
          <div className="DetailsBox">
            <h3>Room Key</h3>
            <p>35840</p>
          </div>
        </div>

        <CreateTask/>
      </div>
    </div>
  )
}

export default ManagerDashMain