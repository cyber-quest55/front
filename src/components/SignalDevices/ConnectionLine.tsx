import React from 'react';
import { Polyline } from '@react-google-maps/api';

export type ConnectionLineProps = {
  fromLat: number;
  fromLng: number;
  toLat: number;
  toLng: number;
  lineColor: string;
};

const ConnectionLine: React.FC<ConnectionLineProps> = ({
  fromLat,
  fromLng,
  toLat,
  toLng,
  lineColor,
}) => {
  if (!fromLat || !fromLng || !toLat || !toLng) return null;

  const path = [
    { lat: fromLat, lng: fromLng },
    { lat: toLat, lng: toLng },
  ];

  return (
    <Polyline
      path={path}
      options={{
        strokeColor: lineColor,
        strokeOpacity: 1,
        strokeWeight: 3,
        clickable: false,
        draggable: false,
        editable: false,
        visible: true,
        zIndex: 1,
      }}
    />
  );
};

export default ConnectionLine;
