import React, { useState } from 'react';
import './QRForm.css'; // Import CSS for styling

const QRForm = ({ onBack }) => {
  const [formData, setFormData] = useState({
    active: true,
    ads: true,
    ads_link: '',
    data: {
      scans: 0,
      link: '',
    },
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleDataChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, data: { ...prev.data, [name]: value } }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('QR Form submitted:', formData);
    // Handle form submission logic here
  };

  return (
    <div className="form-container">
      <h2>New QR Form</h2>
      <form onSubmit={handleSubmit}>
        <label>Active:</label>
        <select
          name="active"
          value={formData.active}
          onChange={handleInputChange}
          required
        >
          <option value={true}>Active</option>
          <option value={false}>Inactive</option>
        </select>

        <label>Ads Enabled:</label>
        <select
          name="ads"
          value={formData.ads}
          onChange={handleInputChange}
          required
        >
          <option value={true}>Yes</option>
          <option value={false}>No</option>
        </select>

        <label>Ads Link:</label>
        <input
          type="text"
          name="ads_link"
          placeholder="Ads Link"
          value={formData.ads_link}
          onChange={handleInputChange}
          required
        />

        <label>Data Scans:</label>
        <input
          type="number"
          name="scans"
          placeholder="Number of Scans"
          value={formData.data.scans}
          onChange={handleDataChange}
          required
        />

        <label>Data Link:</label>
        <input
          type="text"
          name="link"
          placeholder="Data Link"
          value={formData.data.link}
          onChange={handleDataChange}
          required
        />

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default QRForm;
