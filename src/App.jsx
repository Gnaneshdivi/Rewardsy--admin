import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Homepage from './pages/homepage'; // Main dashboard component
import MerchantDetails from './pages/merchant/MerchantDetails'; // New component for merchant details
import OfferDetails from './pages/Offers/OfferDetails'
import ReelDetails from './pages/Reel/ReelDetails';
import QRDetails from './pages/QR/QRDetails';



function App() {
  return (
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/merchant/:storeId" element={<MerchantDetails />} />
        <Route path="/offer/:id" element={<OfferDetails />} />
        <Route path="/reel/:id" element={<ReelDetails />} />
        <Route path="/qr/:id" element={<QRDetails />} />
      </Routes>
  );
}

export default App;
