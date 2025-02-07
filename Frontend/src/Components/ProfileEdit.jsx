import React, { useState, useEffect ,useContext } from "react";
import axios from '../config/axiosConfig'
import { useLocation, useNavigate } from "react-router-dom";
import profile from '../assets/Images/profile.png'
import '../css/Profile/ProfileEdit.css'
import {UserContext} from '../context/UserContextProvider'

const ProfileEdit = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [bio, setBio] = useState("");
  const [profilePic, setProfilePic] = useState(null);
  const [file, setFile] = useState(null);
  const [orgName, setOrgName] = useState("")
  const [role, setRole] = useState("")
  useEffect(() => {
    axios.get('/api/user/me')
    .then((res)=>{
      console.log(res)
      setBio(res.data.user.bio)
      setProfilePic(res.data.user.profilePic)
      setOrgName(res.data.user.organizationName)
      setRole(res.data.user.role)
    })
    .catch((error)=>{
      console.log(error)
    })
  }, [])
  
  // Fetch existing profile data
  useEffect(() => {
    axios.get('/api/user/profile')
      .then((res) => {
        setBio(res.data.bio);
        setProfilePic(res.data.profilePic ? `${axios.defaults.baseURL}${res.data.profilePic}` : profile);
      })
      .catch((error) => console.error("Error fetching profile", error));
  }, []);

  const handleBioChange = (e) => {
    setBio(e.target.value);
  };

  const handleProfilePicChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setProfilePic(URL.createObjectURL(selectedFile)); // Show preview
    }
  };

  const handleSave = async () => {
    const formData = new FormData();
    formData.append("bio", bio);
    if (file) {
      formData.append("profilePic", file);
    }
    formData.append("organizationName",orgName)

    axios.put('/api/user/update-profile', formData, {
      headers: { "Content-Type": "multipart/form-data" }
    })
    .then((res) => {
      console.log(res);
      setProfilePic(`${axios.defaults.baseURL}${res.data.profilePic}`); // Update with actual image URL
      navigate(`/${role}/dashboard`);
    })
    .catch((error) => console.error("Error updating profile", error));
  };

  return (
    <div className="profile-edit-container">
      <h2 className="profile-edit-title">Edit Profile</h2>
      <div className="profile-pic-container">
        <img
          src={profilePic || profile}
          alt="Profile"
          className="profile-pic"
        />
        <input type="file" name="profilePic" accept="image/*" onChange={handleProfilePicChange} />
      </div>
      <div className="bio-container">
        <textarea
          value={bio}
          onChange={handleBioChange}
          className="bio-textarea"
        ></textarea>
      </div>
      <div className="OrgCon">
        <input type="text"
        disabled={location.pathname === '/Employee/profile/edit'}
          value={orgName}
          onChange={(e)=>{
            setOrgName(e.target.value)
          }}
         />
      </div>
      <button className="save-button" onClick={handleSave}>Save Changes</button>
    </div>
  );
};

export default ProfileEdit;
