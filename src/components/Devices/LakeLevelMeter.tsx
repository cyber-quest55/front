import { DeviceType } from '@/utils/enums';
import { Liquid } from '@ant-design/charts';
import { InfoWindowF, OverlayView, OverlayViewF } from '@react-google-maps/api';
import { Typography } from 'antd';
import React, { useState } from 'react';

export type LakeLevelMeterProps = {
  id: number | string;
  centerLat: number;
  centerLng: number;
  pivotColor?: string;
  lineColor?: string;
  name: string;
  updated: string;
  onSelect?: any;
};

const LakeLevelMeterDevice: React.FC<LakeLevelMeterProps> = (props) => {
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
          onClick={() => props?.onSelect(DeviceType.Meter, props.id)}
          onMouseLeave={() => setInfoWindowVisible(false)}
          onMouseEnter={() => setInfoWindowVisible(true)}
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
          />
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

export default LakeLevelMeterDevice;
