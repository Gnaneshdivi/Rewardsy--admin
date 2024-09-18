import React, { useState, useEffect } from 'react';
import './ContentForm.css'; // Import CSS for styling
import TagInput from '../Components/tags/TagInput'; // Import the reusable TagInput component

const ContentForm = ({ onBack }) => {
  const [formData, setFormData] = useState({
    description: '',
    interactions: 0,
    link: '',
    store: '',
    tags: [], // Ensure tags is initialized as an empty array
    url: '',
  });
  const [videoFile, setVideoFile] = useState(null); // For video upload
  const [imageFile, setImageFile] = useState(null); // For image upload
  const [videoPreview, setVideoPreview] = useState(''); // For video preview
  const [imagePreview, setImagePreview] = useState(''); // For image preview

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleVideoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setVideoFile(file);
      setVideoPreview(URL.createObjectURL(file)); // Generate preview URL for video
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file)); // Generate preview URL for image
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Content Form submitted:', formData, videoFile, imageFile);
    // Handle form submission logic here
  };

  useEffect(() => {
    // Clean up URLs when component unmounts to prevent memory leaks
    return () => {
      if (videoPreview) {
        URL.revokeObjectURL(videoPreview);
      }
      if (imagePreview) {
        URL.revokeObjectURL(imagePreview);
      }
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

       
        {/* Tags Section using reusable TagInput component */}
        <TagInput
          tags={formData.tags}
          setTags={(newTags) =>
            setFormData((prev) => ({ ...prev, tags: newTags }))
          }
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

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default ContentForm;
