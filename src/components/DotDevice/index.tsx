import { Circle } from '@react-google-maps/api';
import React, { useState } from 'react';
import {
    LatLng,
    LatLngLiteral,
    computeDistanceBetween,
    computeHeading,
    computeOffset,
    computeOffsetOrigin,
    interpolate
} from 'spherical-geometry-js';

export type CirclePivotProps = {
    id: number | string;
    protocol: 'v4' | 'v5';
    type: 'sectorial' | 'central'
    centerLat: number;
    centerLng: number;
    referencedLat: number;
    referencedLng: number;
    gpsLat: number;
    gpsLong: number;
    pivotColor?: string;
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
    irrigationStatus: 4 | 6 | 33
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

const lineOptions = {
    strokeOpacity: .5,
    strokeWeight: 3,
    zIndex: 3,
}

// Função para gerar o array que desenha o circulo com determinado angulo
function circlePath(center: LatLngLiteral, reference: LatLngLiteral, radius: number, points: number, angle: number): LatLngLiteral[] {
    const a = [];
    const p = angle / points; // Variação do angulo baseado no numero de pontos
    let d = computeHeading(
        // Angulo que começa o desenho
        center,
        reference
    );

    for (let i = 0; i < points; ++i, d += p) {
        const result = computeOffset(center, radius, d)
        a.push({ lat: result.lat(), lng: result.lng() });
    }
    a.unshift(center);

    return a;
}


const DotDevice: React.FC<CirclePivotProps> = (props) => {
    /** States*/
    const [infoWindowVisible, setInfoWindowVisible] = useState(false)

    /** Props */
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

    const initialAngle = computeHeading(
        centerPositionGMaps,
        referencePositionGMaps,
    );

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
            nextAngle += 5
            return { x, y }
        })
    }

    /** For white triangle */
    const referenceTriangleBottom = computeOffset(
        centerPositionGMaps,
        referenceRadius,
        props.referenceAngle + 7
    );

    const referenceTriangleTop = computeOffset(
        centerPositionGMaps,
        referenceRadius,
        props.referenceAngle - 7
    );

    const referenceTriangleCenter = computeOffset(
        centerPositionGMaps,
        referenceRadius / 1.3,
        props.referenceAngle
    );

    const triangleCoords = [
        { lat: referenceTriangleBottom.lat(), lng: referenceTriangleBottom.lng() },
        { lat: referenceTriangleTop.lat(), lng: referenceTriangleTop.lng() },
        { lat: referenceTriangleCenter.lat(), lng: referenceTriangleCenter.lng() },
    ];

    /** For black arrow */
    const marginalPositionGMaps = computeOffset(
        centerPositionGMaps,
        referenceRadius,
        lineAngle
    );

    const interiorPositionRadiusGMaps = interpolate(
        centerPositionGMaps,
        marginalPositionGMaps,
        0.7171
    );

    const dotArrowPositionGMaps = computeOffsetOrigin(
        marginalPositionGMaps,
        referenceRadius / 5,
        lineAngle +
        (props.protocol === 'v5' ?
            props.irrigationDirection === 1 ?
                -45 :
                45
            : props.irrigationDirection === 1 ?
                45 :
                -45
        )
    );

    const dotUpArrow = interpolate(
        marginalPositionGMaps,
        dotArrowPositionGMaps as any,
        0.3
    );

    const dotDownArrow = interpolate(
        interiorPositionRadiusGMaps,
        dotArrowPositionGMaps as any,
        0.3
    );

    const lineUpArrow = props.protocol === 'v5' ?
        [
            { lat: dotUpArrow.lat(), lng: dotUpArrow.lng() },
            { lat: dotArrowPositionGMaps?.lat() as any, lng: dotArrowPositionGMaps?.lng() as any },
            { lat: dotDownArrow.lat(), lng: dotDownArrow.lng() }
        ] : []


    /** For dashed line */
    const lineSymbol = {
        path: "M 0,-1 0,1",
        strokeOpacity: 1,
        scale: 2,
    };

    const endIrrigationDashedLine = computeOffset(
        centerPositionGMaps,
        referenceRadius,
        props.stopAngle
    );

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
                    onMouseOver={() => setInfoWindowVisible(true)}
                    onMouseOut={() => setInfoWindowVisible(false)}
                />  
    </>
};

export default DotDevice;  
