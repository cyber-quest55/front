import { DeviceType } from '@/utils/enum/device-type';
import { Liquid } from '@ant-design/charts';
import { InfoWindowF, OverlayView, OverlayViewF } from '@react-google-maps/api';
import { Space, Tag, Typography } from 'antd';
import React, { useState } from 'react';

export type LakeLevelMeterProps = {
  id: number;
  centerLat: number;
  centerLng: number;
  deviceColor?: string;
  lineColor?: string;
  name: string;
  updated: string;
  onSelect?: any;
  width?: number;
  height?: number;
  infoWindow?: boolean;
  statusText?: string;
  imeterSetId?: number;
};

const LakeLevelMeterDevice: React.FC<LakeLevelMeterProps> = (props) => {
  /** Props */
  const { centerLat, centerLng } = props;
  const [infoWindowVisible, setInfoWindowVisible] = useState(false);

  if (!centerLat || !centerLng ) {
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
            props?.onSelect(DeviceType.Meter, props.id, { imeterSetId: props.imeterSetId })
          }
          onMouseLeave={() => setInfoWindowVisible(false)}
          onMouseEnter={() => setInfoWindowVisible(true)}
        >
          <Liquid
            width={props.width ? props.width : 75}
            height={props.width ? props.width : 75}
            percent={0.25}
            style={{
              marginTop: props.height ? -(props.height / 2) : -37.5,
              marginLeft: props.width ? -(props.width / 2) : -37.5,
            }}
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

export default LakeLevelMeterDevice;
