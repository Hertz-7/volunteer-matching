import React from 'react';
import { Link } from 'react-router-dom';
import './home.css';

const Home = () => {
  return (
    <div className="home-container">
      <h1 className="home-title">Volunteer Matching</h1>
      <p className="home-description">
        Welcome to Volunteer Matching, a platform that connects volunteers with organizations in need of help.
      </p>
      <div className="home-buttons">
        <Link to="/loginorg" className="home-button organization-login">
          Organization Login
        </Link>
        <Link to="/login" className="home-button volunteer-login">
          Volunteer Login
        </Link>
      </div>
    </div>
  );
};

export default Home;
