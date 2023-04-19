import './App.css';
import HomePage from './components/homepage/HomePage';
import HomePageorg from './components/homepageorg/HomePageorg';
import Login from './components/login/login';
import Register from './components/register/register';
import RegisterOrg from './components/registerorg/registerorg';
import Loginorg from './components/loginorg/loginorg';
import AddEventForm from './components/addEvent/AddEventForm';
import BrowseEvents from './components/browseEvents/EventsList';
import Home from "./components/home/home"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React from 'react';

function App() {
  const [user, setUser] = React.useState({})

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/homepage"
            element={user && user._id && user.role === "volunteer" ? <HomePage user={user} onLogout={() => setUser({})} /> : <Login setLoginUser={setUser} />}
          ></Route>
          <Route path="/homepageorg"
            element={user && user._id && user.role === "organisation" ? <HomePageorg user={user} onLogout={() => setUser({})} /> : <Loginorg setLoginUser={setUser} />}
          ></Route>
          <Route path="/add-event"
            element={user && user._id && user.role === "organisation" ? <AddEventForm /> : <Loginorg setLoginUser={setUser} />}
          ></Route>


          <Route path="/login" element={<Login setLoginUser={setUser} />} />
          <Route path="/loginorg" element={<Loginorg setLoginUser={setUser} />} />
          <Route path="/register" element={<Register />} />
          <Route path="/registerorg" element={<RegisterOrg />} />
          <Route path="/browse-events" element={<BrowseEvents />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;