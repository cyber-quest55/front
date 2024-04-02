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
import {
  Flex,
  FloatButton,
  Space,
  Switch,
  Typography
} from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { connect } from 'dva';
import React, { useEffect, useRef, useState } from 'react';
import DotDevice from '../Devices/DotDevice';
import SignalInfoWindow from '../Devices/SignalInfoWindow';
import { GetSignalModelProps } from '@/models/signal';
import ConnectionInfoWindow from '../SignalDevices/ConnectionInfoWindow';
import ConnectionLine from '../SignalDevices/ConnectionLine';
import LogsDrawer from './LogsDrawer';


export type RenderPivotsProps = {
  zoom: number;
  signal: GetSignalModelProps;
  pivotInformation: GetPivotInformationModelProps;
  farm: GetFarmModelProps;
  meterSystem: GetMeterSystemModelProps;
  irpd: GetIrpdModelProps;
  central: GetCentralModelProps;
  repeater: GetRepeaterModelProps;
  deviceCenterCoordinates?: { lat: number, lng: number }
  keepLines: boolean;
  setKeepLines: (value: boolean) => void;
};

const CONNECTION_LINE_COLOR = {
  "weak": "#FF0000",
  "moderate": "#81502F",
  "strong": "#81CF2F",
  "very strong": "#03a05e",
}

const RenderDotDevices: React.FC<RenderPivotsProps> = (props) => {
  // Gooks
  const intl = useIntl();
  const ref = useRef();
  const connectionRef = useRef();
  const { xl } = useScreenHook();
  const [
    mapMode,
    setMapMode
  ] = useState<'satellite' | 'terrain'>('satellite');
  const [isLogsOpen, setIsLogsOpenState] = useState<boolean>(false);
  const [showGps, setShowGps] = useState<boolean>(false);
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
      <FloatButton
        shape="circle"
        badge={{ count: props.signal.logs.length }}
        style={{ bottom: 96 }}
        icon={<ExclamationCircleOutlined />}
        onClick={() => setIsLogsOpenState(true)}
      />
       <LogsDrawer 
        title={intl.formatMessage({ id: 'component.signal.map.logs.title' })}
        isOpen={isLogsOpen}
        toggleDrawer={() => setIsLogsOpenState(false)}
        logs={props.signal.logs}
      />
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
                  value={props.signal.keepLines}
                  onChange={(e) => props.setKeepLines(e)}
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
        <ConnectionInfoWindow ref={connectionRef} />
        {
          /* This block renders connection info about devices */
          props.signal.nodeResponses.map((item) => (
            <ConnectionLine 
              key={`connection-${item.from}-${item.to}`}
              fromLat={item.fromLat}
              toLat={item.toLat}
              fromLng={item.fromLng}
              toLng={item.toLng}
              lineColor={CONNECTION_LINE_COLOR[item.quality]}
              fromName={item.fromName}
              toName={item.toName}
              quality={item.quality}
              strength={item.db}
              infoWindowRef={connectionRef}
            />
          ))
        }
        {
          /* This block renders farm central device */
          !props.central.loading
            ? props.central.result?.map((item) => (
              <DotDevice
                id={item.id}
                key={item.id}
                centerLat={item.centerLat}
                centerLng={item.centerLng}
                deviceColor="yellow"
                controlRadio={item.baseRadio}
                statusText={"Central online"}
                dotColor="yellow"
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
          /* This block renders farm pivot devices */
          !props.pivotInformation.loading
            ? props.pivotInformation.result?.map((item) => (
              <>
                <DotDevice
                  id={item.id}
                  key={item.id}
                  centerLat={item.centerLat}
                  centerLng={item.centerLng}
                  controlRadio={item.controlRadio}
                  deviceColor={item.deviceColor}
                  statusText={item.statusText}
                  lineColor="#fff"
                  name={item.name}
                  updated={item.updated}
                  mapRef={null}
                  infoWindowRef={ref}
                  dotColor={
                    props.signal.signalResponses.some(
                      itm => itm.radio_id === item.controlRadio
                    ) ? '#03a05e'
                      : '#FF0000'
                  }
                />
                {
                  showGps ? (
                    <DotDevice
                      id={item.id}
                      key={item.id}
                      centerLat={item.gpsLat}
                      centerLng={item.gpsLong}
                      controlRadio={item.monitorRadio}
                      deviceColor={item.deviceColor}
                      statusText={item.statusText}
                      lineColor="#fff"
                      name={`${item.name} GPS`}
                      updated={item.updated}
                      mapRef={null}
                      infoWindowRef={ref}
                      dotColor={
                        props.signal.signalResponses.some(
                          itm => itm.radio_id === item.monitorRadio
                        ) ? '#03a05e'
                          : '#FF0000'
                      }
                    />
                  ) : null
                }
              </>
              
            ))
            : null
        }
        {
          /* This block renders farm irpd devices */
          !props.irpd.loading
            ? props.irpd.result?.map((item) => (
              <DotDevice
                id={item.id}
                key={item.id}
                centerLat={item.centerLat}
                centerLng={item.centerLng}
                deviceColor={item.deviceColor}
                controlRadio={item.controlRadio}
                statusText={item.statusText!}
                lineColor="#fff"
                name={item.name}
                updated={item.updated}
                mapRef={null}
                infoWindowRef={ref}
                dotColor={
                  props.signal.signalResponses.some(
                    itm => itm.radio_id === item.controlRadio
                  ) ? '#03a05e'
                    : '#FF0000'
                }
              />
            ))
            : null
        }
        {
          /* This block renders farm repeater devices */
          !props.repeater.loading
            ? props.repeater.result?.map((item) => (
              <DotDevice
                id={item.id}
                key={item.id}
                centerLat={item.centerLat}
                centerLng={item.centerLng}
                deviceColor={item.deviceColor}
                controlRadio={item.controlRadio}
                statusText={item.statusText!}
                lineColor="#fff"
                name={item.name}
                updated={item.updated}
                mapRef={null}
                infoWindowRef={ref}
                dotColor={
                  props.signal.signalResponses.some(
                    itm => itm.radio_id === item.controlRadio
                  ) ? '#03a05e'
                    : '#FF0000'
                }
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
    signal,
  }: any) => ({
    pivotInformation,
    farm,
    meterSystem,
    irpd,
    central,
    repeater,
    signal,
  });


const mapDispatchToProps = (dispatch: Dispatch) => ({
  setKeepLines: (value: boolean) => dispatch({
    type: 'signal/updateKeepLines',
    payload: value
  })
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RenderDotDevices);
