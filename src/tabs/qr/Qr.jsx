import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './QRCodes.css'; // Import the CSS for styling
import QRCode from 'react-qr-code';
import QRForm from '../../Forms/QrForm'; // Import the QRForm component

const QRCodes = () => {
  const [qrCodes, setQRCodes] = useState([]);
  const [filteredQRCodes, setFilteredQRCodes] = useState([]);
  const [searchQuery, setSearchQuery] = useState(''); // State for search
  const [isCreatingNewQR, setIsCreatingNewQR] = useState(false); // Toggle between grid and form
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch QR codes from your backend API (dummy data for now)
    const fetchedQRCodes = [
      {
        id: '1',
        name: 'QR Code 1',
        active: true,
        ads: true,
        ads_link: 'https://images.unsplash.com/photo-1724685010983',
      },
      {
        id: '2',
        name: 'QR Code 2',
        active: true,
        ads: false,
        ads_link: '',
      },
    ];
    setQRCodes(fetchedQRCodes);
    setFilteredQRCodes(fetchedQRCodes); // Set initial filtered QR codes
  }, []);

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    filterQRCodes(query);
  };

  const filterQRCodes = (query) => {
    let updatedQRCodes = [...qrCodes];

    // Filter by search query
    if (query) {
      updatedQRCodes = updatedQRCodes.filter((qr) =>
        qr.name.toLowerCase().includes(query.toLowerCase())
      );
    }

    setFilteredQRCodes(updatedQRCodes);
  };

  const handleQRClick = (id) => {
    navigate(`/qr/${id}`); // Navigate to the QR-specific page
  };

  const handleNewQR = () => {
    {!isCreatingNewQR ? 'New QR' : 'Back'}
    setIsCreatingNewQR(!isCreatingNewQR ? true : false); // Switch to the form
  };

  return (
    <div className="qr-codes-container">
      <div className="qr-codes-header">
        <h2>QR Codes</h2>
        <div className="search-container">
          <input
            type="text"
            placeholder="Search by QR Name"
            value={searchQuery}
            onChange={handleSearchChange}
          />
        </div>
        <button className="new-qr-btn" onClick={handleNewQR}>
          
          {!isCreatingNewQR ? 'New QR' : 'Back'}
        </button>
      </div>

      {!isCreatingNewQR ? (
        <div className="qr-grid">
          {filteredQRCodes.map((qr) => (
            <div key={qr.id} className="qr-card" onClick={() => handleQRClick(qr.id)}>
              <QRCode
                size={256}
                style={{ height: 'auto', maxWidth: '100%', width: '100%' }}
                value={`https://app.rewardsy.one/qr/${qr.id}`}
                viewBox={`0 0 256 256`}
              />
              <p>{qr.name}</p>
            </div>
          ))}
        </div>
      ) : (
        <QRForm />
      )}
    </div>
  );
};

export default QRCodes;
