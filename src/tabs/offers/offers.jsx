// Offers.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Offers.css'; // Import the CSS for styling
import OfferForm from '../../Forms/OfferForm'; // Import the form component
import CommonTable from '../../table/CommonTable'; // Import the common table component

const Offers = () => {
  const [offers, setOffers] = useState([]);
  const [filteredOffers, setFilteredOffers] = useState([]);
  const [filterStatus, setFilterStatus] = useState(''); // State for filter
  const [searchQuery, setSearchQuery] = useState(''); // State for search
  const [isAddingNewOffer, setIsAddingNewOffer] = useState(false); // State to toggle form and table
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch offers from your backend API
    const fetchedOffers = [
      {
        id: 'GvQlHr9Rqn6CLPwtaWr1',
        title: 'Toy Wonderland Offer',
        description: 'Buy 1 Get 1 Free on selected toys!',
        startDate: '2024-09-20',
        endDate: '2024-12-31',
        status: 'Active',
        store: 'ZkPqGf7Qin2YHLvcaWnB',
      },
      // Add more offers as needed
    ];
    setOffers(fetchedOffers);
    setFilteredOffers(fetchedOffers); // Set initial filtered offers
  }, []);

  const handleAddNewOffer = () => {
    setIsAddingNewOffer(!isAddingNewOffer); // Toggle between form and table
  };

  const handleFilterChange = (e) => {
    const selectedStatus = e.target.value;
    setFilterStatus(selectedStatus);
    filterOffers(searchQuery, selectedStatus);
  };

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    filterOffers(query, filterStatus);
  };

  const filterOffers = (query, status) => {
    let updatedOffers = [...offers];

    // Filter by status
    if (status) {
      updatedOffers = updatedOffers.filter((offer) => offer.status === status);
    }

    // Filter by search query
    if (query) {
      updatedOffers = updatedOffers.filter((offer) =>
        offer.title.toLowerCase().includes(query.toLowerCase())
      );
    }

    setFilteredOffers(updatedOffers);
  };

  const handleRowClick = (id) => {
    navigate(`/offer/${id}`); // Navigate to the offer-specific page
  };

  return (
    <div className="offers-container">
      <div className="offers-header">
        <h2>Offers</h2>
        {!isAddingNewOffer ? (
          <>
            <div className="search-container">
              <input
                type="text"
                placeholder="Search by Offer Name"
                value={searchQuery}
                onChange={handleSearchChange}
              />
            </div>
            <div className="filter-container">
              <label htmlFor="status-filter">Filter by Status:</label>
              <select id="status-filter" value={filterStatus} onChange={handleFilterChange}>
                <option value="">All</option>
                <option value="Active">Active</option>
                <option value="Expired">Expired</option>
                <option value="Upcoming">Upcoming</option>
              </select>
            </div>
          </>
        ) : null}
        <button className="new-offer-btn" onClick={handleAddNewOffer}>
          {isAddingNewOffer ? 'Back' : 'New Offer'}
        </button>
      </div>

      {isAddingNewOffer ? (
        <OfferForm onBack={handleAddNewOffer} />
      ) : (
        <CommonTable
          data={filteredOffers}
          columns={[
            { key: 'id', label: 'Offer ID' },
            { key: 'title', label: 'Title' },
            { key: 'status', label: 'Status' },
            {
              key: 'actions',
              label: 'Actions',
              render: (offer) => (
                <button className="view-btn" onClick={() => handleRowClick(offer.id)}>
                  View/Edit
                </button>
              ),
            },
          ]}
          onRowClick={handleRowClick}
        />
      )}
    </div>
  );
};

export default Offers;
