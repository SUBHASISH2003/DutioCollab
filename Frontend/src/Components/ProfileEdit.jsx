import React, { useState, useEffect, useContext } from "react";
import axios from "../config/axiosConfig";
import { useLocation, useNavigate } from "react-router-dom";
import profile from "../assets/Images/profile.png";
import "../css/Profile/ProfileEdit.css";
import { UserContext } from "../context/UserContextProvider";

const ProfileEdit = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext);

  const [bio, setBio] = useState("");
  const [profilePic, setProfilePic] = useState(null);
  const [file, setFile] = useState(null);
  const [orgName, setOrgName] = useState("");
  const [role, setRole] = useState("");

  const [errors, setErrors] = useState({
    bio: "",
    file: "",
    orgName: "",
    server: "",
  });

  useEffect(() => {
    axios
      .get("/api/user/me")
      .then((res) => {
        const userData = res.data.user;
        setBio(userData.bio || "");
        setProfilePic(userData.profilePic || profile);
        setOrgName(userData.organizationName || "");
        setRole(userData.role || "");
      })
      .catch((error) => {
        console.error("Error fetching profile:", error);
        setErrors(prev => ({ ...prev, server: "Failed to load profile data." }));
      });
  }, []);

  const handleBioChange = (e) => {
    setBio(e.target.value);
    if (e.target.value.trim() !== "") {
      setErrors(prev => ({ ...prev, bio: "" }));
    }
  };

  const handleProfilePicChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      if (!selectedFile.type.startsWith("image/")) {
        setErrors(prev => ({ ...prev, file: "Please upload a valid image file." }));
        return;
      }
      setErrors(prev => ({ ...prev, file: "" }));
      setFile(selectedFile);
      setProfilePic(URL.createObjectURL(selectedFile));
    }
  };

  const handleSave = async () => {
    let validationErrors = {};

    if (!bio.trim()) {
      validationErrors.bio = "Bio cannot be empty.";
    }

    if (role === "Manager" && !orgName.trim()) {
      validationErrors.orgName = "Organization name is required for managers.";
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(prev => ({ ...prev, ...validationErrors }));
      return;
    }

    const formData = new FormData();
    formData.append("bio", bio);
    if (file) formData.append("profilePic", file);
    if (role === "Manager") {
      formData.append("organizationName", orgName);
    }

    try {
      const res = await axios.put("/api/user/update-profile", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setUser(res.data.user);
      navigate(`/${role}/dashboard`);
    } catch (error) {
      console.error("Error updating profile", error);
      setErrors(prev => ({
        ...prev,
        server:
          error.response?.data?.message || "An unexpected error occurred. Please try again.",
      }));
    }
  };

  return (
    <div className="profile-edit-container">
      <h2 className="profile-edit-title">Edit Profile</h2>

      <div className="profile-pic-container">
        <img src={profilePic || profile} alt="Profile" className="profile-pic" />
        <input type="file" name="profilePic" accept="image/*" onChange={handleProfilePicChange} />
        {errors.file && <p className="error-text">{errors.file}</p>}
      </div>

      <div className="bio-container">
        <textarea
          value={bio}
          onChange={handleBioChange}
          className="bio-textarea"
          placeholder="Write something about yourself..."
        />
        {errors.bio && <p className="error-text">{errors.bio}</p>}
      </div>

      <div className="OrgCon">
        <input
          type="text"
          disabled={role === "Employee"}
          value={orgName}
          onChange={(e) => {
            setOrgName(e.target.value);
            if (e.target.value.trim()) {
              setErrors(prev => ({ ...prev, orgName: "" }));
            }
          }}
          placeholder="Organization Name"
        />
        {errors.orgName && <p className="error-text">{errors.orgName}</p>}
      </div>

      <button className="save-button" onClick={handleSave}>
        Save Changes
      </button>

      {errors.server && <p className="error-text server-error">{errors.server}</p>}
    </div>
  );
};

export default ProfileEdit;
