import React, { useState } from 'react';
import '../styles.css';

interface NavbarProps {
  onSearch: (query: string) => void;
  onFilterChange: (status: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ onSearch, onFilterChange }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('All');

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    onSearch(e.target.value);
  };

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedStatus(e.target.value);
    onFilterChange(e.target.value);
  };

  return (
    <nav className="navbar">
      <div className="navbar__container">
        <div className="navbar__search">
          <input
            type="text"
            placeholder="Search tasks..."
            value={searchQuery}
            onChange={handleSearch}
            className="navbar__search-input"
          />
        </div>
        <div className="navbar__filter">
          <select
            value={selectedStatus}
            onChange={handleFilterChange}
            className="navbar__filter-select"
          >
            <option value="All">All</option>
            <option value="To Do">To Do</option>
            <option value="In Progress">In Progress</option>
            <option value="Done">Done</option>
            <option value="Timeout">Timeout</option>
          </select>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
