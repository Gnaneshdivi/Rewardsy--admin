import React, { useState, useEffect } from 'react';
import './ContentForm.css'; 
import TagInput from '../Components/tags/TagInput'; // Import the reusable TagInput component
import { contentService } from '../services/ContentService'; // Import contentService
import StorageService, { FILE_TYPES } from '../services/StorageService'; // Firebase Storage Service

const ContentForm = ({ onBack, storeId, onReelAdded }) => {
  const [formData, setFormData] = useState({
    description: '',
    store: storeId, // Store ID passed as a prop
    tags: [], // Initialize tags as an empty array
  });
  const [videoFile, setVideoFile] = useState(null); // For video upload
  const [imageFile, setImageFile] = useState(null); // For image upload
  const [videoPreview, setVideoPreview] = useState(''); // For video preview
  const [imagePreview, setImagePreview] = useState(''); // For image preview
  const [isLoading, setIsLoading] = useState(false); // For loading spinner

  // Handle input changes for description and other text inputs
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle video file input and generate a preview URL
  const handleVideoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setVideoFile(file);
      setVideoPreview(URL.createObjectURL(file)); // Generate preview URL for video
    }
  };

  // Handle image file input and generate a preview URL
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file)); // Generate preview URL for image
    }
  };

  // Handle form submission and upload files to Firebase Storage
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      let videoUrl = '';
      let imageUrl = '';

      // Upload video file if provided
      if (videoFile) {
        videoUrl = await StorageService.uploadFileToStorage(videoFile, FILE_TYPES.CONTENT); // Get Firebase URL for the video
      }

      // Upload image file if provided
      if (imageFile) {
        imageUrl = await StorageService.uploadFileToStorage(imageFile, FILE_TYPES.CONTENT); // Get Firebase URL for the image
      }

      // Prepare content data with Firebase URLs
      const contentData = {
        ...formData,
        link: videoUrl, // Firebase video URL
        url: imageUrl, // Firebase image URL
      };

      // Send content data to backend
      const newReel = await contentService.createContent(contentData);

      // Notify the parent component about the new reel
      onReelAdded(newReel);

      onBack(); // Navigate back after creation
    } catch (error) {
      console.error('Error creating content:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Clean up preview URLs when component unmounts to prevent memory leaks
  useEffect(() => {
    return () => {
      if (videoPreview) URL.revokeObjectURL(videoPreview);
      if (imagePreview) URL.revokeObjectURL(imagePreview);
    };
  }, [videoPreview, imagePreview]);

  return (
    <div className="form-container">
      <h2>New Content Form</h2>
      <form onSubmit={handleSubmit}>
        <label>Description:</label>
        <textarea
          name="description"
          placeholder="Content Description"
          value={formData.description}
          onChange={handleInputChange}
          required
        />

        {/* Tags Section */}
        <TagInput
          tags={formData.tags}
          setTags={(newTags) => setFormData((prev) => ({ ...prev, tags: newTags }))}
        />

        {/* Video Upload */}
        <label>Upload Video:</label>
        <input type="file" accept="video/*" onChange={handleVideoChange} />
        {videoPreview && (
          <div className="video-preview">
            <video width="400" controls>
              <source src={videoPreview} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        )}

        {/* Image Upload */}
        <label>Upload Image:</label>
        <input type="file" accept="image/*" onChange={handleImageChange} />
        {imagePreview && (
          <div className="image-preview">
            <img src={imagePreview} alt="Uploaded Preview" width="200" />
          </div>
        )}

        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Submitting...' : 'Submit'}
        </button>
      </form>
    </div>
  );
};

export default ContentForm;
