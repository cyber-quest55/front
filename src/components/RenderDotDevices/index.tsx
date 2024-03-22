import { useMapHook } from '@/hooks/map';
import { useScreenHook } from '@/hooks/screen';
import { GetCentralModelProps } from '@/models/central';
import { GetFarmModelProps } from '@/models/farm';
import { GetIrpdModelProps } from '@/models/irpd';
import { GetMeterSystemModelProps } from '@/models/meter-sysem';
import { GetPivotInformationModelProps } from '@/models/pivot-information';
import { GetRepeaterModelProps } from '@/models/repeaters';
import { GoogleMap } from '@react-google-maps/api';
import { ProCard } from '@ant-design/pro-components';
import { useIntl } from '@umijs/max';
import { Flex, Space, Switch, Typography } from 'antd';
import { connect } from 'dva';
import React, { useEffect, useRef, useState } from 'react';
import DotDevice from '../Devices/DotDevice';
import SignalInfoWindow from '../Devices/SignalInfoWindow';

export type RenderPivotsProps = {
  zoom: number;
  pivotInformation: GetPivotInformationModelProps;
  farm: GetFarmModelProps;
  meterSystem: GetMeterSystemModelProps;
  irpd: GetIrpdModelProps;
  central: GetCentralModelProps;
  repeater: GetRepeaterModelProps;
  deviceCenterCoordinates?: { lat: number, lng: number }
};

const RenderDotDevices: React.FC<RenderPivotsProps> = (props) => {
  // Gooks
  const intl = useIntl();
  const ref = useRef();
  const { xl } = useScreenHook();
  const [
    mapMode,
    setMapMode
  ] = useState<'satellite' | 'terrain'>('satellite');
  const [showGps, setShowGps] = useState<boolean>(false);
  const [drawLines, setDrawLines] = useState<boolean>(false);
  const {
    zoom,
    setZoom,
    map,
    setMap,
    mapCenter,
    setMapCenter
  } = useMapHook(14, {
    lat: 0,
    lng: 0,
  });

  console.log(showGps, drawLines);

  // Styles
  const containerStyle = {
    width: '100%',
    height: xl ? '100vh' : 'calc(100vh -  102px)',
  };

  // Center map when loaded
  useEffect(() => {
    if (props.pivotInformation.loaded === true) {
      const pivot = props.pivotInformation.result[0];
      setMapCenter({ lat: pivot.centerLat, lng: pivot.centerLng });
    }
  }, [props.pivotInformation.loaded]);

  // Update map center coordinates when seleting device
  useEffect(() => {
    if (props.deviceCenterCoordinates) {
      setMapCenter(props.deviceCenterCoordinates);
    }
  }, [props.deviceCenterCoordinates]);

  // TSX
  return (
    <>
      {
        xl ? (
          <Flex
            gap={12}
            style={{
              position: 'absolute',
              bottom: 12,
              zIndex: 999,
              left: 44,

            }}
          >
            <ProCard
              style={{
                padding: 0,
                width: 150,
              }}
            >
              <Space>
                <Switch
                  onChange={(e) => setMapMode(e ? 'terrain' : 'satellite')}
                  size="small"
                />
                <Typography.Text>
                  {
                    intl.formatMessage({
                      id: 'component.signal.map.switch.rellief',
                    })
                  }
                </Typography.Text>
              </Space>
            </ProCard>
            <ProCard
              style={{
                padding: 0,
                width: 165,
              }}
            >
              <Space>
                <Switch
                  onChange={(e) => setShowGps(e)}
                  size="small"
                />
                <Typography.Text>
                  {
                    intl.formatMessage({
                      id: 'component.signal.map.switch.gps',
                    })
                  }
                </Typography.Text>
              </Space>
            </ProCard>
            <ProCard
              style={{
                padding: 0,
                width: 165
              }}
            >
              <Space>
                <Switch
                  onChange={(e) => setDrawLines(e)}
                  size="small"
                />
                <Typography.Text>
                  {
                    intl.formatMessage({
                      id: 'component.signal.map.switch.lines',
                    })
                  }
                </Typography.Text>
              </Space>
            </ProCard>
          </Flex>
        ) : null
      }
      <GoogleMap
        onLoad={(map) => setMap(map)}
        mapContainerStyle={containerStyle}
        center={mapCenter}
        zoom={zoom}
        options={{
          keyboardShortcuts: false,
          rotateControl: false,
          mapTypeControl: false,
          isFractionalZoomEnabled: false,
          mapTypeId: mapMode,
          zoomControl: false,
          scaleControl: false,
          fullscreenControl: false,
          streetViewControl: false,
        }}
        onZoomChanged={() => {
          if (map !== null) setZoom(map.getZoom());
        }}
      >
        <SignalInfoWindow ref={ref} />
        {
          !props.pivotInformation.loading
            ? props.pivotInformation.result?.map((item) => (
              <DotDevice
                id={item.id}
                key={item.id}
                centerLat={item.centerLat}
                centerLng={item.centerLng}
                deviceColor="#FF0000"
                lineColor="#fff"
                name={item.name}
                updated={item.updated}
                mapRef={null}
                infoWindowRef={ref}
              />
            ))
            : null
        }
        {
          !props.irpd.loading
            ? props.irpd.result?.map((item) => (
              <DotDevice
                id={item.id}
                key={item.id}
                centerLat={item.centerLat}
                centerLng={item.centerLng}
                deviceColor="#FF0000"
                lineColor="#fff"
                name={item.name}
                updated={item.updated}
                mapRef={null}
                infoWindowRef={ref}
              />
            ))
            : null
        }
        {
          !props.central.loading
            ? props.central.result?.map((item) => (
              <DotDevice
                id={item.id}
                key={item.id}
                centerLat={item.centerLat}
                centerLng={item.centerLng}
                deviceColor="yellow"
                lineColor="#fff"
                name={item.name}
                updated={item.updated}
                mapRef={null}
                infoWindowRef={ref}
              />
            ))
            : null
        }
        {
          !props.repeater.loading
            ? props.repeater.result?.map((item) => (
              <DotDevice
                id={item.id}
                key={item.id}
                centerLat={item.centerLat}
                centerLng={item.centerLng}
                deviceColor="blue"
                lineColor="#fff"
                name={item.name}
                updated={item.updated}
                mapRef={null}
                infoWindowRef={ref}
              />
            ))
            : null
        }
      </GoogleMap>
    </>
  );
};

const mapStateToProps =
  ({
    pivotInformation,
    farm,
    meterSystem,
    irpd,
    central,
    repeater,
  }: any) => ({
    pivotInformation,
    farm,
    meterSystem,
    irpd,
    central,
    repeater,
  });


const mapDispatchToProps = () => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RenderDotDevices);
