import { SetStateAction, useState } from 'react';

const useMapHook: (zm: number, mpCenter: { lat: number; lng: number }) => {
  zoom: number;
  setZoom: SetStateAction<any | undefined>;
  map: any;
  setMap: SetStateAction<any | undefined>;
  mapCenter: { lat: number; lng: number };
  setMapCenter: SetStateAction<any | undefined>;
} = (zm: number, mpCenter: { lat: number; lng: number }) => {
  /**
   * It define the zoom of map
   */
  const [zoom, setZoom] = useState(zm);

  /**
   * It define the map component
   */
  const [map, setMap] = useState<any>(null);

  /**
   * It define the map component
   */
  const [mapCenter, setMapCenter] = useState<any>(mpCenter);

  return {
    zoom,
    setZoom,
    map,
    setMap,
    mapCenter,
    setMapCenter
  };
};

export { useMapHook };
