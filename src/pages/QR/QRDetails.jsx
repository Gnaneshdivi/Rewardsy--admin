import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import QRCode from 'react-qr-code';
import './QRDetails.css'; // Import CSS for styling

const QRDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dummyData = {
    '1': {
      name: 'QR Code 1',
      active: true,
      ads: true,
      ads_link: 'https://images.unsplash.com/photo-1724685010983',
      link: 'offer',
      store: '',
    },
    '2': {
      name: 'QR Code 2',
      active: true,
      ads: false,
      ads_link: '',
      link: 'home',
      store: '1',
    },
  };

  const dummyIds = {
    reel: ['Reel 1', 'Reel 2', 'Reel 3'],
    offer: ['Offer 1', 'Offer 2', 'Offer 3'],
  };

  const [qrData, setQrData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [secondaryDropdownOptions, setSecondaryDropdownOptions] = useState([]);
  const [selectedSecondary, setSelectedSecondary] = useState('');
  const [imagePreview, setImagePreview] = useState(''); // Preview for ads link

  useEffect(() => {
    const fetchedQR = dummyData[id];
    if (fetchedQR) {
      setQrData(fetchedQR);
      setImagePreview(fetchedQR.ads_link); // Set initial image preview
    }
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setQrData((prev) => ({ ...prev, [name]: value }));
  };

  const handleLinkChange = (e) => {
    const linkType = e.target.value;
    setQrData((prev) => ({ ...prev, link: linkType }));

    if (linkType === 'reel' || linkType === 'offer') {
      setSecondaryDropdownOptions(dummyIds[linkType]);
    } else {
      setSecondaryDropdownOptions([]);
      setSelectedSecondary(''); // Reset secondary dropdown value if not required
    }
  };

  const handleSecondaryDropdownChange = (e) => {
    setSelectedSecondary(e.target.value);
  };

  const handleAdsLinkChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImagePreview(imageUrl);
      setQrData((prev) => ({ ...prev, ads_link: imageUrl }));
    }
  };

  const toggleEditMode = () => {
    setIsEditing(!isEditing);
  };

  const handleSave = () => {
    setIsEditing(false);
    console.log('QR data saved:', { ...qrData, selectedSecondary });
  };

  if (!qrData) {
    return <p>Loading QR details...</p>;
  }

  return (
    <div className="qr-details-container">
      <div className="qr-form-background">
        <div className="qr-preview">
          <QRCode
            size={128} // Smaller QR code size
            style={{ height: 'auto', maxWidth: '100%', width: '100%' }}
            value={`https://app.rewardsy.one/qr/${id}`}
            viewBox={`0 0 256 256`}
          />
        </div>

        <form>
          <label>QR Name:</label>
          <input
            type="text"
            name="name"
            value={qrData.name}
            disabled={true} // QR name is not editable
          />

          <label>Active:</label>
          <select
            name="active"
            value={qrData.active ? 'true' : 'false'}
            onChange={(e) =>
              setQrData((prev) => ({
                ...prev,
                active: e.target.value === 'true',
              }))
            }
            disabled={!isEditing}
          >
            <option value="true">Active</option>
            <option value="false">Inactive</option>
          </select>

          <label>Ads Enabled:</label>
          <select
            name="ads"
            value={qrData.ads ? 'true' : 'false'}
            onChange={(e) =>
              setQrData((prev) => ({
                ...prev,
                ads: e.target.value === 'true',
              }))
            }
            disabled={!isEditing}
          >
            <option value="true">Yes</option>
            <option value="false">No</option>
          </select>

          {qrData.ads && (
            <>
              <label>Ads Image:</label>
              <div className="image-preview">
                <img src={imagePreview} alt="Ads Preview" />
              </div>
              {isEditing && (
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleAdsLinkChange}
                />
              )}
            </>
          )}

          <label>Link Type:</label>
          <select
            name="link"
            value={qrData.link}
            onChange={handleLinkChange}
            disabled={!isEditing}
          >
            <option value="home">Home</option>
            <option value="store">Store</option>
            <option value="reel">Reel</option>
            <option value="offer">Offer</option>
          </select>

          {secondaryDropdownOptions.length > 0 && (
            <>
              <label>{qrData.link === 'reel' ? 'Reel' : 'Offer'} ID:</label>
              <select
                value={selectedSecondary}
                onChange={handleSecondaryDropdownChange}
                disabled={!isEditing}
              >
                <option value="">Select ID</option>
                {secondaryDropdownOptions.map((option, index) => (
                  <option key={index} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </>
          )}

          {isEditing ? (
            <button type="button" onClick={handleSave}>
              Save
            </button>
          ) : (
            <button type="button" onClick={toggleEditMode}>
              Edit
            </button>
          )}

          <button type="button" onClick={() => navigate(-1)}>
            Back
          </button>
        </form>
      </div>
    </div>
  );
};

export default QRDetails;
