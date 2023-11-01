import { Circle, InfoWindowF, Polygon, Polyline } from '@react-google-maps/api';
import { Typography } from 'antd';
import React, { useState } from 'react';
import { computeDistanceBetween, computeOffset, LatLng } from 'spherical-geometry-js';

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
  const [infoWindowVisible, setInfoWindowVisible] = useState(false);

  /** Props */
  const points = [props.center];
  const centerLat = props.center.lat; // Latitud;
  const centerLng = props.center.lng; // Longitude

  // Raio em metros
  const radiusMeters = 500; // 10 km

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

  return (
    <>
      <Polygon
        onMouseOver={() => setInfoWindowVisible(true)}
        onMouseOut={() => setInfoWindowVisible(false)}
        paths={points}
        options={{
          strokeColor: 'white',
          strokeOpacity: 1,
          strokeWeight: 2,
          fillColor: props.segment.color,
          fillOpacity: 0.35,
        }}
      />
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
  const lineSymbol = {
    path: 'M 0,-1 0,1',
    strokeOpacity: 1,
    scale: 2,
  };

  const centerLat = props.center.lat; // Latitud;
  const centerLng = props.center.lng; // Longitude

  const referencedLat = props.referenced.lat;
  const referencedLng = props.referenced.lng;

  const centerPositionGMaps = new LatLng(centerLat, centerLng);
  const referencePositionGMaps = new LatLng(referencedLat, referencedLng);

  const referenceRadius = computeDistanceBetween(centerPositionGMaps, referencePositionGMaps);

  const endIrrigationDashedLine = computeOffset(centerPositionGMaps, referenceRadius, 0);

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

  return (
    <>
      {props.segments?.map((item, index) => (
        <RenderSegment key={`segment-${index}`} center={props.center} segment={item} />
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

      {   getPolylines().map((item) => (
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
      ))  }
  
    </>
  );
};

export default SegmentedPivotDevice;
