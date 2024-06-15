import React, { useState } from 'react';
import './Filter.css';

const Filter = ({ onFilter }) => {
  const [filters, setFilters] = useState({
    make: [],
    duration: []
  });

  const handleMakeChange = (e) => {
    const { value, checked } = e.target;
    setFilters((prevFilters) => {
      const newMake = checked
        ? [...prevFilters.make, value]
        : prevFilters.make.filter(make => make !== value);
      return { ...prevFilters, make: newMake };
    });
  };

  const handleDurationChange = (e) => {
    const { value, checked } = e.target;
    setFilters((prevFilters) => {
      const newDuration = checked
        ? [...prevFilters.duration, value]
        : prevFilters.duration.filter(duration => duration !== value);
      return { ...prevFilters, duration: newDuration };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onFilter(filters);
  };

  const handleReset = () => {
    setFilters({ make: [], duration: [] });
    onFilter({ make: [], duration: [] });
  };

  return (
    <div className="filter-container">
      <h2>Filter Data By</h2>
      <form onSubmit={handleSubmit}>
        <div className="filter-section">
          <h3>MAKE</h3>
          {['Ford', 'Cadillac', 'Jeep'].map(make => (
            <label key={make} className="checkbox-label">
              <input
                type="checkbox"
                value={make}
                checked={filters.make.includes(make)}
                onChange={handleMakeChange}
              />
              {make}
            </label>
          ))}
        </div>
        <div className="filter-section">
          <h3>DURATION</h3>
          {['Last Month', 'This Month', 'Last 3 Months', 'Last 6 Months', 'This Year', 'Last Year'].map(duration => (
            <label key={duration} className="checkbox-label">
              <input
                type="checkbox"
                value={duration}
                checked={filters.duration.includes(duration)}
                onChange={handleDurationChange}
              />
              {duration}
            </label>
          ))}
        </div>
        <button type="submit" className="filter-button">APPLY FILTER</button>
        <button type="button" className="filter-button reset-button" onClick={handleReset}>REMOVE ALL FILTERS</button>
      </form>
    </div>
  );
};

export default Filter;
