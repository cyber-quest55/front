import { useMapHook } from '@/hooks/map';
import { useScreenHook } from '@/hooks/screen';
import { GeoLocationContext } from '@/utils/strategies/geolocation/geolocation';
import { EnvironmentFilled } from '@ant-design/icons';
import { ProCard, ProFormCheckbox, ProFormText } from '@ant-design/pro-components';
import { GoogleMap, Marker } from '@react-google-maps/api';
import { useIntl } from '@umijs/max';
import { Button, Col, Row, Space, Spin } from 'antd';

import * as React from 'react';

interface ILocationFormComponentProps {
  locations: {
    // it is the location for each mark that you want to use
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
  lat?: number;
  lng?: number;
  defaultLocation?: boolean;
  layout?: 'vertical' | 'horizontal';
  extra?: any;
  autoUpdateCenter?: boolean;
}

const LocationFormComponent: React.FunctionComponent<ILocationFormComponentProps> = (props) => {
  const {
    locations,
    geoLocationContext,
    hasNorthReference,
    lat,
    lng,
    onChangeNorth,
    northValue,
    defaultLocation,
    layout,
    extra
  } = props;

  const intl = useIntl();
  const { xl, xs } = useScreenHook();

  const {
    zoom,
    setZoom,
    map,
    setMap,
    mapCenter,
    setMapCenter,
    loading,
  } = useMapHook(
    16,
    {
      lat: lat,
      lng: lng,
    },
    defaultLocation,
  );

  // Making map center when coordinates change
  React.useEffect(() => {
    if (props.autoUpdateCenter) {
      setMapCenter({
        lat: props.lat,
        lng: props.lng,
      });
    }
  }, [
    props.lat,
    props.lng,
    props.autoUpdateCenter
  ]);

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

    // location.str was causing the map not to center
    newLocations[index].onChange(location.pure);
  };

  const handleMarkerDragEnd = (index: number, value: any) => {
    const newLocations = [...locations];
    newLocations[index].value = value;
    setLocation(newLocations);
    newLocations[index].onChange(value);
  };

  return (
    <ProCard ghost gutter={[16, 16]} colSpan={{ xs: 24 }} wrap>
      {layout === 'vertical' ? (
        <ProCard ghost colSpan={{ sm: 24 }}>
          <Row style={{ width: '100%' }}>
            {location?.map((item, index) => (
              <ProFormText
                key={`value-color-${index}`}
                required
                colProps={{ xs: 24, md: 24 }}
                label={item.name}
                name={item.name as string}
                width={xs ? ('100%' as 'sm') : ('450px' as 'sm')}
                fieldProps={{
                  width: xs ? '100%' : '450px',
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
            <Col span={24}>
            {extra}
            </Col>

          </Row>
        </ProCard>
      ) : null}
      <ProCard ghost colSpan={{ xs: 24, sm: layout === 'horizontal' || !layout? 12: 24 }} wrap>
        <Spin spinning={loading}>
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
        </Spin>
      </ProCard>
      {layout === 'horizontal' || !layout ? (
        <ProCard ghost colSpan={{ sm: 12 }}>
          <Row style={{ width: '100%' }}>
            {location?.map((item, index) => (
              <ProFormText
                key={`value-color-${index}`}
                required
                colProps={{ xs: 24, md: 24 }}
                label={item.name}
                name={item.name as string}
                width={xs ? ('100%' as 'sm') : ('450px' as 'sm')}
                fieldProps={{
                  width: xs ? '100%' : '450px',
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
      ) : null}
    </ProCard>
  );
};

export default LocationFormComponent;
