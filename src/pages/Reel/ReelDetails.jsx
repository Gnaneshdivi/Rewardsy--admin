import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './ReelDetails.css'; // Import the CSS for styling
import { contentService } from '../../services/ContentService'; // Import contentService
import StorageService, { FILE_TYPES } from '../../services/StorageService'; // Import Firebase storage service

const ReelDetails = () => {
  const { id } = useParams(); // Get the reel ID from the URL parameters
  const navigate = useNavigate();
  
  const [contentData, setContentData] = useState(null); // Store the content data
  const [originalContentData, setOriginalContentData] = useState(null); // Store original data to compare changes
  const [isEditing, setIsEditing] = useState(false); // Toggle edit mode
  const [tagInput, setTagInput] = useState(''); // For tag input
  const [loading, setLoading] = useState(true); // For loading spinner
  const [newImageFile, setNewImageFile] = useState(null); // Track new image upload
  
  // Fetch the content data based on the ID
  useEffect(() => {
    const fetchContent = async () => {
      try {
        const fetchedContent = await contentService.getContentById(id);
        setContentData(fetchedContent); // Load the data into state
        setOriginalContentData(fetchedContent); // Save original data for comparison
      } catch (error) {
        console.error('Error fetching content:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchContent();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setContentData((prev) => ({ ...prev, [name]: value }));
  };

  const handleTagInputChange = (e) => {
    setTagInput(e.target.value);
  };

  const handleTagInputKeyDown = (e) => {
    if (e.key === 'Enter' && tagInput) {
      e.preventDefault();
      setContentData((prev) => ({
        ...prev,
        tags: [...prev.tags, tagInput],
      }));
      setTagInput('');
    }
  };

  const removeTag = (index) => {
    const updatedTags = [...contentData.tags];
    updatedTags.splice(index, 1);
    setContentData((prev) => ({ ...prev, tags: updatedTags }));
  };

  const toggleEditMode = () => {
    setIsEditing(!isEditing);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewImageFile(file); // Save new image file for upload
      const newImageURL = URL.createObjectURL(file); // Preview the image
      setContentData((prev) => ({ ...prev, url: newImageURL }));
    }
  };

  const handleSave = async () => {
    try {
      setLoading(true);

      const updatedData = {};
      
      // Compare contentData with originalContentData and only include changed fields
      if (contentData.description !== originalContentData.description) {
        updatedData.description = contentData.description;
      }
      if (contentData.tags !== originalContentData.tags) {
        updatedData.tags = contentData.tags;
      }

      // Check if a new image was uploaded
      if (newImageFile) {
        // Upload the new image to Firebase
        const imageUrl = await StorageService.uploadFileToStorage(newImageFile, FILE_TYPES.CONTENT);
        updatedData.url = imageUrl; // Add the new image URL to update payload
      }

      // Call API to update if any changes exist
      if (Object.keys(updatedData).length > 0) {
        await contentService.updateContent(id, updatedData); // Call API to update
      }

      setIsEditing(false);
      console.log('Content data updated:', contentData);
    } catch (error) {
      console.error('Error updating content:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <p>Loading content details...</p>; // Show a loading message while fetching
  }

  if (!contentData) {
    return <p>Content not found</p>; // If no content data is found
  }

  return (
    <div className="content-details-container">
      <div className="content-form-background">
        <h2>Content Details</h2>

        {/* Video Player */}
        <div className="video-player">
          <video controls>
            <source src={contentData.link} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>

        <form>
          <label>Description:</label>
          <textarea
            name="description"
            value={contentData.description}
            onChange={handleInputChange}
            disabled={!isEditing}
          />

          <label>Interactions:</label>
          <input
            type="number"
            name="interactions"
            value={contentData.interactions}
            disabled
          />

          <label>Content Image:</label>
          <div className="image-preview">
            <img src={contentData.url} alt="Content" />
          </div>
          {isEditing && (
            <input
              type="file"
              onChange={handleImageChange}
              accept="image/*"
            />
          )}

          {/* Tags Section */}
          <label>Tags:</label>
          <div className="tag-input-wrapper">
            {contentData.tags.map((tag, index) => (
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

export default ReelDetails;
