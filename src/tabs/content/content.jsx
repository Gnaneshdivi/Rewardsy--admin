import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ContentForm from '../../Forms/ContentForm'; // Import the form component for new reels
import './Content.css'; // Import the CSS for styling

const Content = () => {
  const [content, setContent] = useState([]);
  const [filteredContent, setFilteredContent] = useState([]);
  const [searchQuery, setSearchQuery] = useState(''); // State for search
  const [isAddingNewReel, setIsAddingNewReel] = useState(false); // Toggle form for new reel
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch reels content from your backend API (dummy data for now)
    const fetchedContent = [
      {
        id: '1',
        title: 'Reel 1',
        description: 'Best orange fruit juice in town',
        link: 'https://firebasestorage.googleapis.com/v0/b/rewardsy-app.appspot.com/o/Store1_Reel3.mp4?alt=media&token=f1c2fd82-a414-474b-8d1e-c5af3b8ecd76',
        store: 'HrEUV9JfzXkcDrpWaOhM',
        url: 'https://picsum.photos/200/300?random=3',
      },
      {
        id: '2',
        title: 'Reel 2',
        description: 'Beautiful beach view',
        link: 'https://firebasestorage.googleapis.com/v0/b/rewardsy-app.appspot.com/o/Store2_Reel3.mp4',
        store: 'J3fRV9EfzZkcDrtPaJpX',
        url: 'https://picsum.photos/200/300?random=4',
      },
      // More dummy content reels
    ];
    setContent(fetchedContent);
    setFilteredContent(fetchedContent); // Set initial filtered content
  }, []);

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
        <ContentForm onBack={handleNewReel} />
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
