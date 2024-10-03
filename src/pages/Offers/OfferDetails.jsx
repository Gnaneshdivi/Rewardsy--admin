import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './OfferDetails.css'; // Import the CSS for styling
import { offerService } from '../../services/OfferService'; // Import Offer Service
import StorageService, { FILE_TYPES } from '../../services/StorageService'; // Import storage service

const OfferDetails = () => {
  const { id } = useParams(); // Get the offer ID from the URL parameters
  const navigate = useNavigate();

  const [offerData, setOfferData] = useState(null); // Store the offer data
  const [isEditing, setIsEditing] = useState(false); // Toggle edit mode
  const [tagInput, setTagInput] = useState(''); // For tag input
  const [loading, setLoading] = useState(true); // For loading state
  const [newImageFile, setNewImageFile] = useState(null); // Track if a new image is uploaded
  const [originalOfferData, setOriginalOfferData] = useState(null); // Store original offer data for comparison

  // Fetch the offer data based on the ID
  useEffect(() => {
    const fetchOffer = async () => {
      try {
        const fetchedOffer = await offerService.getOfferById(id);
        setOfferData(fetchedOffer);
        setOriginalOfferData(fetchedOffer); // Save original data for comparison
      } catch (error) {
        console.error('Error fetching offer:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchOffer();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setOfferData((prev) => ({ ...prev, [name]: value }));
  };

  const handleTagInputChange = (e) => {
    setTagInput(e.target.value);
  };

  const handleTagInputKeyDown = (e) => {
    if (e.key === 'Enter' && tagInput) {
      e.preventDefault();
      setOfferData((prev) => ({
        ...prev,
        tags: [...prev.tags, tagInput],
      }));
      setTagInput('');
    }
  };

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setNewImageFile(file); // Track the new image file
      const newImageURL = URL.createObjectURL(file);
      setOfferData((prev) => ({ ...prev, image: newImageURL }));
    }
  };

  const removeTag = (index) => {
    const updatedTags = [...offerData.tags];
    updatedTags.splice(index, 1);
    setOfferData((prev) => ({ ...prev, tags: updatedTags }));
  };

  const toggleEditMode = () => {
    setIsEditing(!isEditing);
  };

  const handleSave = async () => {
    try {
      setLoading(true);
      let updatedData = {};

      // Compare and update only changed fields
      if (offerData.title !== originalOfferData.title) {
        updatedData.title = offerData.title;
      }
      if (offerData.description !== originalOfferData.description) {
        updatedData.description = offerData.description;
      }
      if (offerData.startDate !== originalOfferData.startDate) {
        updatedData.startDate = offerData.startDate;
      }
      if (offerData.endDate !== originalOfferData.endDate) {
        updatedData.endDate = offerData.endDate;
      }
      if (JSON.stringify(offerData.tags) !== JSON.stringify(originalOfferData.tags)) {
        updatedData.tags = offerData.tags;
      }
      if (offerData.active !== originalOfferData.active) {
        updatedData.active = offerData.active;
      }
  

      // Handle image upload if a new image was selected
      if (newImageFile) {
        const uploadedImageUrl = await StorageService.uploadFileToStorage(newImageFile, FILE_TYPES.CONTENT);
        updatedData.image = uploadedImageUrl;
      }

      // If there's something to update, call the API
      if (Object.keys(updatedData).length > 0) {
        await offerService.updateOffer(id, updatedData);
        setOriginalOfferData({ ...offerData, ...updatedData }); // Update original offer data
        console.log('Offer data updated:', updatedData);
      }

      setIsEditing(false); // Exit edit mode after save
    } catch (error) {
      console.error('Error updating offer:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <p>Loading offer details...</p>; // Show a loading message while fetching
  }

  if (!offerData) {
    return <p>Offer not found</p>; // If no offer data is found
  }

  return (
    <div className="offer-details-container">
      <div className="offer-form-background">
        <h2>Offer Details</h2>

        <form>
          <label>Active:</label>
          <select
            name="active"
            value={offerData.active ? 'true' : 'false'}
            onChange={(e) =>
              setOfferData((prev) => ({
                ...prev,
                active: e.target.value === 'true',
              }))
            }
            disabled={!isEditing}
          >
            <option value="true">Active</option>
            <option value="false">Inactive</option>
          </select>

          <label>Title:</label>
          <input
            type="text"
            name="title"
            value={offerData.title}
            onChange={handleInputChange}
            disabled={!isEditing}
          />

          <label>Description:</label>
          <textarea
            name="description"
            value={offerData.description}
            onChange={handleInputChange}
            disabled={!isEditing}
          />

          <label>Start Date:</label>
          <input
            type="date"
            name="startDate"
            value={offerData.startDate}
            onChange={handleInputChange}
            disabled={!isEditing}
          />

          <label>End Date:</label>
          <input
            type="date"
            name="endDate"
            value={offerData.endDate}
            onChange={handleInputChange}
            disabled={!isEditing}
          />

          <label>Number of Offers:</label>
          <input
            type="number"
            name="numberOfOffers"
            value={offerData.numberOfOffers}
            disabled
          />

          <label>Redemptions:</label>
          <input
            type="number"
            name="redemptions"
            value={offerData.redemptions}
            disabled
          />

          <label>Offer Image:</label>
          <div className="image-preview">
            <img src={offerData.image} alt="Offer" />
          </div>
          {isEditing && (
            <input type="file" onChange={handleImageChange} accept="image/*" />
          )}

          {/* Tags Section */}
          <label>Tags:</label>
          <div className="tag-input-wrapper">
            {offerData.tags.map((tag, index) => (
              <div className="tag-bubble" key={index}>
                {tag}
                {isEditing && (
                  <span className="tag-remove" onClick={() => removeTag(index)}>
                    &times;
                  </span>
                )}
              </div>
            ))}
          </div>
          {isEditing && (
            <input
              type="text"
              value={tagInput}
              onChange={handleTagInputChange}
              onKeyDown={handleTagInputKeyDown}
              placeholder="Add Tags Here"
              className="tag-input"
            />
          )}

          {isEditing ? (
            <button type="button" onClick={handleSave}>
              Save
            </button>
          ) : (
            <button type="button" onClick={toggleEditMode}>
              Edit
            </button>
          )}

          <button type="button" onClick={() => navigate(-1)}>
            Back
          </button>
        </form>
      </div>
    </div>
  );
};

export default OfferDetails;
