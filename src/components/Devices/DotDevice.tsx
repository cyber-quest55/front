import { Circle } from '@react-google-maps/api';
import React from 'react';
import {
    LatLng,
    computeDistanceBetween,
    computeHeading,
    computeOffset} from 'spherical-geometry-js';

export type CirclePivotProps = {
    id: number | string;
    centerLat: number;
    centerLng: number;
    referencedLat: number;
    referencedLng: number;
    gpsLat: number;
    gpsLong: number;
    pivotColor?: string;
    lineColor?: string;
};

const circleOptions = {
    strokeOpacity: 1,
    strokeWeight: 2,
    fillOpacity: 1,
    clickable: false,
    draggable: false,
    editable: false,
    visible: true,
    zIndex: 1
}

const DotDevice: React.FC<CirclePivotProps> = (props) => {
    /** Props */
    const { centerLat, centerLng, referencedLat, referencedLng, gpsLat, gpsLong } = props;

    const pivotColor = props.pivotColor ? props.pivotColor : '#000'
 
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

    /** It is the calc to set the line in the center of circle */
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
 
 
    return <>
         <Circle
                    center={{ lat: centerLat, lng: centerLng }}
                    options={{
                        ...circleOptions,
                        strokeColor: pivotColor,
                        fillColor: pivotColor,
                        radius: 50,
                        clickable: true,
                    }} 
                />  
    </>
};

export default DotDevice;  
