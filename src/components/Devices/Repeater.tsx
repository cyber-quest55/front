import { DeviceType } from '@/utils/enum/device-type';
import { RadarChartOutlined } from '@ant-design/icons';
import { InfoWindowF, OverlayView, OverlayViewF } from '@react-google-maps/api';
import { Typography } from 'antd';
import React, { useState } from 'react';

export type RepeaterProps = {
  id: number | string;
  centerLat: number;
  centerLng: number;
  deviceColor?: string;
  lineColor?: string;
  name: string;
  updated: string;
  onSelect?: any;
};

const RepeaterDevice: React.FC<RepeaterProps> = (props) => {
  /** Props */
  const { centerLat, centerLng } = props;
  const [infoWindowVisible, setInfoWindowVisible] = useState(false);

  if (!centerLat || !centerLng  ) {
    return <></>;
  }

  return (
    <>
      <OverlayViewF
        position={{ lat: centerLat, lng: centerLng }}
        mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
      >
        <div
          onClick={() => props?.onSelect(DeviceType.Repeater, props.id)}
          onMouseLeave={() => setInfoWindowVisible(false)}
          onMouseEnter={() => setInfoWindowVisible(true)}
        >
          <RadarChartOutlined style={{ fontSize: 28, color: 'white' }} />
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
          </div>
        </InfoWindowF>
      ) : null}
    </>
  );
};

export default RepeaterDevice;
