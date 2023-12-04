import { useScreenHook } from '@/hooks/screen';
import { GeoBrowserStrategy } from '@/utils/strategies/geolocation/browser-strategy';
import { GeoLocationContext } from '@/utils/strategies/geolocation/geolocation';
import * as React from 'react';
import LocationFormComponent from './LocationComponent';
import LocationFormMobile from './LocationMobile';
import LocationFormSkeleton from './LocationSkeleton';
import { GeoCapacitorStrategy } from '@/utils/strategies/geolocation/cap-strategy';

interface ILocationFormContainerProps {
  locations: {
    color: string;
    name: string;
    value: {
      lat: number;
      lng: number;
    };
    marker: any;
    onChange: any;
  }[];
  hasNorthReference?: boolean;
  onChangeNorth?: any;
  northValue: boolean;
  lat: number;
  lng: number;
}

const LocationFormContainer: React.FunctionComponent<ILocationFormContainerProps> = (props) => {
  const { xs } = useScreenHook();

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

  return (
    <>
      {false ? (
        <LocationFormSkeleton />
      ) : xs ? (
        <LocationFormComponent  {...props} geoLocationContext={geoContext}/>
      ) : (
        <LocationFormComponent {...props} geoLocationContext={geoContext} />
      )}
    </>
  );
};

export default LocationFormContainer;
