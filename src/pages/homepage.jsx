import React, { useState } from 'react';
import './homepage.css'; // Importing the CSS for styling
import Merchant from '../tabs/merchant/Merchant'; // Importing the Merchant component
import OnBoard from '../tabs/onboard/OnBoard'; // Importing the OnBoard component

const Homepage = () => {
  const [activeTab, setActiveTab] = useState('merchant'); // State to manage the active tab

  const handleTabChange = (tabName) => {
    setActiveTab(tabName);
  };

  return (
    <div className="admin-container">
      <div className="sidebar">
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
