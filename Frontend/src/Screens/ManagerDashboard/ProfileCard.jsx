import React, { useState, useEffect } from 'react';
import '../../css/ManagerDash/Profile.css';
import axios from '../../config/axiosConfig.jsx'
const ProfileCard =() => {
  const [profileData, setProfileData] = useState(null);

     useEffect(() => {
        axios.get('/api/user/me')
        .then((response)=>{
            const user = response.data.user;
            console.log(user)
            setProfileData(user)
        })
        .catch((error)=>{
            console.log(error);
        })
     }, [])
     

    // Simulate fetching data
    

  if (!profileData) {
    return <div className="loading">Loading profile...</div>;
  }

  const { name, age,bio, email, managerKey, members, organizationName, profilePic } = profileData;

  return (
    <div className="profile-card">
      <div className="profile-header">
        <img src={profilePic} alt={`${name}'s profile`} className="profile-pic" />
        <div className="profile-info">
          <h2 className="name">{name}</h2>
          <p className="age">Age: {age}</p>
          <p>Email: {email}</p>
          <p className="organization">{organizationName}</p>
        </div>
      </div>
      <div className="profile-details">
        <p className="bio">{bio}</p>
        {/* <p className="members">Room Members: {members}</p>
        <p className="room-key">
          Room Key: <span className="highlight">{managerKey}</span>
        </p> */}
      </div>
      <button>Edit</button>
    </div>
  );
};

export default ProfileCard;
