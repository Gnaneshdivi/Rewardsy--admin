import React, { useState } from 'react';
import './OfferForm.css'; // Import CSS for styling
import TagInput from '../Components/tags/TagInput'; // Import the reusable TagInput component

const OfferForm = ({ onBack }) => {
  const [formData, setFormData] = useState({
    active: true,
    description: '',
    endDate: '',
    image: '',
    numberOfOffers: 0,
    redemptions: 0,
    startDate: '',
    store: '',
    tags: [], // Ensure tags is initialized as an empty array
    title: '',
  });

  const [imageFile, setImageFile] = useState(null); // For image upload

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Offer Form submitted:', formData, imageFile);
    // Handle form submission logic here
  };

  return (
    <div className="form-container">
      <h2>New Offer Form</h2>
      <form onSubmit={handleSubmit}>
        <label>Title:</label>
        <input
          type="text"
          name="title"
          placeholder="Offer Title"
          value={formData.title}
          onChange={handleInputChange}
          required
        />

        <label>Description:</label>
        <textarea
          name="description"
          placeholder="Offer Description"
          value={formData.description}
          onChange={handleInputChange}
          required
        />

        <label>Start Date:</label>
        <input
          type="date"
          name="startDate"
          value={formData.startDate}
          onChange={handleInputChange}
          required
        />

        <label>End Date:</label>
        <input
          type="date"
          name="endDate"
          value={formData.endDate}
          onChange={handleInputChange}
          required
        />

        <label>Number of Offers:</label>
        <input
          type="number"
          name="numberOfOffers"
          placeholder="Number of Offers"
          value={formData.numberOfOffers}
          onChange={handleInputChange}
          required
        />

        {/* Tags Section using reusable TagInput component */}
        <TagInput
          tags={formData.tags}
          setTags={(newTags) =>
            setFormData((prev) => ({ ...prev, tags: newTags }))
          }
        />

        {/* Image Upload */}
        <label>Upload Image:</label>
        <input type="file" accept="image/*" onChange={handleImageChange} />

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default OfferForm;
