import React, { useCallback } from 'react';
import { Polyline } from '@react-google-maps/api';

export type ConnectionLineProps = {
  fromLat: number;
  fromLng: number;
  toLat: number;
  toLng: number;
  lineColor: string;
  infoWindowRef: any;
  fromName: string;
  toName: string;
  quality: string;
  strength: number;
  isGps: boolean;
};

const ConnectionLine: React.FC<ConnectionLineProps> = ({
  fromLat,
  fromLng,
  toLat,
  toLng,
  lineColor,
  infoWindowRef,
  fromName,
  toName,
  quality,
  strength
}) => {
  const handleMouseEnter = useCallback(() => {
    const midLat = (fromLat + toLat) / 2;
    const midLng = (fromLng + toLng) / 2;
    infoWindowRef?.current?.setContentAndOpen(
      {
        fromName,
        toName,
        quality,
        strength,
      }, {
        lat: midLat,
        lng: midLng
      }
    )
  }, [
    fromName,
    toName,
    quality,
    strength,
    toLat,
    toLng,
    infoWindowRef
  ]);

  const handleMouseLeave = useCallback(() => {
    infoWindowRef?.current?.close()
  }, [infoWindowRef]);

  const path = [
    { lat: fromLat, lng: fromLng },
    { lat: toLat, lng: toLng },
  ];

  if (!fromLat || !fromLng || !toLat || !toLng) return null;

  return (
    <Polyline
      path={path}
      onMouseOver={handleMouseEnter}
      onMouseOut={handleMouseLeave}
      options={{
        strokeColor: lineColor,
        strokeOpacity: 1,
        strokeWeight: 3,
        clickable: true,
        draggable: false,
        editable: false,
        visible: true,
        zIndex: 1,
      }}
    />
  );
};

export default ConnectionLine;
