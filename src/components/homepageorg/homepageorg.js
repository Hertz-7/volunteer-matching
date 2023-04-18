import React from 'react';
import './HomePageorg.css';
import { useNavigate } from 'react-router-dom';


const HomePageorg = ({ user, onLogout }) => {
  const handleLogout = () => {
    onLogout();
  };

  const navigate = useNavigate();


  const changePage = (path) => {
    // Check if the user is authenticated and logged in
    // If not, redirect to the login page
    console.log(path)
    if (!user || !user._id) {
      navigate('/loginorg');
      return;
    }
    
    // Navigate to the specified path
    navigate(path, {state: user});
  };

  return (
    <div className="homepageorg-container">
      <header className="homepageorg-header">
        <h1 className="homepageorg-title">Welcome, {user.name}</h1>
        <div className="homepageorg-buttons">
          <button onClick={() => changePage("/add-event")} className="add-event-button">
            
            Add Event
          </button>
          <button onClick={handleLogout} className="logout-button">
            Log Out
          </button>
        </div>
      </header>

      <section className="profile-details">
        <h2 className="profile-details-title">Profile Details</h2>
        <div className="profile-details-container">
          <div className="profile-detail">
            <span className="detail-label">Organization Name:</span>
            <span className="detail-value">{user.name}</span>
          </div>
          <div className="profile-detail">
            <span className="detail-label">Email:</span>
            <span className="detail-value">{user.email}</span>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePageorg;