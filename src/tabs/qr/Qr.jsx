import React, { useState } from 'react';
import { collection, addDoc } from 'firebase/firestore'; // Import Firestore
import { db } from '../../firebase'; // Firebase configuration import

const Qr = ({ title }) => {
  // State to manage QR data
  const [qrData, setQrData] = useState({
    storeId: '',
    qrType: '', // Example field for the type of QR code (e.g., static, dynamic)
    qrDescription: '',
    qrLink: '', // Field for the link or data the QR code should point to
  });

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setQrData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Add QR data to Firestore collection "qrs" (adjust the collection name as needed)
      await addDoc(collection(db, 'qrs'), qrData);
      alert('QR data submitted successfully');
    } catch (err) {
      console.error('Error submitting QR data:', err);
      alert('Error submitting QR data');
    }
  };

  return (
    <div>
      <h2>{title}</h2>
      <form onSubmit={handleSubmit}>
        <label>Store ID:</label>
        <input
          type="text"
          name="storeId"
          placeholder="Store ID"
          value={qrData.storeId}
          onChange={handleInputChange}
          required
        />

        <label>QR Type:</label>
        <input
          type="text"
          name="qrType"
          placeholder="QR Type (e.g., static, dynamic)"
          value={qrData.qrType}
          onChange={handleInputChange}
          required
        />

        <label>QR Description:</label>
        <textarea
          name="qrDescription"
          placeholder="Description"
          value={qrData.qrDescription}
          onChange={handleInputChange}
          required
        />

        <label>Link or Data for QR Code:</label>
        <input
          type="text"
          name="qrLink"
          placeholder="Link or data for the QR code"
          value={qrData.qrLink}
          onChange={handleInputChange}
          required
        />

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Qr;
