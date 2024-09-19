import React, { useState } from 'react';
import './QRForm.css'; // Import CSS for styling

const QRForm = ({ onBack }) => {
  const [formData, setFormData] = useState({
    active: true,
    ads: false,
    ads_link: '',
    link: '',
    store: '',
    name: '',
  });
  const [adImage, setAdImage] = useState(null); // For ads image upload
  const [dropdownOption, setDropdownOption] = useState(''); // First dropdown
  const [idOptions, setIdOptions] = useState([]); // ID options for second dropdown

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAdsImageChange = (e) => {
    setAdImage(e.target.files[0]);
  };

  const handleDropdownChange = (e) => {
    const selectedOption = e.target.value;
    setDropdownOption(selectedOption);

    // Simulate fetching IDs based on selected dropdown option
    if (selectedOption === 'reel' || selectedOption === 'offer') {
      setIdOptions(['1', '2', '3']); // Replace with actual ID fetching logic
    } else {
      setIdOptions([]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('QR Form submitted:', formData, adImage);
    // Handle form submission logic here
  };

  return (
    <div className="form-container">
      <h2>New QR Form</h2>
      <form onSubmit={handleSubmit}>
        <label>QR Name:</label>
        <input
          type="text"
          name="name"
          placeholder="QR Name"
          value={formData.name}
          onChange={handleInputChange}
          required
        />

        <label>Active:</label>
        <select
          name="active"
          value={formData.active ? 'true' : 'false'}
          onChange={(e) =>
            setFormData((prev) => ({
              ...prev,
              active: e.target.value === 'true',
            }))
          }
        >
          <option value="true">Active</option>
          <option value="false">Inactive</option>
        </select>

        <label>Ads Enabled:</label>
        <select
          name="ads"
          value={formData.ads ? 'true' : 'false'}
          onChange={(e) =>
            setFormData((prev) => ({
              ...prev,
              ads: e.target.value === 'true',
            }))
          }
        >
          <option value="true">Yes</option>
          <option value="false">No</option>
        </select>

        {formData.ads && (
          <>
            <label>Upload Ads Image:</label>
            <input type="file" accept="image/*" onChange={handleAdsImageChange} />
            {adImage && <div className="image-preview"><img src={URL.createObjectURL(adImage)} alt="Ad Preview" /></div>}
          </>
        )}

        {/* Dropdowns for link */}
        <label>Link Type:</label>
        <select value={dropdownOption} onChange={handleDropdownChange}>
          <option value="">Select Type</option>
          <option value="home">Home</option>
          <option value="store">Store</option>
          <option value="reel">Reel</option>
          <option value="offer">Offer</option>
        </select>

        {/* Second dropdown for ID options */}
        {idOptions.length > 0 && (
          <>
            <label>Select ID:</label>
            <select
              name="link"
              value={formData.link}
              onChange={handleInputChange}
            >
              <option value="">Select ID</option>
              {idOptions.map((id) => (
                <option key={id} value={id}>
                  {id}
                </option>
              ))}
            </select>
          </>
        )}

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default QRForm;
