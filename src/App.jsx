import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Homepage from './pages/homepage'; // Main dashboard component
import MerchantDetails from './pages/merchant/MerchantDetails'; // New component for merchant details
import OfferDetails from './pages/Offers/OfferDetails'
import ReelDetails from './pages/Reel/ReelDetails';

function App() {
  return (
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/merchant/:merchantId" element={<MerchantDetails />} />
        <Route path="/offer/:id" element={<OfferDetails />} />
        <Route path="/reel/:id" element={<ReelDetails />} />
      </Routes>
  );
}

export default App;
