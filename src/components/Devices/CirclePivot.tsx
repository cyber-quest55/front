import { DeviceType } from '@/utils/enum/device-type';
import { Circle, InfoWindowF, Marker, Polygon, Polyline } from '@react-google-maps/api';
import { Space, Tag, Typography } from 'antd';
import React, { useState } from 'react';
import {
  computeDistanceBetween,
  computeHeading,
  computeOffset,
  computeOffsetOrigin,
  interpolate,
  LatLng,
  LatLngLiteral,
} from 'spherical-geometry-js';

export type CirclePivotProps = {
  id: number;
  protocol: 'v4' | 'v5';
  type: 'sectorial' | 'central';
  centerLat: number;
  centerLng: number;
  referencedLat: number;
  referencedLng: number;
  gpsLat: number;
  gpsLong: number;
  deviceColor?: string;
  lineColor?: string;
  dashed?: boolean;
  referenceAngle: number;
  irrigationDirection: number;
  lpmGpsStreamLat: number;
  lpmGpsStreamLng: number;
  stopAngle: number; // To dashed line, need antCL
  endAngle: number;
  sectorAngle?: number;
  zoom: number;
  hasMarker?: boolean;
  irrigationStatus: 4 | 6 | 33;
  updated: string;
  name: string;
  statusText: string;
  onSelect: any;
  infoWindow?: boolean;
  mapHistory: number[];
  pluviometerMeasure?: number;
  isRaining?: boolean;
  currentAngle?: number;
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

const lineOptions = {
  strokeOpacity: 0.5,
  strokeWeight: 3,
  zIndex: 3,
};

// Função para gerar o array que desenha o circulo com determinado angulo
function circlePath(
  center: LatLngLiteral,
  reference: LatLngLiteral,
  radius: number,
  points: number,
  angle: number,
): LatLngLiteral[] {
  const a = [];
  const p = angle / points; // Variação do angulo baseado no numero de pontos
  let d = computeHeading(
    // Angulo que começa o desenho
    center,
    reference,
  );

  for (let i = 0; i < points; ++i, d += p) {
    const result = computeOffset(center, radius, d);
    a.push({ lat: result.lat(), lng: result.lng() });
  }
  a.unshift(center);

  return a;
}

function interpolateColors(number: number, color1: string, color2: string): string {
  const normalizedNumber = number / 360;

  // Interpola entre as duas cores com base na posição do número
  const r1 = parseInt(color1.substring(1, 3), 16);
  const g1 = parseInt(color1.substring(3, 5), 16);
  const b1 = parseInt(color1.substring(5, 7), 16);

  const r2 = parseInt(color2.substring(1, 3), 16);
  const g2 = parseInt(color2.substring(3, 5), 16);
  const b2 = parseInt(color2.substring(5, 7), 16);

  const r = Math.round(r1 + (r2 - r1) * normalizedNumber);
  const g = Math.round(g1 + (g2 - g1) * normalizedNumber);
  const b = Math.round(b1 + (b2 - b1) * normalizedNumber);

  return rgbToHex(r, g, b);
}

function rgbToHex(r: number, g: number, b: number): string {
  const toHex = (value: number) => {
    const hex = value.toString(16);
    return hex.length === 1 ? '0' + hex : hex;
  };
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

const RenderSegment: React.FC<any> = (props) => {
  /** Props */
  const points = [];
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

    const newLat2 =
      centerLat + ((radiusMeters - radiusMeters / 8) / 111320) * Math.cos(angularDifferenceRadians);

    const newLng2 =
      centerLng +
      ((radiusMeters - radiusMeters / 8) / (111320 * Math.cos(centerLat * (Math.PI / 180)))) *
        Math.sin(angularDifferenceRadians);

    if (i === startAngle) {
      points.push({ lat: newLat, lng: newLng });
    }

    points.push({ lat: newLat2, lng: newLng2 });
  }

  for (let i = numberOfSides; i >= startAngle; i--) {
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
    <Polygon
      paths={points}
      options={{
        zIndex: 999,
        strokeColor: 'transparent',
        strokeOpacity: 0,
        strokeWeight: 0,
        fillColor: props.segment.color,
        fillOpacity: 0.75,
      }}
    />
  );
};

const formatMapHistoryInSegments = (mapHistory: number[]) => {
  const segments: {
    begin: number;
    end: number;
    color: string;
  }[] = [];

  const colors = ['#2218cb', '#ffa200'];

  mapHistory?.forEach((item, index) => {
    if (item === 2) {
      segments.push({
        begin: segments.length === 0 ? index : index - 1,
        end: index + 1,
        color: '',
      });
    }
  });

  return segments.map((item, index) => {
    console.log('item begin', item.begin)
       const color = interpolateColors(item.begin/ 360, colors[0], colors[1]);
      item.color = color;
  
 

    return item;
  });
};

const CirclePivot: React.FC<CirclePivotProps> = (props) => {
  /** States*/
  const [infoWindowVisible, setInfoWindowVisible] = useState(false);

  /** Props */
  const { centerLat, centerLng, referencedLat, referencedLng, gpsLat, gpsLong } = props;

  const deviceColor = props.deviceColor ? props.deviceColor : '#000';
  const lineColor = props.lineColor ? props.lineColor : '#fff';

  if (!centerLat || !centerLng || !referencedLat || !referencedLng) {
    return <></>;
  }

  const centerPositionGMaps = new LatLng(centerLat, centerLng);
  const referencePositionGMaps = new LatLng(referencedLat, referencedLng);
  const gpsPositionGMaps = new LatLng(gpsLat, gpsLong);

  const referenceRadius = computeDistanceBetween(centerPositionGMaps, referencePositionGMaps);

  const lineRadius = computeDistanceBetween(centerPositionGMaps, gpsPositionGMaps);

  const lineAngle = computeHeading(centerPositionGMaps, gpsPositionGMaps);

  const linePoints = [];

  /** It is the calc to set the line in the center of circle */
  if (lineRadius < referenceRadius) {
    const lastLine = computeOffset(
      gpsPositionGMaps,
      Math.abs(referenceRadius - lineRadius),
      lineAngle,
    );
    linePoints.push({ lat: centerPositionGMaps.lat(), lng: centerPositionGMaps.lng() });
    linePoints.push({ lat: gpsPositionGMaps.lat(), lng: gpsPositionGMaps.lng() });
    linePoints.push({ lat: lastLine.lat(), lng: lastLine.lng() });
  } else {
    const lastLine = computeOffset(centerPositionGMaps, referenceRadius, lineAngle);
    linePoints.push({ lat: centerPositionGMaps.lat(), lng: centerPositionGMaps.lng() });
    linePoints.push({ lat: lastLine.lat(), lng: lastLine.lng() });
  }

  const initialAngle = computeHeading(centerPositionGMaps, referencePositionGMaps);

  /** For angle lines */
  const getPolylines = () => {
    let nextAngle = initialAngle;
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

  /** For white triangle */
  const referenceTriangleBottom = computeOffset(
    centerPositionGMaps,
    referenceRadius,
    props.referenceAngle + 7,
  );

  const referenceTriangleTop = computeOffset(
    centerPositionGMaps,
    referenceRadius,
    props.referenceAngle - 7,
  );

  const referenceTriangleCenter = computeOffset(
    centerPositionGMaps,
    referenceRadius / 1.3,
    props.referenceAngle,
  );

  const triangleCoords = [
    { lat: referenceTriangleBottom.lat(), lng: referenceTriangleBottom.lng() },
    { lat: referenceTriangleTop.lat(), lng: referenceTriangleTop.lng() },
    { lat: referenceTriangleCenter.lat(), lng: referenceTriangleCenter.lng() },
  ];

  /** For black arrow */
  const marginalPositionGMaps = computeOffset(centerPositionGMaps, referenceRadius, lineAngle);

  const interiorPositionRadiusGMaps = interpolate(
    centerPositionGMaps,
    marginalPositionGMaps,
    0.7171,
  );

  const dotArrowPositionGMaps = computeOffsetOrigin(
    marginalPositionGMaps,
    referenceRadius / 5,
    lineAngle +
      (props.protocol === 'v5'
        ? props.irrigationDirection === 1
          ? -45
          : 45
        : props.irrigationDirection === 1
        ? 45
        : -45),
  );

  const dotUpArrow = interpolate(marginalPositionGMaps, dotArrowPositionGMaps as any, 0.3);

  const dotDownArrow = interpolate(interiorPositionRadiusGMaps, dotArrowPositionGMaps as any, 0.3);

  const lineUpArrow =
    props.protocol === 'v5'
      ? [
          { lat: dotUpArrow.lat(), lng: dotUpArrow.lng() },
          { lat: dotArrowPositionGMaps?.lat() as any, lng: dotArrowPositionGMaps?.lng() as any },
          { lat: dotDownArrow.lat(), lng: dotDownArrow.lng() },
        ]
      : [];

  /** For dashed line */
  const lineSymbol = {
    path: 'M 0,-1 0,1',
    strokeOpacity: 1,
    scale: 2,
  };
 
  const endIrrigationDashedLine = centerPositionGMaps && referenceRadius && props.stopAngle ? computeOffset(
 
    centerPositionGMaps,
    referenceRadius,
    props.stopAngle,
  ) : new LatLng(0, 0);

  // Coordenadas do ponto na circunferência que você deseja calcular o ângulo
  const pointLat = props.referencedLat; // Latitude do ponto
  const pointLng = props.referencedLng; // Longitude do ponto

  // Calcula o ângulo em relação ao ponto central
  const angleDegrees = computeHeading(
    new LatLng(centerLat, centerLng),
    new LatLng(pointLat, pointLng),
  );

  return (
    <>
      {/** Mark to zoom */}
      {props.zoom <= 11 && props.hasMarker ? (
        <Marker
          position={{
            lat: props.centerLat,
            lng: props.centerLng,
          }}
          zIndex={13}
          onMouseOver={() => setInfoWindowVisible(true)}
          onMouseOut={() => setInfoWindowVisible(false)}
          visible={true}
        />
      ) : null}
      {/** Draw Info Window */}
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

      {formatMapHistoryInSegments(props.mapHistory)?.map((item, index) => (
        <RenderSegment
          key={`segment-${index}`}
          center={{ lat: props.centerLat, lng: props.centerLng }}
          segment={{ ...item, begin: item.begin + angleDegrees, end: item.end + angleDegrees }}
          radius={referenceRadius}
        />
      ))}
      {props.zoom > 11 ? (
        <>
          {/** Draw circle */}
          {props.type === 'central' ? (
            <Circle
              onClick={() => props?.onSelect(DeviceType.Pivot, props.id)}
              center={{ lat: centerLat, lng: centerLng }}
              options={{
                ...circleOptions,
                strokeColor: deviceColor,
                fillColor: deviceColor,
                radius: referenceRadius,
                clickable: true,
              }}
              onMouseOver={() => setInfoWindowVisible(true)}
              onMouseOut={() => setInfoWindowVisible(false)}
            />
          ) : (
            <>
              {/** Draw circle */}
              <Circle
                center={{ lat: centerLat, lng: centerLng }}
                options={{
                  ...circleOptions,
                  strokeColor: deviceColor,
                  fillColor: deviceColor,
                  radius: referenceRadius,
                  strokeOpacity: 0,
                  strokeWeight: 0.5,
                  fillOpacity: 0,
                }}
                onMouseOver={() => setInfoWindowVisible(true)}
                onMouseOut={() => setInfoWindowVisible(false)}
              />
              {/** Cut the circle */}
              <Polygon
                paths={[
                  ...circlePath(
                    { lat: centerPositionGMaps.lat(), lng: centerPositionGMaps.lng() },
                    { lat: referencePositionGMaps.lat(), lng: referencePositionGMaps.lng() },
                    referenceRadius,
                    360,
                    props.endAngle,
                  ),
                ]}
                options={{
                  strokeOpacity: 0,
                  strokeWeight: 0.5,
                  fillOpacity: 0.5,
                }}
              />
              {/** Draw dashed line */}

              <Polyline
                options={{
                  strokeOpacity: 0,
                  strokeColor: lineColor,
                  icons: [
                    {
                      icon: lineSymbol,
                      offset: '0',
                      repeat: '10px',
                    },
                  ],
                  path: [
                    { lat: centerPositionGMaps.latitude, lng: centerPositionGMaps.longitude },
                    {
                      lat: endIrrigationDashedLine.latitude,
                      lng: endIrrigationDashedLine.longitude,
                    },
                  ],
                  zIndex: 3,
                }}
              />
            </>
          )}

          {/** Draw pivot line */}
          <Polyline
            options={{
              ...lineOptions,
              strokeColor: lineColor,
              path: linePoints,
            }}
          />
          {/** Draw triangle */}
          <Polygon
            paths={triangleCoords}
            options={{
              strokeColor: lineColor,
              strokeOpacity: 1,
              strokeWeight: 0,
              fillColor: lineColor,
              fillOpacity: 1,
              zIndex: 3,
            }}
          />
          {/** Draw arrow */}
          <Polygon
            paths={lineUpArrow}
            options={{
              strokeColor: lineColor,
              strokeOpacity: 1,
              strokeWeight: 0,
              fillColor: lineColor,
              fillOpacity: 1,
              zIndex: 3,
            }}
          />

          {/** Draw angles lines */}
          {props.dashed
            ? getPolylines().map((item) => (
                <Polyline
                  key={`line-${Math.random()}`}
                  path={[
                    { lat: item.x.lat(), lng: item.x.lng() },
                    { lat: item.y.lat(), lng: item.y.lng() },
                  ]}
                  options={{
                    strokeColor: lineColor,
                    strokeOpacity: 1,
                    strokeWeight: 1,
                    zIndex: 999,
                  }}
                />
              ))
            : null}
          {/** Case is V4 */}
          {props.protocol === 'v4' ? (
            <>
              <Polygon
                options={{
                  strokeColor: props.deviceColor,
                  strokeOpacity: 0.5,
                  strokeWeight: 0.5,
                  fillColor: props.deviceColor,
                  fillOpacity: 0.5,
                }}
              />
            </>
          ) : null}
        </>
      ) : null}
    </>
  );
};

export default CirclePivot;
