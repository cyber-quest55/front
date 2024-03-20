import React, { useMemo, useCallback } from 'react';
import { Circle } from '@react-google-maps/api';

export type CirclePivotProps = {
  id: number | string;
  centerLat: number;
  centerLng: number;
  name: string;
  updated: string;
  deviceColor?: string;
  infoWindowRef: any;
  mapRef: any;

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

const DotDevice: React.FC<CirclePivotProps> = React.memo(({ centerLat, centerLng, name, updated, deviceColor = '#000', infoWindowRef }) => {
  const handleMouseEnter = useCallback(() => {
    infoWindowRef?.current?.setContentAndOpen({ name, updated, deviceColor }, { lat: centerLat, lng: centerLng })
  }, []);

  const handleMouseLeave = useCallback(() => {
    infoWindowRef?.current?.close()
  }, []);

  const circleOptions = useMemo(() => ({
    ...CircleOptions,
    strokeColor: deviceColor,
    fillColor: deviceColor,
    radius: 50,
  }), [deviceColor]);

  if (!centerLat || !centerLng) return null;

  return (
    <>
      <Circle
        center={{ lat: centerLat, lng: centerLng }}
        onMouseOver={handleMouseEnter}
        onMouseOut={handleMouseLeave}
        options={circleOptions}
      />

    </>
  );
}, (prevProps, nextProps) => {
  // A função de comparação abaixo garante que o componente só seja renderizado novamente se suas propriedades mudarem
  return (
    prevProps.centerLat === nextProps.centerLat &&
    prevProps.centerLng === nextProps.centerLng &&
    prevProps.name === nextProps.name &&
    prevProps.updated === nextProps.updated &&
    prevProps.deviceColor === nextProps.deviceColor
  );
});

export default DotDevice;
