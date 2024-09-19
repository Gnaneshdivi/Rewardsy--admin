import React, { useState } from 'react';
import './homepage.css'; // Importing the CSS for styling
import Merchant from '../tabs/merchant/Merchant'; // Importing the Merchant component
import OnBoard from '../tabs/onboard/OnBoard'; // Importing the OnBoard component

const Homepage = () => {
  const [activeTab, setActiveTab] = useState('merchant'); // State to manage the active tab
  const [isSidebarVisible, setIsSidebarVisible] = useState(false); // State for hamburger menu

  const handleTabChange = (tabName) => {
    setActiveTab(tabName);
    setIsSidebarVisible(false); // Close sidebar when a tab is selected
  };

  const toggleSidebar = () => {
    setIsSidebarVisible(!isSidebarVisible);
  };

  return (
    <div className="admin-container">
      <div className="hamburger" onClick={toggleSidebar}>
        <div className="bar"></div>
        <div className="bar"></div>
        <div className="bar"></div>
      </div>

      <div className={`sidebar ${isSidebarVisible ? 'visible' : ''}`}>
        <button
          className={activeTab === 'merchant' ? 'active' : ''}
          onClick={() => handleTabChange('merchant')}
        >
          Merchant
        </button>
        <button
          className={activeTab === 'onboard' ? 'active' : ''}
          onClick={() => handleTabChange('onboard')}
        >
          On Board
        </button>
      </div>
      
      <div className="content">
        {activeTab === 'merchant' && <Merchant />}
        {activeTab === 'onboard' && <OnBoard />}
      </div>
    </div>
  );
};

export default Homepage;
