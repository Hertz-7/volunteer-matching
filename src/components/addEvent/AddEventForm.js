import React, { useState } from 'react';
import './AddEventForm.css';
import axios from "axios"
import { useLocation } from 'react-router-dom';


const AddEventForm = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [location, setLocation] = useState('');
  const [numVolunteers, setNumVolunteers] = useState('');
  const [roles, setRoles] = useState([{ role: '', skills: '' }]);
  const loc = useLocation();
  const user = loc.state
  const companyId = loc.state._id



  const handleSubmit = async (event) => {
    event.preventDefault();
    
    const eventData = {
      title,
      description,
      date,
      time,
      location,
      numVolunteers,
      companyId,
      roles,
    };
    
    axios.post("http://localhost:9002/add-event", eventData)
    .then(res => {
      const confirmMessage = "Event added: " + title.toString();
      const confirmed = window.confirm(confirmMessage);
      if (confirmed) {
        window.history.back();
      }
    })
    .catch (err => {
      console.log(err);
    })
  };

  const handleLeave = () => {
    // Navigate back to the previous page
    window.history.back();
  };

  const addRole = () => {
    console.log(user)
    setRoles([...roles, { role: '', skills: '' }]);
  };

  const handleRoleChange = (e, index) => {
    
    const updatedRoles = [...roles];
    updatedRoles[index][e.target.name] = e.target.value;
    setRoles(updatedRoles);
  };

  return (
    <div className="add-event-container">
      <div className="leave-button-container">
        <button className="leave-button" onClick={handleLeave}>Leave</button>
      </div>
      <h2 className="add-event-heading">Add Event</h2>
      <form className="add-event-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title" className="form-label">Event Title</label>
          <input type="text" id="title" className="form-input" value={title} onChange={e => setTitle(e.target.value)} required />
        </div>
        <div className="form-group">
          <label htmlFor="description" className="form-label">Description</label>
          <textarea id="description" className="form-input" value={description} onChange={e => setDescription(e.target.value)} required />
        </div>
        <div className="form-group">
          <label htmlFor="date" className="form-label">Date</label>
          <input type="date" id="date" className="form-input" value={date} onChange={e => setDate(e.target.value)} required />
        </div>
        <div className="form-group">
          <label htmlFor="time" className="form-label">Time</label>
          <input type="time" id="time" className="form-input" value={time} onChange={e => setTime(e.target.value)} required />
        </div>
        <div className="form-group">
          <label htmlFor="location" className="form-label">Location</label>
          <input type="text" id="location" className="form-input" value={location} onChange={e => setLocation(e.target.value)} required />
        </div>
        <div className="form-group">
          <label htmlFor="numVolunteers" className="form-label">Number of Volunteers</label>
          <input type="number" id="numVolunteers" className="form-input" value={numVolunteers} onChange={e => setNumVolunteers(e.target.value)} required />
        </div>
        {roles.map((role, index) => (
          <div key={index} className="form-group role-group">
            <label htmlFor={`role-${index}`} className="form-label">Role {index + 1}</label>
            <input type="text" id={`role-${index}`} name="role" className="form-input" value={role.role} onChange={e => handleRoleChange(e, index)} required />
            <label htmlFor={`skills-${index}`} className="form-label">Required Skills</label>
            <input type="text" id={`skills-${index}`} name="skills" className="form-input" value={role.skills} onChange={e =>          handleRoleChange(e, index)} required />
      </div>
    ))}
    <button className="add-role-button" type="button" onClick={addRole}>Add Role</button>
    <button className="form-submit-button" type="submit">Submit</button>
    </form>
    </div>
  );
  
};
export default AddEventForm;



