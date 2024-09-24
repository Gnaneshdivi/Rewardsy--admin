import React, { useState } from 'react';
import './NewMerchantForm.css'; // Import CSS for styling
import StorageService, { FILE_TYPES } from '../../services/StorageService';
import { merchantService } from '../../services/MerchantService';

const NewMerchantForm = ({ onBack }) => {
  const [formData, setFormData] = useState({
    name: '',
    phoneNumber: '',
    ownerName: '',
    location: '',
    latitude: null,
    longitude: null,
    area: '',
    description: '',
    category: [], // Category field as an array
    banner: null,
    dp: null,
    links: [], // Links field as an array
  });

  const [categoryInput, setCategoryInput] = useState('');
  const [linkInput, setLinkInput] = useState('');
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false); // State for loading spinner

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle file input changes
  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData((prev) => ({ ...prev, [name]: files[0] }));
  };

  // Get user's location (latitude and longitude)
  const handleLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setFormData((prev) => ({
          ...prev,
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        }));
      });
    } else {
      alert('Geolocation is not supported by this browser.');
    }
  };

  // Add category
  const handleCategoryInputKeyDown = (e) => {
    if ((e.key === 'Enter' || e.key === ',') && categoryInput.trim()) {
      e.preventDefault();
      if (!formData.category.includes(categoryInput.trim())) {
        setFormData((prev) => ({
          ...prev,
          category: [...prev.category, categoryInput.trim()],
        }));
      }
      setCategoryInput('');
    }
  };

  // Remove category
  const removeCategory = (index) => {
    const updatedCategories = formData.category.filter((_, i) => i !== index);
    setFormData((prev) => ({ ...prev, category: updatedCategories }));
  };

  // Add link
  const handleLinkInputKeyDown = (e) => {
    if ((e.key === 'Enter' || e.key === ',') && linkInput.trim()) {
      e.preventDefault();
      if (!formData.links.includes(linkInput.trim())) {
        setFormData((prev) => ({
          ...prev,
          links: [...prev.links, linkInput.trim()],
        }));
      }
      setLinkInput('');
    }
  };

  // Remove link
  const removeLink = (index) => {
    const updatedLinks = formData.links.filter((_, i) => i !== index);
    setFormData((prev) => ({ ...prev, links: updatedLinks }));
  };

  // Validate form
  const validateForm = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = 'Name is required';
    if (!formData.phoneNumber) newErrors.phoneNumber = 'Phone number is required';
    if (!formData.ownerName) newErrors.ownerName = 'Owner name is required';
    if (!formData.location) newErrors.location = 'Location is required';
    if (!formData.area) newErrors.area = 'Area is required';
    if (!formData.description) newErrors.description = 'Description is required';
    if (formData.category.length === 0 && formData.links.length === 0) {
      newErrors.category = 'At least one category or link is required';
      newErrors.links = 'At least one category or link is required';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
  
    setLoading(true); // Start the loading spinner
    try {
      let bannerUrl = '';
      let dpUrl = '';
  
      // Upload banner to Firebase Storage
      if (formData.banner) {
        bannerUrl = await StorageService.uploadFileToStorage(formData.banner, FILE_TYPES.BANNER);
      }
  
      // Upload DP to Firebase Storage
      if (formData.dp) {
        dpUrl = await StorageService.uploadFileToStorage(formData.dp, FILE_TYPES.DP);
      }
  
      // Map form data to CreateStoreDto structure
      const merchantData = {
        name: formData.name,
        area: formData.area,
        background: bannerUrl,
        category: formData.category,
        desc: formData.description,
        dp: dpUrl,
        links: formData.links,
        location: `${formData.latitude},${formData.longitude}`, // Lat/long as string
        phoneNumber: formData.phoneNumber,
        ownerName: formData.ownerName,
        status: "under review",
      };
  
      // Call onboard merchant service
      await merchantService.onboardMerchant(merchantData);
      alert('Merchant successfully onboarded!');
    } catch (error) {
      // Extract the error response data
      const errorMessage = error?.response?.data?.message || 'An error occurred';
      const errorDetails = `Error: ${error?.response?.data?.error || 'Unknown error'}, Status Code: ${error?.response?.data?.statusCode || 'N/A'}`;
  
      console.error('Error onboarding merchant:', errorMessage);
      alert(`Failed to onboard merchant. \nMessage: ${errorMessage} \nDetails: ${errorDetails}`);
    } finally {
      setLoading(false); // Stop the loading spinner
    }
  };
  

  return (
    <div className="form-container">
      {loading && (
        <div className="loading-overlay">
          <div className="spinner"></div>
          <p>Submitting...</p>
        </div>
      )}
      <h2>New Merchant Form</h2>
      <form onSubmit={handleSubmit}>
        <label>Name:</label>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleInputChange}
        />
        {errors.name && <p className="error-text">{errors.name}</p>}

        <label>Phone Number:</label>
        <input
          type="text"
          name="phoneNumber"
          placeholder="Phone Number"
          value={formData.phoneNumber}
          onChange={handleInputChange}
        />
        {errors.phoneNumber && <p className="error-text">{errors.phoneNumber}</p>}

        <label>Owner Name:</label>
        <input
          type="text"
          name="ownerName"
          placeholder="Owner Name"
          value={formData.ownerName}
          onChange={handleInputChange}
        />
        {errors.ownerName && <p className="error-text">{errors.ownerName}</p>}

        <label>Location:</label>
        <div>
          <input
            type="text"
            name="location"
            placeholder="Location"
            value={formData.location}
            onChange={handleInputChange}
          />
          <button type="button" onClick={handleLocation}>
            Get Location (Lat/Long)
          </button>
        </div>
        {errors.location && <p className="error-text">{errors.location}</p>}
        {formData.latitude && formData.longitude && (
          <p>
            Latitude: {formData.latitude}, Longitude: {formData.longitude}
          </p>
        )}

        <label>Area:</label>
        <input
          type="text"
          name="area"
          placeholder="Area"
          value={formData.area}
          onChange={handleInputChange}
        />
        {errors.area && <p className="error-text">{errors.area}</p>}

        <label>Description:</label>
        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleInputChange}
        />
        {errors.description && <p className="error-text">{errors.description}</p>}

        {/* Category field with tag functionality */}
        <label>Categories:</label>
        <div className="tag-input-wrapper">
          {formData.category.map((tag, index) => (
            <div className="tag-bubble" key={index}>
              {tag}
              <span className="tag-remove" onClick={() => removeCategory(index)}>
                &times;
              </span>
            </div>
          ))}
        </div>
        <input
          type="text"
          value={categoryInput}
          onChange={(e) => setCategoryInput(e.target.value)}
          onKeyDown={handleCategoryInputKeyDown}
          placeholder="Add Category (Press Enter)"
          className="tag-input"
        />
        {errors.category && <p className="error-text">{errors.category}</p>}

        {/* Banner and DP file uploads */}
        <label>Banner (Image):</label>
        <input type="file" name="banner" onChange={handleFileChange} accept="image/*" />

        <label>DP (Display Picture):</label>
        <input type="file" name="dp" onChange={handleFileChange} accept="image/*" />

        {/* Links field with tag functionality */}
        <label>Links:</label>
        <div className="tag-input-wrapper">
          {formData.links.map((link, index) => (
            <div className="tag-bubble" key={index}>
              {link}
              <span className="tag-remove" onClick={() => removeLink(index)}>
                &times;
              </span>
            </div>
          ))}
        </div>
        <input
          type="text"
          value={linkInput}
          onChange={(e) => setLinkInput(e.target.value)}
          onKeyDown={handleLinkInputKeyDown}
          placeholder="Add Link (Press Enter)"
          className="tag-input"
        />
        {errors.links && <p className="error-text">{errors.links}</p>}

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default NewMerchantForm;
