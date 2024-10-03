import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // For navigation
import './OnBoard.css'; // Importing the CSS for styling
import NewMerchantForm from '../../Forms/merchant/NewMerchantForm'; // Import the form component
import CommonTable from '../../table/CommonTable'; // Import the common table component
import { merchantService } from '../../services/MerchantService';

const OnBoard = () => {
  const [merchants, setMerchants] = useState([]);
  const [filteredMerchants, setFilteredMerchants] = useState([]);
  const [filterStatus, setFilterStatus] = useState(''); // State for filter
  const [isAddingNewMerchant, setIsAddingNewMerchant] = useState(false); // State to toggle form and table
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMerchants = async () => {
      try {
        const fetchedMerchants = await merchantService.getAllMerchants();
        setMerchants(fetchedMerchants);
        setFilteredMerchants(fetchedMerchants); // Set initial filtered merchants
      } catch (error) {
        console.error('Error fetching merchants:', error.message);
      }
    };

    // Call the fetchMerchants function on component load
    fetchMerchants();
  }, []);

  // Update state after status change
  const updateMerchantStatus = (id, newStatus, isActive = false) => {
    setMerchants((prevMerchants) =>
      prevMerchants.map((merchant) =>
        merchant.id === id ? { ...merchant, status: newStatus, active: isActive } : merchant
      )
    );

    setFilteredMerchants((prevMerchants) =>
      prevMerchants.map((merchant) =>
        merchant.id === id ? { ...merchant, status: newStatus, active: isActive } : merchant
      )
    );
  };

  const handleApprove = async (id) => {
    try {
      await merchantService.changeMerchantStatus(id, 'active');
      updateMerchantStatus(id, 'Active', true); // Set active to true when approved
      console.log(`Approved merchant with id: ${id}`);
    } catch (error) {
      console.error('Error approving merchant:', error.message);
    }
  };

  const handleDecline = async (id) => {
    try {
      await merchantService.changeMerchantStatus(id, 'rejected');
      updateMerchantStatus(id, 'Rejected', false); // Set active to false
      console.log(`Declined merchant with id: ${id}`);
    } catch (error) {
      console.error('Error declining merchant:', error.message);
    }
  };

  const handleDeactivate = async (id) => {
    try {
      await merchantService.changeMerchantStatus(id, 'deactivated');
      updateMerchantStatus(id, 'Deactivated', false); // Set active to false
      console.log(`Deactivated merchant with id: ${id}`);
    } catch (error) {
      console.error('Error deactivating merchant:', error.message);
    }
  };

  const handleReactivate = async (id) => {
    try {
      await merchantService.changeMerchantStatus(id, 'active');
      updateMerchantStatus(id, 'Active', true); // Set active to true when reactivated
      console.log(`Reactivated merchant with id: ${id}`);
    } catch (error) {
      console.error('Error reactivating merchant:', error.message);
    }
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
    navigate(`/merchant/${id}`);
  };

  return (
    <div className="onboard-container">
      <div className="onboard-header">
        <h2>On Board</h2>
        {!isAddingNewMerchant ? (
          <div className="filter-container">
            <label htmlFor="status-filter">Filter by Status:</label>
            <select id="status-filter" value={filterStatus} onChange={handleFilterChange}>
              <option value="">All</option>
              <option value="Active">Active</option>
              <option value="under review">Under review</option>
              <option value="Rejected">Rejected</option>
            </select>
          </div>
        ) : (
          <></>
        )}
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
                ) : merchant.status.toLowerCase() === 'active' ? (
                  <button className="decline-btn" onClick={() => handleDeactivate(merchant.id)}>
                    Deactivate
                  </button>
                ) : (merchant.status.toLowerCase() === 'deactivated' || merchant.status.toLowerCase() === 'rejected') ? (
                  <button className="approve-btn" onClick={() => handleReactivate(merchant.id)}>
                    Reactivate
                  </button>
                ) : null,
            },
          ]}
          onRowClick={(item) => handleRowClick(item.id)} // Add this prop to handle row click
        />
      )}
    </div>
  );
};

export default OnBoard;
