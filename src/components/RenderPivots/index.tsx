import { useMapHook } from '@/hooks/map';
import { useScreenHook } from '@/hooks/screen';
import { GetFarmModelProps } from '@/models/farm';
import { GetIrpdModelProps } from '@/models/irpd';
import { GetMeterSystemModelProps } from '@/models/meter-sysem';
import { GetPivotInformationModelProps } from '@/models/pivot-information';
import { GetRepeaterModelProps } from '@/models/repeaters';
import { ProCard } from '@ant-design/pro-components';
import Field from '@ant-design/pro-field';
import { GoogleMap } from '@react-google-maps/api';
import { useParams } from '@umijs/max';
import { Space, Switch, Typography } from 'antd';
import { connect } from 'dva';
import React, { useEffect, useState } from 'react';
import CirclePivot from '../Devices/CirclePivot';
import LakeLevelMeterDevice from '../Devices/LakeLevelMeter';
import RepeaterDevice from '../Devices/Repeater';
import WaterPumpDevice from '../Devices/WaterPump';
const scrollToBottom = () => {
  setTimeout(() => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: 'smooth',
    });
  }, 500);
};

export type RenderPivotsProps = {
  dispatch: any;
  zoom: number;
  pivotInformation: GetPivotInformationModelProps;
  farm: GetFarmModelProps;
  meterSystem: GetMeterSystemModelProps;
  irpd: GetIrpdModelProps;
  repeater: GetRepeaterModelProps;
};

