import React,{useState} from 'react';
import "./register.css";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
const Register = () => {
    const navigate = useNavigate();
    const [user,setUser] = useState({
        name:'',
        email:'',
        phone:'',
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
    const register = () => {
        const { name, email, phone, country, city, password, reEnterPassword } = user;
        if (name && email && phone && country && city && password && reEnterPassword) {
            if (password === reEnterPassword) {
                //alert("Registered Successfully")
                axios.post("http://localhost:9002/register", user)
                .then(res => alert(res.data))
            } else {
                alert("Password does not match")
            }
        }else {
            alert("invalid input")
        }
        
    }
    return (
        <div className='register'>
        <h1>Volunteer Signup</h1>
        <input type="text"  name="name" value={user.name} placeholder="Enter your Name" onChange={handleChange}></input>
        <input type="text"  name="email" value={user.email} placeholder="Enter your Email" onChange={handleChange}></input>
        <input type="text"  name="phone" value={user.phone} placeholder="Enter your Phone" onChange={handleChange}></input>
        <input type="text"  name="country" value={user.country} placeholder="Enter your Country" onChange={handleChange}></input>
        <input type="text"  name="city" value={user.city} placeholder="Enter your City" onChange={handleChange}></input> 
        <input type="password" name="password" value={user.password}  placeholder="Enter your Password" onChange={handleChange}></input>
        <input type="password" name="reEnterPassword" value={user.reEnterPassword}  placeholder="Re-enter your Password" onChange={handleChange}></input>
        <div className='button' onClick={register}>Signup</div>
        <div>or</div>
        <div className='button' onClick={()=> navigate('/login')}>Login</div>
    </div>
    )
}

export default Register;