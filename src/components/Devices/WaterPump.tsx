import { DeviceType } from '@/utils/enum/device-type';
import { getCommonDateParam } from '@/utils/formater/get-common-date-param';
import { InfoWindowF, OverlayView, OverlayViewF } from '@react-google-maps/api';
import { Space, Tag, Typography } from 'antd';
import React, { useState } from 'react';
import Image from '../../../public/images/devices/water-pump.png';

export type WaterPumpProps = {
  id: number;
  centerLat: number;
  centerLng: number;
  deviceColor?: string;
  lineColor?: string;
  statusText?: string;
  name: string;
  updated: string;
  onSelect?: any;
  infoWindow?: boolean;
  waterId?: number;
};

const WaterPumpDevice: React.FC<WaterPumpProps> = (props) => {
  /** Props */
  const { centerLat, centerLng } = props;
  const [infoWindowVisible, setInfoWindowVisible] = useState(false);

  if (!centerLat || !centerLng) {
    return <></>;
  }

  return (
    <>
      <OverlayViewF
        position={{ lat: centerLat, lng: centerLng }}
        mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
      >
        <div
          onClick={() =>
            props?.onSelect(DeviceType.Pump, props.id, {
              params: getCommonDateParam(true),
              waterId: props.waterId,
            })
          }
          onMouseLeave={() => setInfoWindowVisible(false)}
          onMouseEnter={() => setInfoWindowVisible(true)}
        >
          <img src={Image} style={{ width: 44, height: 44 }} />
        </div>
      </OverlayViewF>
      {infoWindowVisible && props.infoWindow ? (
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
          <Space direction="vertical" onMouseLeave={() => setInfoWindowVisible(false)}>
            <Typography.Title level={5}>{props.name}</Typography.Title>
            <Tag color={props.deviceColor}>{props.statusText}</Tag>
            <Typography.Text>{props.updated}</Typography.Text>
          </Space>
        </InfoWindowF>
      ) : null}
    </>
  );
};

export default WaterPumpDevice;
