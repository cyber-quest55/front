import { OverlayView, OverlayViewF } from '@react-google-maps/api';
import React from 'react';
import Image from '../../../public/images/devices/water-pump.png';

export type WaterPumpProps = {
  id: number | string;
  centerLat: number;
  centerLng: number;
  pivotColor?: string;
  lineColor?: string;
};

const WaterPumpDevice: React.FC<WaterPumpProps> = (props) => {
  /** Props */
  const { centerLat, centerLng } = props;

  return (
    <>
      <OverlayViewF
        position={{ lat: centerLat, lng: centerLng }}
        mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
      >
        <img src={Image} style={{ width: 44, height: 44 }} />
      </OverlayViewF>
    </>
  );
};

export default WaterPumpDevice;
