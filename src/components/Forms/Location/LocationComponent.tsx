import { useMapHook } from '@/hooks/map';
import { useScreenHook } from '@/hooks/screen';
import { GeoLocationContext } from '@/utils/strategies/geolocation/geolocation';
import { EnvironmentFilled } from '@ant-design/icons';
import { ProCard, ProFormCheckbox, ProFormText } from '@ant-design/pro-components';
import { GoogleMap, Marker } from '@react-google-maps/api';
import { useIntl } from '@umijs/max';
import { Button, Row, Space } from 'antd';

import * as React from 'react';

interface ILocationFormComponentProps {
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
  geoLocationContext: GeoLocationContext;
  hasNorthReference?: boolean;
  onChangeNorth?: any;
  northValue: boolean;
  lat: number;
  lng: number;
}

const LocationFormComponent: React.FunctionComponent<ILocationFormComponentProps> = (props) => {
  const { locations, geoLocationContext, hasNorthReference, lat, lng, onChangeNorth, northValue } =
    props;

  const intl = useIntl();
  const { xl } = useScreenHook();

  const { zoom, setZoom, map, setMap, mapCenter } = useMapHook(16, {
    lat: lat,
    lng: lng,
  });

  //* hooks for the marks */
  const [location, setLocation] = React.useState(locations);

  const containerStyle = {
    width: '100%',
    height: xl ? '50vh' : '350px',
  };

  const onClickLocation = async (index: number) => {
    const location = await geoLocationContext.execute();

    const newLocations = [...locations];
    newLocations[index].value = location.pure;
    setLocation(newLocations);
    newLocations[index].onChange(location.str);
  };

  const handleMarkerDragEnd = (index: number, value: any) => {
    const newLocations = [...locations];
    newLocations[index].value = value;
    setLocation(newLocations);
    newLocations[index].onChange(value);
  };

  return (
    <ProCard ghost gutter={[16, 16]} colSpan={{ xs: 24 }} wrap>
      <ProCard ghost colSpan={{ xs: 24, sm: 12 }} wrap>
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
          {location?.map((item, index) => (
            <Marker
              key={`index-marker-map-${index}`}
              icon={item.marker}
              position={item.value}
              draggable
              onDragEnd={(event) => {
                handleMarkerDragEnd(index, event.latLng?.toJSON());
              }}
            />
          ))}
        </GoogleMap>
      </ProCard>
      <ProCard ghost colSpan={{ sm: 12 }}>
        <Row style={{ width: '100%' }}>
          {location?.map((item, index) => (
            <ProFormText
              key={`value-color-${index}`}
              required
              colProps={{ xs: 24, md: 24 }}
              label={item.name}
              name={item.name as string}
              width={'350px' as 'sm'}
              fieldProps={{
                width: '450px',
                value: `${item.value.lat},${item.value.lng}`,
              }}
              addonAfter={
                <Button onClick={() => onClickLocation(index)}>
                  <Space>
                    <EnvironmentFilled style={{ color: item.color }} />
                    {intl.formatMessage({
                      id: 'component.location.btnlocation.label',
                    })}
                  </Space>
                </Button>
              }
            />
          ))}

          {hasNorthReference ? (
            <ProFormCheckbox
            colProps={{ xs: 24, md: 24 }}

              fieldProps={{ onChange: (e) => onChangeNorth(e), defaultChecked: northValue }}
            >
              {intl.formatMessage({
                id: 'component.location.hasnorth.label',
              })}
            </ProFormCheckbox>
          ) : null}
        </Row>
      </ProCard>
    </ProCard>
  );
};

export default LocationFormComponent;
