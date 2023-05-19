import { Liquid } from '@ant-design/charts';
import { OverlayView, OverlayViewF } from '@react-google-maps/api';
import React from 'react';

export type LakeLevelMeterProps = {
  id: number | string;
  centerLat: number;
  centerLng: number;
  pivotColor?: string;
  lineColor?: string;
};

const LakeLevelMeterDevice: React.FC<LakeLevelMeterProps> = (props) => {
  /** Props */
  const { centerLat, centerLng } = props;

  return (
    <>
      <OverlayViewF
        position={{ lat: centerLat, lng: centerLng }}
        mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
      >
        <Liquid
          width={75}
          height={75}
          percent={0.25}
          style={{ marginTop: -37.5, marginLeft: -37.5 }}
          statistic={{ content: { style: { color: 'white', fontSize: '12px' } } }}
          outline={{
            border: 1,
            distance: 3,
          }}
          wave={{
            length: 67,
          }}
        />{' '}
      </OverlayViewF>
    </>
  );
};

export default LakeLevelMeterDevice;
