import { Circle } from '@react-google-maps/api';
import React from 'react';

export type CirclePivotProps = {
  id: number | string;
  centerLat: number;
  centerLng: number;
  pivotColor?: string;
  lineColor?: string;
};

const circleOptions = {
  strokeOpacity: 1,
  strokeWeight: 2,
  fillOpacity: 1,
  clickable: false,
  draggable: false,
  editable: false,
  visible: true,
  zIndex: 1,
};

const DotDevice: React.FC<CirclePivotProps> = (props) => {
  /** Props */
  const { centerLat, centerLng } = props;

  const pivotColor = props.pivotColor ? props.pivotColor : '#000';

  return (
    <>
      <Circle
        center={{ lat: centerLat, lng: centerLng }}
        options={{
          ...circleOptions,
          strokeColor: pivotColor,
          fillColor: pivotColor,
          radius: 50,
          clickable: true,
        }}
      />
    </>
  );
};

export default DotDevice;
