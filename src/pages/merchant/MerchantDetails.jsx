import React, { useState } from 'react';
import './MerchantDetails.css'; // Importing the CSS for styling

const MerchantDetails = () => {
  const [activeTab, setActiveTab] = useState('offers'); // Manage active tab state

  const handleTabChange = (tabName) => {
    setActiveTab(tabName);
  };

  return (
    <div className="admin-container">
      <div className="sidebar">
        <button
          className={activeTab === 'offers' ? 'active' : ''}
          onClick={() => handleTabChange('offers')}
        >
          Offers
        </button>
        <button
          className={activeTab === 'content' ? 'active' : ''}
          onClick={() => handleTabChange('content')}
        >
          Content
        </button>
        <button
          className={activeTab === 'qr' ? 'active' : ''}
          onClick={() => handleTabChange('qr')}
        >
          QRs
        </button>
      </div>

      <div className="content">
        <div className="merchant-details-header">
          <h2>Merchant Details</h2>
        </div>

        {/* Content based on active tab */}
        <div className="tab-content">
          {activeTab === 'offers' && <div>Manage Offers Content</div>}
          {activeTab === 'content' && <div>Manage Content</div>}
          {activeTab === 'qr' && <div>Manage QR Codes</div>}
        </div>
      </div>
    </div>
  );
};

export default MerchantDetails;
