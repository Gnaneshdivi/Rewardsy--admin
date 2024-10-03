import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ContentForm from '../../Forms/ContentForm'; // Import the form component for new reels
import './Content.css'; // Import the CSS for styling

const Content = ({ content, id }) => {
  const [filteredContent, setFilteredContent] = useState(content || []); // Initialize with the passed content data
  const [searchQuery, setSearchQuery] = useState(''); // State for search
  const [isAddingNewReel, setIsAddingNewReel] = useState(false); // Toggle form for new reel
  const navigate = useNavigate();

  useEffect(() => {
    // Set initial filtered content when the component mounts or content changes
    setFilteredContent(content);
  }, [content]);

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    filterContent(query);
  };

  const filterContent = (query) => {
    let updatedContent = [...content];

    // Filter by search query
    if (query) {
      updatedContent = updatedContent.filter((reel) =>
        reel.title.toLowerCase().includes(query.toLowerCase())
      );
    }

    setFilteredContent(updatedContent);
  };

  const handleReelClick = (id) => {
    navigate(`/reel/${id}`); // Navigate to the reel-specific page
  };

  const handleNewReel = () => {
    setIsAddingNewReel(!isAddingNewReel); // Toggle between form and grid
  };

  const handleNewReelAdded = (newReel) => {
    // Add the new reel to the list and update the filtered content
    setFilteredContent((prevContent) => [...prevContent, newReel]);
    setIsAddingNewReel(false); // Go back to the grid view
  };

  return (
    <div className="content-container">
      <div className="content-header">
        <h2>Reels</h2>
        {!isAddingNewReel ? (
          <>
            <div className="search-container">
              <input
                type="text"
                placeholder="Search by Reel Title"
                value={searchQuery}
                onChange={handleSearchChange}
              />
            </div>
            <button className="new-reel-btn" onClick={handleNewReel}>
              New Reel
            </button>
          </>
        ) : (
          <button className="back-btn" onClick={handleNewReel}>
            Back
          </button>
        )}
      </div>

      {isAddingNewReel ? (
        <ContentForm onBack={handleNewReel} storeId={id} onReelAdded={handleNewReelAdded} />
      ) : (
        <div className="reel-grid">
          {filteredContent.map((reel) => (
            <div key={reel.id} className="reel-card" onClick={() => handleReelClick(reel.id)}>
              <img src={reel.url} alt={reel.title} />
              <p>{reel.title}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Content;
