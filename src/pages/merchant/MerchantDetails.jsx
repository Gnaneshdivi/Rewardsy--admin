import React, { useEffect, useState } from 'react';
import './MerchantDetails.css'; // Importing the CSS for styling
import Offers from '../../tabs/offers/offers';
import Content from '../../tabs/content/content';
import QRCodes from '../../tabs/qr/Qr';
import { merchantService } from '../../services/MerchantService'; // Assuming the service is set up
import { useParams } from 'react-router-dom'; // To get store ID from URL

const MerchantDetails = () => {
  const { storeId } = useParams(); // Get store ID from URL params
  const [activeTab, setActiveTab] = useState('details'); // Set initial active tab to 'details'
  const [isEditing, setIsEditing] = useState(false); // State to manage edit mode
  const [loading, setLoading] = useState(true); // State for loading spinner
  const [merchantData, setMerchantData] = useState(null); // State for merchant data
  const [offers, setOffers] = useState([]);
  const [content, setContent] = useState([]);

  useEffect(() => {
    const fetchStoreDetails = async () => {
      try {
        const response = await merchantService.getStoreById(storeId); // Assuming this API call is available
        setMerchantData(response.store);
        setOffers(response.offers);
        setContent(response.content);
      } catch (error) {
        console.error('Error fetching store details:', error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchStoreDetails();
  }, [storeId]);

  const handleTabChange = (tabName) => {
    setActiveTab(tabName);
  };
  const updateMerchantStatus = (id, newStatus, isActive = false) => {
    setMerchantData((prevData) =>
      prevData.id === id ? { ...prevData, status: newStatus, active: isActive } : prevData
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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setMerchantData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleEditToggle = () => {
    setIsEditing(!isEditing); // Toggle the edit state
  };

  const handleSaveChanges = async () => {
    try {
      await merchantService.updateMerchant(merchantData.id, merchantData);
      setIsEditing(false); // Exit edit mode
      console.log('Saving changes...', merchantData); // Placeholder for actual save logic
    } catch (error) {
      console.error('Error saving merchant details:', error.message);
    }
  };

  if (loading) {
    return <div>Loading...</div>; // Display a loading spinner or message
  }

  return (
    <div className="admin-container">
      <div className="sidebar">
        <div className="merchant-info">
          <h2>Merchant: {merchantData.name}</h2>
          <p>Status: {merchantData.status}</p>
          
            <div className="action-buttons">
             { merchantData.status.toLowerCase() === 'under review' ? (
                  <>
                    <button className="approve-btn" onClick={() => handleApprove(merchantData.id)}>
                      Approve
                    </button>
                    <button className="decline-btn" onClick={() => handleDecline(merchantData.id)}>
                      Decline
                    </button>
                  </>
                ) : merchantData.status.toLowerCase() === 'active' ? (
                  <button className="decline-btn" onClick={() => handleDeactivate(merchantData.id)}>
                    Deactivate
                  </button>
                ) : (merchantData.status.toLowerCase() === 'deactivated' || merchantData.status.toLowerCase() === 'rejected') ? (
                  <button className="approve-btn" onClick={() => handleReactivate(merchantData.id)}>
                    Reactivate
                  </button>
                ) : null}
            </div>
          
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
        {activeTab === 'offers' && <Offers offers={offers} />}
        {activeTab === 'content' && <Content content={content} />}
        {activeTab === 'qr' && <QRCodes storeId={merchantData.id} />}
      </div>
    </div>
  );
};

export default MerchantDetails;
