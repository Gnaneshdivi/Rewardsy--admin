import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './ReelDetails.css'; // Import the CSS for styling

const OfferDetails = () => {
  const { id } = useParams(); // Get the content ID from the URL parameters
  const navigate = useNavigate();

  // Simulated fetched content data (mock data)
  const dummyData = {
    1: {
      description: 'Best orange fruit juice in town',
      interactions: 0,
      link: 'https://firebasestorage.googleapis.com/v0/b/rewardsy-app.appspot.com/o/Store1_Reel3.mp4?alt=media&token=f1c2fd82-a414-474b-8d1c-c5af3b8ecd76',
      store: 'HrEUV9JfzXkcDrpWaOhM',
      tags: ['Juice', 'Drink'],
      url: 'https://picsum.photos/200/300?random=3'
    },
    // Add more dummy content if needed
  };

  const [contentData, setContentData] = useState(null); // Store the content data
  const [isEditing, setIsEditing] = useState(false); // Toggle edit mode
  const [tagInput, setTagInput] = useState(''); // For tag input

  // Fetch the content data based on the ID
  useEffect(() => {
    const fetchedContent = dummyData[id];
    if (fetchedContent) {
      setContentData(fetchedContent);
    } else {
      console.error('Content not found');
    }
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

  const handleSave = () => {
    setIsEditing(false);
    console.log('Content data saved:', contentData); // Simulate saving the data
  };

  if (!contentData) {
    return <p>Loading Content details...</p>; // Show a loading message while fetching
  }

  return (
    <div className="offer-details-container">
      <div className="offer-form-background">
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

          <label>Store ID:</label>
          <input
            type="text"
            name="store"
            value={contentData.store}
            onChange={handleInputChange}
            disabled={!isEditing}
          />

          <label>Content Image:</label>
          <div className="image-preview">
            <img src={contentData.url} alt="Content" />
          </div>
          {isEditing && (
            <input
              type="file"
              onChange={(e) => {
                if (e.target.files && e.target.files[0]) {
                  const newImageURL = URL.createObjectURL(e.target.files[0]);
                  setContentData((prev) => ({ ...prev, url: newImageURL }));
                }
              }}
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

export default OfferDetails;
