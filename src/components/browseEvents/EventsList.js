import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './EventsList.css';

const EventsList = () => {
  const [events, setEvents] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchBy, setSearchBy] = useState('name');

  useEffect(() => {
    const fetchOrgsAndEvents = async () => {
      try {
        const [orgsResponse, eventsResponse] = await Promise.all([
          axios.get('/api/orgs'),
          axios.get('/api/events')
        ]);
        setCompanies(orgsResponse.data);
        setEvents(eventsResponse.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchOrgsAndEvents();
  }, []);

  const getCompanyName = (companyId) => {
    const company = companies.find((c) => c._id === companyId);
    return company ? company.name : '';
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchByChange = (e) => {
    setSearchBy(e.target.value);
  };

  const handleBack = () => {
    window.history.back();
  };

  const filteredEvents = events.filter((event) => {
    if (searchTerm.trim() === '') return false;
    const companyName = getCompanyName(event.companyId);
    if (searchBy === 'name') {
      return event.title.toLowerCase().includes(searchTerm.toLowerCase());
    } else if (searchBy === 'company') {
      return companyName.toLowerCase().includes(searchTerm.toLowerCase());
    }
    return true;
  });

  return (
    <div className="events-list-container">
      <div className="header">
        <h2 className="events-list-heading">Events</h2>
        <button className="back-button" onClick={handleBack}>Back</button>
      </div>
      <form className="search-form">
        <input
          type="text"
          className="search-input"
          placeholder={`Search by ${searchBy}`}
          value={searchTerm}
          onChange={handleSearchChange}
        />
        <select className="search-select" value={searchBy} onChange={handleSearchByChange}>
          <option value="name">Name</option>
          <option value="company">Company</option>
        </select>
      </form>
      <div className="results-container">
        <ul className="events-list">
          {filteredEvents.map((event) => (
            <li key={event._id} className="event-item">
              <h3 className="event-title">{event.title}</h3>
              <p className="event-company">Company: {getCompanyName(event.companyId)}</p>
              <p className="event-description">{event.description}</p>
              <p className="event-date">Date: {new Date(event.date).toLocaleDateString()}</p>
              <p className="event-time">Time: {event.time}</p>
              <p className="event-location">Location: {event.location}</p>
              <p className="event-num-volunteers">Number of Volunteers: {event.numVolunteers}</p>
              <div className="event-roles">
                <h4>Roles:</h4>
                <ul>
                  {event.roles.map((role, index) => (
                    <li key={index} className="role-item">
                      {role.role}
                    </li>
                  ))}

                </ul>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default EventsList;
