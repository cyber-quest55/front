import { GeoBrowserStrategy } from '@/utils/strategies/geolocation/browser-strategy';
import { GeoCapacitorStrategy } from '@/utils/strategies/geolocation/cap-strategy';
import { GeoLocationContext } from '@/utils/strategies/geolocation/geolocation';
import { SetStateAction, useEffect, useState } from 'react';

const getInstance = async () => {
  const geoBrowserStrategy = new GeoBrowserStrategy();

  const geoContext = new GeoLocationContext(geoBrowserStrategy);

  if (typeof window !== undefined) {
    // Se o objeto 'window' estiver definido, significa que o código está sendo executado em um navegador
    geoContext.setStrategy(geoBrowserStrategy);
  } else {
    const geoCapStrategy = new GeoCapacitorStrategy();
    // Se o objeto 'window' não estiver definido, pode estar rodando em um ambiente diferente (por exemplo, Node.js)
    geoContext.setStrategy(geoCapStrategy);
  }

  return await geoContext.execute();
};

const useMapHook: (
  zm: number,
  mpCenter?: { lat?: number; lng?: number },
  defaultLocation?: boolean, // If the mpCenter starts on device location
) => {
  loading: boolean;
  zoom: number;
  setZoom: SetStateAction<any | undefined>;
  map: any;
  setMap: SetStateAction<any | undefined>;
  mapCenter: { lat: number; lng: number };
  setMapCenter: SetStateAction<any | undefined>;
} = (zm: number, mpCenter?: { lat?: number; lng?: number }, defaultLocation?: boolean) => {
  /**
   * It define the zoom of map
   */
  const [zoom, setZoom] = useState(zm);

  /**
   * It define the map component
   */
  const [map, setMap] = useState<any>(null);

  /**
   * It define the map component center
   */
  const [mapCenter, setMapCenter] = useState<any>(mpCenter);

  /**
   * It define if the location informations are loading
   */
  const [loading, setLoading] = useState<boolean>(true);

  if (defaultLocation === false && !mpCenter) {
    throw new Error('Invalid Lat or Lng');
  } else if (
    defaultLocation === false &&
    (mpCenter?.lat === undefined || mpCenter?.lng === undefined)
  ) {
     throw new Error('Invalid Lat or Lng');
  }

  useEffect(() => {
    if (!defaultLocation) {
      setMapCenter(mpCenter)
      setLoading(false);
    } else {
      getInstance().then((item) => {
        console.log('nasdnsajdnjas asd')
        setMapCenter(item.pure);
      });
      setLoading(false);
    }
  }, []);

  return {
    zoom,
    setZoom,
    map,
    setMap,
    mapCenter,
    setMapCenter,
    loading,
  };
};

export { useMapHook };
