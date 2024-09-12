import React, { useState } from 'react';
import { collection, addDoc } from 'firebase/firestore'; // Import Firestore
import { db } from '../../firebase'; // Firebase configuration import

const Offer = ({ title }) => {
  // State to manage form data
  const [offerData, setOfferData] = useState({
    storeId: '',
    offerTitle: '',
    offerDescription: '',
    startDate: '',
    endDate: '',
    mediaLink: ''
  });

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setOfferData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Add offer data to Firestore collection "offers"
      await addDoc(collection(db, 'offers'), offerData);
      alert('Offer submitted successfully');
    } catch (err) {
      console.error('Error submitting offer:', err);
      alert('Error submitting offer');
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
          value={offerData.storeId}
          onChange={handleInputChange}
          required
        />

        <label>Title for the Offer:</label>
        <input
          type="text"
          name="offerTitle"
          placeholder="Offer Title"
          value={offerData.offerTitle}
          onChange={handleInputChange}
          required
        />

        <label>Description of the Offer:</label>
        <textarea
          name="offerDescription"
          placeholder="Description"
          value={offerData.offerDescription}
          onChange={handleInputChange}
          required
        />

        <label>Start Date:</label>
        <input
          type="date"
          name="startDate"
          value={offerData.startDate}
          onChange={handleInputChange}
          required
        />

        <label>End Date:</label>
        <input
          type="date"
          name="endDate"
          value={offerData.endDate}
          onChange={handleInputChange}
          required
        />

        <label>If you wish to add any media, mention the link below:</label>
        <input
          type="text"
          name="mediaLink"
          placeholder="Media Link"
          value={offerData.mediaLink}
          onChange={handleInputChange}
          required
        />

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Offer;
