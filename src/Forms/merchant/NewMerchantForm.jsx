import React, { useState } from 'react';
import './NewMerchantForm.css'; // Import CSS for styling

const NewMerchantForm = ({ onBack }) => {
  const [formData, setFormData] = useState({
    storeName: '',
    storeOwner: '',
    phoneNumber: '',
    location: '',
    images: '',
    description: '',
    socialMediaLinks: '',
    file: null,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setFormData((prev) => ({ ...prev, file: e.target.files[0] }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log('Form submitted:', formData);
  };

  return (
    <div className="form-container">
      <h2>New Merchant Form</h2>
      <form onSubmit={handleSubmit}>
        <label>Store Name:</label>
        <input
          type="text"
          name="storeName"
          placeholder="Store Name"
          value={formData.storeName}
          onChange={handleInputChange}
          required
        />

        <label>Store Owner Name:</label>
        <input
          type="text"
          name="storeOwner"
          placeholder="Store Owner Name"
          value={formData.storeOwner}
          onChange={handleInputChange}
          required
        />

        <label>Phone Number:</label>
        <input
          type="text"
          name="phoneNumber"
          placeholder="Phone Number"
          value={formData.phoneNumber}
          onChange={handleInputChange}
          required
        />

        <label>Location of the store:</label>
        <input
          type="text"
          name="location"
          placeholder="Location"
          value={formData.location}
          onChange={handleInputChange}
          required
        />
        <label>Location of the store:</label>
        <input
          type="text"
          name="location"
          placeholder="Location"
          value={formData.location}
          onChange={handleInputChange}
          required
        />
        <label>Location of the store:</label>
        <input
          type="text"
          name="location"
          placeholder="Location"
          value={formData.location}
          onChange={handleInputChange}
          required
        />

        <label>Images of the store (links format):</label>
        <input
          type="text"
          name="images"
          placeholder="Image links"
          value={formData.images}
          onChange={handleInputChange}
          required
        />

        <label>Description of the store:</label>
        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleInputChange}
          required
        />

        <label>Social Media Links:</label>
        <input
          type="text"
          name="socialMediaLinks"
          placeholder="Social Media Links"
          value={formData.socialMediaLinks}
          onChange={handleInputChange}
          required
        />

        <label>Upload File:</label>
        <input type="file" name="file" onChange={handleFileChange} />

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default NewMerchantForm;
