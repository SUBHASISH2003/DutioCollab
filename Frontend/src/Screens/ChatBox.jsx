import React from 'react';
import MainNav from '../Components/NavBar/MainNav';
import '../css/NavBar/ChatBox.css';
import errorImg from '../assets/Images/404ErrorPageNotFound.png';

const ChatBox = () => {
  return (
    <>
      <div className="chatbox-container">
        <div className="chatbox-content">
          <img src={errorImg} alt="404 Error" className="error-img" />
          <h2 className="heading">This Page is Under Development</h2>
          <p className="message">We'll be ready to use it after the next update!</p>
          <button className="back-btn" onClick={() => window.history.back()}>Go Back</button>
        </div>
      </div>
    </>
  );
}

export default ChatBox;
