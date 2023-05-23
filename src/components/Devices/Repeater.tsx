import { RadarChartOutlined } from '@ant-design/icons';
import { OverlayView, OverlayViewF } from '@react-google-maps/api';
import React from 'react';

export type RepeaterProps = {
  id: number | string;
  centerLat: number;
  centerLng: number;
  pivotColor?: string;
  lineColor?: string;
  name: string;
  updated: string;
};

const RepeaterDevice: React.FC<RepeaterProps> = (props) => {
  /** Props */
  const { centerLat, centerLng } = props;

  return (
    <>
      <OverlayViewF
        position={{ lat: centerLat, lng: centerLng }}
        mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
      >
        <RadarChartOutlined style={{fontSize: 28, color: 'white'}}/>
      </OverlayViewF>
    </>
  );
};

export default RepeaterDevice;
