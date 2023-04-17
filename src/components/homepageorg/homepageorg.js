import React from 'react';
import "./homepageorg.css";
import { useNavigate } from "react-router-dom";

const HomePageorg = () => {
    const navigate = useNavigate();
    return (
        <div className="homepage">
            <h1>Hello homepage org</h1>
            <div className='button' onClick={()=> navigate("/login")} >Logout</div>
        </div>
    )
}

export default HomePageorg;