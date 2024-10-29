import React from 'react';
import { Card } from 'antd';

interface MapDisplayProps {
  latitude: number;
  longitude: number;
}

const MapDisplay: React.FC<MapDisplayProps> = ({ latitude, longitude }) => {
  const mapUrl = `https://www.google.com/maps/embed/v1/place?key=YOUR_API_KEY&q=${latitude},${longitude}`;

  return (
    <Card className="map-container">
      <iframe
        title="Location Map"
        width="100%"
        height="100%"
        frameBorder="0"
        src={mapUrl}
        allowFullScreen
      />
    </Card>
  );
};

export default MapDisplay;
