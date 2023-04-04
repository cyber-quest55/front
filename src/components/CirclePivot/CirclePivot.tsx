import { Circle, Polyline } from '@react-google-maps/api';
import React from 'react';
import { LatLng, computeDistanceBetween, computeHeading, computeOffset } from 'spherical-geometry-js';

export type CirclePivotProps = {
    color?: string;
    version: 'v4' | 'v5';
    centerLat: number;
    centerLng: number;
    referencedLat: number;
    referencedLng: number;
    gpsLat: number;
    gpsLong: number;
    pivotColor?: string;
    lineColor?: string;
    dashed?: boolean;
};

const circleOptions = {
    strokeOpacity: 0.8,
    strokeWeight: 2,
    fillOpacity: 0.55,
    clickable: false,
    draggable: false,
    editable: false,
    visible: true,
    zIndex: 1
}

const lineOptions = {
    strokeOpacity: 1,
    strokeWeight: 3,
    zIndex: 3,
}

const CirclePivot: React.FC<CirclePivotProps> = (props) => {
    const { centerLat, centerLng, referencedLat, referencedLng, gpsLat, gpsLong } = props;

    const pivotColor = props.pivotColor ? props.pivotColor : '#000'
    const lineColor = props.lineColor ? props.lineColor : '#fff'

    const centerPositionGMaps = new LatLng(centerLat, centerLng);
    const referencePositionGMaps = new LatLng(referencedLat, referencedLng);
    const gpsPositionGMaps = new LatLng(gpsLat, gpsLong);

    const referenceRadius = computeDistanceBetween(
        centerPositionGMaps,
        referencePositionGMaps,
    );

    const lineRadius = computeDistanceBetween(
        centerPositionGMaps,
        gpsPositionGMaps,
    );

    const lineAngle = computeHeading(
        centerPositionGMaps,
        gpsPositionGMaps,
    );

    const linePoints = [];

    /** Here is setted the line in the center of circle */
    if (lineRadius < referenceRadius) {
        const lastLine = computeOffset(gpsPositionGMaps, Math.abs(referenceRadius - lineRadius), lineAngle)
        linePoints.push({ lat: centerPositionGMaps.lat(), lng: centerPositionGMaps.lng() })
        linePoints.push({ lat: gpsPositionGMaps.lat(), lng: gpsPositionGMaps.lng() })
        linePoints.push({ lat: lastLine.lat(), lng: lastLine.lng() })
    } else {
        const lastLine = computeOffset(centerPositionGMaps, referenceRadius, lineAngle,)
        linePoints.push({ lat: centerPositionGMaps.lat(), lng: centerPositionGMaps.lng() })
        linePoints.push({ lat: lastLine.lat(), lng: lastLine.lng() })
    }

    const initialAngle = computeHeading(
        centerPositionGMaps,
        referencePositionGMaps,
    );

    /** For dash the circle */
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
            nextAngle += 5
            return { x, y }
        })
    }

    return <>
        <Circle
            center={{ lat: centerLat, lng: centerLng }}
            options={{
                ...circleOptions,
                strokeColor: pivotColor,
                fillColor: pivotColor,
                radius: referenceRadius
            }}
        />
        <Polyline

            options={{
                ...lineOptions,
                strokeColor: lineColor,
                path: linePoints
            }}
        />
        {
            props.dashed ? getPolylines().map((item) => (
                <Polyline
                    key={`line-${Math.random()}`}
                    path={[
                        { lat: item.x.lat(), lng: item.x.lng() },
                        { lat: item.y.lat(), lng: item.y.lng() }
                    ]}
                    options={{
                        strokeColor: lineColor,
                        strokeOpacity: 1,
                        strokeWeight: 1,
                        zIndex: 999,
                    }}
                />
            )) : null}
    </>
};

export default CirclePivot;  
