import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation

const Stores = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate(); // Hook to navigate programmatically

  const handleSearch = () => {
    if (searchTerm.trim()) {
      navigate(`/merchant/${searchTerm}`); // Navigate to the merchant details page
    }
  };

  return (
    <div>
      <h2>Stores</h2>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search Merchant by ID"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>
    </div>
  );
};

export default Stores;
