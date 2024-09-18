import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './OfferDetails.css'; // Import the CSS for styling

const OfferDetails = () => {
  const { id } = useParams(); // Get the offer ID from the URL parameters
  const navigate = useNavigate();

  // Simulated fetched offer data (mock data)
  const dummyData = {
    GvQlHr9Rqn6CLPwtaWr1: {
      active: true,
      description: 'Buy 1 Get 1 Free on selected toys!',
      endDate: '2024-12-31',
      id: 'GvQlHr9Rqn6CLPwtaWrl',
      image: 'https://picsum.photos/200/300?random=4',
      numberOfOffers: 150,
      redemptions: 83,
      startDate: '2024-09-20',
      store: 'ZkPqGf7Qin2YHLvcaWnB',
      tags: ['Toys', 'BOGO'],
      title: 'Toy Wonderland Offer',
    },
    // Add more dummy offers if needed
  };

  const [offerData, setOfferData] = useState(null); // Store the offer data
  const [isEditing, setIsEditing] = useState(false); // Toggle edit mode
  const [tagInput, setTagInput] = useState(''); // For tag input

  // Fetch the offer data based on the ID
  useEffect(() => {
    const fetchedOffer = dummyData[id];
    if (fetchedOffer) {
      setOfferData(fetchedOffer);
    } else {
      console.error('Offer not found');
    }
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
      const newImageURL = URL.createObjectURL(e.target.files[0]);
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

  const handleSave = () => {
    setIsEditing(false);
    console.log('Offer data saved:', offerData); // Simulate saving the data
  };

  if (!offerData) {
    return <p>Loading offer details...</p>; // Show a loading message while fetching
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
