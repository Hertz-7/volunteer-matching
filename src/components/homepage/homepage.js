import React from 'react';
import "./homepage.css";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
    const navigate = useNavigate();
    return (
        <div className="homepage">
            <h1>Hello homepage</h1>
            <div className='button' onClick={()=> navigate("/login")} >Logout</div>
        </div>
    )
}

export default HomePage;