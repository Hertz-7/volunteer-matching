import React,{useState} from 'react';
import "./registerorg.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const RegisterOrg = () => {
    const navigate = useNavigate();
    const [user,setUser] = useState({
        name:'',
        email:'',
        country:'',
        city:'',
        password:'',
        reEnterPassword:''
    });


    const handleChange = e => {
        const {name,value} = e.target;
        setUser({
            
                ...user, //...spread operator
                [name]:value,
          
        })


    }
    const registerorg = () => {
        const { name, email, country, city, password, reEnterPassword } = user;
        if (name && email && country && city && password && reEnterPassword) {
            if (password === reEnterPassword) {
               // alert("Registered Successfully")
                axios.post("http://localhost:9002/registerorg", user)
                .then(res => alert(res.data))
            } else {
                alert("Password does not match")
            }
        }else {
            alert("invalid input")
        }
        
    }
    return (
        <div className='registerorg'>
        <h1>Organisation Signup</h1>
        <input type="text"  name="name" value={user.name} placeholder="Enter your Organisation's Name" onChange={handleChange}></input>
        <input type="text"  name="email" value={user.email} placeholder="Enter your work Email" onChange={handleChange}></input>
        <input type="text"  name="country" value={user.country} placeholder="Enter your Country" onChange={handleChange}></input>
        <input type="text"  name="city" value={user.city} placeholder="Enter your City" onChange={handleChange}></input> 
        <input type="password" name="password" value={user.password}  placeholder="Enter your Password" onChange={handleChange}></input>
        <input type="password" name="reEnterPassword" value={user.reEnterPassword}  placeholder="Re-enter your Password" onChange={handleChange}></input>
        <div className='button' onClick={registerorg}>Signup</div>
        <div>or</div>
        <div className='button' onClick={()=> navigate('/loginorg')}>Login</div>
    </div>
    )
}

export default RegisterOrg;