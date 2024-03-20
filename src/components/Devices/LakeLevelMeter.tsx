import React, { useCallback, } from 'react';
import { Liquid, } from '@ant-design/charts';
import { DeviceType } from '@/utils/enum/device-type';
import { Marker, OverlayView, OverlayViewF } from '@react-google-maps/api';

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
  infoWindowRef?: any;
  zoom?: number;

  percentage?: number;
  meterLevel?: number | null;
};

const LakeLevelMeterDevice: React.FC<LakeLevelMeterProps> = React.memo((props) => {
  const { centerLat, centerLng, infoWindowRef } = props;


  const handleMouseEnter = useCallback(() => {
    if (props.infoWindow) {
      infoWindowRef?.current?.setContentAndOpen({
        name: props.name, statusText: props.statusText, deviceColor: props.deviceColor,
        updated: props.updated
      }, { lat: centerLat, lng: centerLng })
    }
  }, []);

  const handleMouseLeave = useCallback(() => {
    if (props.infoWindow) {
      infoWindowRef?.current?.close()
    }
  }, []);

  if (!centerLat || !centerLng) {
    return null;
  }

  const liquidChartOptions = {
    width: props.width ? props.width : 75,
    height: props.height ? props.height : 75,
    percent: 0.25,
    style: {
      marginTop: props.height ? -(props.height / 2) : -37.5,
      marginLeft: props.width ? -(props.width / 2) : -37.5,
    },
    statistic: { content: { style: { color: 'white', fontSize: '12px' } } },
    outline: { border: 1, distance: 3 },
    wave: { length: 67 },
  };

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
            onClick={() =>
              props?.onSelect(DeviceType.Meter, props.id, { imeterSetId: props.imeterSetId })
            }
            onMouseLeave={handleMouseLeave}
            onMouseEnter={handleMouseEnter}
          >
            <Liquid {...liquidChartOptions} />
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
    prevProps.statusText === nextProps.statusText &&
    prevProps.updated === nextProps.updated &&
    prevProps.deviceColor === nextProps.deviceColor &&
    prevProps.infoWindow === nextProps.infoWindow &&
    prevProps.zoom === nextProps.zoom  

  );
});

export default LakeLevelMeterDevice;
