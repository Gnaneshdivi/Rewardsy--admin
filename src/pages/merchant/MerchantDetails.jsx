import React, { useState } from 'react';
import './MerchantDetails.css'; // Importing the CSS for styling
import Offers from '../../tabs/offers/offers';
import Content from '../../tabs/content/content';

const MerchantDetails = () => {
  const [activeTab, setActiveTab] = useState('details'); // Set initial active tab to 'details'
  const [isEditing, setIsEditing] = useState(false); // State to manage edit mode
  const [merchantData, setMerchantData] = useState({
    id:"abs",
    active: true,
    area: "Countryside",
    background: "https://picsum.photos/800/200?random=1", // Background banner URL
    dp: "https://picsum.photos/100/100?random=1", // Display picture URL
    name: "Organic Market",
    location: "789 Oak Lane",
    phoneNumber: "+1234567890",
    desc: "Locally grown farm produce.",
    status: "under review",
  });

  const handleTabChange = (tabName) => {
    setActiveTab(tabName);
  };

  const handleApprove = () => {
    console.log(`Approving merchant: ${merchantData.name}`);
  };

  const handleDecline = () => {
    console.log(`Declining merchant: ${merchantData.name}`);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setMerchantData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleEditToggle = () => {
    setIsEditing(!isEditing); // Toggle the edit state
  };

  const handleSaveChanges = () => {
    setIsEditing(false); // Exit edit mode
    console.log('Saving changes...', merchantData); // Placeholder for actual save logic
  };

  return (
    <div className="admin-container">
      <div className="sidebar">
        <div className="merchant-info">
          <h2>Merchant:</h2>
          <p>Status: {merchantData.status}</p>
          {merchantData.status === 'under review' && (
            <div className="action-buttons">
              <button className="approve-btn" onClick={handleApprove}>Approve</button>
              <button className="decline-btn" onClick={handleDecline}>Decline</button>
            </div>
          )}
        </div>
        <button
          className={`sidebar-btn ${activeTab === 'details' ? 'active' : ''}`}
          onClick={() => handleTabChange('details')}
        >
          Details
        </button>
        <button
          className={`sidebar-btn ${activeTab === 'offers' ? 'active' : ''}`}
          onClick={() => handleTabChange('offers')}
        >
          Offers
        </button>
        <button
          className={`sidebar-btn ${activeTab === 'content' ? 'active' : ''}`}
          onClick={() => handleTabChange('content')}
        >
          Content
        </button>
        <button
          className={`sidebar-btn ${activeTab === 'qr' ? 'active' : ''}`}
          onClick={() => handleTabChange('qr')}
        >
          QRs
        </button>
      </div>

      <div className="content">
        {activeTab === 'details' && (
          <>
            {/* Banner and DP Section */}
            <div className="merchant-banner" style={{ backgroundImage: `url(${merchantData.background})` }}>
              {isEditing && (
                <input
                  type="file"
                  onChange={(e) =>
                    handleInputChange({ target: { name: 'background', value: URL.createObjectURL(e.target.files[0]) } })
                  }
                />
              )}
            </div>

            <div className="merchant-logo">
              <img src={merchantData.dp} alt="Merchant Logo" />
              {isEditing && (
                <input
                  type="file"
                  onChange={(e) =>
                    handleInputChange({ target: { name: 'dp', value: URL.createObjectURL(e.target.files[0]) } })
                  }
                />
              )}
            </div>

            {/* Merchant Details Section */}
            <div className="merchant-details-header">
              <h2>Merchant Details</h2>
              {isEditing ? (
                <button className="save-btn" onClick={handleSaveChanges}>Save</button>
              ) : (
                <button className="edit-btn" onClick={handleEditToggle}>Edit</button>
              )}
            </div>

            <div className="merchant-form">
              <form>
                <div className="form-group">
                  <label>Name:</label>
                  <input
                    type="text"
                    name="name"
                    value={merchantData.name}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                  />
                </div>

                <div className="form-group">
                  <label>Location:</label>
                  <input
                    type="text"
                    name="location"
                    value={merchantData.location}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                  />
                </div>

                <div className="form-group">
                  <label>Phone Number:</label>
                  <input
                    type="text"
                    name="phoneNumber"
                    value={merchantData.phoneNumber}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                  />
                </div>

                <div className="form-group">
                  <label>Description:</label>
                  <textarea
                    name="desc"
                    value={merchantData.desc}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                  />
                </div>
              </form>
            </div>
          </>
        )}
        {activeTab === 'offers' && <Offers/>}
        {activeTab === 'content' && <Content/>}
        {activeTab === 'qr' && <div>Manage QR Codes</div>}
      </div>
    </div>
  );
};

export default MerchantDetails;
