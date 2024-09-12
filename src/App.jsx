import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Homepage from './pages/homepage'; // Main dashboard component
import MerchantDetails from './pages/merchant/MerchantDetails'; // New component for merchant details

function App() {
  return (
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/merchant/:merchantId" element={<MerchantDetails />} />
      </Routes>
  );
}

export default App;
