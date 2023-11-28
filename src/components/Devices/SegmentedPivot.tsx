import { Circle, InfoWindowF, Polygon, Polyline } from '@react-google-maps/api';
import { Typography } from 'antd';
import React, { useState } from 'react';
import {
  computeDistanceBetween,
  computeHeading,
  computeOffset,
  LatLng,
} from 'spherical-geometry-js';

export type SegmentedPivotDeviceProps = {
  /**
   * The center of the pivot
   */
  center: { lat: number; lng: number };

  /**
   * Final of pivot
   */
  referenced: { lat: number; lng: number };
  /**
   * All of the segments
   */
  segments: {
    begin: number;
    end: number;
    color: string;
    name: string;
    plantingDate: string;
    harvestDate: string;
  }[];
};

const circleOptions = {
  strokeOpacity: 1,
  strokeWeight: 3,
  fillOpacity: 0.5,
  clickable: false,
  draggable: false,
  editable: false,
  visible: true,
  zIndex: 1,
};

const RenderSegment: React.FC<any> = (props) => {
  const [clickPosition, setClickPosition] = useState(null);
  const [infoWindowVisible, setInfoWindowVisible] = useState(false);

  /** Props */
  const points = [props.center];
  const centerLat = props.center.lat; // Latitud;
  const centerLng = props.center.lng; // Longitude

  // Raio em metros
  const radiusMeters = props.radius;

  // Diferença angular em graus que você deseja mover
  const startAngle = props.segment.begin;
  const numberOfSides = props.segment.end;

  for (let i = startAngle; i <= numberOfSides; i++) {
    const angularDifferenceDegrees = i;

    // Converta a diferença angular de graus para radianos
    const angularDifferenceRadians = angularDifferenceDegrees * (Math.PI / 180);

    // Calcule as novas coordenadas
    const newLat = centerLat + (radiusMeters / 111320) * Math.cos(angularDifferenceRadians);

    const newLng =
      centerLng +
      (radiusMeters / (111320 * Math.cos(centerLat * (Math.PI / 180)))) *
        Math.sin(angularDifferenceRadians);

    points.push({ lat: newLat, lng: newLng });
    
  }

  const handleClick = (event: any) => {
    const clickedPosition = event.latLng.toJSON();
    setClickPosition(clickedPosition);
  };

  return (
    <>
      <Polygon
        onMouseOver={() => setInfoWindowVisible(true)}
        onMouseOut={() => {
          setInfoWindowVisible(false)
          setClickPosition(null)
        }}
        paths={points}
        onClick={handleClick}
        options={{
          strokeColor: 'white',
          strokeOpacity: 1,
          strokeWeight: 2,
          fillColor: props.segment.color,
          fillOpacity: 0.35,
        }}
      />
      {infoWindowVisible &&  clickPosition ? (
        <InfoWindowF
          position={clickPosition}
          options={{
            zIndex: 12,
          }}
          zIndex={12}
        >
          <div
            style={{
              opacity: 0.75,
              padding: 12,
            }}
          >
            <Typography.Title level={5}>{props.segment.name}</Typography.Title>
            <Typography.Text>Planting Date: {props.segment.plantingDate}</Typography.Text>
            <br />
            <Typography.Text>Harvest Date: {props.segment.harvestDate}</Typography.Text>
          </div>
        </InfoWindowF>
      ) : null}
    </>
  );
};

const SegmentedPivotDevice: React.FC<SegmentedPivotDeviceProps> = (props) => {
  const centerLat = props.center.lat;
  const centerLng = props.center.lng;

  const referencedLat = props.referenced.lat;
  const referencedLng = props.referenced.lng;

  const centerPositionGMaps = new LatLng(centerLat, centerLng);
  const referencePositionGMaps = new LatLng(referencedLat, referencedLng);

  const referenceRadius = computeDistanceBetween(centerPositionGMaps, referencePositionGMaps);

  const getPolylines = () => {
    let nextAngle = 0;
    return [...Array(72).keys()].map(() => {
      const x = computeOffset(
        { lat: centerPositionGMaps.lat(), lng: centerPositionGMaps.lng() },
        referenceRadius,
        nextAngle,
      );

      const y = computeOffset(
        { lat: centerPositionGMaps.lat(), lng: centerPositionGMaps.lng() },
        referenceRadius * 0.9,
        nextAngle,
      );
      nextAngle += 5;
      return { x, y };
    });
  };

  // Coordenadas do ponto na circunferência que você deseja calcular o ângulo
  const pointLat = props.referenced.lat; // Latitude do ponto
  const pointLng = props.referenced.lng; // Longitude do ponto

  // Calcula o ângulo em relação ao ponto central
  const angleDegrees = computeHeading(
    new LatLng(centerLat, centerLng),
    new LatLng(pointLat, pointLng),
  );

  return (
    <>
      {props.segments?.map((item, index) => (
        <RenderSegment
          key={`segment-${index}`}
          center={props.center}
          segment={{ ...item, begin: item.begin + angleDegrees, end: item.end + angleDegrees }}
          radius={referenceRadius} 
        />
      ))}
      <Circle
        center={{ lat: centerLat, lng: centerLng }}
        options={{
          ...circleOptions,
          strokeColor: 'white',
          fillColor: 'white',
          radius: referenceRadius,
          strokeOpacity: 1,
          strokeWeight: 0.8,
          fillOpacity: 0,
        }}
      />

      {getPolylines().map((item) => (
        <Polyline
          key={`line-${Math.random()}`}
          path={[
            { lat: item.x.lat(), lng: item.x.lng() },
            { lat: item.y.lat(), lng: item.y.lng() },
          ]}
          options={{
            strokeColor: 'white',
            strokeOpacity: 1,
            strokeWeight: 1,
            zIndex: 999,
          }}
        />
      ))}
    </>
  );
};

export default SegmentedPivotDevice;
