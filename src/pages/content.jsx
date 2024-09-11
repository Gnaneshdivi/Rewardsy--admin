import React, { useState } from 'react';
import { collection, addDoc } from 'firebase/firestore'; // Import Firestore
import { db } from '../firebase'; // Firebase configuration import
import "./homepage.css";

const Content = ({ title }) => {
  // State to manage form data
  const [contentData, setContentData] = useState({
    storeId: '',
    contentDescription: '',
    contentLinks: '',
    imageLinks: '',
    offerLinks: ''
  });

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setContentData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Add content data to Firestore collection "contents"
      await addDoc(collection(db, 'contents'), contentData);
      alert('Content submitted successfully');
    } catch (err) {
      console.error('Error submitting content:', err);
      alert('Error submitting content');
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
          value={contentData.storeId}
          onChange={handleInputChange}
          required
        />

        <label>Content Description:</label>
        <textarea
          name="contentDescription"
          placeholder="Description"
          value={contentData.contentDescription}
          onChange={handleInputChange}
          required
        />

        <label>Links to the Content:</label>
        <input
          type="text"
          name="contentLinks"
          placeholder="Content Links"
          value={contentData.contentLinks}
          onChange={handleInputChange}
          required
        />

        <label>Links to the Image:</label>
        <input
          type="text"
          name="imageLinks"
          placeholder="Image Links"
          value={contentData.imageLinks}
          onChange={handleInputChange}
          required
        />

        <label>Links to Any Offer:</label>
        <input
          type="text"
          name="offerLinks"
          placeholder="Offer Links"
          value={contentData.offerLinks}
          onChange={handleInputChange}
          required
        />

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Content;
