import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // For navigation
import './OnBoard.css'; // Importing the CSS for styling
import NewMerchantForm from '../../Forms/merchant/NewMerchantForm'; // Import the form component
import CommonTable from '../../table/CommonTable'; // Import the common table component

const OnBoard = () => {
  const [merchants, setMerchants] = useState([]);
  const [filteredMerchants, setFilteredMerchants] = useState([]);
  const [filterStatus, setFilterStatus] = useState(''); // State for filter
  const [isAddingNewMerchant, setIsAddingNewMerchant] = useState(false); // State to toggle form and table
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch merchants with status from your backend API
    // This is a placeholder for actual API call
    const fetchedMerchants = [
      { id: '1', name: 'Merchant 1', status: 'Active' },
      { id: '2', name: 'Merchant 2', status: 'under review' },
      { id: '3', name: 'Merchant 3', status: 'Rejected' },
      { id: '4', name: 'Merchant 4', status: 'under review' },
    ];
    setMerchants(fetchedMerchants);
    setFilteredMerchants(fetchedMerchants); // Set initial filtered merchants
  }, []);

  const handleApprove = (id) => {
    console.log(`Approving merchant with id: ${id}`);
  };

  const handleDecline = (id) => {
    console.log(`Declining merchant with id: ${id}`);
  };

  const handleNewMerchant = () => {
    setIsAddingNewMerchant(!isAddingNewMerchant); // Toggle between form and table
  };

  const handleFilterChange = (e) => {
    const selectedStatus = e.target.value;
    setFilterStatus(selectedStatus);
    if (selectedStatus) {
      setFilteredMerchants(merchants.filter((merchant) => merchant.status === selectedStatus));
    } else {
      setFilteredMerchants(merchants);
    }
  };

  const handleRowClick = (id) => {
    navigate(`/store/${id}`);
  };

  return (
    <div className="onboard-container">
      <div className="onboard-header">
        <h2>On Board</h2>
        {!isAddingNewMerchant ?<div className="filter-container">
          <label htmlFor="status-filter">Filter by Status:</label>
          <select id="status-filter" value={filterStatus} onChange={handleFilterChange}>
            <option value="">All</option>
            <option value="Active">Active</option>
            <option value="under review">Under review</option>
            <option value="Rejected">Rejected</option>
          </select>
        </div>:<></>}
        <button className="new-merchant-btn" onClick={handleNewMerchant}>
          {isAddingNewMerchant ? 'Back' : 'New Merchant'}
        </button>
      </div>

      {isAddingNewMerchant ? (
        <NewMerchantForm onBack={handleNewMerchant} />
      ) : (
        <CommonTable
          data={filteredMerchants}
          columns={[
            { key: 'id', label: 'Merchant ID' },
            { key: 'name', label: 'Merchant Name' },
            { key: 'status', label: 'Status' },
            {
              key: 'actions',
              label: 'Actions',
              render: (merchant) =>
                merchant.status.toLowerCase() === 'under review' ? (
                  <>
                    <button className="approve-btn" onClick={() => handleApprove(merchant.id)}>
                      Approve
                    </button>
                    <button className="decline-btn" onClick={() => handleDecline(merchant.id)}>
                      Decline
                    </button>
                  </>
                ) : null,
            },
          ]}
          onRowClick={handleRowClick} // Add this prop to handle row click
        />
      )}
    </div>
  );
};

export default OnBoard;
