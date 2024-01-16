import { Circle, InfoWindowF } from '@react-google-maps/api';
import { Typography } from 'antd';
import React, { useState } from 'react';

export type CirclePivotProps = {
  id: number | string;
  centerLat: number;
  centerLng: number;
  name: string;
  updated: string;
  deviceColor?: string;
  lineColor?: string;
  infoWindow?: boolean;
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
  
  const [infoWindowVisible, setInfoWindowVisible] = useState(false);

  if (!centerLat || !centerLng ) {
    return <></>;
  }


  const deviceColor = props.deviceColor ? props.deviceColor : '#000';

  return (
    <>
      <Circle
        center={{ lat: centerLat, lng: centerLng }}
        onMouseOver={() => setInfoWindowVisible(true)}
        onMouseOut={() => setInfoWindowVisible(false)}
        options={{
          ...circleOptions,
          strokeColor: deviceColor,
          fillColor: deviceColor,
          radius: 50,
          clickable: true,
        }}
      />
      {infoWindowVisible ? (
        <InfoWindowF
          position={{
            lat: centerLat,
            lng: centerLng,
          }}
          options={{
            zIndex: 12,
          }}
          zIndex={12}
        >
          <div
            style={{
              opacity: 0.75,
              padding: 12,
            }}
          >
            <Typography.Title level={5}>{props.name}</Typography.Title>
            <Typography.Text>{props.updated}</Typography.Text>
          </div>
        </InfoWindowF>
      ) : null}
    </>
  );
};

export default DotDevice;
