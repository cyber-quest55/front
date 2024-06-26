import React, { useMemo, useCallback } from 'react';
import { Circle, Marker } from '@react-google-maps/api';
 
export type CirclePivotProps = {
  id: number | string;
  centerLat: number;
  centerLng: number;
  name: string;
  updated: string;
  deviceColor?: string | null;
  statusText?: string | null;
  controlRadio?: string;
  dotColor?: string;
  infoWindowRef: any;
  mapRef?: any;
  lineColor?: string;
  zIndex?: number;
  radius?: number;
  zoom?: number;
};

const CircleOptions = {
  strokeOpacity: 1,
  strokeWeight: 2,
  fillOpacity: 1,
  clickable: true,
  draggable: false,
  editable: false,
  visible: true,
  zIndex: 1,
};

const DotDevice: React.FC<CirclePivotProps> = React.memo(({
  centerLat,
  centerLng,
  name,
  controlRadio,
  deviceColor,
  dotColor,
  statusText,
  updated,
  infoWindowRef,
  zIndex,
  radius,
  zoom,
}) => {
  const handleMouseEnter = useCallback(() => {
    infoWindowRef?.current?.setContentAndOpen({
      name,
      updated,
      statusText,
      radio: controlRadio || '',
      deviceColor
    }, {
      lat: centerLat,
      lng: centerLng
    })
  }, []);

  const handleMouseLeave = useCallback(() => {
    infoWindowRef?.current?.close()
  }, []);

  const circleOptions = useMemo(() => ({
    ...CircleOptions,
    strokeColor: 'white',
    fillColor: dotColor,
    radius: radius || 25,
    zIndex: zIndex ? zIndex : 99
  }), [dotColor]);

  if (!centerLat || !centerLng) return null;

  return (
    <>
      {zoom && zoom <= 11 ? (
        <Marker
          position={{
            lat: centerLat,
            lng: centerLng,
          }}
          zIndex={13}
          onMouseOver={handleMouseEnter}
          onMouseOut={handleMouseLeave}
          visible={true}
        />
      ) :  <Circle
      center={{ lat: centerLat, lng: centerLng }}
      onMouseOver={handleMouseEnter}
      onMouseOut={handleMouseLeave}
      options={circleOptions}
    />}
     
    </>
  );
}, (prevProps, nextProps) => {
  // A função de comparação abaixo garante que o componente só seja renderizado novamente se suas propriedades mudarem
  return (
    prevProps.centerLat === nextProps.centerLat &&
    prevProps.centerLng === nextProps.centerLng &&
    prevProps.name === nextProps.name &&
    prevProps.updated === nextProps.updated &&
    prevProps.deviceColor === nextProps.deviceColor &&
    prevProps.statusText === nextProps.statusText &&
    prevProps.controlRadio === nextProps.controlRadio &&
    prevProps.dotColor === nextProps.dotColor&& 
    prevProps.zoom === nextProps.zoom

  );
});

export default DotDevice;