const RenderPivots: React.FC<RenderPivotsProps> = (props) => {
  const params = useParams();
  const { md, xl } = useScreenHook();
  const { zoom, setZoom, map, setMap, mapCenter, setMapCenter } = useMapHook(14, {
    lat: 0,
    lng: 0,
  });

  const [showPivots, setShowPivots] = useState(true);
  const [showPump, setShowPump] = useState(true);
  const [showMetter, setShowMetter] = useState(true);
  const [showRepeaters, setShowRepeaters] = useState(true);

  const containerStyle = {
    width: '100%',
    height: md ? '100vh' : 'calc(100vh -  102px)',
  };

  useEffect(() => {
    props.dispatch({
      type: 'pivotInformation/queryPivotInformation',
      payload: {
        id: parseInt(params.id as string),
        params: {},
      },
    });

    props.dispatch({
      type: 'meterSystem/queryMeterSystem',
      payload: {
        id: parseInt(params.id as string),
        params: {},
      },
    });

    props.dispatch({
      type: 'irpd/queryIrpd',
      payload: {
        id: parseInt(params.id as string),
        params: {},
      },
    });
  }, [params]);

  useEffect(() => {
    if (props.pivotInformation.loaded === true) {
      const pivot = props.pivotInformation.result[0];

      if (pivot) setMapCenter({ lat: pivot.centerLat, lng: pivot.centerLng });
    }
  }, [props.pivotInformation]);

  const onSetDevice = (type: string, deviceId: string, otherProps: any) => {
    props.dispatch({
      type: 'selectedDevice/setSelectedDevice',
      payload: { type, deviceId, farmId: params.id, otherProps },
    });
    scrollToBottom();
  };

  return (
    <>
      {xl ? (
        <Space
          style={{
            position: 'absolute',
            top: 10,
            zIndex: 999,
            left: 453,
          }}
        >
          <ProCard
            ghost
            style={{
              background: 'white',
              padding: 8,
            }}
          >
            <Field
              text="open"
              mode="edit"
              valueType="radioButton"
              fieldProps={{ size: 'small' }}
              valueEnum={{
                open: {
                  text: 'Google',
                  status: 'Default',
                },
                all: { text: 'Sputnik', disabled: true },
              }}
            ></Field>
          </ProCard>
          <ProCard
            ghost
            style={{
              background: 'white',
              padding: 8,
            }}
          >
            <Space>
              <Switch onChange={(e) => setShowPivots(e)} defaultChecked size="small" />
              <Typography.Text>Pivôs </Typography.Text>
            </Space>
          </ProCard>

          <ProCard
            ghost
            style={{
              background: 'white',
              padding: 8,
            }}
          >
            <Space>
              <Switch onChange={(e) => setShowPump(e)} defaultChecked size="small" />
              <Typography.Text>Bombas </Typography.Text>
            </Space>
          </ProCard>

          <ProCard
            ghost
            style={{
              background: 'white',
              padding: 8,
            }}
          >
            <Space>
              <Switch onChange={(e) => setShowMetter(e)} defaultChecked size="small" />
              <Typography.Text>Medidores </Typography.Text>
            </Space>
          </ProCard>

          <ProCard
            ghost
            style={{
              background: 'white',
              padding: 8,
            }}
          >
            <Space>
              <Switch onChange={(e) => setShowRepeaters(e)} defaultChecked size="small" />
              <Typography.Text>Repetidores </Typography.Text>
            </Space>
          </ProCard>
        </Space>
      ) : null}

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
        }}
        zoom={zoom}
      >
        {!props.pivotInformation.loading && showPivots
          ? props.pivotInformation?.result?.map((item) => (
              <CirclePivot
                id={item.id}
                key={item.id}
                protocol={item.protocol}
                type={item.type}
                centerLat={item.centerLat}
                centerLng={item.centerLng}
                referencedLat={item.referencedLat}
                referencedLng={item.referencedLng}
                gpsLat={item.gpsLat}
                gpsLong={item.gpsLong}
                pivotColor={item.pivotColor}
                lineColor="#fff"
                referenceAngle={item.referenceAngle}
                irrigationDirection={item.irrigationDirection}
                stopAngle={item.stopAngle}
                endAngle={item.endAngle}
                sectorAngle={item.sectorAngle}
                lpmGpsStreamLat={item.lpmGpsStreamLat}
                lpmGpsStreamLng={item.lpmGpsStreamLng}
                zoom={zoom}
                hasMarker={true}
                irrigationStatus={4}
                dashed={false}
                name={item.name}
                updated={item.updated}
                statusText={item.statusText}
                onSelect={onSetDevice}
                infoWindow
              />
            ))
          : null}
        {!props.meterSystem.loading && showMetter
          ? props.meterSystem.result?.map((item, index) => (
              <LakeLevelMeterDevice
                key={'meter-system' + index}
                centerLat={item.centerLat}
                centerLng={item.centerLng}
                name={item.name}
                updated={item.updated}
                id={item.id}
                onSelect={onSetDevice}
                deviceColor={item.deviceColor}
                statusText={item.statusText}
                infoWindow
                imeterSetId={item.imeterSetId}
              />
            ))
          : null}
        {!props.irpd.loading && showPump
          ? props.irpd.result?.map((item, index) => (
              <WaterPumpDevice
                key={'water-pump' + index}
                centerLat={item.centerLat}
                centerLng={item.centerLng}
                name={item.name}
                updated={item.updated}
                id={item.id}
                onSelect={onSetDevice}
                deviceColor={item.deviceColor}
                statusText={item.statusText}
                infoWindow
              />
            ))
          : null}
        {!props.repeater.loading && showRepeaters
          ? props.repeater.result?.map((item, index) => (
              <RepeaterDevice
                key={'reepater' + index}
                centerLat={item.centerLat}
                centerLng={item.centerLng}
                name={item.name}
                updated={item.updated}
                id={item.id}
                onSelect={() => null}
              />
            ))
          : null}
      </GoogleMap>
    </>
  );
};

export default connect(
  ({
    pivotInformation,
    farm,
    meterSystem,
    irpd,
    repeater,
  }: {
    pivotInformation: any;
    farm: any;
    meterSystem: any;
    irpd: any;
    repeater: any;
  }) => ({
    pivotInformation,
    farm,
    meterSystem,
    irpd,
    repeater,
  }),
)(RenderPivots);
