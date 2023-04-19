import React,{useState} from 'react';
import "./loginorg.css";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
    
const Loginorg = ({setLoginUser}) => {
    const navigate = useNavigate();
    const [user,setUser] = useState({
        email:'',
        password:''
     
    });

    const handleChange = e => {
        const {name,value} = e.target;
        setUser({
            
                ...user, //...spread operator
                [name]:value,
        
        })

    }
    const handleBack = () => {
        window.history.back();
    };
    const login =()=>{
        axios.post("http://localhost:9002/loginorg",user)
        .then(res => {alert(res.data.message)
            setLoginUser(res.data.organisation)
            navigate("/homepageorg")})
    }
    return (
        <div className='login'>
            <h1>Login Organisation<button className="back-button" onClick={handleBack}>Back</button>
            </h1>
            <input type="text"  name="email" value={user.email}   placeholder="Enter your Email" onChange={handleChange}></input> 
            <input type="password"  name="password" value={user.password}  placeholder="Enter your Password" onChange={handleChange}></input>
            <div className='button' onClick={login}>Login</div>
            <div>or</div>
            <div className='button' onClick={()=> navigate('/registerorg')}>Signup</div>
        </div>
    )
}

export default Loginorg;