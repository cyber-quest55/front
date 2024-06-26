import { useMapHook } from '@/hooks/map';
import { useScreenHook } from '@/hooks/screen';
import { GetFarmModelProps } from '@/models/farm';
import { GetIrpdModelProps } from '@/models/irpd';
import { GetMeterSystemModelProps } from '@/models/meter-sysem';
import { GetPivotInformationModelProps } from '@/models/pivot-information';
import { GetRepeaterModelProps } from '@/models/repeaters';
import { setSelectedDevice } from '@/models/selected-device';
import { DeviceType } from '@/utils/enum/device-type';
import { ProCard } from '@ant-design/pro-components';
import { GoogleMap } from '@react-google-maps/api';
import { Dispatch, useIntl, useParams } from '@umijs/max';
import { Flex, Space, Switch, Typography } from 'antd';
import { connect } from 'dva';
import React, { useEffect, useRef, useState } from 'react';
import CirclePivot from '../Devices/CirclePivot';
import LakeLevelMeterDevice from '../Devices/LakeLevelMeter';
import RepeaterDevice from '../Devices/Repeater';
import WaterPumpDevice from '../Devices/WaterPump';
import CustomInfoWindow from '../Devices/InfoWindow';
import DotDevice from '../Devices/DotDevice';

const scrollToBottom = () => {
  setTimeout(() => {
    const element = document.getElementById('page-container');
    if (element) {
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      const offset = elementPosition   // Ajuste de 100 pixels para o topo da tela
      window.scrollTo({ top: offset, behavior: 'smooth' });
    }
  }, 500);
};

export type RenderPivotsProps = {
  zoom: number;
  pivotInformation: GetPivotInformationModelProps;
  farm: GetFarmModelProps;
  meterSystem: GetMeterSystemModelProps;
  irpd: GetIrpdModelProps;
  repeater: GetRepeaterModelProps;
  setSelectedDevice: typeof setSelectedDevice;
};

