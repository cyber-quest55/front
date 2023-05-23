import { InfoWindowF, OverlayView, OverlayViewF } from '@react-google-maps/api';
import { Typography } from 'antd';
import React, { useState } from 'react';
import Image from '../../../public/images/devices/water-pump.png';

export type WaterPumpProps = {
  id: number | string;
  centerLat: number;
  centerLng: number;
  pivotColor?: string;
  lineColor?: string;
  name: string;
  updated: string;
};

const WaterPumpDevice: React.FC<WaterPumpProps> = (props) => {
  /** Props */
  const { centerLat, centerLng } = props;
  const [infoWindowVisible, setInfoWindowVisible] = useState(false);

  return (
    <>
      <OverlayViewF
        position={{ lat: centerLat, lng: centerLng }}
        mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
      >
        <div
          onMouseLeave={() => setInfoWindowVisible(false)}
          onMouseEnter={() => setInfoWindowVisible(true)}
        >
          <img src={Image} style={{ width: 44, height: 44 }} />
        </div>
      </OverlayViewF>
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
            onMouseLeave={() => setInfoWindowVisible(false)}
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

export default WaterPumpDevice;
