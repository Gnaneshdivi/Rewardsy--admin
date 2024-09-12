import React, { useEffect, useState } from 'react';
import './OnBoard.css'; // Importing the CSS for styling
import NewMerchantForm from '../../Forms/merchant/NewMerchantForm'; // Import the form component
import CommonTable from '../../table/CommonTable'; // Import the common table component

const OnBoard = () => {
  const [merchants, setMerchants] = useState([]);
  const [isAddingNewMerchant, setIsAddingNewMerchant] = useState(false); // State to toggle form and table

  useEffect(() => {
    // Fetch merchants with status "under review" from your backend API
    // This is a placeholder for actual API call
    setMerchants([
      { id: "1", name: "Merchant 1", status: "under review" },
      { id: "2", name: "Merchant 2", status: "under review" },
      { id: "1", name: "Merchant 1", status: "under review" },
      { id: "2", name: "Merchant 2", status: "under review" },
      { id: "1", name: "Merchant 1", status: "under review" },
      { id: "2", name: "Merchant 2", status: "under review" },
      { id: "1", name: "Merchant 1", status: "under review" },
      { id: "2", name: "Merchant 2", status: "under review" },
      { id: "1", name: "Merchant 1", status: "under review" },
      { id: "2", name: "Merchant 2", status: "under review" },
      { id: "1", name: "Merchant 1", status: "under review" },
      { id: "2", name: "Merchant 2", status: "under review" },
      { id: "1", name: "Merchant 1", status: "under review" },
      { id: "2", name: "Merchant 2", status: "under review" },
      
    ]);
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

  return (
    <div className="onboard-container">
      <div className="onboard-header">
        <h2>On Board</h2>
        <button className="new-merchant-btn" onClick={handleNewMerchant}>
          {isAddingNewMerchant ? 'Back' : 'New Merchant'}
        </button>
      </div>

      {isAddingNewMerchant ? (
        <NewMerchantForm onBack={handleNewMerchant} />
      ) : (
        <CommonTable
          data={merchants}
          columns={[
            { key: 'id', label: 'Merchant ID' },
            { key: 'name', label: 'Merchant Name' },
            { key: 'status', label: 'Status' },
            { key: 'actions', label: 'Actions', render: (merchant) => (
              <>
                <button className="approve-btn" onClick={() => handleApprove(merchant.id)}>Approve</button>
                <button className="decline-btn" onClick={() => handleDecline(merchant.id)}>Decline</button>
                
              </>
            )}
          ]}
        />
      )}
    </div>
  );
};

export default OnBoard;