const RenderPivots: React.FC<RenderPivotsProps> = (props) => {
  const params = useParams();
  const { md, xl } = useScreenHook();
  const { zoom, setZoom, map, setMap, mapCenter, setMapCenter } = useMapHook(14, {
    lat: 0,
    lng: 0,
  });


  const ref = useRef()
  const intl = useIntl();
  const [showPump, setShowPump] = useState(false);
  const [showMetter, setShowMetter] = useState(false);
  const [showRepeaters, setShowRepeaters] = useState(false);

  const containerStyle = {
    width: '100%',
    height: md ? '100vh' : 'calc(100vh - 108px)',
  };

  useEffect(() => {
    if (props.pivotInformation.loaded === true) {
      if (props.pivotInformation.loading !== true) {
        const pivot = props.pivotInformation.result[0];

        if (pivot && pivot.centerLat) {
          setMapCenter({ lat: pivot.centerLat, lng: pivot.centerLng });
        }
      }
    }
  }, [props.pivotInformation]);

  const onSetDevice = (type: DeviceType, deviceId: number, otherProps: any) => {
    const farmId = parseInt(params.id as string);
    props.setSelectedDevice({ type, deviceId, farmId, otherProps });
    scrollToBottom();
  };

  return (
    <>
      {xl ? (
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
              width: 165

            }}
          >
            <Space>
              <Switch value={showPump} onChange={(e) => setShowPump(e)} defaultChecked size="small" />
              <Typography.Text>{intl.formatMessage({id: 'component.name.irpd'})} </Typography.Text>
            </Space>
          </ProCard>

          <ProCard
            style={{
              padding: 0,
              width: 165

            }}
          >
            <Space>
              <Switch value={showMetter}  onChange={(e) => setShowMetter(e)} defaultChecked size="small" />
              <Typography.Text>{intl.formatMessage({id: 'component.name.meter'})} </Typography.Text>
            </Space>
          </ProCard>

          <ProCard
            style={{
              padding: 0,
              width: 165

            }}
          >
            <Space>
              <Switch value={showRepeaters}  onChange={(e) => setShowRepeaters(e)} defaultChecked size="small" />
              <Typography.Text>{intl.formatMessage({id: 'component.name.repeater'})} </Typography.Text>
            </Space>
          </ProCard>
        </Flex>
      ) : null}

      <GoogleMap
        onLoad={(map) => setMap(map)}
        onZoomChanged={() => {
          if (map !== null) {
            if (map.getZoom() > 11) {
              if (zoom <= 11)
                setZoom(map.getZoom())
            }
            if (map.getZoom() < 12) {
              if (zoom >= 12)
                setZoom(map.getZoom())
            }

          }
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
        <CustomInfoWindow ref={ref} />

        {!props.pivotInformation.loading
          ? props.pivotInformation?.result?.map((item) => {
            return (
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
                deviceColor={item.deviceColor}
                lineColor="#fff"
                referenceAngle={item.referenceAngle}
                irrigationDirection={item.irrigationDirection}
                stopAngle={item.stopAngle | 360}
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
                mapHistory={item.mapHistory}
                controlRadio={item.controlRadio}
                currentAngle={item.currentAngle}
                monitorRadio={item.monitorRadio}
                infoWindowRef={ref}
                infoWindow

              />
            );
          })
          : null}
        {!props.meterSystem.loading ? showMetter
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
              percentage={item.percentage}
              meterLevel={item.meterLevel}
              imeterSetId={item.imeterSetId}
              zoom={zoom}
              infoWindowRef={ref}
            />
          ))
          :
          props.meterSystem.result?.map((item) => (
            <DotDevice
              id={item.id}
              key={`meter-${item.id}`}
              centerLat={item.centerLat}
              centerLng={item.centerLng}
              controlRadio={item.controlRadio}
              deviceColor={item.deviceColor}
              statusText={item.statusText}
              lineColor=""
              name={item.name}
              updated={item.updated}
              mapRef={null}
              infoWindowRef={ref}
              dotColor={item.deviceColor}
              radius={50}
              zoom={zoom}
            />)) : null}
        {!props.irpd.loading ? showPump
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
              infoWindowRef={ref}
              waterId={item.waterId}
              controlRadio={item.controlRadio}
              zoom={zoom}
              infoWindow
            />
          ))
          : props.irpd.result?.map((item) => (
            <DotDevice
              id={item.id}
              key={`irpd-${item.id}`}
              centerLat={item.centerLat}
              centerLng={item.centerLng}
              controlRadio={item.controlRadio}
              deviceColor={item.deviceColor}
              statusText={item.statusText}
              lineColor=""
              name={item.name}
              updated={item.updated}
              mapRef={null}
              infoWindowRef={ref}
              dotColor={item.deviceColor}
              radius={50}
              zoom={zoom}
            />)) : null}
        {!props.repeater.loading ? showRepeaters
          ? props.repeater.result?.map((item, index) => (
            <RepeaterDevice
              key={'reepater' + index}
              centerLat={item.centerLat}
              centerLng={item.centerLng}
              name={item.name}
              infoWindowRef={ref}
              updated={item.updated}
              id={item.id}
              onSelect={() => null}
              zoom={zoom}
            />
          ))
          : props.repeater.result?.map((item) => (
            <DotDevice
              id={item.id}
              key={`repeater-${item.id}`}
              centerLat={item.centerLat}
              centerLng={item.centerLng}
              controlRadio={item.controlRadio}
              deviceColor={item.deviceColor}
              statusText={item.statusText}
              lineColor=""
              name={item.name}
              updated={item.updated}
              mapRef={null}
              infoWindowRef={ref}
              dotColor={"#000"}
              radius={50}
              zoom={zoom}

            />)) : null}
      </GoogleMap>
    </>
  );
};

const mapStateToProps = ({ pivotInformation, farm, meterSystem, irpd, repeater }: any) => ({
  pivotInformation,
  farm,
  meterSystem,
  irpd,
  repeater,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  setSelectedDevice: (props: any) => dispatch(setSelectedDevice(props)),
});

export default connect(mapStateToProps, mapDispatchToProps)(RenderPivots);
