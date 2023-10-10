import { useMapHook } from '@/hooks/map';
import { useScreenHook } from '@/hooks/screen';
import { GeoLocationContext } from '@/utils/strategies/geolocation/geolocation';
import { EnvironmentFilled } from '@ant-design/icons';
import { ProCard, ProFormCheckbox, ProFormText } from '@ant-design/pro-components';
import { GoogleMap, Marker } from '@react-google-maps/api';
import { Button, Space } from 'antd';
import * as React from 'react';
import MarkerGreen from '../../../../public/images/devices/marker-green.svg';
import MarkerRed from '../../../../public/images/devices/marker-red.svg';

interface ILocationFormComponentProps {
  firstLocationName: string;
  secondLocationName?: string;
  onChangeFirstLocation: any;
  onChangeSecondLocation?: any;
  firstInitialValue?: { lat: number; lng: number };
  secondInitialValue?: { lat: number; lng: number };
  geoLocationContext: GeoLocationContext;
  hasNorthReference?: boolean;
  lat: number;
  lng: number;
}

const LocationFormComponent: React.FunctionComponent<ILocationFormComponentProps> = (props) => {
  const {
    firstLocationName,
    secondLocationName,
    geoLocationContext,
    onChangeFirstLocation,
    onChangeSecondLocation,
    firstInitialValue,
    secondInitialValue,
    hasNorthReference,
    lat,
    lng,
  } = props;

  const { xl } = useScreenHook();

  const { zoom, setZoom, map, setMap, mapCenter } = useMapHook(16, {
    lat: lat,
    lng: lng,
  });

  //* hooks for the marks */
  const [firstLocation, setFirstLocation] = React.useState<any>(firstInitialValue);
  const [secondLocation, setSecondLocation] = React.useState<any>(secondInitialValue);
  const [isNorthReference, setIsNorthReference] = React.useState<any>(false);

  const containerStyle = {
    width: '100%',
    height: xl ? '50vh' : 'calc(30vh -  102px)',
  };

  const onClickGetFirstLocation = async () => {
    const location = await geoLocationContext.execute();
    setFirstLocation(location.pure);
    onChangeFirstLocation(location.str);
  };

  const onClickGetSecondLocation = async () => {
    const location = await geoLocationContext.execute();
    setSecondLocation(location.pure);
    onChangeSecondLocation(location.str);
  };

  return (
    <ProCard gutter={[16, 8]}>
      <ProCard ghost colSpan={{ sm: 12 }}>
        <GoogleMap
          onLoad={(map) => setMap(map)}
          onZoomChanged={() => {
            if (map !== null) setZoom(map.getZoom());
          }}
          mapContainerStyle={containerStyle}
          center={mapCenter}
          options={{
            keyboardShortcuts: false,
            rotateControl: false,
            mapTypeControl: false,
            isFractionalZoomEnabled: false,
            mapTypeId: 'satellite',
            zoomControl: false,
            scaleControl: false,
            fullscreenControl: false,
            streetViewControl: false,
          }}
          zoom={zoom}
        >
          {firstLocation ? <Marker icon={MarkerGreen} position={firstLocation} /> : null}
          {secondLocation ? <Marker icon={MarkerRed} position={secondLocation} /> : null}
        </GoogleMap>
      </ProCard>
      <ProCard ghost title="Dados" colSpan={{ sm: 12 }}>
        <ProFormText
          required
          label={'Centro'}
          name={firstLocationName as string}
          addonAfter={
            <Button onClick={onClickGetFirstLocation}>
              <Space>
                <EnvironmentFilled style={{ color: 'green' }} /> Localização
              </Space>
            </Button>
          }
        />
        {secondLocationName && onChangeSecondLocation ? (
          <ProFormText
            required
            disabled={isNorthReference}
            label={'Referência Inicial'}
            name={secondLocationName as string}
            addonAfter={
              <Button disabled={isNorthReference} onClick={onClickGetSecondLocation}>
                <Space>
                  <EnvironmentFilled style={{ color: 'tomato' }} /> Localização
                </Space>
              </Button>
            }
          />
        ) : null}{' '}
        {hasNorthReference ? (
          <ProFormCheckbox fieldProps={{onChange: (e) => setIsNorthReference(e.target.checked)}}>Utilizar Norte como Referência</ProFormCheckbox>
        ) : null}
      </ProCard>
    </ProCard>
  );
};

export default LocationFormComponent;
