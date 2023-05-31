import { GetCentralModelProps } from '@/models/central';
import { GetFarmModelProps } from '@/models/farm';
import { GetIrpdModelProps } from '@/models/irpd';
import { GetMeterSystemModelProps } from '@/models/meter-sysem';
import { GetPivotInformationModelProps } from '@/models/pivot-information';
import { GetRepeaterModelProps } from '@/models/repeaters';
import { GoogleMap } from '@react-google-maps/api';
import { useWindowWidth } from '@react-hook/window-size';
import { connect } from 'dva';
import React, { useEffect, useState } from 'react';
import DotDevice from '../Devices/DotDevice';

export type RenderPivotsProps = {
  dispatch: any;
  zoom: number;
  pivotInformation: GetPivotInformationModelProps;
  farm: GetFarmModelProps;
  meterSystem: GetMeterSystemModelProps;
  irpd: GetIrpdModelProps;
  central: GetCentralModelProps;
  repeater: GetRepeaterModelProps;
};

const RenderDotDevices: React.FC<RenderPivotsProps> = (props) => {
  const onlyWidth = useWindowWidth();

  const [zoom, setZoom] = useState(14);
  const [map, setMap] = useState<any>(null);
  const [mapCenter, setMapCenter] = useState({ lat: 0, lng: 0 });

  const containerStyle = {
    width: '100%',
    height: onlyWidth > 1210 ? '100vh' : 'calc(100vh -  102px)',
  };

  useEffect(() => {
    if (props.pivotInformation.loaded === true) {
      const pivot = props.pivotInformation.result[0];
      setMapCenter({ lat: pivot.centerLat, lng: pivot.centerLng });
    }
  }, [props.pivotInformation.loaded]);

  return (
    <>
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
        {!props.pivotInformation.loading
          ? props.pivotInformation.result?.map((item) => (
              <DotDevice
                id={item.id}
                key={item.id}
                centerLat={item.centerLat}
                centerLng={item.centerLng}
                pivotColor="#FF0000"
                lineColor="#fff"
                name={item.name}
                updated={item.updated}
              />
            ))
          : null}
        {!props.meterSystem.loading
          ? props.meterSystem.result?.map((item) => (
              <DotDevice
                id={item.id}
                key={item.id}
                centerLat={item.centerLat}
                centerLng={item.centerLng}
                pivotColor="#FF0000"
                lineColor="#fff"
                name={item.name}
                updated={item.updated}
              />
            ))
          : null}
        {!props.irpd.loading
          ? props.irpd.result?.map((item) => (
              <DotDevice
                id={item.id}
                key={item.id}
                centerLat={item.centerLat}
                centerLng={item.centerLng}
                pivotColor="#FF0000"
                lineColor="#fff"
                name={item.name}
                updated={item.updated}
              />
            ))
          : null}
        {!props.central.loading
          ? props.central.result?.map((item) => (
              <DotDevice
                id={item.id}
                key={item.id}
                centerLat={item.centerLat}
                centerLng={item.centerLng}
                pivotColor="yellow"
                name={item.name}
                updated={item.updated}
              />
            ))
          : null}
        {!props.repeater.loading
          ? props.repeater.result?.map((item) => (
              <DotDevice
                id={item.id}
                key={item.id}
                centerLat={item.centerLat}
                centerLng={item.centerLng}
                pivotColor="blue"
                name={item.name}
                updated={item.updated}
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
    central,
    repeater,
  }: {
    pivotInformation: any;
    farm: any;
    meterSystem: any;
    irpd: any;
    central: any;
    repeater: any;
  }) => ({
    pivotInformation,
    farm,
    meterSystem,
    irpd,
    central,
    repeater,
  }),
)(RenderDotDevices);
