import React, { useEffect, useState } from 'react';
import './MerchantDetails.css'; // Importing the CSS for styling
import Offers from '../../tabs/offers/offers';
import Content from '../../tabs/content/content';
import QRCodes from '../../tabs/qr/Qr';
import { merchantService } from '../../services/MerchantService'; // Assuming the service is set up
import StorageService, { FILE_TYPES } from '../../services/StorageService'; // Import Firebase Storage service
import { useParams } from 'react-router-dom'; // To get store ID from URL
import Spinner from '../../Components/Spinner';

const MerchantDetails = () => {
  const { storeId } = useParams(); // Get store ID from URL params
  const [activeTab, setActiveTab] = useState('details'); // Set initial active tab to 'details'
  const [isEditing, setIsEditing] = useState(false); // State to manage edit mode
  const [loading, setLoading] = useState(true); // State for loading spinner
  const [merchantData, setMerchantData] = useState(null); // State for merchant data
  const [offers, setOffers] = useState([]);
  const [content, setContent] = useState([]);
  const [newBannerFile, setNewBannerFile] = useState(null); // Track if new banner file is selected
  const [newDpFile, setNewDpFile] = useState(null); // Track if new dp file is selected
  const [previewBanner, setPreviewBanner] = useState(null); // For banner preview
  const [previewDp, setPreviewDp] = useState(null); // For DP preview
  const [originalMerchantData, setOriginalMerchantData] = useState(null); // To store original merchant data

  useEffect(() => {
    const fetchStoreDetails = async () => {
      try {
        const response = await merchantService.getStoreById(storeId); // Assuming this API call is available
        setMerchantData(response.store);
        setOriginalMerchantData(response.store);
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

  const handleBannerChange = (e) => {
    const file = e.target.files[0];
    setNewBannerFile(file); // Track new banner file
    setPreviewBanner(URL.createObjectURL(file)); // Show banner preview
  };

  const handleDpChange = (e) => {
    const file = e.target.files[0];
    setNewDpFile(file); // Track new dp file
    setPreviewDp(URL.createObjectURL(file)); // Show dp preview
  };

  const handleEditToggle = () => {
    setIsEditing(!isEditing); // Toggle the edit state
  };

  const handleSaveChanges = async () => {
    try {
      setLoading(true); // Show loading while saving changes
      let updatedData = {};

      // Compare and add only the fields that have changed to the updatedData object
      if (merchantData.name !== originalMerchantData.name) {
        updatedData.name = merchantData.name;
      }
      if (merchantData.area !== originalMerchantData.area) {
        updatedData.area = merchantData.area;
      }
      if (merchantData.desc !== originalMerchantData.desc) {
        updatedData.desc = merchantData.desc;
      }
      if (merchantData.phoneNumber !== originalMerchantData.phoneNumber) {
        updatedData.phoneNumber = merchantData.phoneNumber;
      }
      if (merchantData.location !== originalMerchantData.location) {
        updatedData.location = merchantData.location;
      }

      // Upload new banner if selected
      if (newBannerFile) {
        const bannerUrl = await StorageService.uploadFileToStorage(newBannerFile, FILE_TYPES.BANNER);
        updatedData.background = bannerUrl; // Update banner URL
      }

      // Upload new dp if selected
      if (newDpFile) {
        const dpUrl = await StorageService.uploadFileToStorage(newDpFile, FILE_TYPES.DP);
        updatedData.dp = dpUrl; // Update dp URL
      }

      // Send the updated data to the server
      await merchantService.updateMerchant(merchantData.id, updatedData);

      // Update local state after successful save
      setMerchantData((prevData) => ({ ...prevData, ...updatedData }));
      setOriginalMerchantData({ ...merchantData, ...updatedData }); // Update the original data to the new values
      setIsEditing(false); // Exit edit mode
      console.log('Changes saved', updatedData); // Log or show confirmation message
    } catch (error) {
      console.error('Error saving merchant details:', error.message);
      alert('Failed to save changes. Please try again.'); // Show failure alert
    } finally {
      setLoading(false); // Stop loading
    }
  };

  if (loading) {
    return <Spinner/>; // Display a loading spinner or message
  }

  return (
    <div className="admin-container">
      <div className="sidebar">
        <div className="merchant-info">
          <h2>Merchant: {merchantData.name}</h2>
          <p>Status: {merchantData.status}</p>

          <div className="action-buttons">
            {merchantData.status.toLowerCase() === 'under review' ? (
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
            ) : merchantData.status.toLowerCase() === 'deactivated' || merchantData.status.toLowerCase() === 'rejected' ? (
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
            <div className="merchant-banner" style={{ backgroundImage: `url(${previewBanner || merchantData.background})` }}>
              {isEditing && <input type="file" onChange={handleBannerChange} />}
            </div>

            <div className="merchant-logo">
              <img src={previewDp || merchantData.dp} alt="Merchant Logo" />
              {isEditing && <input type="file" onChange={handleDpChange} />}
            </div>

            {/* Merchant Details Section */}
            <div className="merchant-details-header">
              <h2>Merchant Details</h2>
              {isEditing ? (
                <button className="save-btn" onClick={handleSaveChanges}>
                  Save
                </button>
              ) : (
                <button className="edit-btn" onClick={handleEditToggle}>
                  Edit
                </button>
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
        {activeTab === 'offers' && <Offers offers={offers} id={merchantData.id} />}
        {activeTab === 'content' && <Content content={content} id={merchantData.id} />}
        {activeTab === 'qr' && <QRCodes storeId={merchantData.id} />}
      </div>
    </div>
  );
};

export default MerchantDetails;
