import React, { useCallback } from 'react';
import { Marker, OverlayView, OverlayViewF } from '@react-google-maps/api';
import { DeviceType } from '@/utils/enum/device-type';
import { RadarChartOutlined } from '@ant-design/icons';

export type RepeaterProps = {
  id: number | string;
  centerLat: number;
  centerLng: number;
  deviceColor?: string;
  lineColor?: string;
  name: string;
  updated: string;
  onSelect?: any;
  infoWindowRef: any;
  zoom?: number;
};

const RepeaterDevice: React.FC<RepeaterProps> = React.memo((props) => {
  const { centerLat, centerLng, name, updated, deviceColor = '#000', onSelect, infoWindowRef } = props;

  const handleMouseEnter = useCallback(() => {
    infoWindowRef?.current?.setContentAndOpen({ name, updated, deviceColor }, { lat: centerLat, lng: centerLng })
  }, []);

  const handleMouseLeave = useCallback(() => {
    infoWindowRef?.current?.close()
  }, []);


  if (!centerLat || !centerLng) {
    return <></>;
  }

  return (
    <>
      {props.zoom && props.zoom <= 11 ? (
        <Marker
          position={{
            lat: props.centerLat,
            lng: props.centerLng,
          }}
          zIndex={13}
          onMouseOver={handleMouseEnter}
          onMouseOut={handleMouseLeave}
          visible={true}
        />
      ) : null}
      {props.zoom && props.zoom > 11 ? (

        <OverlayViewF
          position={{ lat: centerLat, lng: centerLng }}
          mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
        >
          <div
            onClick={() => onSelect(DeviceType.Repeater, props.id)}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <RadarChartOutlined style={{ fontSize: 28, color: 'white' }} />
          </div>
        </OverlayViewF>
      ) : null}

    </>
  );
}, (prevProps, nextProps) => {
  // A função de comparação abaixo garante que o componente só seja renderizado novamente se suas propriedades mudarem
  return (
    prevProps.centerLat === nextProps.centerLat &&
    prevProps.centerLng === nextProps.centerLng &&
    prevProps.name === nextProps.name &&
    prevProps.updated === nextProps.updated &&
    prevProps.zoom === nextProps.zoom &&
    prevProps.deviceColor === nextProps.deviceColor
  );
});

export default RepeaterDevice;
