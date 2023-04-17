
import './App.css';
import HomePage from './components/homepage/homepage';
import HomePageorg from './components/homepageorg/homepageorg';
import Login from './components/login/login';
import Register from './components/register/register';
import RegisterOrg from './components/registerorg/registerorg';
import Loginorg from './components/loginorg/loginorg';
import { BrowserRouter as Router,Routes, Route } from "react-router-dom";
import React from 'react';
function App() {
  const [user,setUser] = React.useState({})
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route  path="/homepage" 
            element={ user && user._id && user.role === "volunteer" ? <HomePage/> : <Login setLoginUser={setUser} />}
           ></Route>
           <Route  path="/homepageorg" 
            element={ user && user._id && user.role === "organisation" ? <HomePageorg/> : <Loginorg setLoginUser={setUser} />}
           ></Route>
          <Route  path="/login" element={<Login setLoginUser={setUser}/>}></Route>
          <Route  path="/loginorg" element={<Loginorg setLoginUser={setUser}/>}></Route>
          <Route  path="/register"  element={<Register/>}></Route>
          <Route  path="/registerorg" element={<RegisterOrg/>}></Route>
        </Routes>
      </Router>
      {/* <HomePage/>
      <Login />
      <Loginorg/>
      <Register />
      <RegisterOrg /> */}
    </div>
  );
}

export default App;
