import { Liquid } from '@ant-design/charts';
import { OverlayView, OverlayViewF } from '@react-google-maps/api';
import React from 'react';
import {
    LatLng,
    computeDistanceBetween,
    computeHeading,
    computeOffset
} from 'spherical-geometry-js';

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


const LakeLevelMeterDevice: React.FC<CirclePivotProps> = (props) => {
    /** Props */
    const { centerLat, centerLng, referencedLat, referencedLng, gpsLat, gpsLong } = props;

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
        <OverlayViewF
            position={{ lat: centerLat, lng: centerLng }}
            mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
        >
            <Liquid
                width={75}
                height={75} 
                percent={0.25}
                style={{ marginTop: -32.5, marginLeft: -32.5}}
                statistic={{ content: { style: { color: 'white', fontSize: "12px" } } }}
                outline={{
                    border: 1,
                    distance: 3
                }}
                wave={{
                    length: 67
                }}
            />
        </OverlayViewF>
    </>
};

export default LakeLevelMeterDevice;  
