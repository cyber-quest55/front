import React, { useCallback } from 'react';
import { Marker, OverlayView, OverlayViewF, } from '@react-google-maps/api';
import { DeviceType } from '@/utils/enum/device-type';
import { getCommonDateParam } from '@/utils/formater/get-common-date-param';
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
  protocol?: number;
  infoWindowRef?: any;
  zoom?: number;
  pumpPressure?: number | null;
};

const WaterPumpDevice: React.FC<WaterPumpProps> = (props) => {
  const { centerLat, centerLng, name, statusText, updated, deviceColor = '#000', onSelect, waterId, infoWindowRef, zoom } = props;

  const handleMouseEnter = useCallback(() => {
    if (props.infoWindow) {
      infoWindowRef?.current?.setContentAndOpen({ name, statusText, updated, deviceColor }, { lat: centerLat, lng: centerLng })
    }
  }, []);

  const handleMouseLeave = useCallback(() => {
    if (props.infoWindow) {
      infoWindowRef?.current?.close()
    }
  }, []);

  if (!centerLat || !centerLng) {
    return <></>;
  }


  return (
    <>
      {zoom && zoom <= 11 ? (
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
      {zoom && zoom > 11 ? (
        <OverlayViewF
          position={{ lat: centerLat, lng: centerLng }}
          mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
        >
          <div
            onClick={() =>
              onSelect(DeviceType.Pump, props.id, {
                params: getCommonDateParam(true),
                waterId: waterId,
              })
            }
            style={{ width: 44, height: 44 }}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <img src={Image} style={{ width: 44, height: 44 }} />
          </div>
        </OverlayViewF>
      ) : null}

    </>

  );
}

export default WaterPumpDevice;
