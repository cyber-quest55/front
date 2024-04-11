import React, { useMemo } from 'react';
import { Circle, HeatmapLayer, Polygon } from '@react-google-maps/api';
import { LatLng, computeDistanceBetween, computeOffset } from 'spherical-geometry-js';

export type CirclePivotProps = {
    id: number | string;
    centerLat: number;
    centerLng: number;
    referencedLat: number,
    referencedLng: number,
    referenceAngle: number;
    deviceColor?: string | null;
    lineColor?: string;
    option?: { lat: number, lng: number };
    data?: { lat: number, lng: number }[]
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

const UnspectedStopsDevice: React.FC<CirclePivotProps> = React.memo(({
    centerLat,
    centerLng,
    referencedLat,
    referencedLng,
    deviceColor,
    option,
    data,
    referenceAngle
}) => {

    const radius = React.useMemo(() => {
        const centerPositionGMaps = new LatLng(centerLat, centerLng);
        const referencePositionGMaps = new LatLng(referencedLat, referencedLng);
        return computeDistanceBetween(centerPositionGMaps, referencePositionGMaps);
    }, [centerLat, centerLng, referencedLat, referencedLng])

    const centerPositionGMaps = new LatLng(centerLat, centerLng);
    /** For white triangle */
    const referenceTriangleBottom = computeOffset(
        centerPositionGMaps,
        radius,
        referenceAngle + 7,
    );

    const referenceTriangleTop = computeOffset(
        centerPositionGMaps,
        radius,
        referenceAngle - 7,
    );

    const referenceTriangleCenter = computeOffset(
        centerPositionGMaps,
        radius / 1.3,
        referenceAngle,
    );

    const triangleCoords = [
        { lat: referenceTriangleBottom.lat(), lng: referenceTriangleBottom.lng() },
        { lat: referenceTriangleTop.lat(), lng: referenceTriangleTop.lng() },
        { lat: referenceTriangleCenter.lat(), lng: referenceTriangleCenter.lng() },
    ];

    const circleOptions = useMemo(() => ({
        ...CircleOptions,
        strokeColor: '#fff',
        fillOpacity: 0,
        strokeWeight: 6,
        strokeOpacity: 0.6,
        radius: radius + 35,
        zIndex: 4,
    }), [deviceColor, radius]);


    const circleOptionsClick = useMemo(() => ({
        ...CircleOptions,
        strokeColor: '#000',
        fillOpacity: 0.3,
        strokeWeight: 2,
        strokeOpacity: 0.8,
        radius: 35 ,
        zIndex: 99,
    }), [deviceColor]);

    if (!centerLat || !centerLng) return null;

 
    return (
        <>
            <Circle
                center={{ lat: centerLat, lng: centerLng }}
                options={circleOptions}
            />
            {option && <Circle
                center={{ lat: option.lat, lng: option.lng }}
                options={circleOptionsClick}
            />
            }

            <HeatmapLayer
                options={{
                    gradient: [
                        'rgba(0, 255, 255, 0)',
                        'rgba(0, 255, 255, 1)',
                        'rgba(0, 191, 255, 1)',
                        'rgba(0, 127, 255, 1)',
                        'rgba(0, 63, 255, 1)',
                        'rgba(0, 0, 255, 1)',
                        'rgba(0, 0, 223, 1)',
                        'rgba(0, 0, 191, 1)',
                        'rgba(0, 0, 159, 1)',
                        'rgba(0, 0, 127, 1)',
                        'rgba(63, 0, 91, 1)',
                        'rgba(127, 0, 63, 1)',
                        'rgba(191, 0, 31, 1)',
                        'rgba(255, 0, 0, 1)',
                    ],
                    radius: 15,
                    dissipating: true,
                }}

                data={
                    data?.map((item) => {
                        return new google.maps.LatLng(item?.lat, item?.lng)
                    }) as []
                }
            />
            <Polygon
                paths={triangleCoords}
                options={{
                    strokeColor: "#fff",
                    strokeOpacity: 0.7,
                    strokeWeight: 0,
                    fillColor: "#fff",
                    fillOpacity: 0.7,
                    zIndex: 999,
                }}
            />
        </>
    );
}, (prevProps, nextProps) => {
    // A função de comparação abaixo garante que o componente só seja renderizado novamente se suas propriedades mudarem
    return (
        prevProps.centerLat === nextProps.centerLat &&
        prevProps.centerLng === nextProps.centerLng &&
        prevProps.deviceColor === nextProps.deviceColor &&
        prevProps.option === nextProps.option 
    );

});

export default UnspectedStopsDevice;
