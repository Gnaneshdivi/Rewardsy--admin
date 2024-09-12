import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import './merchant.css'; // Importing the CSS for styling

const Merchant = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate(); // Use useNavigate for navigation

  const handleSearch = () => {
    if (searchTerm) {
      // Navigate to the MerchantDetails page with the search term as a query parameter
      navigate(`/merchant/${searchTerm}`);
    } else {
      alert('Please enter a Merchant ID to search.');
    }
  };

  return (
    <div className="merchant-container">
      <h2>Merchant</h2>
      <input
        type="text"
        placeholder="Search Merchant by ID"
        className="search-bar"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button className="search-button" onClick={handleSearch}>
        Search
      </button>
    </div>
  );
};

export default Merchant;
