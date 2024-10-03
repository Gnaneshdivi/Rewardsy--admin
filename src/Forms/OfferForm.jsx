import React, { useState } from 'react';
import './OfferForm.css'; // Import CSS for styling
import TagInput from '../Components/tags/TagInput'; // Import the reusable TagInput component
import StorageService, { FILE_TYPES } from '../services/StorageService'; // Assuming the Firebase storage service is set up
import { offerService } from '../services/OfferService';

const OfferForm = ({ onBack, storeId, onOfferAdded }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    startDate: '',
    endDate: '',
    numberOfOffers: 0,
    store: '', // Assume the store will be set or passed from parent component
    tags: [], // Initialize tags as an empty array
    active: true,
  });

  const [imageFile, setImageFile] = useState(null); // For image upload
  const [isLoading, setIsLoading] = useState(false); // For loading spinner

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      let imageUrl = '';

      // Upload image if selected
      if (imageFile) {
        imageUrl = await StorageService.uploadFileToStorage(imageFile, FILE_TYPES.CONTENT);
      }

      // Prepare the offer data based on CreateOfferDto
      const offerData = {
        title: formData.title,
        description: formData.description,
        startDate: formData.startDate,
        endDate: formData.endDate,
        image: imageUrl, // Set the image URL after upload
        store: storeId, // The store ID should be provided
        active: formData.active,
        numberOfOffers: Number(formData.numberOfOffers),
        tags: formData.tags,
      };

      // Send the offerData to your backend or API
      const createdOffer = await offerService.createOffer(offerData);

      // Use the callback to pass the new offer to the Offers component
      onOfferAdded(createdOffer);

      // Reset form or navigate back after successful submission
      onBack();
    } catch (error) {
      console.error('Error creating the offer:', error);
    } finally {
      setIsLoading(false);
    }
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
          setTags={(newTags) => setFormData((prev) => ({ ...prev, tags: newTags }))}
        />

        {/* Image Upload */}
        <label>Upload Image:</label>
        <input type="file" accept="image/*" onChange={handleImageChange} />

        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Submitting...' : 'Submit'}
        </button>
      </form>
    </div>
  );
};

export default OfferForm;
